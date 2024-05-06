const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const upload = require("../config/common/upload");
router.post("/login", userCtrl.Login);
router.post("/register", upload.single("avartar"), userCtrl.Register);

module.exports = router;
