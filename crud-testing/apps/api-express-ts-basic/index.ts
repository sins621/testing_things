import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
const PORT = 8000 as const;

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
	res.send("Hello World");
});

app.listen(PORT, () => {
	console.log("Express Listenning on Port: ", PORT);
});
