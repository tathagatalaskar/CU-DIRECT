import {Router} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {z} from 'zod';
import User from '../models/User.js';
import {config} from '../config.js';
const router=Router();
const credentials=z.object({name:z.string().trim().min(2).max(80).optional(),email:z.string().email().max(160),password:z.string().min(10).max(100)});
router.post('/register',async(req,res,next)=>{try{
 const data=credentials.parse(req.body);
 const exists=await User.exists({email:data.email.toLowerCase()});if(exists)return res.status(409).json({message:'An account with this email already exists'});
 const user=await User.create({name:data.name||data.email.split('@')[0],email:data.email,passwordHash:await bcrypt.hash(data.password,12),role:'STUDENT'});
 res.status(201).json({data:{user:{id:user.id,name:user.name,email:user.email,role:user.role},token:jwt.sign({sub:user.id},config.jwtSecret,{expiresIn:'8h'})}});
}catch(e){next(e)}});
router.post('/login',async(req,res,next)=>{try{
 const data=credentials.pick({email:true,password:true}).parse(req.body);
 const user=await User.findOne({email:data.email.toLowerCase()}).select('+passwordHash');
 if(!user||!user.active||!(await bcrypt.compare(data.password,user.passwordHash)))return res.status(401).json({message:'Invalid email or password'});
 res.json({data:{user:{id:user.id,name:user.name,email:user.email,role:user.role},token:jwt.sign({sub:user.id},config.jwtSecret,{expiresIn:'8h'})}});
}catch(e){next(e)}});
export default router;
