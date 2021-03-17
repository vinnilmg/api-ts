import * as mongoose from 'mongoose';

class Database {
    //private DB_URL = 'mongodb://link-db/db_portal'
    private DB_URL = 'mongodb://localhost:27017/db_portal' //localhost:27017

    createConnection() {
        mongoose.connect(this.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:true});
    }
}

export { Database };