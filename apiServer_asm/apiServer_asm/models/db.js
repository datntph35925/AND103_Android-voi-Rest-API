const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1/Asm_PH35925")
  .then(() => console.log("Kết nối CSDL thành công"))
  .catch((err) => {
    console.log(err);
    console.log("Lỗi kết nối CSDL");
  });
module.exports = mongoose;
