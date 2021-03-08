import { Router } from "express";
import { NewsController } from "./controllers/NewsController";

const router = Router();

const newsController = new NewsController();

const  uriPadrao = '/api/v1/news';
//console.log(`${uriPadrao}`);

router.get('/', newsController.tstApi);
router.get(`${uriPadrao}`, newsController.get);
router.get(`${uriPadrao}/:_id`, newsController.getById);
router.post(`${uriPadrao}/`, newsController.create);
router.put(`${uriPadrao}/:id`, newsController.update);
router.delete(`${uriPadrao}/:id`, newsController.delete);

export { router };