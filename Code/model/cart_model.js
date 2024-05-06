var db = require('./db');
const bill = new db.mongoose.Schema(
    {
        ProductID:{type:String, require:true},
        UserID:{type:String, require:true},
        Quantity:{type:Number,require:true}
    },
    {
        collection:'Cart'//tên bảng
    }
);

let cartModel = db.mongoose.model('Cart',bill);
module.exports = {cartModel}