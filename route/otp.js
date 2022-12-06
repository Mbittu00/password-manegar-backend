import nodemailer from'nodemailer'
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mailnode7@gmail.com',
    pass: 'xaeioefnwpturocm'
  }
});

function generateOTP() {
  var digits = "0123456789";
  let OTP = "";

  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
}

let send=(email)=>{
  let otp=generateOTP()
var mailOptions = {
  from: 'mailnode7@gmail.com',
  to: email,
  subject: 'your otp',
  text: `your otp is ${otp}`
};
//console.warn(generateOTP);
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    return 'error'
    console.log(error)
  } else {
    return 'susess'
  }
}); 
return otp
}
export default send