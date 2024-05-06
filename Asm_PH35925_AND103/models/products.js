const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Products = new Scheme({
    ProductName: {type: String},
    Desc: {type: String},
    Price: {type: Number},
    Image: {type: String},
    CateId: {type: String},
    
    
},{
    timestamps: true
})

module.exports = mongoose.model('product',Products)