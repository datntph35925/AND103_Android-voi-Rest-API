const mogoose = require('mongoose')
const Scheme = mogoose.Schema;

const Fruits = new Scheme({
    name: {type: String,},
    quantity:{type: Number},
    price: {type: Number},
    status: {type: Number},// status = 1=> con hang, status = 0 => het hang, status = -1=> ngung ban
    image:{type: Array},
    description: {type: String},
    id_distributor: {type: Scheme.Types.ObjectId, ref: 'distributor'}
},{
    timestamps: true
})

module.exports = mogoose.model('fruit', Fruits)
//type: Scheme.Types.ObjectId: kieu du lieu id cua mongbd
//ref: khoa ngoai