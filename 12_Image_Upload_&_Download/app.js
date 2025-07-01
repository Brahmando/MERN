const express = require('express');
const path = require('path');
const homeRouter = require('./routes/homeRouter');
const {dbConnect} = require('./database/dbConnect');
const { default: mongoose } = require('mongoose');
const authRouter = require('./routes/authRouter');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express()
app.use(express.urlencoded({ extended: true }));


const mongoUrl='mongodb+srv://powerangerinfinite123:n2n1RXzFsHFfzmNJ@mongocluster.pe7odxo.mongodb.net/RentHouse?retryWrites=true&w=majority&appName=MongoCluster'
const store= new MongoDBStore({
    uri: mongoUrl,
    collection: 'sessions'
})

store.on('error',(err)=> console.log(err));

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    store: store


}))

app.use(express.static(path.join(__dirname, 'public/CSS'))) // static files are served from public folder
app.use(express.static(path.join(__dirname, 'public/images/Houses')))

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(homeRouter) // only router is rendered here, However paths can be
app.use(authRouter)
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});


mongoose.connect(mongoUrl).then(()=>{
    console.log('Connected to MongoDB');
     app.listen(3000, () => {                                                
        console.log('Server is running on port http://localhost:3000');
    })
}).catch(err => {
    console.error('MongoDB connection error:', err);
});