const fs = require('fs');
const { all } = require('../routes/homeRouter');
let houseArray = []
const House = class House {
    constructor(name, email, city, state, imgUrl) {
        this.name = name;
        this.email = email;
        this.city = city;
        this.state = state;
        this.imgUrl = imgUrl;
    }

    createHouse(name, email, city, state, imgUrl) {
        House.allHouses((houses) => {
            console.log(houses)
            if (houses.length) {
                console.log("House exist")
                houseArray=houses;

                const existingHouse = houseArray.find(h => h.email === email);
                if (existingHouse) {
                    console.log('House already exists');
                    return existingHouse;
                } else {
                    console.log('House does not exist, creating a new one');
                }
            }

            console.log("next  running")

            // Check if the house already exists
            const newHome= new House(name, email, city, state, imgUrl)
            newHome.id=Math.random()
            houseArray.push(newHome);
            fs.writeFile('/home/subhammajumder/Projects/NodeJs/Practice/Practice 2/6_Rent Home_MVC/data/house.json', JSON.stringify(houseArray), (err) => {
                if (err) {
                    console.error('Error writing to file', err);
                } else {
                    console.log('House data saved successfully');
                }
            });

        }


        );

    }

    static allHouses(callback) {
        fs.readFile('/home/subhammajumder/Projects/NodeJs/Practice/Practice 2/6_Rent Home_MVC/data/house.json', (err, data) => {
            if (err) {
                console.error('Error reading file', err);
                callback([]);
                return;
            }
            let houses = [];
            try {
                if (data && data.length > 0) {
                    houses = JSON.parse(data);
                }
            } catch (e) {
                console.error('Invalid JSON in house.json:', e);
                houses = [];
            }
            callback(houses);
        });
    }

    static deleteHouse(id,callback){
        let currHouses=[]
        House.allHouses((houses)=>{
             currHouses=houses.filter((house)=> house.id!=id)
             fs.writeFile('/home/subhammajumder/Projects/NodeJs/Practice/Practice 2/6_Rent Home_MVC/data/house.json',JSON.stringify(currHouses),(err)=>{
                
                callback(err);  
                
             })
        })
    }

}


module.exports = House;