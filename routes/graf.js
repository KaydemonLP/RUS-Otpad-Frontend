var express = require('express');
var router = express.Router();

const fetch = require("node-fetch");

/* GET home page. */
router.get('/', async function(req, res, next) {
  const response = await fetch("https://labosi-rus-kay-web.azurewebsites.net/ratings");
  const data = await response.json();

  const ratings = data.data;
  for( let entry of ratings )
  {
    let flRating = entry["Rating"];

      if( flRating >= 0.6 )
        entry["Rating"] = 1;
      else if( flRating >= 0.48 )
        entry["Rating"] = 2;
      else if( flRating >= 0.36 )
        entry["Rating"] = 3;
      else if( flRating >= 0.24 )
        entry["Rating"] = 4;
      else
        entry["Rating"] = 5;
  }
  
  res.render('graf', { "resp": data });
});

module.exports = router;
