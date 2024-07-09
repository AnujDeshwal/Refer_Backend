const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "anujdeshwal95@gmail.com",
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
  }
  });

  exports.sendMail = async function({to,subject,text,html}) {
    console.log("this is subject:",subject)  
      // send mail with defi  ned transport object and transport object is made above , very far above
      // basically whatever will be shown in the user email like click in this link to reset the password everything is shown by those four think available in the parameter 
      let info = await transporter.sendMail({
        //from would be fix because always i will be the one who send the email to other from the id : anujdeshwal95@gmail.com
        from: '"Accredian" <anujdeshwal95@gmail.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
      }).catch(error => console.log("this is the  error:",error));
      return info;
    };