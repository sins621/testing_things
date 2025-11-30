import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { DB_FILE_NAME } from "./constants";
import * as schema from "./schema";

export const db = drizzle(DB_FILE_NAME, { schema });
