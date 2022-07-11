const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost/inootbook"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected mongo succesFull")
    })
}
module.exports = connectToMongo;