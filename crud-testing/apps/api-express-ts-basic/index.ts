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

const v1Router = express.Router();

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
	console.log("Express Listenning on Port: ", PORT);
});

v1Router.get("/", (_req, res) => {
  res.send("Hello World");
});
