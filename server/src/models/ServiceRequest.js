import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title:{type:String,required:true,trim:true,maxlength:100},
  description:{type:String,required:true,trim:true,maxlength:3000},
  category:{type:String,required:true,enum:['Electrical','Plumbing','Internet / Wi-Fi','Classroom equipment','Air conditioning','Cleaning','Hostel maintenance','Mess complaints','Library facilities','Sports facilities','Other']},
  location:{type:String,trim:true,maxlength:200},
  status:{type:String,enum:['PENDING','ASSIGNED','IN_PROGRESS','RESOLVED','CLOSED'],default:'PENDING'},
  priority:{type:String,enum:['LOW','MEDIUM','HIGH','URGENT'],default:'MEDIUM'},
  createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  assignedTo:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  history:[{actor:{type:mongoose.Schema.Types.ObjectId,ref:'User'},action:String,from:String,to:String,comment:String,at:{type:Date,default:Date.now}}]
},{timestamps:true});
schema.index({createdBy:1,createdAt:-1});schema.index({status:1,priority:1,createdAt:-1});
export default mongoose.model('ServiceRequest',schema);
