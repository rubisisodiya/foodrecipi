const express=require('express')
const router=express.Router()
const { User }=require('../models/User')
const { authenticateUser } = require('../middlewares/authentication.js')

// //localhost:3000/users/register
// router.post("/register", function(req,res){
//     const body=req.body
//     const user = new User(body)
//     // console.log(user.isNew) //true 
//     // before saving the record user is new so it returns true
//     User.countDocuments({},function(err,count){
//         console.log('count',count)
//         if(count == 0){
//             user.role='admin'
//         }
//     })
//     user.save()
//     .then(function(user){
//         //console.log(user.isNew) //false
//         //after saving the record is old so it returns false
//         res.send(user)
//     })
//     .catch(function(err){
//         res.send(err)
//     })
    
// })

router.post('/register', (req,res) => {
    const { username, email, password } = req.body
    if(!username||!email||!password) {
        res.send({message:'cannot be empty'})
    }
    const user =new User(req.body)
    User.countDocuments({},function(err,count) {
        console.log('count,count')
        if(count ==0){
            user.role = 'admin'
        }
    })
    user.save()
    .then((user)=>res.send(user))
    .catch((err)=>res.send(err))
})


//localhost:3000/users/login
router.post('/login',function(req,res){
     const body=req.body
     User.findByCredentials(body.email,body.password)
     .then(function(user){
         return user.generateToken() //it will instance method 
     })
     .then(function(user){
         res.send(user)
     })
     .catch(function(err){
         res.status(404).send(err)
     })

//     User.findOne({ email: body.email })
//     .then(function(user){
//         //console.log(user)
//         if(!user){
//             res.status("404").send('invalid email/invalid password')
//         }
//         bcryptjs.compare(body.password,user.password)
//         .then(function(result){
//             if(result){ //return boolen value
//                 res.send(user)//return user data when match with password and username
//             } else{
//                 res.status('404').send('invalid password/invalid password')
//             }
//         })
//     })
//     .catch(function(err){
//         res.send(err)
//     })
})

//localhost:3000/users/account
router.get('/account',authenticateUser, function(req,res){
    const { user }= req
    res.send ({
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    })
})


//localhost:3000/users/logout
router.delete('/logout',authenticateUser,function(req,res){
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: {token: token }}})
    .then(function(){
        res.send({notice:"successfully logged out"})
    })
    .catch(function(err){
        res.send(err)
    })
})



module.exports={
    usersRouter:router
} 