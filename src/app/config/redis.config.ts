export const redisConfig: {
  host: string;
  port: number;
} = {
  host: process.env.REDIS_HOST || '',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
}
