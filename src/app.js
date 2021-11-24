import express from "express";
import cors from "cors";
import * as userController from "./controllers/userController.js";
import * as financialEventsController from "./controllers/financialEventsController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.post("/financial-events", financialEventsController.createFinancialEvent);

app.get("/financial-events", financialEventsController.getFinancialEvents);

app.get("/financial-events/sum", financialEventsController.getFinancialEventsSum);

export default app;
