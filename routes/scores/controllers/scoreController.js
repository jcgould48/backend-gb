const Score = require('../model/Score')

const dbErrorHelper = require('../../users/authHelpers/dbErrorHelper')

module.exports={

    getScores: async (req, res) => {
        try {
          console.log("userid!!!!!!",req.params.id)
          let foundScores = await Score.findOne({ owner: req.params.id })
            .populate("scores")
            console.log("foundscores--------", foundScores)
          res.json(foundScores);
        } catch (e) {
            console.log(e)
          res.status(500).json(dbErrorHelper(e));
        }
      },

    updateScore:async (req,res)=>{
        try {
            console.log("userID",req.params.id)
            let foundScore = await Score.findOne({ owner: req.params.id })
           
            let updatedScore = await Score.findByIdAndUpdate({_id:foundScore._id}, 
                req.body,
                { new: true })
                
              
              res.json(updatedScore);
            
        } catch (e) {
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