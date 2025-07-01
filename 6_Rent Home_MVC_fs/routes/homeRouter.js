const express = require('express');
const House = require('../models/hostHouse');
const favourite = require('../models/favourites');
const homeRouter = express.Router();
homeRouter.use(express.urlencoded({ extended: true }));

homeRouter.get('/', (req, res, next) => {
    res.render('home', { title: 'Home Page' });
}
);
homeRouter.get('/about', (req, res, next) => {
    res.render('about', { title: 'About Page' });
}
);
homeRouter.get('/contact', (req, res, next) => {
    res.render('contact', { title: 'Contact Page' });
}
);

homeRouter.get('/favourites', (req, res, next) => {
    House.allHouses((houses) => {
        favourite.allFav((favData) => {
            const favHouses = []
            favData.forEach((favId) => {
                const house = houses.find(house => house.id == favId)
                favHouses.push(house)
            })

            res.render('favourites', { favHouses, title: 'Favourite Page' });

        })
    })
})

homeRouter.post('/favourites', (req, res, next) => {
    // Assuming you have a way to get favourite houses, e.g., from a database or session
    // console.log(req.body)
    const { houseId } = req.body; // Assuming favouriteHouses is an array of house IDs
    favourite.save(houseId, err => {
        if (err) console.log(err)
        else {
            House.allHouses((houses) => {
                favourite.allFav((favData) => {
                    const favHouses = []
                    favData.forEach((favId) => {
                        const house = houses.find(house => house.id == favId)
                        favHouses.push(house)
                    })

                    res.render('favourites', { favHouses, title: 'Favourite Page' });

                })
            })
        }



    })
})

homeRouter.post('/favourites/remove', (req, res, next) => {
    const { houseId } = req.body;
    favourite.remove(houseId, (err) => {
        if (err) console.log(err)
        else {

            res.redirect('/favourites')
        }

    })
})



homeRouter.get('/home-lists', (req, res, next) => {
    House.allHouses((houses) => {

        res.render('storeLists', { houses, title: 'Home Lists Page' });
    })
}
);

homeRouter.get('/add-home', (req, res, next) => {
    res.render('add-home', { title: 'Home Page' });
}
);



homeRouter.post('/add-home', (req, res, next) => {
    console.log(req.body)
    const { name, email, city, state, imageUrl } = req.body;
    console.log(imageUrl)
    const newHouse = new House(name, email, city, state, imageUrl);
    newHouse.createHouse(name, email, city, state, imageUrl);
    // Assuming createHouse method saves the house to a database or an array
    // For example, you might want to save it to a file or a database                   
    // Here you would typically save the house to a database
    console.log(House.allHouses((houses) => {
        if (houses.length > 0) {
            console.log('Houses:', houses);
        } else {
            console.log('No houses found');
        }
    }
    ));
    res.redirect('/host-homes');
}
);

homeRouter.get('/host-homes', (req, res, next) => {
    House.allHouses((houses) => {

        res.render('hostHomeLists', { houses, title: 'Host Home Lists Page' });
    })
}
);

homeRouter.post('/houses/:id', (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    House.deleteHouse(id, (err) => {
        if(err) {
            console.log('err-' + err) 
            
        } else{
            favourite.remove(id,(err)=>{
                if(err){
                    console.log('err-' + err)
                    }else{
                        console.log('house deleted')
                        res.redirect('/host-homes');
                        
                    }

            })
            
        }
    })

})


module.exports = homeRouter;
// homeRouter is a router that handles requests to the home page, about page, and contact page.                                                                                     