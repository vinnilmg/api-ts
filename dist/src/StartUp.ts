import * as express from 'express';
import { Database } from './infra/database';
import { router } from './routes';


class StartUp {
    public app: express.Application;
    private db: Database;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(router);
        this.db = new Database();
        this.db.createConnection();
    }
}

export default new StartUp;
