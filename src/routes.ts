import { Router } from "express";
import * as cors from 'cors';
import * as compression from 'compression';
import Auth from './infra/auth';
import { uploads } from './infra/uploads';
import newsRouter from './router/newsRouter';

const router = Router();

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
router.use(compression()); // COMPRESSAO DOS DADOS

router.get('/', (request, response) => {
  return response.status(200).json({"versao": "0.0.1"});
});

//uploads
router.post('/uploads', uploads.single('file'), (request, response) => {
  try{
    return response.status(200).json({msg: "arquivo enviado com sucesso"});
  } catch(err) {
    console.log(err);
  }
});

const  uriPadrao = '/api/v1/news';
//console.log(`${uriPadrao}`);

// REALIZA O BLOQUEIO DAS ROTAS
//router.use(Auth.validate); // JWT
router.use(`${uriPadrao}`, newsRouter);

export { router };