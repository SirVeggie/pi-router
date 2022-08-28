import express from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import { config } from './config';
import { wakeDevice } from './wake';

export function createServer() {
    const app = express();
    
    app.use(express.json());
    app.use(morgan('tiny'));
    
    //====| routes |====//
    
    app.get('/api/wake/pc', (req, res) => {
        wakeDevice(config.PC_MAC);
        res.status(200).end();
    });
    
    app.get('/api/wake/tv', (req, res) => {
        wakeDevice(config.TV_MAC);
        res.status(200).end();
    });
    
    //====| middleware |====//
    
    function unknownEndpoint(req: any, res: any) {
        res.status(404).json({ error: 'unknown endpoint' });
    }
    
    function errorHandler(error: any, req: any, res: any, next: any) {
        console.error('Error: ' + error);
        
        next(error);
    }
    
    app.use(unknownEndpoint);
    app.use(errorHandler);
    
    return app.listen(config.PORT, () => {
        console.log(`Server running on port ${config.PORT}`);
    });
}