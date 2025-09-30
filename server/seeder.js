const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');
const Plant = require('./models/Plant');

// Connect to DB
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/plant-nursery';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Read JSON files
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));
const plants = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/plants_data.json'), 'utf-8'));

// Import data into DB
const importData = async () => {
  try {
    await User.deleteMany();
    await Plant.deleteMany();

    await User.insertMany(users);
    await Plant.insertMany(plants);

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await User.create({
        fullname: 'Admin User',
        email: 'admin@example.com',
        username: 'admin',
        password: 'adminpassword', // In a real app, you should hash the password
        isAdmin: true,
      });
      console.log('Admin user created!');
    }

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// Destroy data
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Plant.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
