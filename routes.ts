import { Router } from "express";
import { TestController } from "./controllers/TestController";
import * as express from 'express';

const app = express();
const router = Router();

const testController = new TestController();

router.get('/', testController.execute)

app.use(router);

export { app };