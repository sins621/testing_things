import type { z } from "zod";
import type {
	todoListDomainSchema,
	todoListInsertSchema,
	todoListPublicSchema,
	todoListUpdateSchema,
	userDomainSchema,
	userInsertSchema,
	userPublicSchema,
	userUpdateSchema,
} from "zod-validation/schema";

export type DomainUser = z.infer<typeof userDomainSchema>;
export type PublicUser = z.infer<typeof userPublicSchema>;
export type UpdateUser = z.infer<typeof userUpdateSchema>;
export type InsertUser = z.infer<typeof userInsertSchema>;

export type DomainTodoList = z.infer<typeof todoListDomainSchema>;
export type PublicTodoList = z.infer<typeof todoListPublicSchema>;
export type UpdateTodoList = z.infer<typeof todoListUpdateSchema>;
export type InsertTodoList = z.infer<typeof todoListInsertSchema>;
