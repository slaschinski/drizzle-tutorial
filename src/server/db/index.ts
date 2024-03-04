import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "~/env.mjs";
import * as schema from "./schema";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
export const db = drizzle(neon(env.DATABASE_URL), { schema });
