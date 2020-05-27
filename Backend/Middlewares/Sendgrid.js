const sgMail = require("@sendgrid/mail");
const Dotenv = require("dotenv");
Dotenv.config({
  path: "../.env",
});
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (msg) => {
  sgMail
    .send(msg)
    .then((res) => console.log(res))
    .catch((err) => console.log(err, "-->>>>"));
};

