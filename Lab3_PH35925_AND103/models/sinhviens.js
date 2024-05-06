const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const sinhviens = new Scheme({
    hoten_ph35925: {type: String, required: true },
    quequan_ph35925: {type: String, required: true},
    diem_ph35925: {type: Number, default:0},
    hinh_anh_ph35925: {type: String},
},{
    timestamps: true
})

module.exports = mongoose.model('sinhvien',sinhviens)