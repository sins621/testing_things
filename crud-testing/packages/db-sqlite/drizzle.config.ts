import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { DB_FILE_NAME } from "./constants";

export default defineConfig({
	out: "./drizzle",
	schema: "./schema.ts",
	dialect: "sqlite",
	dbCredentials: {
		url: DB_FILE_NAME,
	},
});
