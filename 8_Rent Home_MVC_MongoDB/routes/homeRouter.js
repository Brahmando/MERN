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
    // res.set('Cache-Control', 'no-store');
    
        House.allHouses().then((houses) => {
        favourite.allFav().then((favData) => {
            console.log(houses,favData)
            const favHouses = []
            favData.forEach((fav) => {
                const house = houses.find(house => house._id == fav.house_id)
                console.log('housesss--',house)
                favHouses.push(house)
            })

            res.render('favourites', { favHouses, title: 'Favourite Page' });

        })
    })
                .catch((err) => {
                    console.log('Error fetching houses:', err);
                    res.status(500).send('Error fetching houses');
                });
        })
       

homeRouter.post('/favourites', (req, res) => {
    // res.set('Cache-Control', 'no-store');
    // Assuming you have a way to get favourite houses, e.g., from a database or session
    // console.log(req.body)
    const { houseId } = req.body; // Assuming favouriteHouses is an array of house IDs
    favourite.save(houseId)
        .then(() => {
            res.redirect('/favourites');
        })
        .catch((err) => {
            console.log('Error fetching favourite houses:', err);
            res.status(500).send('Error fetching favourite houses');
        });
});


homeRouter.post('/favourites/remove', (req, res, next) => {
    const { houseId } = req.body;
    favourite.remove(houseId).then(() => {
        res.redirect('/favourites');
    }).catch((err) => {
        console.log('Error removing house from favourites:', err);
        res.status(500).send('Error removing house from favourites');
    });
});

homeRouter.get('/home-lists', (req, res, next) => {
    House.allHouses().then((houses) => {

        console.log(houses)
        res.render('storeLists', { houses, title: 'Home Lists Page' });
    })
}
);

homeRouter.get('/add-home', (req, res, next) => {
    res.render('add-home', { title: 'Home Page' });
}
);

homeRouter.post('/add-home', async (req, res, next) => {
    // res.set('Cache-Control', 'no-store');
    const { name, email, city, state, imageUrl } = req.body;
    const newHouse = new House(name, email, city, state, imageUrl)
    await newHouse.createHouse()

    res.redirect('/host-homes');
}
);

homeRouter.get('/host-homes', (req, res, next) => {
    House.allHouses().then(houses => {
        console.log(houses)
        res.render('hostHomeLists', { houses, title: 'Host Home Lists Page' });

    })
}
);

homeRouter.post('/houses/:_id', (req, res, next) => {
    const id = req.params._id;
    console.log(id)
    House.deleteHouse(id).then(() => {
            favourite.remove(id).then(()=>{

                console.log('House deleted successfully');
                res.redirect('/host-homes');
            })



    }).catch((err) => {
        console.log('Error deleting house:', err);
        res.status(500).send('Error deleting house');
    }
    );

})


module.exports = homeRouter;
// homeRouter is a router that handles requests to the home page, about page, and contact page.                                                                                     