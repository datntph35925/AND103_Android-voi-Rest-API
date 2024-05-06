var express = require('express')
var router = express.Router();

//them model
const Distributors = require('../models/distributors')
const Fruits = require('../models/fruits')
//Api them Distributors
router.post('/add-distributor', async(req, res) => {
    try {
        const data = req.body; //lay du lieu tu body
        const newDistributors = new Distributors({
            name: data.name
        })  //Tao 1 doi tuong moi
        const result = await newDistributors.save();//them vao database
        if(result){
            //neu them thanh cong
            res.json({
                "status" : 200,
                "messenger": "Them thanh cong",
                "data" : result
            })
        } else{
             //neu ko them thanh cong
             res.json({
                "status" : 400,
                "messenger": "Loi, them ko thanh cong",
                "data" : []
            })
        }
    } catch (error) {
        console.log(error)
    }
});

////lấy ds nhà phần phối
router.get('/get-list-distributor', async(req, res) =>{
    try {
        //Lay danh sach theo thu tu moi nhat
        const data = await Distributors.find().sort({createdAt: -1});
        if(data){
            //tra ve danh sach
            res.json({
                "status": 200,
                "messenger": "thanh cong",
                "data" : data
            })
        } else{
            res.json({
                "status": 400,
                "messenger": "that bai",
                "data" : []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

//lấy ds nhà phần phối
router.get("/get-list-distributor", async (req, res) => {
    try {
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

  //lấy ds nhà phần phối
router.get("/get-list-distributor", async (req, res) => {
    try {
      const data = await Distributors.find().sort({ createdAt: -1 });

      //nếu lấy dữ liêuj thành công
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
// api them Fruits
router.post('/add-fruit',async (req, res) => {
      try {
          const data = req.body; // lay du lieu tu body
          const newFruits = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description: data.description,
            id_distributor: data.id_distributor
          })//tao doi tuong moi

          const result =  await newFruits.save();// them vao database
          if(result){
            //neu them thanh cong
            res.json({
                "status" : 200,
                "messenger": "Them thanh cong",
                "data" : result
            })
          } else {
             //neu ko them thanh cong
             res.json({
                "status" : 400,
                "messenger": "Loi, them ko thanh cong",
                "data" : []
            })
          }
      } catch (error) {
        console.log(error)
      }
})


//truy van: get danh sach fruits    
router.get('/get-list-fruit', async(req, res) => {
    try {
        const data = await Fruits.find().populate('id_distributor')
        res.json({
            "status": 200,
            "messeger": "Danh sach fruit",
            "data" : data
        })
    } catch (error) {
        console.log(error)
    }
})

/***Get danh sách Fruits (danh sách trả về gồm: name, quantity, price, id_ditributor) 
nằm trong khoảng giá  (query giá cao nhất, giá thấp nhất)  và sắp xếp theo 
quantity (giảm dần)  */

router.get('/get-list-fruit-in-price', async(req, res) =>{
    //id: param
    try {
        const [price_start, price_end] = req.query // lay du lieu thong tin qua id tren url goi la param

        const query  =  {price: {$gte: price_start, $lte: price_end}}
        // $gte lon hon hoac bang, $ge lon hon
        // $lte nho hon hoac bang, $te nho hon
        // truyen dieu kien va chi lay cac truong mong muon

        const data = await Fruits.find(query, 'name quantily price id_distributor')
                                 .populate('id_distributor')
                                 .sort([quantity -1]) // giam dan= -1, tang dan = 1
                                 .skip(0) // bo qua so luong row
                                 .limit(2) // lay 2 san pham    
        
        res.json({
            "status": 200,
            "messenger": "Danh sach Fruit",
            "data": data
        })
    } catch (error) {
        console.log(error)
    }
})

/**Get danh sách Fruits (danh sách trả về gồm: name, quantity, price, id_ditributor) 
có chữ cái bắt đầu tên là A hoặc X  */

router.get('/get-list-fruit-have-name-a-or-x', async(req, res) =>{
    //id: param
    try {
        const query = {$or: [
            {name: {$regex: 'T'}},
            {name: {$regex: 'X'}},
        ]}
        // truyen dieu kien va chi lay cac truong mong muon
        const data = await Fruits.find(query, 'name quantily price id_ditributor')
                                 .populate('id_distributor')
        
        res.json({
            "status": 200,
            "messenger": "Danh sach Fruit",
            "data": data
        })
    } catch (error) {
        console.log(error)
    }
})

//API cap nhat fruit
router.put('/update-fruit-by-id/:id', async(req, res) => {
    try {
        const {id} = req.params
        const data = req.body
        const updatefruit = await Fruits.findById(id)// tim theo id
        let result = null
        if(updatefruit){
            updatefruit.name = data.name ?? updatefruit.name;
            updatefruit.quantity = data.quantity ?? updatefruit.quantity;
            updatefruit.price = data.price ?? updatefruit.price;
            updatefruit.status = data.status ?? updatefruit.status;
            updatefruit.image = data.image ?? updatefruit.image;
            updatefruit.description = data.description ?? updatefruit.description;
            updatefruit.id_distributor = data.id_distributor ?? updatefruit.id_distributor;
            result = await updatefruit.save()
        }

        //tao 1 doi tuong moi
        //them vao database
        if(result){
            res.json( {
                "status": 200,
                "messeger": "Cap nhat thanh cong",
                "data": result
            })
        } else{
            res.json({
                "status": 400,
                "messenger": "Loi, cap nhat thanh cong",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.delete('/destroy-fruit-by-id/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const result = await Fruits.findByIdAndDelete(id)
        if(result){
            res.json({
                "status": 200,
                "messenger": "Xoa thanh cong",
                "data": result
            })
        } else{
            res.json({
                "status": 400,
                "messenger": "Xoa that bai",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

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
        from: "hieudmph36042@fpt.edu.vn", //email gui di
        to: result.email, //email nhan
        subject: 'Dang ky thanh cong',
        text: 'Do Minh Hieu'
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