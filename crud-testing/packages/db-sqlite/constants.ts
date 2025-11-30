import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const DB_FILE_NAME = `file:${join(__dirname, "local.db")}` as const;
