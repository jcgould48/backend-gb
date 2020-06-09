const express = require('express');
const router = express.Router();
const userController=require('./controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',userController.login)
router.get('/logout',userController.logout)
router.post('/create-user',userController.createUser)
module.exports = router;
