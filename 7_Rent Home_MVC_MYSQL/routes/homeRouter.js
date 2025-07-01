const express = require('express');
const House = require('../models/hostHouse');
const favourite = require('../models/favourites');
const db = require('../database/db');
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

homeRouter.get('/favourites', async (req, res, next) => {
    res.set('Cache-Control', 'no-store');

    try {

        const [rows] = await db.query('SELECT * FROM houses JOIN favourites ON houses.id = favourites.house_id');
        res.render('favourites', { favHouses: rows, title: 'Favourite Page' });
    }
    catch (err) {
        console.log('Error fetching favourite houses:', err);
        res.status(500).send('Error fetching favourite houses');
    }





});

homeRouter.post('/favourites', (req, res) => {
    res.set('Cache-Control', 'no-store');
    // Assuming you have a way to get favourite houses, e.g., from a database or session
    // console.log(req.body)
    const { houseId } = req.body; // Assuming favouriteHouses is an array of house IDs
    favourite.save(houseId)
        .then(() => {
            return db.query('SELECT * FROM houses JOIN favourites ON houses.id = favourites.house_id');
        })
        .then(([rows]) => {
            res.render('favourites', { favHouses: rows, title: 'Favourite Page' });
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

        res.render('storeLists', { houses, title: 'Home Lists Page' });
    })
}
);

homeRouter.get('/add-home', (req, res, next) => {
    res.render('add-home', { title: 'Home Page' });
}
);

homeRouter.post('/add-home', async (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    const { name, email, city, state, imageUrl } = req.body;
    await House.createHouse(name, email, city, state, imageUrl);
    // Assuming createHouse method saves the house to a database or an array
    // For example, you might want to save it to a file or a database
    const houses = await House.allHouses();
    if (houses.length > 0) {
        console.log('Houses:', houses);
    } else {
        console.log('No houses found');
    }
    res.redirect('/host-homes');
}
);

homeRouter.get('/host-homes', (req, res, next) => {
    House.allHouses().then((houses) => {

        res.render('hostHomeLists', { houses, title: 'Host Home Lists Page' });
    })
}
);

homeRouter.post('/houses/:id', (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    House.deleteHouse(id).then(() => {

        console.log('House deleted successfully');
        res.redirect('/host-homes');



    }).catch((err) => {
        console.log('Error deleting house:', err);
        res.status(500).send('Error deleting house');
    }
    );

})


module.exports = homeRouter;
// homeRouter is a router that handles requests to the home page, about page, and contact page.                                                                                     