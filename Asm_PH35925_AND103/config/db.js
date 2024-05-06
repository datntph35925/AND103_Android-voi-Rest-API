const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const local = "mongodb://127.0.0.1:27017/QL_ASM";

const connect = async () => {
  try {
    await mongoose.connect(local, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    });
    console.log('Kết nối thành công');
  } catch (error) {
    console.error('Lỗi kết nối:', error);
  }
};

module.exports = { connect };
