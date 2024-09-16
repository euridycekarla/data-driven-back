import fastify from "fastify";
import { fastifyCors } from '@fastify/cors'
import { Db, MongoClient } from "mongodb";
import { config } from "dotenv";
import { GetBiddings } from "./routes/get-biddings";

const app = fastify();
app.register(fastifyCors, {
    origin: '*',
})

const dbName = 'db_licitacao';
export let db: Db;

config();
const MONGODB_URI = process.env.MONGODB_URI as string;
console.log(MONGODB_URI)
MongoClient.connect(MONGODB_URI)
    .then(client => {
        db = client.db(dbName);
        console.log(dbName);
    })
    .catch(error => {
        console.log(`Error: ${error}`);
    });

app.register(GetBiddings);


app.listen({ port: 3333 }).then(() => {
    console.log("Server Running...");
});