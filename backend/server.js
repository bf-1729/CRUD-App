const express = require("express")
const cors = require("cors")
const db = require("./database.js")
const dataRoute = require("./dataRoute.js")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/",dataRoute)

app.listen(7000,()=>{
    console.log("server running");
})
