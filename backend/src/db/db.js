const mongoose = require("mongoose")
function connectDB() {

    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to DB")
    })
    .catch((e) => {
        console.log("Error at Server : ", e);
    })
}
module.exports = connectDB;