import express from "express";
import account from "../modal/account.js";
import jwt from "jsonwebtoken";
import {encrypt,decrypt}from './pass.js'
let app = express.Router();

//create account
app.post("/add", async (req, res) => {
  try {
    let token = jwt.verify(req.body.token, "pvault");
  //  let password = jwt.sign(req.body.password, req.body.my);
let password=encrypt(req.body.password)
    
    let data = await account.create({
      userId: token,
      password: password.encryptedData,
      app: req.body.app,
      username: req.body.username,
      email: req.body.email,
      local: req.body.local,
      number: req.body.number,
      iv:password.id
    });
    let dec=decrypt(data.iv,data.password)
    res.send({
      userId:data.userId,
      _id:data._id,
      app:data.app,
      username:data.username,
      email:data.email,
      local:data.local,
      number:data.number,
      iv:data.iv,
      password:dec
    });
  } catch (e) {
    res.status(500).send({ msg: "somethig is worng" });
    console.log(e);
  }
});
//get accounts
app.post("/get", async (req, res) => {
  try {
    let token = jwt.verify(req.body.token, "pvault");
    let data = await account.find({ userId: token }).sort({ updatedAt: -1 });
    let pro = await Promise.all(
      data.map((e) => ({
        username: e.username,
        password: decrypt(e.iv,e.password),
        _id: e._id,
        userId: e.userId,
        name: e.name,
        email: e.email,
        local: e.local,
        number: e.number,
        app: e.app,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      }))
    );
    console.log(data);
    res.status(200).send(pro);
  } catch (e) {
    res.status(500).send({ msg: "somethig is worng" });
    console.log(e);
    console.log("get");
  }
});
//delete account
app.post("/delete", async (req, res) => {
  try {
    let del = await account.findOneAndDelete({ _id: req.body._id });
    console.log(req.body._id, del);
    res.status(200).send(del);
  } catch (e) {
    res.status(500).send({ msg: "somethig is worng" });
    console.log(e);
  }
});
export default app;
