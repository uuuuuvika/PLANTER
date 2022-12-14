const express = require('express');
const router = express.Router();

const Plants = require('../models/Plants.model');
const Event = require('../models/Event.model');

const isLoggedIn = require('../middleware/isLoggedIn');
const { fileUploader } = require('../config/cloudinary.config');

// GET ALL EVENTS ON INDEX
router.get("/", (req, res, next) => {
  Event.find()
  .then(allEvents => {
    res.render("index", {showEvents: allEvents})

  })
  .catch(error => console.log('error!!! YOU SUCK INDEX'));
});

//CREATE STATIC PLANT!!!
router. get("/staticPlant/create", (req, res) => res.render("staticPlant.hbs"))

router.post('/staticPlant/create', (req, res) => {
  console.log("create plant")
  const {plantType, h2o, light, bio} = req.body;
  Plants.create({plantType, h2o, light, bio})
  .then((result) => console.log("result: ", result))
  .then(() => res.redirect('/staticPlant/create'))
  .catch(error => console.log('error:', error))
})

/////EVENTS/////
// GET
router.get("/event/create", (req, res) => res.render("event.hbs"))

// POST CREATE EVENT
router.post('/event/create', isLoggedIn, fileUploader.single('picture'), (req, res)=>{
  
  const {date, name, coordinates,description} = req.body;
  const picture = req.file === undefined  ? undefined : req.file.path;
  const createdBy = req.session.currentUser._id
  
  Event.create({date, name, createdBy, picture, coordinates, description})
  
  .then(() => res.redirect('/'))
  .catch(error => console.log('error!!! YOU STILL SUCK', error));
})

// Show Eventdetail on extra page
router.get('/eventdetail/:id',(req,res) => {
  const id = req.params.id
  
  Event.findById(id)
  .then(selectedEvent => {
    res.render('eventdetail', {selectedEvent})
  })
  .catch(err => {
    console.log(err)
})
})
// GET FIND AND EDIT THE EVENT
// FIND


// router.get('/eventsuser',isLoggedIn, (req, res) =>{
//   Event.find({createdBy:req.session.currentUser._id})
//   .then((foundEvents)=> {
//     res.render('eventsuser', {foundEvents})
//   })
//   .catch(error => console.log('error!!! YOU STILL STILL SUCK', error));
// })


// DISLPLAY
// ClICK AND EDIT

module.exports = router;
