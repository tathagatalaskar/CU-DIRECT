import {Router} from 'express';
import {z} from 'zod';
import ServiceRequest from '../models/ServiceRequest.js';
import {auth,allow} from '../middleware/auth.js';
const router=Router();
const schema=z.object({title:z.string().trim().min(4).max(100),description:z.string().trim().min(10).max(3000),category:z.enum(['Electrical','Plumbing','Internet / Wi-Fi','Classroom equipment','Air conditioning','Cleaning','Hostel maintenance','Mess complaints','Library facilities','Sports facilities','Other']),location:z.string().trim().max(200).optional()});
router.use(auth);
router.get('/',async(req,res,next)=>{try{const admin=['ADMIN','SUPER_ADMIN','STAFF','HOSTEL_WARDEN','DEPARTMENT_WORKER'].includes(req.user.role);const filter=admin?{}:{createdBy:req.user.id};const rows=await ServiceRequest.find(filter).sort({createdAt:-1}).limit(100).lean();res.json({data:rows})}catch(e){next(e)}});
router.post('/',async(req,res,next)=>{try{const data=schema.parse(req.body);const row=await ServiceRequest.create({...data,createdBy:req.user.id,history:[{actor:req.user.id,action:'CREATED',to:'PENDING'}]});res.status(201).json({data:row})}catch(e){next(e)}});
router.patch('/:id/status',allow('STAFF','DEPARTMENT_WORKER','ADMIN','HOSTEL_WARDEN','SUPER_ADMIN'),async(req,res,next)=>{try{
 const status=z.enum(['ASSIGNED','IN_PROGRESS','RESOLVED','CLOSED']).parse(req.body.status);
 const row=await ServiceRequest.findById(req.params.id);if(!row)return res.status(404).json({message:'Request not found'});
 const allowed={PENDING:['ASSIGNED'],ASSIGNED:['IN_PROGRESS'],IN_PROGRESS:['RESOLVED'],RESOLVED:['CLOSED','IN_PROGRESS'],CLOSED:[]};
 if(!allowed[row.status].includes(status))return res.status(409).json({message:`Transition ${row.status} → ${status} is not allowed`});
 const previous=row.status;row.status=status;row.history.push({actor:req.user.id,action:'STATUS_CHANGED',from:previous,to:status,comment:String(req.body.comment||'').slice(0,500)});await row.save();res.json({data:row});
}catch(e){next(e)}});
export default router;
