const express=require('express')
const path=require('path')


const clientRouter=express.Router()

clientRouter.get('/client',(req,res,next)=>{
    console.log(`hello from Client-${req.url},${req.method}`)
    res.sendFile(path.join(__dirname,'../','Views','Client.html'))  

    
}
)
clientRouter.get('/client/view-home',(req,res,next)=>{
    console.log(`hello from View Home-${req.url},${req.method}`)
    res.sendFile(path.join(__dirname,'../','Views','Client-admin.html'))

    
}
)

module.exports=clientRouter