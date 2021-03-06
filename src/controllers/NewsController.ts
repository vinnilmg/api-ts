
import { Request, Response } from 'express';
import NewsService from '../services/NewsService';
import * as HttpStatus from 'http-status';
import Helper from '../infra/helper';
import * as redis from 'redis';
import ExportFiles from '../infra/exportFiles';

class NewsController {

    async get(request: Request, response: Response) {

        try {
            let client = redis.createClient(); //6379, 'redis'

            await client.get('news', async function (err, reply) {
                //console.log(reply.length)
                if (reply && reply.length > 0) {
                    console.log('redis');
                    Helper.sendResponse(response, HttpStatus.OK, JSON.parse(reply)); //se já tem, só devolve

                } else {
                    let news = await NewsService.get();
                    console.log('db');
                    client.set('news', JSON.stringify(news)); //cadastra no redis
                    client.expire('news', 5); // atualiza dados a cada tantos segundos
                    Helper.sendResponse(response, HttpStatus.OK, news);
                }
            })

        } catch (err) {
            console.error(err);
            Helper.sendResponse(response, HttpStatus.ERROR, {msg: err});
        }
    };

    async getById(request: Request, response: Response) {
        const { _id } = request.params;
        //console.log(_id);
        try {
            let news = await NewsService.getById(_id);
            Helper.sendResponse(response, HttpStatus.OK, news);
        } catch (err) {
            Helper.sendResponse(response, 400, err);
        }
    };

    async search(request: Request, response: Response) {
        const { term } = request.params;
        
        const page = (request.param('page')) ? parseInt(request.param('page')) : 1;
        const limit = (request.param('limit')) ? parseInt(request.param('limit')) : 10;
        //console.log(page, limit);
        
        try {
            let news = await NewsService.search(term, page, limit);
            Helper.sendResponse(response, HttpStatus.OK, news);
        } catch (err) {
            Helper.sendResponse(response, 400, err);
        }
    };

    async exportToCsv(request: Request, response: Response) {

        try{
            let res = await NewsService.get();
            let filename = ExportFiles.tocsv(res);

            Helper.sendResponse(response, HttpStatus.OK, request.get('host') + '/src/exports/' + filename);

        } catch(err) {console.error(err)};

    }

    async create(request: Request, response: Response) {
        const news = request.body;

        try {
            await NewsService.create(news);
            Helper.sendResponse(response, HttpStatus.CREATED, 'Criado com sucesso!');
        } catch (err) {
            Helper.sendResponse(response, 400, err);
        }
    };

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const news = request.body;

        try {
            await NewsService.update(id, news);
            Helper.sendResponse(response, HttpStatus.OK, `${news.title} atualizado com sucesso!`);
        } catch (err) {
            Helper.sendResponse(response, 400, err);
        }
    };

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        try {
            await NewsService.delete(id);
            Helper.sendResponse(response, HttpStatus.OK, 'Noticia deletada com sucesso!');
        } catch (err) { Helper.sendResponse(response, 400, err) }
    };

}

export { NewsController };