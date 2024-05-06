const mongoose = require('mongoose');
const { route } = require('../routes');
const Scheme = mongoose.Schema;

const Fruits = new Scheme({
    name: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    status: {type: Number}, // status = 1 => Còn hàng, B => Hết hàn, -1 => Ngưng kinh doanh,
    image: {type: Array}, // Kiểu dữ liệu danh sách
    description: {type: String},
    id_distributor: {type: Scheme.Types.ObjectId, ref: 'distributor'},
},{
    timestamps: true
    })
    module.exports = mongoose.model('fruit', Fruits)
// Api thêm fruit
route.post('/add-fruit',async (req,res)=>{
    try{
        const data = req.body;
        const newfruit = new Fruits({
            name: data.name,
            quantity : data.quantity,
            price : data.quantity,
            status : data.quantity,
            image : data.quantity,
            description : data.description,
            id_distributor : data.id_distributor
        });
        const result = await newfruit.save();
        if(result){
            res.json({
                "start" : 200,
                "messenger" : "Lỗi, thêm không thành công",
                "data": []
            })
        }
    }catch(error){
        console.log(error);
    }
});

route.get('/get-list-fruit',async(req,res)=>{
    try{
        const data = await Fruits.find().populate('id_distributor');
        res.json({
            "start" : 200,
            "messenger" : "Danh sách fruit",
            "data": data
        })
    }catch(error){
        console.log(error);
    }
});

