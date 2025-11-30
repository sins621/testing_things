import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { getTodos, getUsers, getUsersWithTodos } from "service-sqlite/index";
import type {
	PublicTodo,
	PublicUser,
	PublicUserWithTodoList,
} from "types-sqlite/types";

const app = express();
const port = 8000 as const;

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

const v1router = express.Router();

app.use("/api/v1", v1router);

app.listen(port, () => {
	console.log("express listening on port: ", port);
});

v1router.get("/", (_req, res) => {
	res.send("hello world");
});

v1router.get("/users", async (req, res) => {
	const { limit, offset } = req.query;
	const [error, domainUsers] = await getUsers({
		limit: Number(limit),
		offset: Number(offset),
	});
	if (error) return res.status(500);
	return res.json(
		domainUsers.map(
			({
				emailVerified: _emailVerified,
				createdAt: _createdAt,
				updatedAt: _updatedAt,
				...publicUser
			}): PublicUser => publicUser,
		),
	);
});

v1router.get("/todos", async (req, res) => {
	const { limit, offset } = req.query;
	const [error, domainTodos] = await getTodos({
		limit: Number(limit),
		offset: Number(offset),
	});
	if (error) return res.status(500);
	return res.json(
		domainTodos.map(
			({
				deletedAt: _deletedAt,
				updatedAt: _updatedAt,
				...publicTodo
			}): PublicTodo => publicTodo,
		),
	);
});

v1router.get("/users/todos", async (req, res) => {
	const { limit, offset } = req.query;
	const [error, domainUsersWithTodos] = await getUsersWithTodos({
		limit: Number(limit),
		offset: Number(offset),
	});
	if (error) return res.status(500);

	const publicUsersWithTodos: PublicUserWithTodoList[] =
		domainUsersWithTodos.map((domainUserWithTodos) => {
			const publicTodoLists = domainUserWithTodos.todoLists.map(
				(domainTodoList) => {
					const publicTodos: PublicTodo[] = domainTodoList.todos.map(
						({ deletedAt: _deletedAt, updatedAt: _updatedAt, ...publicTodo }) =>
							publicTodo,
					);

					const {
						updatedAt: _updatedAt,
						deletedAt: _deletedAt,
						...publicTodoList
					} = domainTodoList;

					return {
						...publicTodoList,
						todos: publicTodos,
					};
				},
			);

			const {
				emailVerified: _emailVerified,
				createdAt: _createdAt,
				updatedAt: _updatedAt,
				...publicUserWithTodos
			} = domainUserWithTodos;

			return {
				...publicUserWithTodos,
				todoLists: publicTodoLists,
			};
		});

	return res.json(publicUsersWithTodos);
});
