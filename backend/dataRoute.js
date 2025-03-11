const express = require("express")
const dataModel = require("./mode")
const router = express.Router()

router.post("/add-data", async (req, res) => {

    const { name } = req.body

    try {
        const task = new dataModel({ name })
        await task.save()
        res.send("data added successfully")
    } catch (error) {
        res.send(error)
    }
})



router.get("/get-data",async(req,res)=>{
    try{
    const response = await dataModel.find({})
    res.send(response)
    }
    catch(error){
        res.send(error)
    }
})

router.post("/delete-data",async(req,res)=>{
    const {dataId} = req.body
    try{
    const response = await dataModel.findByIdAndDelete(dataId)
    if(response){
        res.status(200).send("data deleted successfully")
    }
    else{
        res.status(400).send({message:"data not found"})
    }
}
    catch(error){
        res.status(500).json({ error: "Internal Server Error", details: error.message });
        
    }
})

// Update route for updating data
router.post("/update-data", async (req, res) => {
    const { dataId, updatedName } = req.body;
    try {
      const task = await dataModel.findByIdAndUpdate(dataId, { name: updatedName });
      if (task) {
        res.send("Data updated successfully");
      } else {
        res.status(404).send("Data not found");
      }
    } catch (error) {
      res.status(500).send("Error updating data");
    }
  });
  
module.exports = router;
