const FruitModel = require("../models/model/fruitModel");

exports.getListFruit = async (req, res) => {
  try {
    const fruits = await FruitModel.find();
    res.status(200).json(fruits);
    console.log("Get list fruit success");
  } catch (err) {
    res.status(500).json(err);
  }
};

// exports.addFruit = async (req, res) => {
//   try {
//     const newFruit = new FruitModel(req.body);
//     const savedFruit = await newFruit.save();
//     res.status(200).json(savedFruit);
//     console.log("Add fruit success");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// exports.updateFruit = async (req, res) => {
//   try {
//     const updatedFruit = await FruitModel.findByIdAndUpdate(
//       req.params.id,
//       req.body
//     );
//     res.status(200).json(updatedFruit);
//     console.log("Update fruit success");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

exports.addFruitWithImage = async (req, res) => {
  try {
    const { file } = req;

    const newFruit = new FruitModel({
      name: req.body.name,
      price: req.body.price,
      origin: req.body.origin,
      image: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      quantity: req.body.quantity,
    });

    await newFruit.save(); //lưu vào bảng dữ liệu
    if (newFruit) {
      res.status(200).json(newFruit);
      console.log("Add fruit success");
    } else {
      res.status(500).json(err);
    }
  } catch (err) {
    console.log("ERR: " + err);
  }
};

exports.updateFruitWithImage = async (req, res) => {
  try {
    const data = req.body;
    const { file } = req;
    const urlImage = `${req.protocol}://${req.get("host")}/uploads/${
      file.filename
    }`;
    const updateFruit = await FruitModel.findByIdAndUpdate(req.params.id, {
      name: data.name,
      price: data.price,
      origin: data.origin,
      image: urlImage,
      quantity: data.quantity,
    });
    res.status(200).json(updateFruit);
    console.log("Update fruit success");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deletedFruit = async (req, res) => {
  try {
    const deletedFruit = await FruitModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedFruit);
    console.log("Delete fruit success");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.SearchName = async (req, res) => {
  try {
    const key = req.query.key; // Lấy tham số tìm kiếm từ query string

    // Thực hiện tìm kiếm trong danh sách sản phẩm
    const fruit = await FruitModel.find({
      name: { $regex: key, $options: "i" },
    }).sort({
      createdAt: -1,
    });
    if (fruit)
      // Gửi kết quả tìm kiếm cho client
      res.json(fruit);
    else res.json("Lỗi");
  } catch (error) {
    console.error(error);
  }
};

exports.sapXepTang = async (req, res) => {
  const fruits = await FruitModel.find().sort({ price: 1 });
  res.json(fruits);
  console.log("Sap xep tang success");
};

exports.sapXepGiam = async (req, res) => {
  const fruits = await FruitModel.find().sort({ price: -1 });
  res.json(fruits);
};
