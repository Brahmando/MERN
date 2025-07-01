const express=require('express');

const app=express()


app.use('/host',(req,res,next)=>{
    console.log(`hello from 3rd middleware-${req.url},${req.method}`)
    res.send("<h1>WELCOME TO THE Host</h1>")   
    next()
})

app.use('/host/admin',(req,res,next)=>{
    console.log(`hello from 3rd middleware-${req.url},${req.method}`)
    // res.send("<h1>WELCOME TO THE Host & Admin</h1>")   
})


app.get('/',(req,res,next)=>{
    console.log(`hello from 1st middleware-${req.url},${req.method}`)
    next()

})

app.get('/',(req,res,next)=>{
    console.log(`hello from 2nd middleware-${req.url},${req.method}`)
    next()
})



app.get('/contact-us',(req,res,next)=>{
    console.log(`hello from Contact Us-${req.url},${req.method}`)
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COntact Us</title>
</head>
<body>
    <form action="/submit-form" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        
        <button type="submit">Submit</button>
    </form>
</body>
</html>`)
}
)

app.post('/submit-form',(req,res,next)=>{
    console.log(`hello from Submit Form-${req.url},${req.method}`)

    // Here you would typically handle the form submission, e.g., save data to a database
    const body=[]
    req.on('data',chunk=> {
        console.log(chunk.toString());
        body.push(chunk);
    })

    req.on('end',() => {
        const data=Buffer.concat(body).toString();
        console.log(data);
        const params=new URLSearchParams(data)
        const username=params.get('name')
        const email=params.get('email')
        console.log(`Name: ${username}, Email: ${email}`);     
        res.send(`<h1>Form submitted successfully </h1></br>
    <h2>Thank you ${username} for submitting the form</h2>
    <h2>We will contact you at ${email}</h2>
    <a href="/">Go back to Home</a>
    `)             
    })
    
})
   


app.listen(3000,()=>{
    console.log('Server is running on port http://localhost:3000');
})