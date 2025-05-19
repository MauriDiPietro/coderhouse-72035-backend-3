import express from 'express';
import { initMongoDB } from './database.js'
import dotenv from "dotenv";

const ENV = process.argv[2];

dotenv.config({
  path:
    ENV === "prod"
      ? "./.env.prod"
      : ENV === "qas"
      ? "./.env.qas"
      : "./.env.dev",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT

initMongoDB().then(()=>console.log('conectado a la db')).catch((error)=>console.log(error))

app.listen(PORT, ()=>{
    console.log(`🚀 Server listening on port ${PORT} in ${process.argv[2]} mode`);
});



