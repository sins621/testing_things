import { db } from "db-sqlite/db";
import type { Response, ServiceFilters } from "types-shared/types";
import type {
	PublicTodo,
	PublicUser,
	PublicUserWithTodoList,
} from "types-sqlite/types";

export async function getPublicUsers({
	limit,
	offset,
}: ServiceFilters): Promise<Response<PublicUser[]>> {
	try {
		const query = await db.query.user.findMany({
			offset,
			limit: limit || 100,
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

export async function getPublicTodos({
	limit,
	offset,
}: ServiceFilters): Promise<Response<PublicTodo[]>> {
	try {
		const query = await db.query.todo.findMany({
			offset,
			limit: limit || 100,
			columns: {
				id: true,
				todoListId: true,
				createdAt: true,
				title: true,
				description: true,
				isDone: true,
				dueDate: true,
			},
		});
		return [null, query];
	} catch (error) {
		console.error(error);
		return ["UNEXPECTED_ERROR", null];
	}
}

export async function getPublicUsersWithTodoLists({
	offset,
	limit,
}: ServiceFilters): Promise<Response<PublicUserWithTodoList[]>> {
	try {
		const query = await db.query.user.findMany({
			offset,
			limit: limit || 100,
			columns: {
				id: true,
				name: true,
				email: true,
				image: true,
			},
			with: {
				todoLists: {
					columns: {
						id: true,
						createdAt: true,
						userId: true,
						title: true,
					},
				},
			},
		});
		return [null, query];
	} catch (error) {
		console.log(error);
		return ["UNEXPECTED_ERROR", null];
	}
}
