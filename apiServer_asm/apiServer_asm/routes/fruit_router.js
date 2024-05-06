const express = require("express");
const router = express.Router();
const fruitCtrl = require("../controllers/fruitsCtrl");
const upload = require("../config/common/upload");
router.get("/fruits", fruitCtrl.getListFruit);
router.put(
  "/fruits/:id",
  upload.single("image"),
  fruitCtrl.updateFruitWithImage
);
router.delete("/fruits/:id", fruitCtrl.deletedFruit);

router.post("/fruits", upload.single("image"), fruitCtrl.addFruitWithImage);
router.get("/search", fruitCtrl.SearchName);
router.get("/sxepTang", fruitCtrl.sapXepTang);
router.get("/sxepGiam", fruitCtrl.sapXepGiam);

module.exports = router;
