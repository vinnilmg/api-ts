import { Router } from "express";
import * as cors from 'cors';
import { NewsController } from "./controllers/NewsController";
import Auth from './infra/auth';
import { uploads } from './infra/uploads';

const router = Router();

const newsController = new NewsController();

const  uriPadrao = '/api/v1/news';
//console.log(`${uriPadrao}`);

const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
  };

router.use(cors(options)); // CORS

router.get('/', newsController.tstApi);

//uploads
router.post('/uploads', uploads.single('file'), (request, response) => {
  try{
    response.send({msg: "arquivo enviado com sucesso"});
  } catch(err) {
    console.log(err);
  }
});

// REALIZA O BLOQUEIO DAS ROTAS
router.use(Auth.validate); // JWT

router.get(`${uriPadrao}`, newsController.get);
router.get(`${uriPadrao}/:_id`, newsController.getById);
router.post(`${uriPadrao}/`, newsController.create);
router.put(`${uriPadrao}/:id`, newsController.update);
router.delete(`${uriPadrao}/:id`, newsController.delete);

export { router };