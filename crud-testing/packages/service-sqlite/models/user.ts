import { db } from "db-sqlite/db";
import { Response, ServiceFilters } from "types-shared/types";
import { DomainUser, PublicUser } from "types-sqlite/types";
import { DEFAULT_QUERY_LIMIT, MAX_QUERY_LIMIT } from "../constants";

export async function getPublicUsers({
	offset,
	limit = DEFAULT_QUERY_LIMIT,
}: ServiceFilters): Promise<Response<PublicUser[]>> {
	if (limit > MAX_QUERY_LIMIT) return ["INVALID_INPUT", null];

	try {
		const query = await db.query.user.findMany({
			offset,
			limit: limit,
			columns: {
				id: true,
				name: true,
				email: true,
				image: true,
			},
		});
		return [null, query];
	} catch (error) {
		console.error(error);
		return ["UNEXPECTED_ERROR", null];
	}
}

export async function getPublicUserById(
	id: string,
): Promise<Response<PublicUser | undefined>> {
	try {
		const query = await db.query.user.findFirst({
			columns: {
				id: true,
				name: true,
				email: true,
				image: true,
			},
			where: (user, { eq }) => eq(user.id, id),
		});
		return [null, query];
	} catch (error) {
		console.error(error);
		return ["UNEXPECTED_ERROR", null];
	}
}

export async function getDomainUsers({
	offset,
	limit = DEFAULT_QUERY_LIMIT,
}: ServiceFilters): Promise<Response<DomainUser[]>> {
	if (limit > MAX_QUERY_LIMIT) return ["INVALID_INPUT", null];

	try {
		const query = await db.query.user.findMany({
			offset,
			limit: limit,
		});
		return [null, query];
	} catch (error) {
		console.error(error);
		return ["UNEXPECTED_ERROR", null];
	}
}
