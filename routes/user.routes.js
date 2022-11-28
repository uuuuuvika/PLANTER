const express = require("express");
const router = express.Router();

// const cron = require('node-cron');
const moment = require('moment');

const mongoose = require("mongoose");

const User = require("../models/User.model");
const Plants = require("../models/Plants.model");
//const PlantBase = require("../models/PlantBase.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


// USER PROFILE + get all plants
router.get("/userProfile", isLoggedIn, (req, res) => {

  Plants.find().limit(40)
    .then(allPlants => {
      console.log(allPlants)

      Plants.find({ createdBy: req.session.currentUser._id })
        .then((UserPlants) => {
          console.log(UserPlants)
          const arrayWithWater = [];
          UserPlants.forEach((el, index) => {
            arrayWithWater.push({ ...el, water: false });
            const currentWholeDate = new Date().toLocaleDateString('en-CA');
            const createdWholeDate = (el.createdAt).toLocaleDateString('en-CA');
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
            //console.log(currentWholeDate)
            //console.log(createdWholeDate)
            let water = arrayWithWater[index].water;
            function waterYes() {
              water = true;
              arrayWithWater[index].water = water;
            }
            function waterNo() {
              water = false;
              arrayWithWater[index].water = water;
            }
            if (el.h2o === "once per day" && currentWholeDate !== createdWholeDate) { //ADD BACK !!!!!!!!!!!!!!!!!!!!!!!!
              waterYes()
            }
            else if (el.h2o === "once per week" && currentWholeDate !== createdWholeDate) {
              if (dayOfWeek === created) waterYes();
              else waterNo();
            }
            else if (el.h2o === "twice per week") {
              if ((dayOfWeek === created || secondDay === created) && currentWholeDate !== createdWholeDate) waterYes();
              else waterNo();
            }
            else {
              if (monthDay === createdMonth && currentWholeDate !== createdWholeDate) waterYes();
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
    Plants.create({ name, plantType, h2o, light, bio, createdBy: user._id } )
    .then((result) => {
        console.log(result);
        console.log("THE CREATOR:",user._id)
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
  console.log(myPlants)
  Plants.findById(myPlants)
  .then((plant) => {
    console.log(plant)
    res.render('allPlants.hbs', { plant: plant})
  })
  .catch(error => console.log("Error! YOU SUCK!"));
})

//DELETE PLANT 
// CREATE A CHECK : "ARE YOU SURE YOU WANT TO DELETE IT????"
router.post('/:plantId/delete', (req, res) => {

  const { plantId } = req.params;
  console.log(plantId)
  Plants.findByIdAndRemove(plantId)
  .then(() => res.redirect('/userProfile'))
  .catch(error => {
      console.log("Error while removing the plant: ", error);
  })
})

module.exports = router;