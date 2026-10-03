import { sqliteTable, text, integer, primaryKey, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
export const lessonProgress=sqliteTable("lesson_progress",{
 userId:text("user_id").notNull(),lesson:integer("lesson").notNull(),bestScore:integer("best_score").notNull(),
 attempts:integer("attempts").notNull().default(1),updatedAt:integer("updated_at").notNull()
},table=>[primaryKey({columns:[table.userId,table.lesson]}),check("valid_lesson",sql`${table.lesson} >= 0`),check("valid_score",sql`${table.bestScore} BETWEEN 0 AND 3`)]);
export const requestLimits=sqliteTable("request_limits",{
 userId:text("user_id").notNull(),bucket:integer("bucket").notNull(),requests:integer("requests").notNull().default(0)
},table=>[primaryKey({columns:[table.userId,table.bucket]})]);

export const accounts=sqliteTable("accounts",{id:text("id").primaryKey(),email:text("email").notNull().unique(),passwordHash:text("password_hash").notNull(),createdAt:integer("created_at").notNull()});
export const accountSessions=sqliteTable("account_sessions",{tokenHash:text("token_hash").primaryKey(),userId:text("user_id").notNull().references(()=>accounts.id,{onDelete:"cascade"}),expiresAt:integer("expires_at").notNull()});
export const authLimits=sqliteTable("auth_limits",{key:text("key").notNull(),bucket:integer("bucket").notNull(),attempts:integer("attempts").notNull()},t=>[primaryKey({columns:[t.key,t.bucket]})]);
