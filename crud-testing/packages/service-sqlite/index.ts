import { db } from "db-sqlite/db";
import type { Response, ServiceFilters } from "types-shared/types";
import type {
	DomainTodo,
	DomainUser,
	DomainUserWithTodoList,
} from "types-sqlite/types";

export async function getUsers({
	limit,
	offset,
}: ServiceFilters): Promise<Response<DomainUser[]>> {
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

export async function getTodos({
	limit,
	offset,
}: ServiceFilters): Promise<Response<DomainTodo[]>> {
	try {
		const query = await db.query.todo.findMany({
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

export async function getUsersWithTodos({
	offset,
	limit,
}: ServiceFilters): Promise<Response<DomainUserWithTodoList[]>> {
	try {
		const query = await db.query.user.findMany({
			offset,
			limit,
			with: {
				todoLists: {
					with: {
						todos: true,
					},
				},
			},
		});
		if (!query) return ["NOT_FOUND", null];
		return [null, query];
	} catch (error) {
		console.log(error);
		return ["UNEXPECTED_ERROR", null];
	}
}
