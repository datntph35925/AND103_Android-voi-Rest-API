var express = require('express');
var router = express.Router();

const Products = require('../models/products');
const Users = require('../models/users');
const Sachs = require('../models/sachs');

// get list sach have the_loai_PH35768 is 'CNTT', in year 2024, sort by so_luong_ban_ra_PH35768
router.get("/get-list-sach-thong-ke", async (req, res) => {
  try {
    const data = await Sachs.find({
      the_loai_ph35925: "CNTT",
      nam_xuat_ban_ph35925: "2024",
    })
      .sort({ so_luong_ban_ph35925: -1 })
      .limit(10);
    if (data) {
      res.json({
        status: 200,
        messenger: "Lay thanh cong",
        data: data,
      });
    } else {
      res.json({
        status: 400,
        messenger: "Loi ko lay thanh cong",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete-sach-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Sachs.findByIdAndDelete(id);
    if (result) {
      res.json({
        status: 200,
        messenger: "tìm và xóa theo id thành công",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        messenger: "tìm và xóa thất bại",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});


router.get("/get-list-sach", async (req, res) => {
  try {
    //lấy ds nhà phần phối mới nhất
    const data = await Sachs.find().sort({ createdAt: -1 });
    if (data) {
      res.json({
        status: 200,
        messenger: "Lấy danh sách thành công",
        data: data,
      });
    } else {
      res.json({
        status: 400,
        messenger: "lấy danh sách thất bại",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});



router.post('/add-sach', async (req, res) => {
  try {
      const data = req.body; // Lấy dữ liệu từ body 
      const newSachs = new Sachs({
        ma_sach_ph35925: data.ma_sach_ph35925,
        tieu_de_ph35925: data.tieu_de_ph35925,
        tac_gia_ph35925: data.tac_gia_ph35925,
        nam_xuat_ban_ph35925: data.nam_xuat_ban_ph35925,
        the_loai_ph35925: data.the_loai_ph35925,
        so_trang_ph35925: data.so_trang_ph35925,
        don_gia_ph35925: data.don_gia_ph35925,
        so_luong_ph35925: data.so_luong_ph35925,
        so_luong_ban_ph35925: data.so_luong_ban_ph35925,
        hinh_anh_ph35925: data.hinh_anh_ph35925,
      }); // Tạo một đối tượng mới
      const result = await newSachs.save(); //Thêm vào database
      if (result)
      {
          // Nếu thêm thành công result Inull trả về dữ liệu
          res.json({
              "status": 200,
              "messenger": "Thêm thành công",
              "data": result
          })
      }else{
          // Nếu thêm không thành công result null, thông báo không thành công
          res.json({
              "status": 400,
              "messenger": "Lỗi, thêm không thành công",
              "data":[]
          })
      }
      } catch (error) {
          console.log(error);
      }
});

router.post('/add-product', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body 
        const newProducts = new Products({
            ProductName: data.ProductName,
            Desc: data.Desc,
            Price: data.Price,
            Image: data.Image,
            CateId: data.CateId
        }); // Tạo một đối tượng mới
        const result = await newProducts.save(); //Thêm vào database
        if (result)
        {
            // Nếu thêm thành công result Inull trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        }else{
            // Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, thêm không thành công",
                "data":[]
            })
        }
        } catch (error) {
            console.log(error);
        }
});

router.post('/add-user', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body 
        const newUser = new Users({
            Email: data.Email,
            Password: data.Password,

        }); // Tạo một đối tượng mới
        const result = await newUser.save(); //Thêm vào database
        if (result)
        {
            // Nếu thêm thành công result Inull trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        }else{
            // Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, thêm không thành công",
                "data":[]
            })
        }
        } catch (error) {
            console.log(error);
        }
});





router.get("/get-list-product", async (req, res) => {
    try {
      //lấy ds nhà phần phối mới nhất
      const data = await Products.find().sort({ createdAt: -1 });
      if (data) {
        res.json({
          status: 200,
          messenger: "Lấy danh sách thành công",
          data: data,
        });
      } else {
        res.json({
          status: 400,
          messenger: "lấy danh sách thất bại",
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  });


router.get("/get-list-user", async (req, res) => {
    try {
      //lấy ds nhà phần phối mới nhất
      const data = await Users.find().sort({ createdAt: -1 });
      if (data) {
        res.json({
          status: 200,
          messenger: "Lấy danh sách thành công",
          data: data,
        });
      } else {
        res.json({
          status: 400,
          messenger: "lấy danh sách thất bại",
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  });




  
  module.exports = router;