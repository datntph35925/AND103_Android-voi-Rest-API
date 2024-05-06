const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
//doi vs mongo dung compat
const local = 'mongodb://127.0.0.1:27017/Lab3'

const connect = async () =>{
     try{
          await mongoose.connect(local /*truyen bien database muon connect */, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
          console.log('Connect thanh cong')
     } catch(error){
        console.log(error)
        console.log('Connect that bai')
     }
}

module.exports ={connect}