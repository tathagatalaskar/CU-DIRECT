import dotenv from 'dotenv';
dotenv.config();
export const config = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'development-only-change-this-secret',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development'
};
if (config.nodeEnv === 'production' && config.jwtSecret === 'development-only-change-this-secret') {
  throw new Error('JWT_SECRET must be configured in production');
}
