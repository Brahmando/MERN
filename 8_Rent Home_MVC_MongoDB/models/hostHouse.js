const { getDB } = require("../database/dbConnect");
const { ObjectId } = require('mongodb');


const House = class House {
    constructor(name, email, city, state, imgUrl) {

        this.name = name;
        this.email = email;
        this.city = city;
        this.state = state;
        this.imgUrl = imgUrl;
    }

    createHouse() {
        try {
            // Check if house with the same email exists
            return getDB().collection('House').insertOne(this).then(result => {
                console.log(result)
            })
            // Return the newly created house

        } catch (error) {
            console.error('Error creating house:', error);
            throw error;
        }
    }

    static async allHouses() {
        try {
            const houses = await getDB().collection('House').find({}).toArray();
            console.log(houses)
            return houses;
        } catch (error) {
            console.error('Error retrieving houses:', error);
            throw error;
        }
    }

    static  async deleteHouse(id) {
        try {
            const result = await getDB().collection('House').deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (error) {
            console.error('Error deleting house:', error);
            throw error;
        }
    }


}

module.exports = House;
