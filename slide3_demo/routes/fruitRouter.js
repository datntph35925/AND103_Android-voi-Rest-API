const express = require("express");
const router = express.Router();
const fruit = require("../models/fruitModel");

router.get("/", async (req, res) => {
  try {
    const fruits = await fruit.find(); //lấy về toàn bộ sinh viên có trong bảng
    res.json(fruits);
  } catch (err) {
    console.log("ERR: " + err);
  }
});

//thêm mới
router.post("/fruit", async (req, res) => {
  try {
    const { name, quantity, price, origin } = req.body; //lấy dữ liệu người dùng nhập từ react native
    const newFruit = new fruit({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      origin: req.body.origin,
    }); //tạo đối tượng mới từ dữ liệu

    // const newFruit = new fruit("Lemon", 12, 12, "Việt Nam");

    await newFruit.save(); //lưu vào bảng dữ liệu
    res.json(newFruit);
    console.log(newFruit);
  } catch (err) {
    console.log("ERR: " + err);
  }
});

//update
router.put("/update/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const { name, quantity, price, origin } = req.body;
    const updateFruit = new fruit({
      name: name,
      quantity: quantity,
      price: price,
      origin: origin,
    });
    await fruit.findByIdAndUpdate(
      _id,
      {
        name: name,
        quantity: quantity,
        price: price,
        origin: origin,
      },
      { new: true }
    );
    res.json(updateFruit);
    console.log(updateFruit);
  } catch (err) {
    console.log("ERR: " + err);
  }
});

//delete
// router.delete("/delete/:_id", async (req, res) => {
//   try {
//     const deleteFruit = await fruit.findByIdAndDelete(_id);
//     res.json(deleteFruit);
//     console.log(deleteFruit);
//   } catch (err) {
//     console.log("ERR: " + err);
//   }
// });
router.delete("/delete/:_id", async (req, res) => {
  try {
    // await mongoose.connect(uri);

    let id = req.params._id;
    console.log(id);
    await fruit.deleteOne({ _id: id });
    res.redirect("../");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
