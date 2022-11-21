const router = require("express");
const mongoose = require("mongoose");

// Getting our Schema

const User = require("../models/User.model");
const PlantBase = require("../models/PlantBase.model");

router.get("/userProfile", (req, res)=>{
PlantBase.find()
.then(foundPlants => {
    res.render("/profile/userProfile.hbs", {allPlants: foundPlants});
})
.catch((error)=> {
    console.log("Error while getting plants from DB")
});
})

