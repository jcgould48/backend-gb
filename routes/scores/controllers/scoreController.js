const Score = require('../model/Score')

const dbErrorHelper = require('../../users/authHelpers/dbErrorHelper')

module.exports={

    getScores: async (req, res) => {
        try {
          let userID = req.auth._id;
          console.log("userid!!!!!!",userID)
          let foundScores = await Score.findById({ owner: userID })
            .populate("scores") //Probablly need to edit these two lines
            .select("-__v -wins -loses -_id");
            console.log("foundscores--------", foundScores)
          res.json(foundScores);
        } catch (e) {
          res.status(500).json(dbErrorHelper(e));
        }
      },

    updateScore:async (req,res)=>{
        try {
            let foundUser = await (await Score.findById({_id:req.params.id})).select('--v')
            const {wins,losses}= foundUser
            wins === req.body.wins?wins = req.body.wins:wins= wins
            losses === req.body.losses?losses= req.body.email:losses = losses
            

            await foundUser.save()
            res.json({
                message:'success',
                updatedUser:foundUser
            })
        } catch (error) {
            console.log(e)
            res.status(518).json({
                
                message:getErrorMessage(e)
            })
        }
    },
    
    resetScore: async (req,res)=>{
        try {
            let foundUser = await (await Score.findById({_id:req.params.id})).select('--v')
            const {wins,losses}= foundUser
            wins = 0;
            losses = 0
            
            await foundUser.save()
            res.json({
                message:'success',
                updatedUser:foundUser
            })
        } catch (error) {
            console.log(e)
            res.status(518).json({
                
                message:getErrorMessage(e)
            })
        }
    },
    
}