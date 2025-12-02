import { db } from "db-sqlite/db";
import { todo, todoList } from "db-sqlite/schema";
import type { Response, ServiceFilters } from "types-shared/types";
import type {
	DomainTodo,
	DomainTodoList,
	DomainUser,
	InsertTodo,
	InsertTodoList,
	PublicTodo,
	PublicTodoList,
	PublicUser,
} from "types-sqlite/types";
import {
	todoInsertSchema,
	todoListInsertSchema,
} from "validation-zod-sqlite/schema";
import { DEFAULT_QUERY_LIMIT, MAX_QUERY_LIMIT } from "./constants";

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

export async function getPublicUserByUserId(
	userId: string,
): Promise<Response<PublicUser | undefined>> {
	try {
		const query = await db.query.user.findFirst({
			columns: {
				id: true,
				name: true,
				email: true,
				image: true,
			},
			where: (user, { eq }) => eq(user.id, userId),
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

export async function getPublicTodos({
	offset,
	limit = DEFAULT_QUERY_LIMIT,
}: ServiceFilters): Promise<Response<PublicTodo[]>> {
	if (limit > MAX_QUERY_LIMIT) return ["INVALID_INPUT", null];

	try {
		const query = await db.query.todo.findMany({
			offset,
			limit: limit,
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

export async function getDomainTodos({
	offset,
	limit = DEFAULT_QUERY_LIMIT,
}: ServiceFilters): Promise<Response<DomainTodo[]>> {
	if (limit > MAX_QUERY_LIMIT) return ["INVALID_INPUT", null];

	try {
		const query = await db.query.todo.findMany({
			offset,
			limit: limit,
		});
		return [null, query];
	} catch (error) {
		console.error(error);
		return ["UNEXPECTED_ERROR", null];
	}
}

export async function addTodoLists(
	todoLists: InsertTodoList[],
): Promise<Response<DomainTodoList[]>> {
	const { success, data: validTodoLists } = todoListInsertSchema
		.array()
		.safeParse(todoLists);

	if (!success) return ["INVALID_INPUT", null];

	try {
		const query = await db.insert(todoList).values(validTodoLists).returning();
		return [null, query];
	} catch (error) {
		console.error(error);
		return ["UNEXPECTED_ERROR", null];
	}
}

export async function addTodos(
	todos: InsertTodo[],
): Promise<Response<DomainTodo[]>> {
	const { success, data: validTodos } = todoInsertSchema
		.array()
		.safeParse(todos);

	if (!success) return ["INVALID_INPUT", null];

	try {
		const query = await db.insert(todo).values(validTodos).returning();
		return [null, query];
	} catch (error) {
		console.error(error);
		return ["UNEXPECTED_ERROR", null];
	}
}
