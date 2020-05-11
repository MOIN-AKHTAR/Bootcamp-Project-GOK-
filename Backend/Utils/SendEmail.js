const Dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
Dotenv.config({});
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.SendEmail = async (msg) => {
  try {
    const data = {
      to: msg.to,
      from: msg.from,
      subject: msg.subject,
      text: msg.text,
      html: msg.html,
    };
    await sgMail.send(data);
  } catch (error) {
    console.log(error.response.data);
  }
};
