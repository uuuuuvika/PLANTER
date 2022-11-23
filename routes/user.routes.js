const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Getting our Schemas (all of them just to be sure)
const User = require("../models/User.model");
const PlantBase = require("../models/PlantBase.model");

//Getting our middleware
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

//const { populate } = require("../models/User.model");
//const { request } = require("../app");

// USER PROFILE + get all plants
router.get("/userProfile", isLoggedIn, (req, res) => {
    PlantBase.find().limit(20) //CHAMGE WHEN WE MERGE OUR DATABASE
        .then(allPlants => {
            let count = 0;
            console.log(allPlants);
            res.render('profile/userProfile.hbs', { allPlants: allPlants,
                                                    foundedUser: req.session.currentUser });
        })
        .catch((error) => {
            console.log("Error while getting plants from DB")
        });
});
  

//LIST ALL PLANTS from PlantBase on CONSOLE 
// router.get("/choosePlant", isLoggedIn, (req, res) => {
//     PlantBase.find()
//         .then(allPlants => {
//             console.log(allPlants);
//             res.render('profile/userProfile.hbs', { allPlants: allPlants }); //allPlants is temporary!!
//         })
//         .catch((error) => {
//             console.log("Error while getting plants from DB")
//         });
// })

//CREATE "THE COSTUME ONE"
router.post('/createUniqe', (req, res) => {

    const { name, plantType, h2o, light, bio } = req.body;
    const user = req.session.currentUser;
    console.log("HEY, HERE IS THE USER:", user)                                                       
    PlantBase.create({ name, plantType, h2o, light, bio, createdBy: user._id } )
    .then((result) => {
        console.log(result);
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



//CHOOSE FROM EXISTING
router.post('/choosePlant', (req, res) => {
  const { myPlants } = req.body;
    // const { name, myPlants } = req.body;
    // const num = Math.random()*1000;
    // const user = req.session.currentUser;
    // console.log(user)
    // PlantBase.findById(myPlants)
    // .then((plant) => { 
    //     console.log(plant)
    //     return ({name: name, plantType: plant.plantType, h2o: plant.h2o, light: plant.light, bio: plant.bio}); // add adoptedBy
    // })
    // // .then((res) => {
    // //     PlantBase.create(res)
    // //     //console.log(result)
    // // })
    // .then((result) => {
    //     console.log(result)
    //     console.log("USERR:",user._id)
    //     User.findByIdAndUpdate(user._id, { $push: { myPlants: result} },
    //         function(err, result) {
    //             if (err) {
    //               res.send(err);
    //             } else {
    //               res.redirect('/userProfile');
    //             }
    //           })
        
    // })
    // .catch(error => console.log("Error! YOU SUCK!"));

})


// create one (fofm which will extract id )based on spotify lab


module.exports = router;