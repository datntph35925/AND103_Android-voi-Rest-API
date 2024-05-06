const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Users = new Scheme({
    Email: {type: String},
    Password: {type: String},

},{
    timestamps: true
})

module.exports = mongoose.model('user',Users)