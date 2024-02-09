import { IncomingMessage, ServerResponse } from 'node:http';
import { Params } from './types';
import router from './router';

export default (req: IncomingMessage, res: ServerResponse): void => {
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
};
