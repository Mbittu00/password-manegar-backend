import mongoose from'mongoose'

export default function mongodb(){
  mongoose.connect('mongodb+srv://mbittu000:bittuc41@pvault.di2fmzu.mongodb.net/?retryWrites=true&w=majority',()=>{
    console.log('db connected')
  })
}