import {IncomingMessage, ServerResponse} from 'node:http';
import resMethods from './resMethods';

export type JsonType = object | string | number | boolean | null;
export type HttpRequest = IncomingMessage & {body: JsonType | undefined; query: Record<string, string>};
export type HttpResponse = ServerResponse & typeof resMethods;
export type Handler = (req: HttpRequest, res: HttpResponse) => void;
