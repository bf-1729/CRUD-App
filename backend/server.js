const express = require("express")
const cors = require("cors")
const db = require("./database.js")
const dataRoute = require("./dataRoute.js")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/",dataRoute)
app.get("/",(req,res)=>{
    res.send("server is running")
    
})

app.listen(7000,()=>{
    console.log("server running");
})
