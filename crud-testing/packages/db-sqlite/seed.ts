import { drizzle } from "drizzle-orm/libsql";
import { reset, seed } from "drizzle-seed";
import { DB_FILE_NAME } from "./constants";
import * as schema from "./schema";

async function main() {
	const db = drizzle(DB_FILE_NAME);
	await reset(db, schema);
	await seed(db, schema, { count: 100 }).refine((f) => ({
	  user: {
			columns: {
			  id: f.uuid(),
			  image: f.default({defaultValue: 'https://avatar.iran.liara.run/public'}),
			}
		},
		todoList: {
		  columns: {
  		  id: f.uuid(),
				title: f.loremIpsum({sentencesCount: 1})
			}
		},
		todo: {
		  columns: {
				id: f.uuid(),
				title: f.loremIpsum({sentencesCount: 1}),
				description: f.loremIpsum({sentencesCount: 3})
			}
		},
	}));
}

main();
