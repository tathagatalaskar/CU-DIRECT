import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from '../config.js';
export async function auth(req,res,next){
  try{
    const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');
    if(!token) return res.status(401).json({message:'Authentication required'});
    const payload=jwt.verify(token,config.jwtSecret);
    const user=await User.findById(payload.sub);
    if(!user||!user.active) return res.status(401).json({message:'Account unavailable'});
    req.user=user;next();
  }catch{return res.status(401).json({message:'Invalid or expired session'});}
}
export const allow=(...roles)=>(req,res,next)=>roles.includes(req.user?.role)?next():res.status(403).json({message:'Insufficient permissions'});
