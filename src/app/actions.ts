"use strict";
"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, and, or } from "drizzle-orm";
import { cookies } from "next/headers";

export async function submitLead(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const squareMeters = parseInt(formData.get("squareMeters") as string) || 0;
  const quizResults = formData.get("quizResults") as string;
  const fefcoCode = formData.get("fefcoCode") as string;

  if (!name || !phone) {
    return { error: "Имя и телефон обязательны для заполнения" };
  }

  try {
    const [inserted] = await db.insert(leads).values({
      name,
      phone,
      email,
      message,
      squareMeters,
      quizResults,
      fefcoCode,
    }).returning();

    // Trigger Telegram (async, don't block response)
    const tgMessage = `🚀 <b>Новая заявка!</b>\n\n👤 Имя: ${name}\n📞 Тел: ${phone}\n📧 Email: ${email || "не указан"}\n📦 Объем: ${squareMeters} кв. м\n💬 Сообщение: ${message || "-"}`;
    sendTelegramNotification(tgMessage).catch(console.error);

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/admin");
    return { success: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время." };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { error: "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже." };
  }
}

export async function loginUser(formData: FormData) {
  const identifier = formData.get("identifier") as string; // email or phone

  if (!identifier) {
    return { error: "Введите Email или Телефон" };
  }

  // Check if any lead exists with this identifier
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
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
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
  ).orderBy(leads.createdAt);
}

export async function getAllLeads() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_access")?.value === process.env.ADMIN_SECRET;
  
  if (!isAdmin && process.env.NODE_ENV === "production") {
    throw new Error("Unauthorized");
  }

  return await db.select().from(leads).orderBy(leads.createdAt);
}

export async function adminLogin(formData: FormData) {
  const secret = formData.get("secret") as string;
  
  if (secret === process.env.ADMIN_SECRET) {
    const cookieStore = await cookies();
    cookieStore.set("admin_access", secret, { 
      path: "/", 
      maxAge: 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    });
    return { success: true };
  }
  
  return { error: "Неверный код доступа" };
}


export async function updateLeadStatus(id: number, status: string, response: string) {
  await db.update(leads)
    .set({ status, response })
    .where(eq(leads.id, id));
  revalidatePath("/admin");
  revalidatePath("/dashboard");
}

export async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram credentials not found, skipping notification");
    return;
  }

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


