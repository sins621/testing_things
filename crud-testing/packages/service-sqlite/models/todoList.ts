import { db } from "db-sqlite/db";
import { ServiceFilters, Response } from "types-shared/types";
import { DomainTodoList, PublicTodoList } from "types-sqlite/types";
import { DEFAULT_QUERY_LIMIT } from "../constants";

export async function getDomainTodoLists({
	offset,
	limit = DEFAULT_QUERY_LIMIT,
}: ServiceFilters): Promise<Response<DomainTodoList[]>> {
	if (limit > DEFAULT_QUERY_LIMIT) return ["INVALID_INPUT", null];

	try {
		const query = await db.query.todoList.findMany({
			offset,
			limit,
		});
		return [null, query];
	} catch (error) {
		console.error(error);
		return ["UNEXPECTED_ERROR", null];
	}
}

export async function getPublicTodoLists({
	offset,
	limit = DEFAULT_QUERY_LIMIT,
}: ServiceFilters): Promise<Response<PublicTodoList[]>> {
	if (limit > DEFAULT_QUERY_LIMIT) return ["INVALID_INPUT", null];

	try {
		const query = await db.query.todoList.findMany({
			offset,
			limit,
			columns: {
				id: true,
				createdAt: true,
				title: true,
				userId: true,
			},
		});
		return [null, query];
	} catch (error) {
		console.error(error);
		return ["UNEXPECTED_ERROR", null];
	}
}

export async function getPublicTodoListById(
	id: string,
): Promise<Response<PublicTodoList | undefined>> {
	try {
		const query = await db.query.todoList.findFirst({
			columns: {
				id: true,
				createdAt: true,
				title: true,
				userId: true,
			},
			where: (todoList, { eq }) => eq(todoList.id, id),
		});
		return [null, query];
	} catch (error) {
		console.error(error);
		return ["UNEXPECTED_ERROR", null];
	}
}

export async function getPublicTodoListsByUserId(
	userId: string,
	{ offset, limit = DEFAULT_QUERY_LIMIT }: ServiceFilters = {},
): Promise<Response<PublicTodoList[]>> {
	try {
		const query = await db.query.todoList.findMany({
			offset,
			limit: limit,
			columns: {
				id: true,
				createdAt: true,
				title: true,
				userId: true,
			},
			where: (todoList, { eq }) => eq(todoList.userId, userId),
		});
		return [null, query];
	} catch (error) {
		console.error(error);
		return ["UNEXPECTED_ERROR", null];
	}
}
