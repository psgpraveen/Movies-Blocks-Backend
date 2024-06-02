const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Movies-Blocks';

const PersonSchema = new mongoose.Schema({
  da: { type: Object, required: true }
});

const DBlist = async (i) => {
  try {
    await mongoose.connect(url);
    console.log('Connected successfully to server');

    // const PersonModel = mongoose.model('List', PersonSchema, 'List');
    const PersonModel = mongoose.models.List || mongoose.model('List', PersonSchema, 'List');

    const existingUser = await PersonModel.findOne({ da :i });

    if (existingUser) {
      return "list already exists";
    }

    const data = new PersonModel({ da :i });
    const result = await data.save();
    console.log('Document saved:', result);
    return "List created successfully";
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    mongoose.connection.close();
  }
};

module.exports = DBlist;
