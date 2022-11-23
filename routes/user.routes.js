const express = require("express");
const router = express.Router();

var cron = require('node-cron');
var moment = require('moment');

const mongoose = require("mongoose");

const User = require("../models/User.model");
const PlantBase = require("../models/PlantBase.model");

//Getting our middleware
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


// USER PROFILE + get all plants
router.get("/userProfile", isLoggedIn, (req, res) => {
  
  PlantBase.find().limit(20) //CANGE THIS NUMBER WHEN WE MERGE OUR DATABASE
    .then(allPlants => {
      PlantBase.find({ createdBy: req.session.currentUser._id })
        .then((UserPlants) => {
          const arrayWithWater = [];
          UserPlants.forEach((el, index) => {
            arrayWithWater.push({ ...el, water: false });
            const created = (el.createdAt).getDay();
            const createdMonth = (el.createdAt).getDate();
            const monthDay = moment().date();
            const dayOfWeek = moment().isoWeekday();
            const secondDay = moment().add(3, 'days').isoWeekday();
            //console.log(dayOfWeek)
            //console.log(secondDay)
            //console.log(created); 
            //console.log(timePassed);
            //console.log(createdMonth)
            //console.log(monthDay)
            let water = arrayWithWater[index].water;
            function waterYes() {
              water = true;
              arrayWithWater[index].water = water;
            }
            function waterNo() {
              water = false;
              arrayWithWater[index].water = water;
            }
            if (el.h2o === "once per day") waterYes();
            else if (el.h2o === "once per week") {
              if (dayOfWeek === created) waterYes();
              else waterNo();
            }
            else if (el.h2o === "twice per week") {
              if (dayOfWeek === created || secondDay === created) waterYes();
              else waterNo();
            }
            else {
              if (monthDay === createdMonth) waterYes();
              else waterNo();
            }
          }) 
          res.render('profile/userProfile.hbs', { userPlants: UserPlants, allPlants: allPlants, foundedUser: req.session.currentUser, plantArr: arrayWithWater })
        })
    })
    .catch((error) => {
      console.log("Error while getting plants from DB");
    });
});
  

//CREATE "THE COSTUME ONE"
router.post('/createUniqe', (req, res) => {

    const { name, plantType, h2o, light, bio } = req.body;
    const user = req.session.currentUser;
    console.log("HEY, HERE IS THE USER:", user)                                                       
    PlantBase.create({ name, plantType, h2o, light, bio, createdBy: user._id } )
    .then((result) => {
        console.log(result);
        console.log(result.createdAt)
        console.log("USERR!!!",user._id)
        User.findByIdAndUpdate(user._id, {$push: {myPlants: result} },
            function(err, result) {
                if (err) {
                  res.send(err);
                } else {
                  res.redirect('/userProfile');
                }
              })    
    })
    .catch(error => console.log("Error! YOU SUCK!"));
})


//CHOOSE FROM EXISTING AND DISPLAY TIPS
router.post('/choosePlant', (req, res) => {
  const { myPlants } = req.body;
  const user = req.session.currentUser;
  console.log(user);
  PlantBase.findById(myPlants)
  .then((plant) => {
    console.log(plant)
    res.render('allplants.hbs', { plant: plant})
  })
  .catch(error => console.log("Error! YOU SUCK!"));
})

module.exports = router;