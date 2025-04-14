import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: 'https://grateful-dogfish-19683.upstash.io',
  token: process.env.REDIS_KEY,
})
