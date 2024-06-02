const mongoose = require('mongoose');


const url = 'mongodb+srv://adm21002947:Gupta123@cluster0.syqwwwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Movies-Blocks';

const PersonSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: String
});

const SigninDB = async (em, pass) => {
  try {
    await mongoose.connect(url);
    console.log('Connected successfully to server');

    const PersonModel = mongoose.models.Person || mongoose.model('Person', PersonSchema, 'Person');
    const existingUser = await PersonModel.findOne({ email: em});

    if (!existingUser) {
      return "Email is not registered";
    } else if (existingUser.password !== pass) {
      return "Password wrong";
    } else {
      return existingUser;
    }

  } catch (error) {
    console.error('Error:', error);
    throw error;
  } 
};

module.exports = SigninDB;
