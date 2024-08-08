import express from "express";
import { authenticationRouter, setStaticFolder } from "./router";

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authenticationRouter);
setStaticFolder(app);

app.listen(SERVER_PORT, () => {
  console.log(process.env);
  console.info(`>>> ${SERVER_PORT}`);
});
