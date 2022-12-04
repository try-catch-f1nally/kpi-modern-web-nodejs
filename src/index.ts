import * as http from 'http';
import dotenv from 'dotenv';
import Router from './router';
import resMethods from './router/resMethods';
import {safeJsonParse} from './router/utils';
import {HttpRequest, HttpResponse} from './router/types';

dotenv.config();

const PORT = process.env.PORT || 3000;
const router = new Router();
const getDataParser = (contentType: string) => {
  switch (contentType) {
    case 'text/plain':
    case 'text/html':
      return (content: string) => content;
    case 'application/json':
      return (content: string) => safeJsonParse(content, null);
    case 'application/x-www-form-urlencoded':
      return (content: string) => Object.fromEntries(new URLSearchParams(content));
  }
};

const server = http
  .createServer(async (req, res) => {
    let rawData = '';
    for await (const chunk of req) {
      rawData += chunk;
    }
    const url = new URL(req.url || '/', `https://${req.headers.host || ''}`);
    const query = Object.fromEntries(new URLSearchParams(url.search));
    const contentType = req.headers['content-type']?.split(';')[0] || '';
    const body = getDataParser(contentType)?.(rawData);
    const httpRequest = Object.assign(req, {body, query});
    const httpResponse = Object.assign(res, resMethods);
    try {
      router.handle(url.pathname, httpRequest, httpResponse);
    } catch (error) {
      httpResponse.status(500).json('500 Server Error\n');
      console.log(error);
    }
  })
  .listen(PORT, () => {
    console.log(`Server starts on port ${PORT}`);
  })
  .on('clientError', (err, socket) => {
    socket.end('400 Bad Request\n');
  });

process.on('SIGINT', () => {
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  });
});

// testing
const echoHandler = (req: HttpRequest, res: HttpResponse) => res.status(200).json({body: req.body, query: req.query});
router
  .get('/test', echoHandler)
  .post('/test', echoHandler)
  .options('/test', echoHandler)
  .use('PATCH', '/some/other/route', echoHandler);
