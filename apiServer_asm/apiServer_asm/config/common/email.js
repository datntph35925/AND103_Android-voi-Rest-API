var nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anhktnph36088@fpt.edu.vn",
    pass: "lvag jkqt kznp cdrd",
  },
});
module.exports = transporter;
