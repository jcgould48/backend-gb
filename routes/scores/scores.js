const express = require('express');
const router = express.Router();
const scoreController=require('./controllers/scoreController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/find-score/:id', scoreController.getScores)
router.post('/update-score/:id',scoreController.updateScore)
router.delete('/reset-score/:id',scoreController.resetScore)


module.exports = router;
