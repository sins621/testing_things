import { db } from "db-sqlite/db";
import type { DomainUser, Response } from "types-sqlite/types";

export async function getUsers({
	limit,
	offset,
}: {
	limit?: number;
	offset?: number;
}): Promise<Response<DomainUser[]>> {
	try {
		const query = await db.query.user.findMany({
			offset,
			limit,
		});
		if (!query) return ["NOT_FOUND", null];
		return [null, query];
	} catch (error) {
		console.error(error);
		return ["UNEXPECTED_ERROR", null];
	}
}
