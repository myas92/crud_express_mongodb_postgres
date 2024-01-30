const { MongoClient } = require('mongodb');
const { Pool } = require("pg");

class Initializer {
    constructor() { }
    run = async () => {
        const mongoDB = await this.mongoDB()
        const postgres = await this.postgres()
        return { mongoDB, postgres }

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

    postgres = () => {
        const pool = new Pool({
            user: process.env.POSTGRES_USER || 'postgres',
            database: process.env.POSTGRES_DATABASE || "parti",
            password: process.env.POSTGRES_PASSWORD || "Arzansara123",
            port: process.env.POSTGRES_PORT || 5432,
            host: process.env.POSTGRES_HOST || "127.0.0.1",
        });

        return pool;
    }
}
module.exports = new Initializer()