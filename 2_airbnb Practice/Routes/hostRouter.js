const express = require('express')
const path=require('path')

const hostRouter = express.Router()

hostRouter.get('/host', (req, res, next) => {
    console.log(`hello from Host-${req.url},${req.method}`)
    res.sendFile(path.join(__dirname, '../', 'Views', 'Host.html'))



}
)

hostRouter.get('/host/add-home', (req, res, next) => {
    console.log(`hello from Add Home-${req.url},${req.method}`)
    res.sendFile(path.join(__dirname, '../', 'Views', 'Host-admin.html'))



}
)

module.exports = hostRouter