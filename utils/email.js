const nodemailer = require("nodemailer")

const sendEmail = async options =>{
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shkumbinbajrami91@gmail.com",
        pass: "qdeeronmkshebdwd",
      },
    });

    let mailOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.message,
      html: options.html
    };

    await transporter.sendMail(mailOptions)
}
 
module.exports = sendEmail