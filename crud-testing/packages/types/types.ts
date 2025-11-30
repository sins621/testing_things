import type { z } from "zod";
import type {
	userDomainSchema,
	userInsertSchema,
	userPublicSchema,
	userUpdateSchema,
} from "zod-validation/schema";

export type DomainUser = z.infer<typeof userDomainSchema>;
export type PublicUser = z.infer<typeof userPublicSchema>;
export type UpdateUser = z.infer<typeof userUpdateSchema>;
export type InsertUser = z.infer<typeof userInsertSchema>;
