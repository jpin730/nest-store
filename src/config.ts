import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  apiKey: process.env.API_KEY,
}));
