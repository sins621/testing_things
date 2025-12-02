import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import {
	getPublicTodos,
	getPublicUserByUserId,
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

v1router.get("/users/:userId", async (req, res) => {
	const { userId } = req.params;

	if (userId) {
		const [error, publicUser] = await getPublicUserByUserId(userId);

		if (error === "UNEXPECTED_ERROR") return res.sendStatus(500);
		if (error === "INVALID_INPUT") return res.sendStatus(400);
		if (!publicUser) return res.sendStatus(204);

		return res.json({user: publicUser})
	}

	const { limit, offset } = req.query;
	const [error, publicUsers] = await getPublicUsers({
		limit: Number(limit),
		offset: Number(offset),
	});
	if (error) return res.status(500);
	return res.json({ users: publicUsers });
});

v1router.get("/todos", async (req, res) => {
	const { limit, offset } = req.query;
	const [error, publicTodos] = await getPublicTodos({
		limit: Number(limit),
		offset: Number(offset),
	});
	if (error) return res.status(500);
	return res.json({ todos: publicTodos });
});
