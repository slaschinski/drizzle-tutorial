// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  index,
  integer,
  pgTableCreator,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `drizzle-tutorial_${name}`);

export const categories = pgTable(
  "category",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const posts = pgTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    categoryId: integer("categoryId").references(() => categories.id),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
