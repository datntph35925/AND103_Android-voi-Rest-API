var express = require('express');
var router = express.Router();
let db =require("../config/dbusers");


/* GET home page. */
router.get('/',async function(req, res, next) {
  let List =await db.dbr.find()
  res.render('index', {title :"Express" ,ListUsers: List });

});



module.exports = router;