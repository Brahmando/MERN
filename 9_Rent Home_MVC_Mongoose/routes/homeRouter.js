const express = require('express');
const House = require('../models/hostHouse');
const favourite = require('../models/favourites');
const { default: mongoose } = require('mongoose');
const homeRouter = express.Router();
homeRouter.use(express.urlencoded({ extended: true }));

const { ObjectId } = mongoose.Types;

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


    favourite.find().populate('house_id').then((favData) => {
        console.log(favData)
        const favHouses = favData.map(house => house.house_id)
        // favHouses.push(house)


        res.render('favourites', { favHouses, title: 'Favourite Page' });
        // res.send('All Okay!!!')


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
    const { houseId } = req.body;
    console.log('houseId-', houseId)
    favourite.create({ house_id: new ObjectId(houseId) }).then(() => {
        console.log(favourite.find().then(fa => console.log('fa-', fa)))
        res.redirect('/favourites');
    })
        .catch((err) => {
            console.log('Error POsting favourite houses:', err);
            res.status(500).send('Error Posting favourite houses');
        });



});


homeRouter.post('/favourites/remove', (req, res, next) => {
    const { houseId } = req.body;
    favourite.deleteOne({ house_id: new ObjectId(houseId) }).then(() => {
        res.redirect('/favourites');
    }).catch((err) => {
        console.log('Error removing house from favourites:', err);
        res.status(500).send('Error removing house from favourites');
    });
});

homeRouter.get('/home-lists', (req, res, next) => {
    House.find().then((houses) => {

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
    const { name, email, city, state, imageUrl } = req.body;
    try {
        const newHouse = await House.create({ name, email, city, state, imgUrl: imageUrl });
        console.log(newHouse)
        res.redirect('/host-homes');
        // res.send('House added successfully');
    } catch (err) {
        console.log('Error adding house:', err);
        res.status(500).send('Error adding house');
    }
});

homeRouter.get('/host-homes', (req, res, next) => {
    House.find().then(houses => {
        console.log(houses)
        res.render('hostHomeLists', { houses, title: 'Host Home Lists Page' });

    })
}
);

homeRouter.post('/houses/:_id', (req, res, next) => {
    const id = req.params._id;
    console.log(id)
    House.deleteOne({ _id: new ObjectId(id) }).then(() => {
        favourite.deleteOne({ house_id: new ObjectId(id) }).then(() => {
            // I should use hostHouseSChema.pre()
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