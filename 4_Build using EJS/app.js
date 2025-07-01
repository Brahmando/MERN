const express=require('express');
const path=require('path');

// When a GET request is made to the '/contact-us' URL, it logs a message to the console and sends an HTML file as a response.
const homeRouter = require('./routes/homeRouter');
const constactUsRouter = require('./routes/contactUsRouter');
const submitFormRouter = require('./routes/submitFormRouter');
const app=express()

app.set('view engine', 'ejs');
app.set('views','views');
app.use(express.urlencoded())

app.use(homeRouter)
app.use('/admin',constactUsRouter)
// app.use(bodyParser.urlencoded({extended:true}))
app.use(submitFormRouter)
   


app.listen(3000,()=>{
    console.log('Server is running on port http://localhost:3000');
})