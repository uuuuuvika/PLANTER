const express = require('express');
const router = express.Router();

const PlantBase = require('../models/PlantBase.model');
const Event = require('../models/Event.model');
const isLoggedIn = require('../middleware/isLoggedIn');


// GET ALL EVENTS ON INDEX
router.get("/", (req, res, next) => {
  Event.find()
  .then(allEvents => {
    res.render("index", {showEvents: allEvents})

  })
  .catch(error => console.log('error!!! YOU SUCK INDEX'));
});



router. get("/plantBase/create", (req, res) => res.render("plantbase.hbs"))

router.post('/plantBase/create', (req, res) => {
  console.log("create plant")
  const {plantType, h2o, light, bio} = req.body;
  
  PlantBase.create({plantType, h2o, light, bio})
  .then((result) => console.log("result: ", result))
  .then(() => res.redirect('/plantBase/create'))
  .catch(error => console.log('error:', error))
})

// EVENTS

// GET
router.get("/event/create", (req, res) => res.render("event.hbs"))

/////EVENTS/////
// POST CREATE EVENT
router.post('/event/create', isLoggedIn, (req, res)=>{

  const {date, name, coordinates,description} = req.body;
  const createdBy = req.session.currentUser._id
  console.log(req.session.currentUser);

  Event.create({date, name, createdBy, coordinates, description})

  .then(() => res.redirect('/event/create'))
  .catch(error => console.log('error!!! YOU STILL SUCK', error));
})

// GET FIND AND EDIT THE EVENT
// FIND

router.get('/event',isLoggedIn, (req, res) =>{
  Event.find({createdBy:req.session.currentUser._id})
  .then((result)=> {
    console.log(result);
    // res.render('/', {result})
  })
  .catch(error => console.log('error!!! YOU STILL STILL SUCK', error));
})

// DISLPLAY
// ClICK AND EDIT


router.get

router.get('')
module.exports = router;
