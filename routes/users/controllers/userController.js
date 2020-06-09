const User = require('../model/User')
const bcrypt = require('bcryptjs')

const getErrorMessage = require('../authHelpers/dbErrorHelper')
const {comparePassword,createJwtToken} = require('../authHelpers/jwtGenerators')

module.exports={

    login: async(req,res)=>{
        try{
            let foundUser = await User.findOne({email:req.body.email})
            .select('-v')
            if(foundUser=== null){
                throw Error('User not found,please sign up')
            }
            
            let comparedPassword = await comparePassword(req.body.password,foundUser.password)
            
            if(comparedPassword=== 409){
                throw Error('Check credentials')
            }
            
            let jwtTokenObj = await createJwtToken(foundUser)
            
            res.cookie('jwt-cookie-expense',jwtTokenObj.jwtToken,{
                expires: new Date(Date.now()+ '1h',),
                httpOnly:false,
                secure:process.env.NODE_ENV==='production'?true:false
            })
            res.cookie("jwt-cookie-refresh-expense", jwtTokenObj.refreshToken, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: false,
                secure: process.env.NODE_ENV === "production" ? true : false,
            });
            foundUser = foundUser.toObject()
            delete foundUser.password
            res.json({
                user:foundUser,
            })
        }catch(e){
            res.status(518).json({
                message:getErrorMessage(e)
            })
        }
    },
    logout:(req,res)=>{
        res.clearCookie('jwt-cookie-expense')
        res.clearCookie('jwt-cookie-refresh-expense')
        res.end()
    },

    createUser:async(req,res)=>{
        try {
            let createdUser = await new User()
            createdUser.email = req.body.email
            createdUser.password = req.body.password
            createdUser.username = req.body.username
            createdUser.city = req.body.city
            createdUser.state = req.body.state
            
            console.log(createdUser);
            

            let genSalt = await bcrypt.genSalt(12)
            let hashedPassword = await bcrypt.hash(createdUser.password,genSalt)

            createdUser.password = hashedPassword
            console.log("-----",createdUser);
            

            await createdUser.save()

            res.json({
                message:"user created"
            })


            
        }catch(e){
            console.log(e)
            res.status(518).json({
                
                message:getErrorMessage(e)
            })
        }
    },
    
}