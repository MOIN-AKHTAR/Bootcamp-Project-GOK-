const sgMail = require("@sendgrid/mail");
const Dotenv = require("dotenv");
Dotenv.config({
  path: "../.env",
});
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (msg) => {
  // const data = {
  //   to: "moinakhter179@gmail.com",
  //   from: "moinakhter178@gmail.com",
  //   subject: "Han bhai ab set hai?",
  //   text: "Dekho hogaya.",
  //   html:
  //     "<button onClick=()=>{console.log(Working)}>Approve</button> <button>Declined</button>",
  // };
  // console.log(msg);
  sgMail
    .send(msg)
    .then((res) => console.log(res))
    .catch((err) => console.log(err, "-->>>>"));
};
//   try {
//     const msg = {
//       to: body.to,
//       from: body.from,
//       subject: body.subject,
//       text: body.text,
//       html: body.html,
//     };
//     return sgMail.send(msg);
//   } catch (error) {
//     console.log(error);
//   }
// };
