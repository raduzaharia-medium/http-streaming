import express from "express";
import { router } from "./server-routes.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use("/api", router);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
