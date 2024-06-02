const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Movies-Blocks';

const PersonSchema = new mongoose.Schema({
  da: { type: Object, required: true }
});

const DBlistGet = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connected successfully to server');

    const PersonModel = mongoose.model('List', PersonSchema, 'List');
    const existingUsers = await PersonModel.find({ });

    if (existingUsers && existingUsers.length > 0) {
      return existingUsers.map(user => user.da);
    }

    return "List is not Fetched";
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await mongoose.connection.close(); 
  }
};

module.exports = DBlistGet;
