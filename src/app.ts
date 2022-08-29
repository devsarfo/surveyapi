import express from "express";
import config from "./configs/app.config";
import log from "./middlewares/logging.middleware";
import routes from "./routes/index.route";

const port = config.port as number;
const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  log.info(`Survey API Server is running on port ${port}`);

  routes(app);
});