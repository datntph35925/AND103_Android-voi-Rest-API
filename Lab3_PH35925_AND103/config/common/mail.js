var nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "datntph35925@fpt.edu.vn",
        pass: "fxgu casm chib aqje",
    },
});

module.exports = transporter;