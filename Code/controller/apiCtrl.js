const { name } = require('ejs');
const SanPham = require('../model/product_model');
const Loai = require('../model/category_model');
const Bill = require('../model/bill_model');
const BillCT = require('../model/billDetails');
const Cart = require('../model/cart_model');
const fs = require('fs');// thư viện sử lý file
const {userModel} = require('../model/user_model');
const bcrypt = require("bcrypt");
const { get } = require('http');

//get Acount
exports.Login = async (req, res, next)=>{
    try {
        const user = await userModel
                    .findByCredentials(req.body.Email, req.body.Password)
        if (!user) {
            return res.status(401)
                    .json({error: 'Sai thông tin đăng nhập'})
        }
        // đăng nhập thành công, tạo token làm việc mới
        const token = await user.generateAuthToken()
        user.token = token;
        return res.status(200).send(user)
    } catch (error) {
        console.log(error+" Pass"+req.body.Password)
        return res.status(400).send(error)
    }
  }
exports.Reg = exports.doReg = async (req, res, next)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const user = new userModel(req.body);
        user.Password = await bcrypt.hash(req.body.Password, salt);
        user.FullName = req.body.FullName;
        const token = await user.generateAuthToken();
        let new_u = await user.save()
        return res.status(201).send({ user: new_u, token })
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
    res.status(200).json( {status: 1, msg: 'Trang đăng ký'});
 }
 exports.UpdateAccount = exports.doReg = async (req, res, next)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const users = await userModel.findById(req.params.id);
        if(users==null){
            return res.status(400).send({smg:"Lỗi người dùng không tồn tại"})
        }
        let user = {};
        users.Email = req.body.Email;
        users.Password = await bcrypt.hash(req.body.Password, salt);
        users.FullName = req.body.FullName;
        const token = await users.generateAuthToken();
        let new_u = await userModel.findByIdAndUpdate({_id:req.params.id})
        return res.status(201).send({ user: new_u, token })
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
    res.status(200).json( {status: 1, msg: 'Trang đăng ký'});
 }
// san pham
 exports.DanhSachSanPham =  async (req, res, next) => {
   try {
    let list = await SanPham.ProductModel.find().sort({ Name: 1 })
    res.status(200).json(list);
   } catch (error) {
    console.log(error)
    return res.status(400).send(error)
   }
}
exports.DanhSachSanPhamTheoLoai =  async (req, res, next) => {
    try {
     let list = await SanPham.ProductModel.find({CateID:req.params.id}).sort({ Name: 1 })
     res.status(200).json(list);
    } catch (error) {
     console.log(error)
     return res.status(400).send(error)
    }
 }
exports.XemSanPham = async (req, res, next) => {
    let obj = null;
    let smg = '';
    try {
        obj = await SanPham.ProductModel.findOne({ _id: req.params.id });
        smg = "Lấy dữ liệu thành công"
        if(obj==null){
            smg = "Sản phẩm không tồn tại"
         return res.status(400).json({  smg: smg });
        }
    } catch (error) {
        smg = error.message;
    }
    res.status(200).json(obj);
};

exports.ThemSanPham = async (req, res, next) => {
    let smg = ''
    try {
        if (req.method == "POST") {
            let { ProductName,Description, Price,CateID } = req.body;
            if (ProductName==''||Description==''||Price=='',CateID=='') {
                smg = "Không được để trống"
                return  res.status(400).json({smg: smg })
            }
            if(isNaN(Price)){
                smg = "Giá phải là số"
                return  res.status(400).json({smg: smg })
            }
            let file_path = './public/uploads/'+req.file.originalname;
            let objProduct = new SanPham.ProductModel;
            if(fs.readFileSync(req.file.path)){
                // file có tồn tại
                console.log(req.file);
                if(req.file.mimetype.indexOf('image')){
                    smg = 'Anh khong đúng định dạng'
                    console.log(smg)
                    return  res.status(400).json({smg: smg })
                }
                fs.renameSync(req.file.path,file_path);
                objProduct.Image =  'uploads/'+req.file.originalname;
            }
            // đưa đối tượng vào cơ sở dữ liệu
            objProduct.ProductName = ProductName;
            objProduct.Description = Description;
            objProduct.Price = Price;
            objProduct.CateID = CateID;
            let kq = await objProduct.save();
            smg = 'Thêm thành công, id mới = ' + kq._id
           return res.status(200).json({smg: smg })
        }
    } catch (error) {
        console.log(error.message);
        smg = error.message;
    }
    res.status(400).json({smg: smg })
};

exports.SuaSanPham = async (req, res, next) => {
    let smg = ''
    let obj = null;
    try {
        obj = await SanPham.ProductModel.findOne({ _id: req.params.id });
        smg = 'Lấy dữ liệu thành công'
        if(obj==null){
            smg = "Sản phẩm không tồn tại"
         return res.status(400).json({  smg: smg });
        }
        if (req.method == "PUT") {
            let { ProductName,Description, Price,CateID } = req.body;
            if (ProductName==''||Description==''||Price==''||CateID=='') {
                smg = "Không được để trống"
                return  res.status(400).json({smg: smg })
            }
            if(isNaN(Price)){
                smg = "Giá phải là số"
                return  res.status(400).json({smg: smg })
            }
            let file_path = './public/uploads/'+req.file.originalname;
            let objProduct = {};
            if(fs.readFileSync(req.file.path)){
                // file có tồn tại
                console.log(req.file);
                if(req.file.mimetype.indexOf('image')){
                    smg = 'Anh khong đúng định dạng'
                    console.log(smg)
                    return  res.status(400).json({smg: smg })
                }
                fs.renameSync(req.file.path,file_path);
                objProduct.Image =  'uploads/'+req.file.originalname;
            }
             // đưa đối tượng vào cơ sở dữ liệu
             objProduct.ProductName = ProductName;
             objProduct.Description = Description;
             objProduct.Price = Price;
             objProduct.CateID = CateID;
            await SanPham.ProductModel.findByIdAndUpdate(req.params.id, objProduct);
            smg = 'Sửa thành công'
        }
       return res.status(200).json({ smg: smg, obj: obj });


    } catch (error) {
        smg = error.message;
        res.status(400).json({ smg: smg});
    }
    
};

exports.XoaSanPham = async (req, res, next) => {
    let smg = '';
    try {
        obj = await SanPham.ProductModel.findOne({ _id: req.params.id });
        if(obj==null){
            smg = "Sản phẩm không tồn tại"
         return res.status(400).json({  smg: smg });
        }
        smg = 'Lấy dữ liệu thành công'
        if(req.method == 'DELETE'){
            await SanPham.ProductModel.findByIdAndDelete(req.params.id);
            smg = 'Xóa thành công'
        }
       return res.status(200).json({ smg: smg});
    } catch (error) {
        smg = "Lỗi: "+error.message;
    }
    res.status(400).json({ smg: smg});
};
//loai san pham
 exports.DanhSachLoai =  async (req, res, next) => {
    try {
     let list = await Loai.cateModel.find().sort({ Name: 1 })
     res.status(200).json(list);
    } catch (error) {
     console.log(error)
     return res.status(400).send(error)
    }
 }
 exports.XemLoai = async (req, res, next) => {
    let obj = null;
    let smg = '';
    try {
        obj = await Loai.cateModel.findOne({ _id: req.params.id });
        smg = "Lấy dữ liệu thành công"
    } catch (error) {
        smg = error.message;
    }
    res.status(200).json(obj);
};

exports.ThemLoai = async (req, res, next) => {
    let smg = ''
    try {
        if (req.method == "POST") {
            let { CateName} = req.body;
            if (CateName=='') {
                smg = "Không được để trống"
                return  res.status(400).json({smg: smg })
            }
            // đưa đối tượng vào cơ sở dữ liệu
            let objCate = new Loai.cateModel;
            objCate.CateName = CateName;
            console.log("Catename= "+objCate);
            await objCate.save();
            smg = 'Thêm thành công'
           return res.status(200).json({smg: smg })
        }
    } catch (error) {
        console.log(error.message);
        smg = error.message;
    }
    res.status(400).json({smg: smg })
};
exports.SuaLoai = async (req, res, next) => {
    let smg = ''
    let obj = null;
    try {
        obj = await Loai.cateModel.findOne({ _id: req.params.id });
        smg = 'Lấy dữ liệu thành công'
        if(obj==null){
            smg = "Loại không tồn tại"
         return res.status(400).json({  smg: smg });
        }
        if (req.method == "PUT") {
            let { CateName} = req.body;
            if (CateName=='') {
                smg = "Không được để trống"
                return  res.status(400).json({smg: smg })
            }
            let objCate = {};
            objCate.CateName = CateName;
            await Loai.cateModel.findByIdAndUpdate(req.params.id, objProduct);
            smg = 'Sửa thành công'
        }
        res.status(200).json({ smg: smg, obj: obj });


    } catch (error) {
        smg = error.message;

    }
    res.status(400).json({ smg: smg});
};
exports.Xoaloai = async (req, res, next) => {
    let smg = '';
    try {
        obj = await Loai.cateModel.findOne({ _id: req.params.id });
        if(obj==null){
            smg = "Loại không tồn tại"
         return res.status(400).json({  smg: smg });
        }
        smg = 'Lấy dữ liệu thành công'
        if(req.method == 'DELETE'){
            await Loai.cateModel.findByIdAndDelete(req.params.id);
            smg = 'Xóa thành công'
        }
        return res.status(200).json({ smg: smg});
    } catch (error) {
        smg = "Lỗi: "+error.message;
    }
    res.status(400).json({ smg: smg});
};
// get hoa don
  exports.DanhSachBill =  async (req, res, next) => {
    try {
     let list = await Bill.billModel.find({UserID:req.params.id}).sort({ Name: 1 })
     res.status(200).json(list);
    } catch (error) {
     console.log(error)
     return res.status(400).send(error)
    }
 }
 exports.XemHoaDon = async (req, res, next) => {
    let obj = null;
    let smg = '';
    try {
        obj = await Bill.billModel.findOne({ ProductID: req.params.idSP ,UserID:req.params.idUser});
        smg = "Lấy dữ liệu thành công"
    } catch (error) {
        smg = error.message;
    }
    res.status(200).json(obj);
};
exports.ThemHoaDon = async (req, res, next) => {
    let smg = ''
    try {
        if (req.method == "POST") {
            let { Date,UserID} = req.body;
            if (Date==''||UserID=='') {
                smg = "Không được để trống"
                return  res.status(400).json({smg: smg })
            }
            // đưa đối tượng vào cơ sở dữ liệu
            let objBill = new Bill.billModel;
            objBill.Date = Date;
            objBill.UserID = UserID;
            await objBill.save();
            smg = 'Thêm thành công'
           return res.status(200).json(objBill)
        }
    } catch (error) {
        console.log(error.message);
        smg = error.message;
    }
    res.status(400).json({smg: smg })
};
exports.SuaHoaDon = async (req, res, next) => {
    let smg = ''
    let obj = null;
    try {
        obj = await Bill.billModel.findOne({ _id: req.params.id });
        smg = 'Lấy dữ liệu thành công'
        if(obj==null){
            smg = "Loại không tồn tại"
         return res.status(400).json({  smg: smg });
        }
        if (req.method == "PUT") {
            let { Date,UserID} = req.body;
            if (Date==''||UserID=='') {
                smg = "Không được để trống"
                return  res.status(400).json({smg: smg })
            }
            let objBill = {};
            objBill.Date = Date;
            objBill.UserID = UserID;
            await Bill.billModel.findByIdAndUpdate(req.params.id, objProduct);
            smg = 'Sửa thành công'
        }
      return  res.status(200).json({ smg: smg, obj: obj });


    } catch (error) {
        smg = error.message;

    }
    res.status(400).json({ smg: smg});
};
exports.XoaHoaDon = async (req, res, next) => {
    let smg = '';
    try {
        obj = await Bill.billModel.findOne({ _id: req.params.id });
        if(obj==null){
            smg = "Loại không tồn tại"
         return res.status(400).json({  smg: smg });
        }
        smg = 'Lấy dữ liệu thành công'
        if(req.method == 'DELETE'){
            await Bill.billModel.findByIdAndDelete(req.params.id);
            smg = 'Xóa thành công'
        }
        return res.status(200).json({ smg: smg});
    } catch (error) {
        smg = "Lỗi: "+error.message;
    }
    res.status(400).json({ smg: smg});
};
// get hoa don chi tiet
  exports.DanhSachBillCT =  async (req, res, next) => {
    try {
     let list = await BillCT.billDetailsModel.find({BillID:req.params.id}).sort({ Name: 1 })
     res.status(200).json(list);
    } catch (error) {
     console.log(error)
     return res.status(400).send(error)
    }
 }
 exports.XemHoaDonCT = async (req, res, next) => {
    let obj = null;
    let smg = '';
    try {
        obj = await  BillCT.billDetailsModel.findOne({ _id: req.params.id });
        smg = "Lấy dữ liệu thành công"
    } catch (error) {
        smg = error.message;
    }
    res.status(200).json({ objProduct: obj, smg: smg });
};
exports.ThemHoaDonCT = async (req, res, next) => {
    let smg = ''
    try {
        if (req.method == "POST") {
            let { BillID,ProductID,Quantity} = req.body;
            if (BillID==''||ProductID=='',Quantity=='') {
                smg = "Không được để trống"
                return  res.status(400).json({smg: smg })
            }
            // đưa đối tượng vào cơ sở dữ liệu
            let objBillCT = new BillCT.billDetailsModel;
            objBillCT.BillID = BillID;
            objBillCT.ProductID = ProductID;
            objBillCT.Quantity= Quantity;
            await objBillCT.save();
            smg = 'Thêm thành công'
          return  res.status(200).json({smg: smg })
        }
    } catch (error) {
        console.log(error.message);
        smg = error.message;
    }
    res.status(400).json({smg: smg })
};
exports.SuaHoaDonCT = async (req, res, next) => {
    let smg = ''
    let obj = null;
    try {
        obj = await Bill.billModel.findOne({ _id: req.params.id });
        smg = 'Lấy dữ liệu thành công'
        if(obj==null){
            smg = "Loại không tồn tại"
         return res.status(400).json({  smg: smg });
        }
        if (req.method == "PUT") {
            let { BillID,ProductID,Quantity} = req.body;
            if (BillID==''||ProductID=='',Quantity=='') {
                smg = "Không được để trống"
                return  res.status(400).json({smg: smg })
            }
            let objBillCT = {};
            objBillCT.BillID = BillID;
            objBillCT.ProductID = ProductID;
            objBillCT.Quantity= Quantity;
            await BillCT.billDetailsModel.findByIdAndUpdate(req.params.id, objProduct);
            smg = 'Sửa thành công'
        }
        res.status(200).json({ smg: smg, obj: obj });


    } catch (error) {
        smg = error.message;

    }
    res.status(400).json({ smg: smg});
};
exports.XoaHoaDonCT = async (req, res, next) => {
    let smg = '';
    try {
        obj = await BillCT.billDetailsModel.findOne({ _id: req.params.id });
        if(obj==null){
            smg = "Loại không tồn tại"
         return res.status(400).json({  smg: smg });
        }
        smg = 'Lấy dữ liệu thành công'
        if(req.method == 'DELETE'){
            await BillCT.billDetailsModel.findByIdAndDelete(req.params.id);
            smg = 'Xóa thành công'
        }
        return  res.status(200).json({ smg: smg});
    } catch (error) {
        smg = "Lỗi: "+error.message;
    }
    res.status(400).json({ smg: smg});
};
// get gio hang
exports.DanhSachCart =  async (req, res, next) => {
    try {
     let list = await Cart.cartModel.find({UserID:req.params.id});
    return res.status(200).json(list);
    } catch (error) {
     console.log(error)
     return res.status(400).send(error)
    }
 }
 exports.XemCart = async (req, res, next) => {
    let obj = null;
    let smg = '';
    try {
        obj = await  Cart.cartModel.findOne({ ProductID: req.params.idSp,UserID:req.params.id });
        smg = "Lấy dữ liệu thành công"
    } catch (error) {
        smg = error.message;
        return req.status(400).json({smg:smg})
    }
   return res.status(200).json(obj);
};
exports.ThemCart = async (req, res, next) => {
    let smg = ''
    try {
        if (req.method == "POST") {
            let { ProductID,UserID,Quantity} = req.body;
            if (ProductID==''||UserID=='',Quantity=='') {
                smg = "Không được để trống"
                return  res.status(400).json({smg: smg })
            }
            if(isNaN(Quantity)){
                smg = "Số lượng phải là số"
                return  res.status(400).json({smg: smg })
            }
            // đưa đối tượng vào cơ sở dữ liệu
            let obj = new Cart.cartModel;
            obj.ProductID = ProductID;
            obj.UserID = UserID;
            obj.Quantity= Quantity;
            await obj.save();
            smg = 'Thêm thành công'
         return   res.status(200).json({smg: smg })
        }
    } catch (error) {
        console.log(error.message);
        smg = error.message;
    }
    res.status(400).json({smg: smg })
};
exports.SuaCart = async (req, res, next) => {
    let smg = ''
    let obj = null;
    try {
        obj = await Cart.cartModel({ _id: req.params.id });
        smg = 'Lấy dữ liệu thành công'
        if(obj==null){
            smg = "Loại không tồn tại"
         return res.status(400).json({  smg: smg });
        }
        if (req.method == "PUT") {
            let { ProductID,UserID,Quantity} = req.body;
            if (ProductID==''||UserID=='',Quantity=='') {
                smg = "Không được để trống"
                return  res.status(400).json({smg: smg })
            }
            if(isNaN(Quantity)){
                smg = "Số lượng phải là số"
                return  res.status(400).json({smg: smg })
            }
            let obj = {};
            obj.ProductID = ProductID;
            obj.UserID = UserID;
            obj.Quantity= Quantity;
            await Cart.cartModel.findByIdAndUpdate(req.params.id, obj);
            smg = 'Sửa thành công'
        }
      return  res.status(200).json({ smg: smg, obj: obj });


    } catch (error) {
        smg = error.message;

    }
    res.status(400).json({ smg: smg});
};
exports.XoaCart = async (req, res, next) => {
    let smg = '';
    try {
        obj = await Cart.cartModel.findOne({ _id: req.params.id });
        if(obj==null){
            smg = "Loại không tồn tại"
         return res.status(400).json({  smg: smg });
        }
        smg = 'Lấy dữ liệu thành công'
        if(req.method == 'DELETE'){
            await Cart.cartModel.findByIdAndDelete(req.params.id);
            smg = 'Xóa thành công'
        }
        return  res.status(200).json({ smg: smg});
    } catch (error) {
        smg = "Lỗi: "+error.message;
    }
    res.status(400).json({ smg: smg});
};