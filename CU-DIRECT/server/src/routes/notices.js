import {Router} from 'express';
import {z} from 'zod';
import Notice from '../models/Notice.js';
import {auth,allow} from '../middleware/auth.js';
const router=Router();
router.get('/',async(req,res,next)=>{try{const rows=await Notice.find({published:true,$or:[{expiresAt:null},{expiresAt:{$gt:new Date()}}]}).sort({createdAt:-1}).limit(100).lean();res.json({data:rows})}catch(e){next(e)}});
router.post('/',auth,allow('ADMIN','SUPER_ADMIN'),async(req,res,next)=>{try{const d=z.object({title:z.string().min(4).max(160),body:z.string().min(10).max(5000),category:z.string().max(60).optional()}).parse(req.body);const row=await Notice.create({...d,createdBy:req.user.id});res.status(201).json({data:row})}catch(e){next(e)}});
export default router;
