const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Movies-Blocks';

const PersonSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: String
});

const SigninDB = async (em, pass) => {
  try {
    await mongoose.connect(url);
    console.log('Connected successfully to server');

    const PersonModel = mongoose.model('Person', PersonSchema, 'Person');
    const existingUser = await PersonModel.findOne({ email: em});

    if (existingUser.email !== em) {
        return "Email is not register"
    }else if(existingUser.password!== pass){
        return "Password wrong"
    }else{
          return existingUser;
      } 

  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    mongoose.connection.close();
  }
};

module.exports = SigninDB;
