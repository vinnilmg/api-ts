import { Router } from "express";
import { NewsController } from "../controllers/NewsController";

const newsRouter = Router();

const newsController = new NewsController();

newsRouter.get(`/news`, newsController.get);
newsRouter.get(`/news/:_id`, newsController.getById);
newsRouter.get('/news/search/:term', newsController.search);
newsRouter.post(`/news/`, newsController.create);
newsRouter.put(`/news/:id`, newsController.update);
newsRouter.delete(`/news/:id`, newsController.delete);

export default newsRouter;