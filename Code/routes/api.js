var express = require('express');
var ctrl = require('../controller/apiCtrl')
var mdw = require('../midleware/api_authen');
var router = express.Router();
var multer = require('multer');
var objUpload = new multer({dest:'./tmp'});

/* GET users listing. */
router.post('/login', ctrl.Login);
router.post('/reg', ctrl.Reg);
router.put('/update/user/:id', ctrl.UpdateAccount);
//get sp
router.get('/products', ctrl.DanhSachSanPham);
router.get('/products/:id', ctrl.XemSanPham);
router.get('/products/categorys/:id', ctrl.DanhSachSanPhamTheoLoai);
//set sp
router.post("/products/add",objUpload.single('imgAnh'),ctrl.ThemSanPham);
router.put("/products/edit/:id",objUpload.single('imgAnh'),ctrl.SuaSanPham);
router.delete("/products/delete/:id",ctrl.XoaSanPham);
// get loai
router.get('/categorys', ctrl.DanhSachLoai);
router.get('/categorys/:id', ctrl.XemLoai);
//set loai sp
router.post('/categorys/add', ctrl.ThemLoai);
router.put('/categorys/edit/:id', ctrl.SuaLoai);
router.delete('/categorys/delete/:id', ctrl.Xoaloai);
// get bill
router.get('/bills/user/:id', ctrl.DanhSachBill);
router.get('/bills/:idUser/:idSP', ctrl.XemHoaDon);
//set hoa don
router.post('/bills/add', ctrl.ThemHoaDon);
router.put('/bills/edit/:id', ctrl.SuaHoaDon);
router.delete('/bills/delete/:id', ctrl.XoaHoaDon);
// get bill ct
router.get('/billdetails/:id', ctrl.DanhSachBillCT);
router.get('/billdetails/:idUser/:idSP', ctrl.XemHoaDonCT);
//set hoa don chi tiet
router.post('/billdetails/add', ctrl.ThemHoaDonCT);
router.put('/billdetails/edit/:id', ctrl.SuaHoaDonCT);
router.delete('/billdetails/delete/:id', ctrl.XoaHoaDonCT);
// get Cart
router.get('/Carts/:id', ctrl.DanhSachCart);
router.get('/Carts/:id/:idSp', ctrl.XemCart);
//set Cart
router.post('/Carts/add', ctrl.ThemCart);
router.put('/Carts/edit/:id', ctrl.SuaCart);
router.delete('/Carts/delete/:id', ctrl.XoaCart);
module.exports = router;
