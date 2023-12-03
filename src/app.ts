import express from 'express';
import bodyParser from 'body-parser';
import { logger, verifyJwt } from './tools';
import exerciseRoute from './routes/exercise.route';
const app = express();

import cors from 'cors';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/download/:path', async(req, res) => {

    const {payload}:any = await verifyJwt(req.params.path);

    const path = "assets" + payload.path.slice(1)

    res.download(path);
});

app.use('/api/exercise', exerciseRoute);
app.use((err: any, req: any, res: any, next: any) => {
    logger("Error en la aplicacion", err)
    console.log("Error en la aplicacion", err)
    res.status(500).json({ message: "Error", err });
});
export default app;
