const fs = require('fs')
const db = require('../database/db')
const favourite = class Favourite {
    static async save(id) {
        const favData = await Favourite.allFav();
        console.log('favData-',favData)
        const isFavExist = favData.some(fav => fav.house_id == id);

            if(isFavExist) {
                console.log("Fav already exist")
                return; // or handle as needed, e.g., throw an error or return a message
                
            }else{
                console.log("Saving fav")
                await db.query('INSERT INTO favourites (house_id) VALUES (?)', [id]);
                console.log("Fav saved successfully")
                return
            }

        }

    


    static async remove(id) {
        // Remove the favourite with the given house_id from the database
        await db.query('DELETE FROM favourites WHERE house_id = ?', [id]);
        // Only reset AUTO_INCREMENT if the table is empty
        const [rows] = await db.query('SELECT COUNT(*) as count FROM favourites');
        if (rows[0].count === 0) {
            await db.query('ALTER TABLE favourites AUTO_INCREMENT = 1');
        }
        
        console.log(`Favourite with house_id ${id} removed successfully`);
    }

    static async allFav() {
        await db.query('CREATE TABLE IF NOT EXISTS favourites(id INT AUTO_INCREMENT PRIMARY KEY, house_id INT NOT NULL, FOREIGN KEY (house_id) REFERENCES houses(id))');
        const [rows] = await db.query('SELECT * FROM favourites');
        return rows;
    }
}

module.exports = favourite
