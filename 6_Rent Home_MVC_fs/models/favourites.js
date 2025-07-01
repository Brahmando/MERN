const fs = require('fs')
const favourite = class Favourite {
    static save(id,callback) {
        Favourite.allFav((favData)=>{
            const isFavExist= favData.some(fav=> fav==id)

            if(isFavExist) {
                console.log("Fav already exist")
                callback()
                
            }else{
                favData.push(id)
                fs.writeFile('/home/subhammajumder/Projects/NodeJs/Practice/Practice 2/6_Rent Home_MVC/data/favourite.json', JSON.stringify(favData), (err) => {
                callback(err)
                })
            }

        })

    }

    static remove(id,callback) {
       Favourite.allFav((favData)=>{
        // const index = favData.indexOf(id)
        const newFavData=favData.filter(favId=> favId!=id)
        console.log(newFavData)
        fs.writeFile('/home/subhammajumder/Projects/NodeJs/Practice/Practice 2/6_Rent Home_MVC/data/favourite.json', JSON.stringify(newFavData), (err) => {
                callback(err)
                })
       })
    }

    static allFav(callback) {
        fs.readFile('/home/subhammajumder/Projects/NodeJs/Practice/Practice 2/6_Rent Home_MVC/data/favourite.json', (err, data) => {
            if (err) {
                console.log(err)
                callback([])
            }
            else {
                if (data.length === 0) {
                    // File is empty, return empty array
                    callback([])
                } else {
                    try {
                        console.log(data,data.toString())
                        const favData = JSON.parse(data.toString())
                        callback(favData)
                    } catch (parseErr) {
                        console.log(parseErr)
                        callback([])
                    }
                }
            }
        })
    }
}

module.exports = favourite
