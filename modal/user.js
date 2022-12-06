import mongoose from'mongoose'

let userSchema=mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },password:{
    type:String,
    required:true
  },profileImg:{
    type:String,
    default:'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png'
    //required:true
  },email:{
    type:String,
    required:true
  }
},{timestamps:true})

let user=mongoose.model('User',userSchema)
export default user