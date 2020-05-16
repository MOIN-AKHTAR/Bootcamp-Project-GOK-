const Dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
Dotenv.config({
  path: "../.env",
});
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let SendEmail = () => {
  const data = {
    to: "moinakhter179@gmail.com",
    from: "goto@example.com",
    subject: "Testing",
    text: "Testing Text",
    html: `<button>Email</button>`,
  };

  sgMail.send(data).then(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.error(error);
    }
  );
};
SendEmail();
