var express = require('express');
var router = express.Router();

const Thi_134s = require('../models/Thi_134s');

router.get("/get-list-thi_134", async (req, res) => {
    try {
      //lấy ds nhà phần phối mới nhất
      const data = await Thi_134s.find().sort({ createdAt: -1 });
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

router.post('/add-thi_134', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body 
        const newThi_134s = new Thi_134s({
            ho_ten_ph35925: data.ho_ten_ph35925,
            mon_thi_ph35925: data.mon_thi_ph35925,
            ngay_thi_ph35925: data.ngay_thi_ph35925,
            ca_thi_ph35925: data.ca_thi_ph35925,
            hinh_anh_ph35925: data.hinh_anh_ph35925,
        }); // Tạo một đối tượng mới
        const result = await newThi_134s.save(); //Thêm vào database
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

  router.delete("/delete-thi_134-by-id/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Thi_134s.findByIdAndDelete(id);
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


  router.get('/get-thi_134-by-id/:id', async (req, res) => {
    //:id param
    try {
        const {id} = req.params // lấy dữ liệu thông qua : id trên url gọi là param
        const data = await Thi_134s.findById(id);
        res.json({
            "status": 200,
            "messenger": "Chi tiết bản ghi",
            "data": data
        })
    } catch (error) {
    console.log(error);
    }
});

const Upload = require('../config/common/upload');

router.post('/add-thi_134-with-file-image', Upload.single('hinh_anh_ph35925'), async (req, res) => {
    try {
        const data = req.body;
        let urlsImage = [];
        if (req.file && req.file.filename) {
            // Thay localhost bằng địa chỉ IP của máy chủ
            const ipAddress = "10.24.24.193"; // Thay bằng địa chỉ IP thực tế của máy chủ
            urlsImage.push(`http://${ipAddress}:${req.app.get("port")}/uploads/${req.file.filename}`);
        }

        // Chuyển đổi urlsImage thành chuỗi
        const urlsImageString = urlsImage.join(', ');

        const newThi_134s = new Thi_134s({
            ho_ten_ph35925: data.ho_ten_ph35925,
            mon_thi_ph35925: data.mon_thi_ph35925,
            ngay_thi_ph35925: data.ngay_thi_ph35925,
            ca_thi_ph35925: data.ca_thi_ph35925,
            hinh_anh_ph35925: urlsImageString,
        });

        const result = await newThi_134s.save();
        if (result) {
            res.json({
                "status": 200,
                "messenger": 'Thêm thành công',
                "data": result
            });
        } else {
            res.json({
                "status": 400,
                "messenger": 'Thêm thất bại',
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get("/search-thi_134", async (req, res) => {
    try {
      const key = req.query.key;
      const regex = new RegExp(key, "i"); // Tạo regular expression từ key với cờ "i" để không phân biệt chữ hoa và chữ thường
      const data = await Thi_134s.find({
        $or: [
          { ho_ten_ph35925: { $regex: regex } }, // Tìm kiếm trong ho_ten_ph35925
          { mon_thi_ph35925: { $regex: regex } }  // Tìm kiếm trong mon_thi_ph35925
        ]
      }).sort({ createdAt: -1 });
      if (data.length > 0) {
        res.json({
          status: 200,
          message: "Tìm thành công",
          data: data,
        });
      } else {
        res.json({
          status: 400,
          message: "Không tìm thấy kết quả",
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, message: "Lỗi server" });
    }
  });