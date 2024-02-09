import http from 'node:http';
import dotenv from 'dotenv';
import { DEFAULT_HOST, DEFAULT_PORT } from './constants';

dotenv.config();

const HOST: string = String(process.env.HOST) || DEFAULT_HOST;
const PORT: number = Number(process.env.PORT) || DEFAULT_PORT;

const server = http.createServer((req, res): void => {
  res.end();
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request');
});
