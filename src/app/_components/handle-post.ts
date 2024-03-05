"use server";

import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

// eslint-disable-next-line @typescript-eslint/require-await
export async function handlePost(name: string, categoryId: number) {
  return db.insert(posts).values({ name, categoryId });
}
