import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import {
	getPublicTodoById,
	getPublicTodoListById,
	getPublicTodoLists,
	getPublicTodoListsByUserId,
	getPublicTodos,
	getPublicUserById,
	getPublicUsers,
} from "service-sqlite/index";

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

v1router.get("/users{/:userId}", async (req, res) => {
	const { userId } = req.params;

	if (userId) {
		const [error, publicUser] = await getPublicUserById(userId);

		if (error === "UNEXPECTED_ERROR") return res.sendStatus(500);
		if (error === "INVALID_INPUT") return res.sendStatus(400);
		if (!publicUser) return res.sendStatus(204);

		return res.json({ user: publicUser });
	}

	const { limit, offset } = req.query;
	const [error, publicUsers] = await getPublicUsers({
		limit: Number(limit),
		offset: Number(offset),
	});
	if (error === "UNEXPECTED_ERROR") return res.sendStatus(500);
	if (error === "INVALID_INPUT") return res.sendStatus(400);
	return res.json({ users: publicUsers });
});

v1router.get("/todolists{/:todoListId}", async (req, res) => {
	const { todoListId } = req.params;

	if (todoListId) {
		const [error, publicTodoList] = await getPublicTodoListById(todoListId);

		if (error === "UNEXPECTED_ERROR") return res.sendStatus(500);
		if (error === "INVALID_INPUT") return res.sendStatus(400);
		if (!publicTodoList) return res.sendStatus(204);

		return res.json({ todoList: publicTodoList });
	}

	const { userId, offset, limit } = req.query;

	if (userId) {
		const [error, publicTodoLists] = await getPublicTodoListsByUserId(
			userId.toString(),
			{ offset: Number(offset), limit: Number(limit) },
		);

		if (error === "UNEXPECTED_ERROR") return res.sendStatus(500);
		if (error === "INVALID_INPUT") return res.sendStatus(400);
		if (!publicTodoLists) return res.sendStatus(204);

		return res.json({ todoLists: publicTodoLists });
	}

	const [error, publicTodoLists] = await getPublicTodoLists({
		limit: Number(limit),
		offset: Number(offset),
	});
	if (error === "UNEXPECTED_ERROR") return res.sendStatus(500);
	if (error === "INVALID_INPUT") return res.sendStatus(400);
	return res.json({ todoLists: publicTodoLists });
});

v1router.get("/todos{/:todoId}", async (req, res) => {
	const { todoId } = req.params;

	if (todoId) {
		const [error, publicTodo] = await getPublicTodoById(todoId);

		if (error === "UNEXPECTED_ERROR") return res.sendStatus(500);
		if (error === "INVALID_INPUT") return res.sendStatus(400);
		if (!publicTodo) return res.sendStatus(204);

		return res.json({ todoList: publicTodo });
	}

	const { limit, offset } = req.query;
	const [error, publicTodos] = await getPublicTodos({
		limit: Number(limit),
		offset: Number(offset),
	});

	if (error === "UNEXPECTED_ERROR") return res.sendStatus(500);
	if (error === "INVALID_INPUT") return res.sendStatus(400);
	return res.json({ todos: publicTodos });
});
