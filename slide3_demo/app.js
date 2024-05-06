// // =================
// //import thư viện
// const express = require("express");
// const mongoose = require("mongoose");
// //tạo đối tượng mới cho express
// const app = express();
// //kết nối với csdl
// mongoose
//   .connect(
//     "mongodb+srv://anhktn:and103@atlascluster.6rlzmde.mongodb.net/MD18306",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("Kết nối thành công với mongodb");
//   })
//   .catch((err) => {
//     console.log("Lỗi: " + err);
//   });

// //truy vấn csdl
// //dịnh nghĩa model cho bảng dữ liệu
// const SinhVienSchema = new mongoose.Schema({
//   ten: {
//     type: String,
//     required: true,
//   },
//   masv: {
//     type: String,
//     required: true,
//   },
// });

// //ánh xạ model vào bảng dữ liệu
// const sinhvien = mongoose.model("sinhvien", SinhVienSchema);
// //tạo link triueej gọi trên trình duyệt(API)
// app.get("/", async (req, res) => {
//   try {
//     const sv = await sinhvien.find(); //đọc dữ liệu từ bạn sinh viên
//     if (sv.length > 0) {
//       res.json(sv); //api trả về dữ liệu
//       console.log("tc");
//     } else {
//       res.status(404).json({ err: "Không có sinh viên" });
//       console.log("tb");
//     }
//   } catch (err) {
//     console.log("Lỗi đọc dữ liệu");
//     res.status(500).json({ err: "Đọc dữ liệu lỗi" });
//   }
// });
// //khởi chạy máy chủ
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log("App đang chạy ở cổng 5000");
// });
// module.exports = app;

//==============LAB3==============
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fruitRoute = require("./routes/fruitRouter");

const app = express(); //tạo đối tượng mới
//knoi CSDL
mongoose
  .connect(
    "mongodb+srv://anhktn:and103@atlascluster.6rlzmde.mongodb.net/MD18306",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Kết nối thành công với mongodb");
  })
  .catch((err) => {
    console.log("Lỗi: " + err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//sử dụng route
app.use("/", fruitRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server đnag chạy ở cổng 5000");
});
