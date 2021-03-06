import * as express from "express";
import * as cors from 'cors';
import * as compression from 'compression';
import {graphqlHTTP} from 'express-graphql';
import Auth from './infra/auth';
import uploads  from './infra/uploads';
import newsRouter from './router/newsRouter';
import schemas from './graphql/schemas';
import resolvers from './graphql/resolvers';


const router = express.Router();

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
router.use('/exports', express.static(process.cwd() + '/exports')) //PERMISSAO PARA DOWNLOAD

//GRAPHQL
router.use('/graphql', graphqlHTTP({
  schema: schemas,
  rootValue: resolvers,
  graphiql: true
}));

router.get('/', (request, response) => {
  console.log(process.cwd());
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


const  uriPadrao = '/api/v1';
//console.log(`${uriPadrao}`);

// REALIZA O BLOQUEIO DAS ROTAS
//router.use(Auth.validate); // JWT
router.use(`${uriPadrao}`, newsRouter);

export { router };