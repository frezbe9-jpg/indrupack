import { pgTable, text, serial, timestamp, integer, index } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  message: text("message"),
  length: integer("length"),
  width: integer("width"),
  height: integer("height"),
  quantity: integer("quantity"),
  cardboardGrade: text("cardboard_grade"),
  status: text("status").default("new"),
  response: text("response"),
  quizResults: text("quiz_results"),
  fefcoCode: text("fefco_code"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  phoneIdx: index("phone_idx").on(table.phone),
  emailIdx: index("email_idx").on(table.email),
}));

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  action: text("action").notNull(),
  entityId: integer("entity_id"),
  details: text("details"),
  adminId: text("admin_id"),
  timestamp: timestamp("timestamp").defaultNow(),
});


