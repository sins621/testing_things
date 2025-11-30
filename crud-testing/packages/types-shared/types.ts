export const ERROR_MESSAGES = [
	"NOT_FOUND",
	"UNAUTHORIZED",
	"INVALID_INPUT",
	"UNEXPECTED_ERROR",
] as const;

export type ErrorMessage = (typeof ERROR_MESSAGES)[number];

export type Response<T> = [null, T] | [ErrorMessage, null];

export type ServiceFilters = {
	limit: number;
	offset: number;
};
