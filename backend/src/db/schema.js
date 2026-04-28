import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { numeric } from 'drizzle-orm/sqlite-core';


export const favoritesTable = pgTable("favorites", {
    id: serial("id").primaryKey(),
    userID: text("user_id").notNull(),
    recipeId: integer("recipe_id").notNull(),
    title: text("title").notNull(),
    image: text("image"),
    cookTime: text("cook_time"),
    servings: text("servings"),
    createdAt: timestamp("created_at").defaultNow(),
})