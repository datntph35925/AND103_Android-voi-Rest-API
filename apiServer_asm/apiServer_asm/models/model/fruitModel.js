const db = require("../db");
//định nghĩa khuôn mẫu
const fruitSchema = new db.mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    origin: { type: String },
    image: { type: String },
    quantity: { type: Number },
  },
  { collection: "fruits" } //tên bảng
);

//tạo model
const FruitModel = db.mongoose.model("FruitModel", fruitSchema);

module.exports = FruitModel;
