import { db } from "db-sqlite/db";
import type { DomainUser, Response } from "types-sqlite/types";

export async function getUsers(): Promise<Response<DomainUser[]>> {
	const query = await db.query.user.findMany({});
	if (!query) return ["NOT_FOUND", null];

	return [null, query];
}
