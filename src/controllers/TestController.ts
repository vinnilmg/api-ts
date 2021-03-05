import { Request, Response } from "express";


class TestController {

    async execute(request: Request, response: Response) {

        return response.status(200).json({ versao: "0.0.1" });

    }
}

export { TestController }; 