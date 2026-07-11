import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  message: text("message"),
  squareMeters: integer("square_meters"),
  status: text("status").default("new"),
  response: text("response"),
  quizResults: text("quiz_results"),
  fefcoCode: text("fefco_code"),
  createdAt: timestamp("created_at").defaultNow(),
});
