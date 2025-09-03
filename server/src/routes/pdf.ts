import { Router, Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';

const pdfRouter = Router();

pdfRouter.get('/pdf/:name', (req: Request<{ name: string}>, res: Response<{}, {}>) => {
    try {
        console.log('in pdfRouter.get');
        const safeName: string = (!req.params.name || req.params.name.length === 0) ? 'document.pdf' : req.params.name;
        console.log('safeName', safeName);
        //const safeName: string = req.params.name;
        const filePath: string = path.join(process.cwd(), 'pdfs', safeName);
        console.log('filePath', filePath);

        fs.stat(filePath, (err, stat) => {

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(safeName)}"`);
            res.setHeader('Content-Length', stat.size.toString());
            res.setHeader('Accept-Ranges', 'bytes');   
            res.setHeader('Cache-Control', 'public, max-age=86400');

            const stream = fs.createReadStream(filePath);

            stream.on('error', () => res.status(500).end('Read error'));
            stream.pipe(res);
        });
    } catch (err: unknown) {
        const error = err as Error;
        console.log(error.message);
    }
});

export default pdfRouter;