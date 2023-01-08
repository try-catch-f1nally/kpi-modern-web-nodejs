import {HttpResponse, JsonType} from './types';

function status(this: HttpResponse, code: number): HttpResponse {
  this.statusCode = code;
  return this;
}

function json(this: HttpResponse, data: JsonType): void {
  this.setHeader('content-type', 'application/json');
  this.end(JSON.stringify(data));
}

export default {status, json};
