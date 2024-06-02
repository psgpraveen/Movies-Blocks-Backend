const mongoose = require('mongoose');

const url = 'mongodb+srv://adm21002947:Gupta123@cluster0.syqwwwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Movies-Blocks';

const PersonSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: String,
  name: String
});

const DBmain = async (em, pass, na) => {
  try {
    await mongoose.connect(url);
    console.log('Connected successfully to server');

    const PersonModel = mongoose.models.Person ||mongoose.model('Person', PersonSchema, 'Person');
    const existingUser = await PersonModel.findOne({ email: em });

    if (existingUser) {
      return "Email already exists";
    }

    const data = new PersonModel({ email: em, password: pass, name: na });
    const result = await data.save();
    console.log('Document saved:', result);
    return "Account created successfully";
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

module.exports = DBmain;
