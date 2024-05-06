var db = require('./db');
const product = new db.mongoose.Schema(
    {
        ProductName:{type:String, require:true},
        Description:{type:String,require:true},
        Price:{type:Number,require:true},
        CateID:{type:String,require:true},
        Image:{type:String,require:false}
    },
    {
        collection:'Product'//tên bảng
    }
);

let ProductModel = db.mongoose.model('Product',product);
module.exports = {ProductModel}