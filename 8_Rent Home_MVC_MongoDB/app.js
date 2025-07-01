const express = require('express');
const path = require('path');
const homeRouter = require('./routes/homeRouter');
const {dbConnect} = require('./database/dbConnect');
const app = express()


app.use(express.static(path.join(__dirname, 'public/CSS'))) // static files are served from public folder
app.use(express.static(path.join(__dirname, 'public/images/Houses')))


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(homeRouter) // only router is rendered here, However paths can be




dbConnect(() => {
    app.listen(3000, () => {                                                
        console.log('Server is running on port http://localhost:3000');
    })
})