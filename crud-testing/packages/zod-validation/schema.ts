import { user } from "db-sqlite/schema";
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
	image: z.url(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const userPublicSchema = createSelectSchema(user, {
	name: z.string(),
	email: z.string(),
	image: z.url(),
}).omit({
	id: true,
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
	name: z.string().optional(),
	email: z.string().optional(),
	emailVerified: z.boolean().optional(),
	image: z.url().optional(),
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});
