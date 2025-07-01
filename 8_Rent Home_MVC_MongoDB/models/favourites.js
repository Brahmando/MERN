const fs = require('fs');
const { getDB, getFavs } = require('../database/dbConnect');
const favourite = class Favourite {
    static async save(id) {
        const favData = await Favourite.allFav();
        console.log('favData-', favData)
        const isFavExist = favData.some(fav => fav.house_id == id);

        if (isFavExist) {
            console.log("Fav already exist")
            return; // or handle as needed, e.g., throw an error or return a message

        } else {
            console.log("Saving fav")
            await getFavs().collection('Favourites').insertOne({house_id: id})
            console.log("Fav saved successfully")
            return
        }

    }




    static async remove(id) {
        // Remove the favourite with the given house_id from the database
        await getFavs().collection('Favourites').deleteOne({ house_id: id });

        console.log(`Favourite with house_id ${id} removed successfully`);
    }

    static async allFav() {
        const Favs = await getFavs().collection('Favourites').find({}).toArray();
        return Favs;
    }
}

module.exports = favourite
