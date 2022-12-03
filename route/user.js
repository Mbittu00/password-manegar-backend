import express from "express";
import user from "../modal/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import account from'../modal/account.js'
let app = express.Router();

//register
app.post("/register", async (req, res) => {
  let { username, password, profileImg } = req.body;
  try {
    let find = await user.findOne({ username });
    if (!find) {
      var salt = await bcrypt.genSaltSync(10);
      var hash = await bcrypt.hashSync(password, salt);
      let create = await user.create({ username, password: hash, profileImg });
      let token = jwt.sign(create._id.toString(), "pvault");
      res.status(201).send({
        username: create.username,
        _id: create._id,
        profileImg: create.profileImg,
        token,
      });
    } else {
      res.status(500).send({ msg: "username taken" });
    }
  } catch (e) {
    res.status(500).send({ msg: "somethig is worng" });
    console.log(e);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    let data = await user.findOne({
      username: req.body.username,
    });
if (data) {
      if (bcrypt.compareSync(req.body.password, data.password)) {
      let token = jwt.sign(data._id.toString(), "pvault");
      res.status(201).send({
        username:data.username,
        _id:data._id,
        profileImg:data.profileImg,
        token
      });
    } else {
      res.status(400).send({msg:'password'});
    }
}else{}
  } catch (e) {
    res.status(500).send({ msg: "somethig is worng" });
    console.log(e);
  }
});
//login by token
app.post('/token',async(req,res)=>{
  try{
    let token=jwt.verify(req.body.token,'pvault')
    let find=await user.findOne({_id:token}).select('-password')
if(find){
  res.status(200).send(find)
}else{
  res.status(500).send({ msg: "somethig is worng" });
}
  }catch(e){
        res.status(500).send('verify',{ msg: "somethig is worng" });
    console.log(e);
  }
})
//change password
app.post('/change',async(req,res)=>{
  try {
  let token=jwt.verify(req.body.token,'pvault')
  let accounts=await account.find({userId:token})
/*  let fix=await Promise.all(
    accounts.map((e)=>{
      let Pass=jwt.verify(e.password,req.body.oldPassword)
      let newData={password:jwt.sign(pass,newPassword),...e}
      return newData
    })8
    )*/
    let fix=accounts.map(async(e)=>{
      let newPass=jwt.verify(e.password,req.body.oldPassword)
    let up=await account.findOneAndUpdate({_id:e._id},
      {password:jwt.sign(newPass,req.body.newPassword)})
      console.log(up)
    })
    res.send(accounts)
  } catch (e) {
            res.status(500).send({ msg: "somethig is worng" });
    console.log(e);
  }
})
export default app;
