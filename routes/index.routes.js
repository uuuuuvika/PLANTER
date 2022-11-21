const express = require('express');
const router = express.Router();

const PlantBase = require('../models/PlantBase.model');
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
module.exports = router;
