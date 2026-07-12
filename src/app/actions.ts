"use strict";
"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, or, desc } from "drizzle-orm";
import { cookies } from "next/headers";
import { leadSchema, loginSchema, adminLoginSchema } from "@/lib/validations";

export async function submitLead(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = leadSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const data = validated.data;

  try {
    await db.insert(leads).values({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      message: data.message || null,
      length: data.length,
      width: data.width,
      height: data.height,
      quantity: data.quantity,
      cardboardGrade: data.cardboardGrade || null,
      quizResults: data.quizResults || null,
      fefcoCode: data.fefcoCode || null,
    });

    const tgMessage = `🚀 <b>Новая заявка!</b>\n\n👤 Имя: ${data.name}\n📞 Тел: ${data.phone}\n📦 Тираж: ${data.quantity} шт.\n📐 Размеры: ${data.length}x${data.width}x${data.height} мм\n📄 Марка: ${data.cardboardGrade || 'не указана'}\n💬 Сообщение: ${data.message || "-"}`;
    sendTelegramNotification(tgMessage).catch(console.error);

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/admin");
    return { success: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время." };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { error: "Серверная ошибка. Пожалуйста, попробуйте позже." };
  }
}

export async function loginUser(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = loginSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { identifier } = validated.data;

  const existingLeads = await db.select().from(leads).where(
    or(
      eq(leads.email, identifier),
      eq(leads.phone, identifier)
    )
  ).limit(1);

  if (existingLeads.length === 0) {
    return { error: "Заявок с такими данными не найдено" };
  }

  const cookieStore = await cookies();
  cookieStore.set("user_identifier", identifier, { 
    path: "/", 
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  return { success: true };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("user_identifier");
  revalidatePath("/");
}

export async function getUserLeads() {
  const cookieStore = await cookies();
  const identifier = cookieStore.get("user_identifier")?.value;

  if (!identifier) return null;

  return await db.select().from(leads).where(
    or(
      eq(leads.email, identifier),
      eq(leads.phone, identifier)
    )
  ).orderBy(desc(leads.createdAt));
}

export async function getAllLeads() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_access")?.value === process.env.ADMIN_SECRET;
  
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  return await db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function adminLogin(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = adminLoginSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { secret } = validated.data;
  
  if (secret === process.env.ADMIN_SECRET) {
    const cookieStore = await cookies();
    cookieStore.set("admin_access", secret, { 
      path: "/", 
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      secure: true, // Always true for security
      sameSite: "strict"
    });
    return { success: true };
  }
  
  return { error: "Неверный код доступа" };
}

export async function updateLeadStatus(id: number, status: string, response: string) {
  await db.update(leads)
    .set({ 
      status, 
      response,
      updatedAt: new Date()
    })
    .where(eq(leads.id, id));
  revalidatePath("/admin");
  revalidatePath("/dashboard");
}

export async function deleteLead(id: number) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_access")?.value === process.env.ADMIN_SECRET;
  
  if (!isAdmin && process.env.NODE_ENV === "production") {
    throw new Error("Unauthorized");
  }

  await db.delete(leads).where(eq(leads.id, id));
  revalidatePath("/admin");
  revalidatePath("/dashboard");
}


export async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
    });
  } catch (error) {
    console.error("Telegram notification error:", error);
  }
}
