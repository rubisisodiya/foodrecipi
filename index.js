const express=require('express')
const cors=require('cors')
const { mongoose } = require('./config/database')

const {usersRouter} =require('./app/controllers/UsersControllers')


const app =express()

const port = 3005

app.use(express.json())
app.use(cors())
app.get('/',(req,res) => {
    res.send('<h1> welcome to food </h1>')
})

app.use('/users',usersRouter)


app.listen(port,function(){
    console.log('listing on port',port)
})