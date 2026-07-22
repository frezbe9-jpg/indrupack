"use strict";
"use server";

import { db } from "@/db";
import { leads, auditLogs } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, or, desc } from "drizzle-orm";
import { cookies } from "next/headers";
import { leadSchema, loginSchema, adminLoginSchema } from "@/lib/validations";

// --- Middleware Helpers ---
async function verifyAdmin() {
  const cookieStore = await cookies();
  const adminSecret = process.env.ADMIN_SECRET;
  const adminCookie = cookieStore.get("admin_access")?.value;
  const isAdmin = adminSecret && adminCookie === adminSecret;
  if (!isAdmin) throw new Error("Unauthorized");
  return adminCookie;
}

async function logAction(action: string, entityId?: number, details?: string) {
  const adminId = (await cookies()).get("admin_access")?.value || "system";
  await db.insert(auditLogs).values({ action, entityId, details, adminId });
}

// --- Public Actions ---
export async function submitLead(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = leadSchema.safeParse(rawData);

  if (!validated.success) return { error: validated.error.issues[0].message };

  try {
    const [inserted] = await db.insert(leads).values({
      ...validated.data,
      email: validated.data.email || null,
      message: validated.data.message || null,
      cardboardGrade: validated.data.cardboardGrade || null,
      quizResults: validated.data.quizResults || null,
      fefcoCode: validated.data.fefcoCode || null,
    }).returning();

    const tgMessage = `🚀 <b>Новая заявка!</b>\n\n👤 Имя: ${inserted.name}\n📞 Тел: ${inserted.phone}\n📦 Тираж: ${inserted.quantity} шт.`;
    sendTelegramNotification(tgMessage).catch(console.error);

    revalidatePath("/");
    return { success: "Заявка успешно отправлена!" };
  } catch (error) {
    console.error("Submit error:", error);
    return { error: "Ошибка сервера" };
  }
}

// --- Admin Actions ---
export async function adminLogin(formData: FormData) {
  const validated = adminLoginSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validated.success) return { error: validated.error.issues[0].message };

  const adminSecret = process.env.ADMIN_SECRET;
  if (adminSecret && validated.data.secret === adminSecret) {
    const cookieStore = await cookies();
    cookieStore.set("admin_access", adminSecret, { 
      path: "/", 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict" 
    });
    await logAction("ADMIN_LOGIN", undefined, "Успешный вход в систему");
    return { success: true };
  }
  return { error: "Доступ запрещен" };
}

export async function adminLogout() {
  await logAction("ADMIN_LOGOUT");
  (await cookies()).delete("admin_access");
}

export async function getAllLeads() {
  await verifyAdmin();
  return await db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function updateLeadStatus(id: number, status: string, response: string) {
  await verifyAdmin();
  await db.update(leads).set({ status, response, updatedAt: new Date() }).where(eq(leads.id, id));
  await logAction("UPDATE_LEAD", id, `Статус: ${status}`);
  revalidatePath("/admin");
  revalidatePath("/dashboard");
}

export async function deleteLead(id: number) {
  await verifyAdmin();
  await db.delete(leads).where(eq(leads.id, id));
  await logAction("DELETE_LEAD", id);
  revalidatePath("/admin");
}

// --- Client Dashboard Actions ---
export async function loginUser(formData: FormData) {
  const validated = loginSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validated.success) return { error: validated.error.issues[0].message };

  const user = await db.select().from(leads).where(or(eq(leads.email, validated.data.identifier), eq(leads.phone, validated.data.identifier))).limit(1);
  if (!user.length) return { error: "Заявок не найдено" };

  (await cookies()).set("user_identifier", validated.data.identifier, { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: true, sameSite: "lax" });
  return { success: true };
}

export async function logoutUser() {
  (await cookies()).delete("user_identifier");
}

export async function getUserLeads() {
  const identifier = (await cookies()).get("user_identifier")?.value;
  if (!identifier) return null;
  return await db.select().from(leads).where(or(eq(leads.email, identifier), eq(leads.phone, identifier))).orderBy(desc(leads.createdAt));
}

// --- Integration ---
export async function sendTelegramNotification(message: string) {
  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chat } = process.env;
  if (!token || !chat) return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text: message, parse_mode: "HTML" }),
    });
  } catch (e) { console.error("TG Error:", e); }
}
