import type {
    todoDomainSchema,
    todoInsertSchema,
    todoListDomainSchema,
    todoListInsertSchema,
    todoListPublicSchema,
    todoListUpdateSchema,
    todoPublicSchema,
    todoUpdateSchema,
    userDomainSchema,
    userInsertSchema,
    userPublicSchema,
    userUpdateSchema,
} from "validation-zod-sqlite/schema";
import type { z } from "zod";

export type DomainUser = z.infer<typeof userDomainSchema>;
export type PublicUser = z.infer<typeof userPublicSchema>;
export type UpdateUser = z.infer<typeof userUpdateSchema>;
export type InsertUser = z.infer<typeof userInsertSchema>;

export type DomainTodo = z.infer<typeof todoDomainSchema>;
export type PublicTodo = z.infer<typeof todoPublicSchema>;
export type InsertTodo = z.infer<typeof todoInsertSchema>;
export type UpdateTodo = z.infer<typeof todoUpdateSchema>;

export type DomainTodoList = z.infer<typeof todoListDomainSchema>;
export type PublicTodoList = z.infer<typeof todoListPublicSchema>;
export type UpdateTodoList = z.infer<typeof todoListUpdateSchema>;
export type InsertTodoList = z.infer<typeof todoListInsertSchema>;

export type DomainUserWithTodoList = DomainUser & {
	todoLists: Array<DomainTodoList & { todos: DomainTodo[] }>;
};
export type PublicUserWithTodoList = PublicUser & {
	todoLists: Array<PublicTodoList & { todos: PublicTodo[] }>;
};
