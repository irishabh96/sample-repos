import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: 'mongodb://localhost:27017/extension-api',
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 27001,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
}));
