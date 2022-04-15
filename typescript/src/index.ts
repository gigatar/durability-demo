import bodyParser from "body-parser";
import express from "express";
import { userRouter } from "./domains/userDomain/userController";


const app = express();
app.use(bodyParser.json());

app.use("/users", userRouter);
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
