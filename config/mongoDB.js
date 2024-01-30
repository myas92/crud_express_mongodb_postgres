const { MongoClient } = require('mongodb');

class Initializer {
    constructor() { }
    run = async () => {
        const mongoDB = await this.mongoDB()
        return {mongoDB}
        
    }
    mongoDB = async () => {
        const url = 'mongodb://localhost:27017/digimall2';
        const option = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        const client = new MongoClient(url, option);
        await client.connect();
        const db = client.db();
        console.log("Connected to mongoDB")
        return db;
    }
}
module.exports = new Initializer()