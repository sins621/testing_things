import { drizzle } from "drizzle-orm/libsql";
import { reset, seed } from "drizzle-seed";
import { DB_FILE_NAME } from "./constants";
import * as schema from "./schema";

async function main() {
	const db = drizzle(DB_FILE_NAME);
	await reset(db, schema);
	await seed(db, schema, { count: 100 });
}

main();
