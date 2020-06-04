const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const User = require('../model/User')
const config = require('./jwtConfig')

async function comparePassword(incomingPassword, userPassword) {
    try {
        let comparedPassword = await bcrypt.compare(incomingPassword,userPassword)
        if(comparedPassword){
            return comparedPassword
        }else{
            throw 409
        }
    } catch (e) {
        return e; 
    }
  }
  function createJwtToken(user) {
    let payload 
    payload = {
        email:user.email,
        _id:user._id,
        username:user.username
    }

    let jwtToken =  jwt.sign(payload,process.env.secret,{
        expiresIn:'1hr'
    })
    
    let refreshToken = jwt.sign({_id:user._id},process.env.refresh_secret,{
        expiresIn:"15hr"
    })
        console.log(refreshToken)
        return {jwtToken,refreshToken}
  }
  
  const checkAuthorizationMiddleWare = expressJwt({
    secret:process.env.secret||config['secret'],
    userProperty:'auth'
  })
  const checkRefreshTokenMiddleWare = expressJwt({
    secret:process.env.refresh_secret||config['refresh_secret'],
    userProperty:'auth'
  })
  
  const findUserExistence= async (req, res, next) => {
    const { _id } = req.auth;
    console.log(req.auth);
    
    try {
      const foundUser = await User.findById({_id: _id}).select('-__v -password');
      req.profile = foundUser;
      next();
    } catch (e) {
      return res.status(404).json({
        error: "User does not exist",
      });
    }
  }
  
  const hasAuthorization = (req,res,next)=>{
    console.log("req.auth is....",req.auth)
    console.log(req.profile)
  
    const authorized = req.profile&&req.auth && req.profile._id == req.auth._id
  
    if(!authorized){
      return res.status(403).json({error:"stop tryna hack my shit"})
    }else {
      next()
    }
  }
  
  
  module.exports={
      comparePassword,
      createJwtToken,
      checkAuthorizationMiddleWare,
      findUserExistence,
      hasAuthorization,
      checkRefreshTokenMiddleWare,
      
  }