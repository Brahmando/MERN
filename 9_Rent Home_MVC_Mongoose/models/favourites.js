const mongoose = require("mongoose");


const favouriteSchema = mongoose.Schema({
    house_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'HostHouse',
        required: true,
        unique: true
    }
})

module.exports= mongoose.model('Favs',favouriteSchema)