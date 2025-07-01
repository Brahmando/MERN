const express = require('express')
const hostRouter = require('./Routes/hostRouter')
const clientRouter = require('./Routes/clientRouter')
const Home = require('./Routes/Home')
const path = require('path')

const app = express()

app.use(Home)

app.use(hostRouter)

app.use(clientRouter)

app.use((req, res, next) => {
    console.log(`hello from Middleware-${req.url},${req.method},${path.join(__dirname, 'views', '404.html')}`)
    res.status(404).sendFile(path.join(__dirname, 'Views', '404.html'))
}
)

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000")
})