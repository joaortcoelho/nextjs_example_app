// src/index.ts
import server from './app';

const start = async () => {
    const options = {
        port: 8080,
        host: 'localhost',
    };
    try {
        await server.listen(options);
        console.log('Server listening at http://localhost:8080');
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};

start();
