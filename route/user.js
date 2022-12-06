import express from "express";
import user from "../modal/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import account from "../modal/account.js";
import otpSend from "./otp.js";
import otp from "../modal/otp.js";
let app = express.Router();

//register
app.post("/register", async (req, res) => {
  let { username, password, profileImg, email } = req.body;
  console.log("register");
  try {
    let find = await user.findOne({ username });
    if (!find) {
      var salt = await bcrypt.genSaltSync(10);
      var hash = await bcrypt.hashSync(password, salt);
      let create = await user.create({
        username,
        password: hash,
        profileImg,
        email,
      });
      let token = jwt.sign(create._id.toString(), "pvault");
      res.status(201).send({
        username: create.username,
        _id: create._id,
        profileImg: create.profileImg,
        token,
      });
      console.log(create);
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
          username: data.username,
          _id: data._id,
          profileImg: data.profileImg,
          token,
        });
      } else {
        res.status(400).send({ msg: "password" });
      }
    } else {
    }
  } catch (e) {
    res.status(500).send({ msg: "somethig is worng" });
    console.log(e);
  }
});
//login by token
app.post("/token", async (req, res) => {
  try {
    let token = jwt.verify(req.body.token, "pvault");
    let find = await user.findOne({ _id: token }).select("-password");
    if (find) {
      res.status(200).send(find);
    } else {
      res.status(500).send({ msg: "somethig is worng" });
    }
  } catch (e) {
    res.status(500).send("verify", { msg: "somethig is worng" });
    console.log(e);
  }
});
//request otp
app.post("/request", async (req, res) => {
  try {
    let data = await user.findOne({ username: req.body.username });
    if (data) {
      let opp = otpSend(data.email);
      let find = await otp.findOne({ userId: data._id });
      if (!find) {
    let sot = await otp.create({ userId: data._id, otp: opp });
        res.send({ msg: "susess" });
      } else {
        let sot = await otp.findOneAndUpdate(
          { userId: data._id },
          { otp: opp }
        );
        res.send({ msg: "susess" });
      }
    } else {
      res.status(500).send({ msg: "somethig is worng" });
    }
  } catch (e) {
    res.status(500).send({ msg: "somethig is worng" });
    console.log(e);
  }
});
//change password
app.post("/change", async (req, res) => {
  let { username, password } = req.body;
  try {
    let userFind = await user.findOne({ username });
    if (userFind) {
  let findOtp = await otp.findOne({ userId: userFind._id });
  console.log(`${findOtp}+${req.body.otp}`)
      if (findOtp.otp == req.body.otp) {
        var salt = await bcrypt.genSaltSync(10);
        var hash = await bcrypt.hashSync(password, salt);
        let fixUser = await user.findOneAndUpdate(
          { _id: userFind._id },
          {
            password: hash,
          },{new:true}
        );
        console.log(fixUser)
        res.status(200).send({ msg: "susess" });
      }else{
        res.status(500).send({ msg: "somethig is worng" });
        console.log('otp not match')
      }
    }else{
      res.status(500).send({ msg: "somethig is worng" });
      console.log('user not math')
    }
  } catch (e) {
    res.status(500).send({ msg: "somethig is worng" });
    console.log(e);
  }
});
export default app;
