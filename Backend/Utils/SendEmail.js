const Dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
Dotenv.config({
  path: "../.env",
});
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.SendEmail = async (Msg) => {
  // console.log(Msg);
  // try {
  const data = {
    to: Msg.to,
    from: Msg.from,
    subject: Msg.subject,
    text: Msg.text,
    html: Msg.html,
  };
  sgMail.send(data).then(
    () => {},
    (error) => {
      console.error(error);
    }
  );

  //   if (error.response) {
  //     console.error(error.response.body)
  //   }
  //   await sgMail.send(data);
  //   console.log(Result);
  // } catch (error) {
  //   console.error(error);

  //   if (error.response) {
  //     console.error(error.response.body);
  //   }
  // }
};

// async (Msg) => {
//   try {
//     const data = {
//       to: Msg.to,
//       from: Msg.from,
//       subject: Msg.subject,
//       html: Msg.html,
//     };
//     await sgMail.send(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
