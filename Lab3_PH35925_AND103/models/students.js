const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Students = new Scheme({
    masv: {type: String},
    hoten: {type: String},
    diem: {type: String},
},{
    timestamps: true
})

module.exports = mongoose.model('student',Students)