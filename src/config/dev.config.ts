import * as dotenv from 'dotenv';
dotenv.config();
export const { HOST, PORT, DB_URL,PRIVATE_KEY,PUBLIC_KEY } = process.env;
