
import { Request, Response } from 'express';
import NewsService  from '../services/NewsService';
import  * as HttpStatus from 'http-status';
import Helper from '../infra/helper';


class NewsController {

    async tstApi(request: Request, response: Response) {
        return response.status(200).json({"versao": "0.0.1"});
    };

    async get(request: Request, response: Response) {
        try {
            const news = await NewsService.get();
            Helper.sendResponse(response, HttpStatus.OK, news);
        } catch(err) {
            Helper.sendResponse(response, 400, err);
        }
    };

    async getById(request: Request, response: Response) {
        const { _id } = request.params;
        //console.log(_id);
        try {
            const news = await NewsService.getById(_id);
            Helper.sendResponse(response, HttpStatus.OK, news);
        } catch(err) {
            Helper.sendResponse(response, 400, err);
        }      
    };

    async create(request: Request, response: Response) {
        const news = request.body;

        try {
            await NewsService.create(news);
            Helper.sendResponse(response, HttpStatus.CREATED, 'Criado com sucesso!');
        } catch(err){
            Helper.sendResponse(response, 400, err);
        }
    };

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const news = request.body;

        try {
            await NewsService.update(id, news); 
            Helper.sendResponse(response, HttpStatus.OK, `${news.title} atualizado com sucesso!`);
        } catch(err) {
            Helper.sendResponse(response, 400, err);
        }
    };

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        try {
            await NewsService.delete(id);
            Helper.sendResponse(response, HttpStatus.OK, 'Noticia deletada com sucesso!');
        } catch(err) { Helper.sendResponse(response, 400, err) }
    };

}

export { NewsController };