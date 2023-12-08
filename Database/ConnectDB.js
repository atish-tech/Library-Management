const mongoose = require('mongoose')
const local = "mongodb://127.0.0.1/Library-Management"
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://aatish:aatish.cloud@realtimechatappdb.5xmnrv8.mongodb.net/?retryWrites=true&w=majority")
        console.log("Database is connected");
    }
    catch (error) {
        console.log("Database in not connected" , error.message);
    }
}

module.exports = connectDB;