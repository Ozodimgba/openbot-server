import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const url: any = process.env.REDIS || '';
export const client = new Redis(url);
