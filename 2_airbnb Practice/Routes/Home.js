const express=require('express')
const path=require('path')

const Home=express.Router()

Home.get('/',(req,res,next)=>{
    console.log(`hello from Home-${req.url},${req.method}`)
    res.sendFile(path.join(__dirname,'../','Views','Home.html'))  
  
    
}
)

module.exports=Home