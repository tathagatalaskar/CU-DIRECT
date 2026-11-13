import mongoose from 'mongoose';
const schema = new mongoose.Schema({category:{type:String,required:true},rating:{type:Number,min:1,max:5,required:true},message:{type:String,required:true,maxlength:3000},createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}},{timestamps:true});
export default mongoose.model('Feedback',schema);
