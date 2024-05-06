var db = require('./db');
const category = new db.mongoose.Schema(
    {
        CateName:{type:String, require:true}
    },
    {
        collection:'Category'//tên bảng
    }
);

let cateModel = db.mongoose.model('Category',category);
module.exports = {cateModel}