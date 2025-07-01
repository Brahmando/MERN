const mongoose = require('mongoose');

const houseSchema=new mongoose.Schema({
    name:{type:String, required: true},
    city:{type:String, required: true},
    state:{type:String, required: true},
    email:{type:String, required: true},
    imgUrl: String
})

// console.log(mongoose.model('HostHouse', houseSchema))

module.exports = mongoose.model('HostHouse', houseSchema)  //Similar to Table in SQL, this is a collection in MongoDB
// The model is used to interact with the database, such as creating, reading, updating, and deleting documents in the collection.
// The model is created using the schema defined above, which specifies the structure of the documents in the collection.