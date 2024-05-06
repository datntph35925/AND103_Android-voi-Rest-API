var nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "hieud6904@gmail.com",
        pass: "123456",
    },
});

module.exports = transporter;