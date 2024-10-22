const mongoose = require('mongoose');

require('dotenv').config();

const URI = 'mongodb+srv://pranaybhandekar8841:2uMMbP6EGviQAJw3@cluster0.fkshi3c.mongodb.net/HackNight';

const connectDB = async() => {
    try{ 
        // await mongoose.connect(URI);
        await mongoose.connect(URI);
        console.log("Connection successful to DB");
    }
    catch(error){
        console.log(error.message);
        console.error("database connection failed");
        process.exit(0);
    }
};

module.exports = connectDB;



// usrname : kedarrothe05

// pass : WKzeMPwHQpoB4kb5
// https://storyset.com/login