const express=require('express');
const path=require('path');
const homeRouter = require('./routes/homeRouter');
const app=express()

const db=require('./database/db'); // Importing the database connection
const { get } = require('http');
const favourite = require('./models/favourites');

app.use(express.static(path.join(__dirname,'public/CSS'))) // static files are served from public folder
app.use(express.static(path.join(__dirname,'public/images/Houses')))


app.set('view engine', 'ejs');
app.set('views','views');


app.use(homeRouter) // only router is rendered here, However paths can be given here


app.listen(3000,()=>{
    console.log('Server is running on port http://localhost:3000');
})