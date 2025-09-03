import express, { Request, Response } from 'express';
import { Works } from './data/works.js'
//import { Work, WorkInput, Form } from '@johndifelice/types';
import { Work, WorkInput, WorkSchema } from './types.js';
import pdfRouter from './routes/pdf.js'
import cors from 'cors';
import { z } from "zod";
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: false }));
app.use(express.json());
app.use('/api', pdfRouter);

const PORT = 3000;

app.get('/api/works', async(_req:Request<{}, Work[], WorkInput,{}>, res:Response<Work[]>) => {
    res.send(Works);
});
//console.log('WorkSchema shape:', WorkSchema.keyof().options);

app.get('/api/works/:form', async(_req:Request<{form: string}, Work[], {}>, res:Response<Work[]>) => { 
    const results: Work[] | undefined = 
    z.array(WorkSchema).parse( 
        Works.filter(w => w.form.toString() === _req.params.form).sort(function (a, b) { 
           
            return ('' + a.title).localeCompare(b.title); 
        }) 
    ); 
    
    console.log('results', results) 
    res.send(results); 
});
// app.post('/api/works', (_req: any, res: any) => {
//     const {request: Work} = _req;
// });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});