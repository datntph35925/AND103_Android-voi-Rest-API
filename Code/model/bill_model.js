var db = require('./db');
const bill = new db.mongoose.Schema(
    {
        Date:{type:String, require:true},
        UserID:{type:String,require:true}
    },
    {
        collection:'Bill'//tên bảng
    }
);

let billModel = db.mongoose.model('Bill',bill);
module.exports = {billModel}