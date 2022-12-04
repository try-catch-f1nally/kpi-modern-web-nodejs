import {Handler, HttpRequest, HttpResponse} from './types';

export default class Router {
  private routes: {[path: string]: {[httpMethod: string]: Handler[]}} = {};
  private defaultHandler: Handler = (req, res) => {
    res.status(404).json({error: '404 Not Found'});
  };

  handle(path: string, req: HttpRequest, res: HttpResponse) {
    if (!req.method) {
      throw new Error('No http method specified');
    }
    const handlers = this.routes[path]?.[req.method] || [this.defaultHandler];
    handlers.forEach((handler) => handler(req, res));
  }

  use(httpMethod: string, path: string, ...handlers: Handler[]) {
    if (!handlers.length) {
      throw new Error(`No handler passed for ${httpMethod} ${path}`);
    }
    this.routes[path] ||= {[httpMethod]: []};
    this.routes[path][httpMethod] ||= [];
    this.routes[path][httpMethod].push(...handlers);
    return this;
  }

  get(path: string, ...handlers: Handler[]) {
    return this.use('GET', path, ...handlers);
  }

  post(path: string, ...handlers: Handler[]) {
    return this.use('POST', path, ...handlers);
  }

  patch(path: string, ...handlers: Handler[]) {
    return this.use('PATCH', path, ...handlers);
  }

  put(path: string, ...handlers: Handler[]) {
    return this.use('PUT', path, ...handlers);
  }

  delete(path: string, ...handlers: Handler[]) {
    return this.use('DELETE', path, ...handlers);
  }

  options(path: string, ...handlers: Handler[]) {
    return this.use('OPTIONS', path, ...handlers);
  }
}
