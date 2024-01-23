import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  pg: {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT, 10),
  },
  defaultQueryParams: {
    limit: parseInt(process.env.DEFAULT_QUERY_LIMIT, 10),
    offset: parseInt(process.env.DEFAULT_QUERY_OFFSET, 0),
  },
}));
