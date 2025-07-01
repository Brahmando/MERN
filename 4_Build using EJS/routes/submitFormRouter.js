const express = require('express');
const submitFormRouter = express.Router();
const path = require('path');

const names = [];
submitFormRouter.post('/submit-form', (req, res, next) => {
    console.log(`hello from Submit Form-${req.url},${req.method},${JSON.stringify(req.body)},${req.body.name},${req.body.email}`);
    console.log(req.body);
    names.push(req.body.name);
    console.log(`Names submitted so far: ${names.join(', ')}`);
    res.render('submit-form', { title: 'Form Submission', user: req.body, names });
    // Here you would typically handle the form submission, e.g., save data to a database


    // const body=[]
    // req.on('data',chunk=> {
    //     console.log(chunk.toString());
    //     body.push(chunk);
    // })

    // req.on('end',() => {
    //     const data=Buffer.concat(body).toString();
    //     console.log(data);
    //     const params=new URLSearchParams(data)
    //     const username=params.get('name')
    //     const email=params.get('email')
    //     console.log(`Name: ${username}, Email: ${email}`);     
    //     res.send(`<h1>Form submitted successfully </h1></br>
    // <h2>Thank you ${username} for submitting the form</h2>
    // <h2>We will contact you at ${email}</h2>
    // <a href="/">Go back to Home</a>
    // `)             
    // })
    
})

module.exports = submitFormRouter;