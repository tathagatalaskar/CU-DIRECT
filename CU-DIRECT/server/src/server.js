import mongoose from 'mongoose';
import app from './app.js';
import {config} from './config.js';
const server=app.listen(config.port,()=>console.log(`CU Direct API listening on ${config.port}`));
if(config.mongoUri){mongoose.connect(config.mongoUri).then(()=>console.log('MongoDB connected')).catch(err=>{console.error('MongoDB connection failed:',err.message);process.exitCode=1})}
else console.warn('MONGODB_URI is not set. API is running without database persistence.');
process.on('SIGTERM',async()=>{server.close();await mongoose.disconnect();process.exit(0)});
