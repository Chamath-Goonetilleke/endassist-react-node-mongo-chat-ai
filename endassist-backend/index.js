import express from "express";
import dotenv from 'dotenv';
import db from './startups/db.js';
import routes from './startups/routes.js';

dotenv.config()

const app = express();

db();
routes(app);

const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log("server listening on port: " + port);
})