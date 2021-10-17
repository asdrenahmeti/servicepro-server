const nodemailer = require("nodemailer")

const sendEmail = async options =>{
    //qdeeronmkshebdwd;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shkumbinbajrami91@gmail.com",
        pass: "qdeeronmkshebdwd",
      },
    });

    let mailOptions = {
      from: "shkumbinbajrami91@gmail.com",
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(mailOptions)
}
 
module.exports = sendEmail