import http from 'http';
import cluster from 'node:cluster';
import os from 'node:os';
import { HOST, PORT, MULTI_MODE } from './constants';
import httpServer from './server';

if (MULTI_MODE) {
  if (cluster.isPrimary) {
    console.log(`Master process ${process.pid} running at port ${PORT}`);
    const ports: number[] = [];
    const flowsCount = os.cpus().length - 1;

    for (let i = 1; i <= flowsCount; i += 1) {
      const port = PORT + i;
      ports.push(port);
      cluster.fork({ PORT: port });
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker process ${worker.process.pid} died. Starting new worker...`);
      cluster.fork();
    });

    let currentWorker = 0;

    const balancer = http.createServer((masterReq, masterRes) => {
      const workerPort = ports[currentWorker % ports.length];
      currentWorker += 1;

      const options = {
        host: HOST,
        port: workerPort,
        path: masterReq.url,
        method: masterReq.method,
        headers: masterReq.headers,
      };

      console.log(`Worker process with port ${workerPort} processed request`);

      const workerReq = http.request(options, (workerRes) => {
        masterRes.writeHead(workerRes.statusCode || 500, workerRes.headers);
        workerRes.pipe(masterRes);
      });

      masterReq.pipe(workerReq);
    });

    balancer.listen(PORT, () => {
      console.log(`Requests are accepted on port ${PORT}`);
    });
  }

  if (cluster.isWorker) {
    const port = Number(process.env.PORT);
    const server = http.createServer(httpServer);

    server.listen(port, () => {
      console.log(`Worker process ${process.pid} running at port ${port}`);
    });
  }
} else {
  const server = http.createServer(httpServer);

  server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
  });

  server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request');
  });
}
