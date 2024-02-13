import dotenv from 'dotenv';

dotenv.config();

export const DEFAULT_HOST = 'localhost';
export const DEFAULT_PORT = 5000;
export const DEFAULT_MODE = false;
export const HOST: string = String(process.env.HOST) || DEFAULT_HOST;
export const PORT: number = Number(process.env.PORT) || DEFAULT_PORT;
export const MULTI_MODE: boolean = Boolean(process.env.MULTI_MODE) || DEFAULT_MODE;
export const UUID_PATTERN = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
