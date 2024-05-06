const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Sachs = new Scheme({
    ma_sach_ph35925: {type: String, required: true },
    tieu_de_ph35925: {type: String, required: true},
    tac_gia_ph35925: {type: String, required: true},
    nam_xuat_ban_ph35925: {type: String, required: true},
    the_loai_ph35925: {type: String, required: true},
    so_trang_ph35925: {type: String, required: true},
    don_gia_ph35925: {type: String, required: true},
    so_luong_ph35925: {type: Number, default:0},
    so_luong_ban_ph35925: {type: Number, default:0},
    hinh_anh_ph35925: {type: String},
},{
    timestamps: true
})

module.exports = mongoose.model('sach',Sachs)