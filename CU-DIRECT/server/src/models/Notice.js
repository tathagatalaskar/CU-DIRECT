import mongoose from 'mongoose';
const schema = new mongoose.Schema({title:{type:String,required:true,trim:true,maxlength:160},body:{type:String,required:true,maxlength:5000},category:{type:String,default:'General'},published:{type:Boolean,default:true},expiresAt:Date,createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}},{timestamps:true});
schema.index({published:1,createdAt:-1});
export default mongoose.model('Notice',schema);
