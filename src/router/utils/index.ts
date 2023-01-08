import {JsonType} from '../types';

export const safeJsonParse = (data: string, fallback: JsonType): JsonType => {
  try {
    return JSON.parse(data) as JsonType;
  } catch {
    return fallback;
  }
};
