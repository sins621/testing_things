import { eq } from "drizzle-orm"
import { db } from "db-sqlite/db";
import { todo, todoList } from "db-sqlite/schema";
import type { Response, ServiceFilters } from "types-shared/types";
import type {
    DomainTodo,
    DomainTodoList,
    InsertTodo,
    InsertTodoList,
    PublicTodo,
    UpdateTodo
} from "types-sqlite/types";
import {
    todoInsertSchema,
    todoListInsertSchema,
    todoUpdateSchema,
} from "validation-zod-sqlite/schema";
import { DEFAULT_QUERY_LIMIT, MAX_QUERY_LIMIT } from "../constants";

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

export async function getPublicTodoById(
	id: string,
): Promise<Response<PublicTodo | undefined>> {
	try {
		const query = await db.query.todo.findFirst({
			columns: {
				id: true,
				createdAt: true,
				title: true,
				description: true,
				todoListId: true,
				isDone: true,
				dueDate: true,
			},
			where: (todo, { eq }) => eq(todo.id, id),
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

export async function addTodo(
  newTodo: InsertTodo
): Promise<Response<DomainTodo>> {
  const { success, data: validTodo } = todoInsertSchema.safeParse(newTodo)

  if (!success) return ["INVALID_INPUT", null];

  try {
    const [query] = await db.insert(todo).values(validTodo).returning()
    return [null, query]
  } catch (error) {
    console.error(error);
    return ["UNEXPECTED_ERROR", null];
  }
}

export async function updateTodoBy(
  updateTodo: UpdateTodo
): Promise<Response<DomainTodo>> {
  const { success, data: validTodo } = todoUpdateSchema.safeParse(updateTodo)

  if (!success) return ["INVALID_INPUT", null];

  try {
    const [query] = await db.update(todo).set(validTodo).where(eq(todo.id, validTodo.id)).returning()
    return [null, query]
  } catch (error) {
    console.error(error);
    return ["UNEXPECTED_ERROR", null];
  }
}

export async function deleteTodoById(id: string): Promise<Response<DomainTodo>> {
  try {
    const [query] = await db.delete(todo).where(eq(todo.id, id)).returning()
    return [null, query]
  } catch (error) {
      console.error(error);
      return ["UNEXPECTED_ERROR", null]
  }
}
