import bodyParser from 'body-parser';
import compression from "compression";
import cors from "cors";
import express from "express";
import fs from 'fs';
import { createServer } from "http";
import path from 'path';
import router from './routes/router';
import { connectRedis } from './services/redis/redis.service';
import { initializeSocket } from "./services/socket/socket.service";

require('dotenv').config();

const app = express();
const server = createServer(app);
app.use(cors());
app.use(compression());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(router);

initializeSocket(server);
connectRedis();
const port: number = 3000;
server.listen(port, async () => {
    console.log(`Example app listening at http://127.0.0.1:${port}`);
});
export const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
