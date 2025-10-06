import express from 'express';
import { Works } from './data/works.js';
import pdfRouter from './routes/pdf.js';
import cors from 'cors';
console.log("File loaded");
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: false }));
app.use(express.json());
app.use('/api', pdfRouter);
const PORT = 3000;
app.get('/api/works', async (_req, res) => {
    //res.set("Cache-Control", "public, max-age=31536000, immutable");
    res.json(Works);
});

app.get('/api/works/:form', async (_req, res) => {
    console.log('in Express function');
    try {
        const results = z.array(WorkSchema).parse( 
            Works.filter(w => w.form.toString() === _req.params.form).sort(function (a, b) {
                return ('' + a.title).localeCompare(b.title);
            }));
        //res.set("Cache-Control", "public, max-age=31536000, immutable");
        res.set("Cache-Control", "public, max-age=0, immutable");
        res.json(results);
    }
    catch (err) {
        console.log(err);
    }
});
// app.post('/api/works', (_req: any, res: any) => {
//     const {request: Work} = _req;
// });
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
