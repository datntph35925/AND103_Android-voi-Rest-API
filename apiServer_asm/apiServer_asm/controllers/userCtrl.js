const UserModel = require("../models/model/userModel");
const Transporter = require("../config/common/email");
exports.Register = async (req, res) => {
  try {
    const data = req.body;
    const { file } = req;
    const newUser = new UserModel({
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      avartar: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      //url avatar http://localhost:3000/uploads/filename
    });
    const result = await newUser.save();
    if (result) {
      //Gửi mail
      const mailOptions = {
        from: "anhktnph36088@fpt.edu.vn", //email gửi đi
        to: data.email, // email nhận
        subject: "Đăng ký thành công", //subject
        text: "Cảm ơn bạn đã đăng ký", // nội dung mail
      };
      // Nếu thêm thành công result !null trả về dữ liệu
      await Transporter.sendMail(mailOptions); // gửi mail
      res.status(200).json(result);
      console.log("Register successfully");
    } else {
      // Nếu thêm không thành công result null, thông báo không thành công
      res.json("Đăng ký không thành công");
    }
  } catch (error) {
    console.log(error);
  }
};

// const JWT = require("jsonwebtoken");
// const SECRETKEY = "FPTPOLYTECHNIC";
exports.Login = async (req, res) => {
  try {
    console.log("aaa" + req.body.username + " " + req.body.password);
    let user = await UserModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    console.log(user);
    if (user) {
      res.json(user);
      console.log("Đăng nhập thành công");
      // res.status(200).json(user);
    } else {
      // Nếu thêm không thành công result null, thông báo không thành công
      res.json("Đăng nhập thất bại ");
    }
  } catch (error) {
    console.log(error);
  }
};
