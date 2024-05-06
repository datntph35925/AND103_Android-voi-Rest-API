var db = require('./db');
const jwt = require('jsonwebtoken');//  Cần chạy lệnh cài đặt: npm install jsonwebtoken --save
 require('dotenv').config(); // su dung thu vien doc file env:   npm install dotenv --save
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcrypt");


var userSchema = new db.mongoose.Schema(
    {
        Email: { type: String, required: true },
        Password: { type: String, required: true },
        FullName: { type: String, required: false },
        token: {  // trường hợp lưu nhiều token thì phải dùng mảng. Trong demo này sẽ dùng 1 token
            type: String,
            required: false
        }
    }, { collection: 'Account' }
);




/**
* Hàm tạo token để đăng nhập với API
* @returns {Promise<*>}
*/
userSchema.methods.generateAuthToken = async function () {


    const user = this
    console.log(user)
    const token = jwt.sign({ _id: user._id, Email: user.Email }, chuoi_ky_tu_bi_mat)
    // user.tokens = user.tokens.concat({token}) // code này dành cho nhiều token, ở demo này dùng 1 token
    user.token = token;
    await user.save()
    return token
}


/**
* Hàm tìm kiếm user theo tài khoản
* @param Email
* @param Password
* @returns {Promise<*>}
*/
userSchema.statics.findByCredentials = async (Email, Password) => {


    const user = await userModel.findOne({ Email:Email })
    if (!user) {
        throw new Error({ error: 'Không tồn tại user' })
    }
    const isPasswordMatch = await bcrypt.compare(Password, user.Password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Sai password' })
    }
    return user
}






let userModel = db.mongoose.model('Account', userSchema);
module.exports = { userModel };

