const db = require('../database/db');

const House = class House {
    constructor(id, name, email, city, state, imgUrl) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.city = city;
        this.state = state;
        this.imgUrl = imgUrl;
    }

    static async createHouse(name, email, city, state, imgUrl) {
        try {
            // Check if house with the same email exists
            const [existingHouses] = await db.query('SELECT * FROM houses WHERE email = ?', [email]);
            if (existingHouses.length > 0) {
                console.log('House already exists');
                return existingHouses[0];
            }

            // Insert new house into database
            const [result] = await db.query(
                'INSERT INTO houses (name, email, city, state, imgUrl) VALUES (?, ?, ?, ?, ?)',
                [name, email, city, state, imgUrl]
            );

            

            // Return the newly created house
            return new House(result.insertId, name, email, city, state, imgUrl);
        } catch (error) {
            console.error('Error creating house:', error);
            throw error;
        }
    }

    static async allHouses() {
        const [rows] = await db.query("SELECT * FROM houses");
        if(rows.length === 0) {
            console.log('No houses found in the database.');
            return rows;
        }
        return rows;
    }

    static async deleteHouse(id) {
        try {
            const [result] = await db.query('DELETE FROM houses WHERE id = ?', [id]);
            // Only reset AUTO_INCREMENT if the table is empty
            const [rows] = await db.query('SELECT COUNT(*) as count FROM houses');
            if (rows[0].count === 0) {
                await db.query('ALTER TABLE houses AUTO_INCREMENT = 1');
            }
            return result;
        } catch (error) {
            console.error('Error deleting house:', error);
            throw error;
        }
    }


}

module.exports = House;
