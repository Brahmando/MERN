const express = require('express')
const authRouter = express.Router();

authRouter.get('/login', (req, res, next) => {
    res.render('login')
})

authRouter.post('/login', (req, res, next) => {
    req.session.isLogged=true;
    res.redirect('/')
})

authRouter.get('/signout', (req, res, next) => {
    req.session.isLogged=false;
     req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error destroying session');
    }
    console.log("session destroyed successfully")
    res.redirect('/');
  }); 
  
   
})


authRouter.get('/signup', (req, res, next) => {
    res.render('signUp')
})




module.exports = authRouter;