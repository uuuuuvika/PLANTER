const express = require('express');
const router = express.Router();

const PlantBase = require('../models/PlantBase.model');
const Event = require('../models/Event.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router. get("/plantBase/create", (req, res) => res.render("plantbase.hbs"))

router.post('/plantBase/create', (req, res) => {

  const {plantType, h2o, light, bio} = req.body;

  PlantBase.create({plantType, h2o, light, bio})
  .then((result) => console.log(result))
  .then(() => res.redirect('/plantBase/create'))
  .catch(error => console.log('error!!! YOU SUCK'));
})

// EVENTS

// GET
router.get("/event/create", (req, res) => res.render("event.hbs"))

/////EVENTS/////
// POST CREATE EVENT
router.post('/event/create', (req, res)=>{

  const {date, name, coordinates,description} = req.body;
  console.log(req.body);

  Event.create({date, name, coordinates, description})

  .then(() => res.redirect('/event/create'))
  .catch(error => console.log('error!!! YOU STILL SUCK', error));
})

// GET ALL EVENTS

router.get('')
module.exports = router;
