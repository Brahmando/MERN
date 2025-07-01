const express = require('express');
const House = require('../models/hostHouse');
const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const homeRouter = express.Router();

const { ObjectId } = mongoose.Types;

homeRouter.get('/', (req, res, next) => {
    
   console.log('user',req.session.user)
    res.render('home', { title: 'Home Page', isLogged:req.session.isLogged,accountType: req.session.user?.accountType});
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
    try {
        // res.set('Cache-Control', 'no-store');
        const userId = req.session.user.id;
        console.log(userId);

        const loggedUser = await User.findOne({ _id: new ObjectId(userId) });
        const favs = await loggedUser.populate('favourites');
        const favHouses = favs.favourites   // Remember what populate() does actually
        res.render('favourites', { favHouses, title: 'Favourite Page' });
    } catch (err) {
        console.log('Error fetching favourites:', err);
        res.status(500).send('Error fetching favourites');
        // Or: next(err); to use Express error middleware
    }
})

homeRouter.post('/favourites', async (req, res) => {
    // res.set('Cache-Control', 'no-store');
    // Assuming you have a way to get favourite houses, e.g., from a database or session
    // console.log(req.body)
    const { houseId } = req.body;
    console.log('houseId-', houseId)
    const userId=req.session.user.id;
    console.log(userId)
   const user=await User.findOne({_id: new ObjectId(userId)})
   user.favourites.push(houseId)
   user.save().then(upduser=>{
    console.log('after update-',upduser)
    res.redirect('/favourites')
   }).catch((err) => {
            console.log('Error POsting favourite houses:', err);
            res.status(500).send('Error Posting favourite houses');
        });



});

homeRouter.post('/favourites/remove', (req, res, next) => {
    const { houseId } = req.body;
    const userId = req.session.user.id;
    User.updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { favourites: new ObjectId(houseId) } }
        ).then(() => {
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

homeRouter.post('/houses/:_id', async (req, res, next) => {
    const id = req.params._id;
    try {
        await House.deleteOne({ _id: new ObjectId(id) });
        await User.updateMany({}, { $pull: { favourites: new ObjectId(id) } });
        console.log('House and related favourites deleted successfully');
        res.redirect('/host-homes');
    } catch (err) {
        console.log('Error deleting house:', err);
        res.status(500).send('Error deleting house');
    }
});


module.exports = homeRouter;
// homeRouter is a router that handles requests to the home page, about page, and contact page.