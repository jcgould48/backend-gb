const mongoose = require('mongoose')
const moment = require('moment')
const now = moment()

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:'username is unique',
        unique:'Username already exists,please choose another'
        
    },
    email:{
        type:String,
        trim:true,
        required:'Email is required',
        unique:'Email already has a user',
        match:[/.+@..+/,'Please enter a valid email']
        
    },
    password:{
        type:String,
        required:'password us required',

    },

    city:{
        type:String,
        trim:true,
        //match:[/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g,"no special characters"]
    },
    state:{
        type:String,
        trim:true,
       // match:[/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g,"no special characters"]
    },
    userCreated:{
        type:String,
        default:now.format('dddd,MMMM Do YYY,h:mm:ss a')
    },
    
})


module.exports = mongoose.model('User',UserSchema)

//try again
// if this is it im going to jump out my window 