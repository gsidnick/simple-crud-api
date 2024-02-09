import http from 'node:http';
import dotenv from 'dotenv';
import { DEFAULT_HOST, DEFAULT_PORT } from './constants';
import { Params } from './types';
import router from './router';

dotenv.config();

const HOST: string = String(process.env.HOST) || DEFAULT_HOST;
const PORT: number = Number(process.env.PORT) || DEFAULT_PORT;

const server = http.createServer((req, res): void => {
  try {
    let route = `${req.method} ${req.url}`;
    const params: Params = {};
    const uuid = route.match(/\/api\/users\/(.*)/);

    if (uuid) {
      const id = uuid[1];
      route = route.replace(id, ':id');
      params.id = id;
    }

    const handler = router.get(route);
    if (handler) {
      handler({ req, res, params });
    } else {
      res.statusCode = 404;
      res.end('404 Not Found');
    }
  } catch {
    res.statusCode = 500;
    res.end('500 Internal Server Error');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request');
});
