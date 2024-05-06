var db = require('./db');
const billDetails = new db.mongoose.Schema(
    {
        BillID:{type:String, require:true},
        ProductID:{type:String,require:true},
        Quantity:{type:Number,require:true}
    },
    {
        collection:'BillDetails'//tên bảng
    }
);

let billDetailsModel = db.mongoose.model('BillDetails',billDetails);
module.exports = {billDetailsModel}