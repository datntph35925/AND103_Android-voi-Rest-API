const mogoose = require('mongoose')
const Schema = mogoose.Schema;

const Distributor = new Schema({
    name: {type: String},
}, {
    timestamps: true
})

module.exports = mogoose.model('distributor', Distributor)