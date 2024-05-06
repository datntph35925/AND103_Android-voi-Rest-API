var express = require('express');
var router = express.Router();

const Distributors = require('../models/distributors');
const Fruits = require('../models/fruits');
const Students = require('../models/students');
const sinhviens = require('../models/sinhviens');
const Teachers = require('../models/teachers');
const Sachs = require('../models/sachs');

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
          so_trang_ph35925: data.so_trang_ph35925,
          the_loai_ph35925: data.the_loai_ph35925,
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

//Api thêm distributor
router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body 
        const newDistributors = new Distributors({
          name: data.name
        }); // Tạo một đối tượng mới
        const result = await newDistributors.save(); //Thêm vào database
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
module.exports = router;

router.post('/add-fruit', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body
        const newfruit = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description : data.description,
            id_distributor: data.id_distributor
        }); // Tạo một đối tượng mới
        const result = await newfruit.save(); //Thêm vào database
        if(result)
        {
            // Nếu thêm thành công result Inull trả về dữ liệu
            res.json({
                "status": 200,
                "messenger" : "Thêm thành công",
                "data": result
            })
        }else
        {
                // Nếu thêm không thành công result null, thông báo không thành công
                res.json({
                "status": 400,
                "messenger": "Lỗi, thêm không thành công",
                "data": []
                })
        }
    } catch (error) {
        console.log(error);
        }
});

router.get('/get-list-fruit', async (req, res) => {
    try {
        const data = await Fruits.find().populate('id_distributor');
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data
        })
    } catch (error) {
    console.log(error);
    }
});

router.get('/get-fruit-by-id/:id', async (req, res) => {
    //:id param
    try {
        const {id} = req.params // lấy dữ liệu thông qua : id trên url gọi là param
        const data = await Fruits.findById(id).populate('id_distributor');
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data
        })
    } catch (error) {
    console.log(error);
    }
});

router.get('/get-list-fruit-in-price', async (req, res) => {
    try {
        const { price_start, price_end } = req.query; // Dùng dấu '=' thay vì ':'
        const query = { price: { $gte: price_start, $lte: price_end } }; // Sử dụng object để tạo query

        const data = await Fruits.find(query, 'name quantity price id_distributor')
                                .populate('id_distributor')
                                .sort({quantity: -1}) // Sắp xếp theo quantity giảm dần
                                .skip(0) // Bỏ qua 0 sản phẩm (không cần thiết)
                                .limit(2); // Giới hạn kết quả trả về thành 2 sản phẩm

        res.json({
            status: 200,
            message: "Danh sách fruit", // Sửa từ "messenger" thành "message"
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Lỗi server" }); // Phản hồi với mã lỗi 500 nếu có lỗi xảy ra
    }
});

router.get('/get-list-fruit-have-name-a-or-x', async (req, res) => {
    //:id param
    try {
        const query = {$or: [
            {name: {$regex: 'T'}},
            {name: {$regex: 'X'}},
        ]}
        // truyền câu điền kiện, và chỉ lấy các trường mong muốn
        const data = await Fruits.find( query, 'name quantity price id_ditributor') .populate('id_distributor')
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data
        })
    } catch (error) {
    console.log(error);
    }
});

router.put('/update-fruit-by-id/:id', async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body; // lấy dữ liệu từ body
        const updatefruit = await Fruits.findById(id)
        let result = null;
        if(updatefruit){
            updatefruit.name = data.name ?? updatefruit.name;
            updatefruit.quantity = data.quantity ?? updatefruit.quantity,
            updatefruit.price = data.price ?? updatefruit.price,
            updatefruit.status = data.status ?? updatefruit.status,
            updatefruit.image = data.image ?? updatefruit.image,
            updatefruit.description = data.description ?? updatefruit.description,
            updatefruit. id_distributor = data.id_distributor ?? updatefruit.id_distributor
            result = await updatefruit.save();
        }
        if(result)
        {
        // Nếu thêm thành công result Inull trở về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Cập nhật thành công",
                "data": result
            })
        }else{
            // Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, Cập nhật không thành công",
                "data":[]
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.delete('/destroy-fruit-by-id/:id', async (req, res)=>{
    try {
        const {id} = req.params
        const result = await Fruits.findByIdAndDelete(id);
        if (result)
        {
            //Nếu xóa thành công sẽ trả về thông item đã xóa
            res.json({
                "status": 200,
                "messenger" : "Xóa thành công",
                "data": result
            })
        }else
        {
            res.json({
                "status": 400,
                "messenger": "Lỗi, Xóa không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

const Upload = require('../config/common/upload')
router.post('/add-fruit-with-file-image', Upload.array('image', 5), async(req, res) =>{
  //Upload.array('image', 5) => up nhiều file tối đa 5 
  //Upload.single('image') => up 1 file

  try {
    const data = req.body;
    const {files} = req //files nếu upload nhiều, file nếu upload 1 file
    const urlsImage = files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`)

    const newFruit = new Fruits({ 
      name: data.name,
      quantity: data.quantity,
      price: data.price,
      status: data.status,
      image: urlsImage,
      description: data.description,
      id_distributor: data.id_distributor,
    })

    const result = await newFruit.save();
    if(result){
      res.json({
        "status":200,
        "messenger": 'Them thanh cong',
        "data": result
      })
    } else{
      res.json({
        "status":400,
        "messenger": 'Them that bai',
        "data": []
      })
    }
  } catch (error) {
    console.log(error)
  }
})


const User = require('../models/users');
const Transporter = require('../config/common/mail');
const users = require('../models/users');
router.post('/register-send-email', Upload.single('avatar'), async(req, res) => {
  try {
    const data = req.body;
    const {file} = req;
    const newUser = users({
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      avata: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
    })

    const result = await newUser.save();
    if(result)
    {
      //gui mail
      const mailOptions  = {
        from: "datntph35925@fpt.edu.vn", //email gui di
        to: result.email, //email nhan
        subject: 'Dang ky thanh cong',
        text: 'Ngo Thanh Dat'
      };

      await Transporter.sendMail(mailOptions); //gui mail
      res.json({
        "status": 200,
        "messenger": "them thanh cong",
        "data": result
      })
    } else{
      res.json({
        "status": 400,
        "messenger": "them that bai",
        "data": []
      })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;

//get danh sach distributors
//lấy ds nhà phần phối
router.get("/get-list-distributor", async (req, res) => {
    try {
      //lấy ds nhà phần phối mới nhất
      const data = await Distributors.find().sort({ createdAt: -1 });
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
  //tìm kiếm nhà phân phối
  router.get("/search-distributor", async (req, res) => {
    try {
      const key = req.query.key;
      const data = await Distributors.find({
        name: { $regex: key, $options: "i" },
      }).sort({ createdAt: -1 });
      if (data) {
        res.json({
          status: 200,
          messenger: "Tìm thành công",
          data: data,
        });
      } else {
        res.json({
          status: 400,
          messenger: "tìm thất bại",
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
  //viết api để xóa nhà phân phối theo id
  router.delete("/delete-distributor-by-id/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Distributors.findByIdAndDelete(id);
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
  //api update nha phân phối
  router.put("/update-distributor-by-id/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await Distributors.findByIdAndUpdate(id, {
        name: data.name,
      });
      if (result) {
        res.json({
          status: 200,
          messenger: "tìm thấy id và update thành công",
          data: result,
        });
      } else {
        res.json({
          status: 400,
          messenger: "update thất bại",
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

//Api thêm distributor
router.post('/add-student', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body 
        const newStudents = new Students({
            masv: data.masv,
            hoten: data.hoten,
            diem: data.diem
        }); // Tạo một đối tượng mới
        const result = await newStudents.save(); //Thêm vào database
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

router.get("/get-list-student", async (req, res) => {
    try {
      //lấy ds nhà phần phối mới nhất
      const data = await Students.find().sort({ createdAt: -1 });
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

  router.get("/search-student", async (req, res) => {
    try {
      const key = req.query.key;
      const data = await Students.find({
        hoten: { $regex: key, $options: "i" },
      }).sort({ createdAt: -1 });
      if (data) {
        res.json({
          status: 200,
          messenger: "Tìm thành công",
          data: data,
        });
      } else {
        res.json({
          status: 400,
          messenger: "tìm thất bại",
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  router.put("/update-student-by-id/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await Students.findByIdAndUpdate(id, {
        masv: data.masv,
        hoten: data.hoten,
        diem: data.diem
      });
      if (result) {
        res.json({
          status: 200,
          messenger: "tìm thấy id và update thành công",
          data: result,
        });
      } else {
        res.json({
          status: 400,
          messenger: "update thất bại",
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  router.delete("/delete-student-by-id/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Students.findByIdAndDelete(id);
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

  router.get("/get-list-sinhvien", async (req, res) => {
    try {
      //lấy ds nhà phần phối mới nhất
      const data = await sinhviens.find().sort({ createdAt: -1 });
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

  router.post('/add-sinhvien', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body 
        const newStudents = new sinhviens({
          hoten_ph35925: data.hoten_ph35925,
          quequan_ph35925: data.quequan_ph35925,
          diem_ph35925: data.diem_ph35925,
          hinh_anh_ph35925: data.hinh_anh_ph35925
        }); // Tạo một đối tượng mới
        const result = await newStudents.save(); //Thêm vào database
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

router.delete("/delete-sinhvien-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sinhviens.findByIdAndDelete(id);
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

router.put("/update-sinhvien-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await sinhviens.findByIdAndUpdate(id, {
      hoten_ph35925: data.hoten_ph35925,
      quequan_ph35925: data.quequan_ph35925,
      diem_ph35925: data.diem_ph35925,
      hinh_anh_ph35925: data.hinh_anh_ph35925
    });
    if (result) {
      res.json({
        status: 200,
        messenger: "tìm thấy id và update thành công",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        messenger: "update thất bại",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/add-teacher', async (req, res) => {
  try {
      const data = req.body; // Lấy dữ liệu từ body 
      const newTeachers = new Teachers({
        hoten_ph35925: data.hoten_ph35925,
        quequan_ph35925: data.quequan_ph35925,
        chuyen_nganh_ph35925: data.chuyen_nganh_ph35925,
        luong_ph35925: data.luong_ph35925,
        hinh_anh_ph35925: data.hinh_anh_ph35925,
      }); // Tạo một đối tượng mới
      const result = await newTeachers.save(); //Thêm vào database
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

router.get("/get-list-teacher", async (req, res) => {
  try {
    //lấy ds nhà phần phối mới nhất
    const data = await Teachers.find().sort({ createdAt: -1 });
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

router.put("/update-teacher-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await Teachers.findByIdAndUpdate(id, {
      hoten_ph35925: data.hoten_ph35925,
      quequan_ph35925: data.quequan_ph35925,
      chuyen_nganh_ph35925: data.chuyen_nganh_ph35925,
      luong_ph35925: data.luong_ph35925,
      hinh_anh_ph35925: data.hinh_anh_ph35925,
    });
    if (result) {
      res.json({
        status: 200,
        messenger: "tìm thấy id và update thành công",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        messenger: "update thất bại",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete-teacher-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Teachers.findByIdAndDelete(id);
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