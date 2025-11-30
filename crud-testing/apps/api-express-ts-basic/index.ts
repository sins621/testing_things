import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { getUsers } from "service-sqlite/index";

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
	const [error, users] = await getUsers({
		limit: Number(limit),
		offset: Number(offset),
	});
	if (error) return res.status(500);
	return res.json(
		users.map((user) => ({
			id: user.id,
			name: user.name,
			email: user.email,
			image: user.image,
		})),
	);
});
