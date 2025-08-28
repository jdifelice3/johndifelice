import express, { Request, Response } from 'express';
import { Works } from './data/works.js'
import { Work, WorkInput } from '@johndifelice/types';

import cors from 'cors';

// type ReqBody<T> = Request<{}, any, T>;
// type ResJson<T> = Response<T>;

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/api/works', async(_req:Request<{}, Work[], WorkInput,{}>, res:Response<Work[]>) => {
    console.log('Works', Works);
    res.send(Works);
});

app.get('/', async(_req:any, res:any) => {
    res.send({'message': 'Hello'});
});

// app.post('/api/works', (_req: any, res: any) => {
//     const {request: Work} = _req;
// });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});