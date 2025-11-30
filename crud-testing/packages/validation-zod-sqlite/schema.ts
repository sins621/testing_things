import { todo, todoList, user } from "db-sqlite/schema";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

export const userDomainSchema = createSelectSchema(user, {
	id: z.string(),
	name: z.string(),
	email: z.string(),
	emailVerified: z.boolean(),
	image: z.url().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const userPublicSchema = createSelectSchema(user, {
	id: z.string(),
	name: z.string(),
	email: z.string(),
	image: z.url(),
}).omit({
	emailVerified: true,
	createdAt: true,
	updatedAt: true,
});

export const userInsertSchema = createInsertSchema(user, {
	name: z.string(),
	email: z.string(),
	emailVerified: z.boolean(),
	image: z.url(),
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const userUpdateSchema = createUpdateSchema(user, {
	id: z.string(),
	name: z.string().optional(),
	email: z.string().optional(),
	emailVerified: z.boolean().optional(),
	image: z.url().optional(),
}).omit({
	createdAt: true,
	updatedAt: true,
});

export const todoListDomainSchema = createSelectSchema(todoList, {
	id: z.string(),
	title: z.string(),
	userId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	deletedAt: z.date(),
});

export const todoListPublicSchema = createSelectSchema(todoList, {
	id: z.string(),
	title: z.string(),
	userId: z.string(),
	createdAt: z.string(),
}).omit({
	updatedAt: true,
	deletedAt: true,
});

export const todoListInsertSchema = createInsertSchema(todoList, {
	title: z.string(),
	userId: z.string(),
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
});

export const todoListUpdateSchema = createUpdateSchema(todoList, {
	id: z.string(),
	title: z.string().optional(),
	userId: z.string().optional(),
	deletedAt: z.date().optional(),
}).omit({
	createdAt: true,
	updatedAt: true,
});

export const todoDomainSchema = createSelectSchema(todo, {
	id: z.string(),
	todoListId: z.string(),
	title: z.string(),
	isDone: z.boolean(),
	dueDate: z.date(),
	createdAt: z.date(),
	updatedAt: z.date(),
	deletedAt: z.date(),
});

export const todoPublicSchema = createSelectSchema(todo, {
	id: z.string(),
	todoListId: z.string(),
	title: z.string(),
	isDone: z.boolean(),
	dueDate: z.date().optional(),
	createdAt: z.date(),
}).omit({
	updatedAt: true,
	deletedAt: true,
});

export const todoInsertSchema = createInsertSchema(todo, {
	todoListId: z.string(),
	title: z.string(),
	isDone: z.boolean().optional(),
	dueDate: z.date().optional(),
}).omit({
	id: true,
	updatedAt: true,
	createdAt: true,
	deletedAt: true,
});

export const todoUpdateSchema = createUpdateSchema(todo, {
	id: z.string(),
	todoListId: z.string().optional(),
	title: z.string().optional(),
	isDone: z.boolean().optional(),
	dueDate: z.date().optional(),
	deletedAt: z.date().optional(),
}).omit({
	updatedAt: true,
});
