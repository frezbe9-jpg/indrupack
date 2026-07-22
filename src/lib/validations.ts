import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое").max(100),
  phone: z.string().min(10, "Неверный формат телефона"),
  email: z.string().email("Некорректный Email").optional().or(z.literal("")),
  message: z.string().max(1000).optional(),
  length: z.coerce.number().min(0),
  width: z.coerce.number().min(0),
  height: z.coerce.number().min(0),
  quantity: z.coerce.number().min(1),
  cardboardGrade: z.string().optional(),
  quizResults: z.string().optional(),
  fefcoCode: z.string().optional(),
});

export const loginSchema = z.object({
  identifier: z.string().min(3, "Введите корректные данные"),
});

export const adminLoginSchema = z.object({
  secret: z.string().min(1, "Код обязателен"),
});
