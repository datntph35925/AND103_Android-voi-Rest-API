const mongoose = require('mongoose')
const Scheme = mongoose.Schema;

const Users = new Scheme({
    usename: {type: String, unique: true, maxLength: 255},
    password: {type: String, maxLength: 255},
    email: {type: String, unique: true},
    name: {type: String},
    avata: {type: String},
    available: {type: Boolean, default: false},
},{
    timestamps: true
})

module.exports = mongoose.model('user', Users)

/** mongoose.model('users', Users)
 *  dat ten collection , dat o dang so it
 * thu vien mogoose se tu tao collection so nhieu (users => userss)
 * 
 * 
 * type: String , boolean: kieu du lieu
 * unique: true: ko dc trung
 * maxLength: 255: ky tu toi da
 *  default:false: mac dinh la false
 * timestamps: Tao ra 2 truong createAt va updateAt
*/