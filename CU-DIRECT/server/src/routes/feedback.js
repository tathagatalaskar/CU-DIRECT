import {Router} from 'express';
import {z} from 'zod';
import Feedback from '../models/Feedback.js';
import {auth,allow} from '../middleware/auth.js';
const router=Router();router.use(auth);
router.post('/',async(req,res,next)=>{try{const d=z.object({category:z.string().min(2).max(60),rating:z.number().int().min(1).max(5),message:z.string().min(10).max(3000)}).parse(req.body);const row=await Feedback.create({...d,createdBy:req.user.id});res.status(201).json({data:{id:row.id,createdAt:row.createdAt}})}catch(e){next(e)}});
router.get('/',allow('ADMIN','SUPER_ADMIN'),async(req,res,next)=>{try{res.json({data:await Feedback.find().sort({createdAt:-1}).limit(200).lean()})}catch(e){next(e)}});
export default router;
