const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const dbConnection = mongoose.connect('mongodb://localhost/bookAPI')


const port = process.env.PORT || 3000;

const Book = require('./models/bookModel')
const bookRouter = require('./routes/bookRouter')(Book)

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use('/api', bookRouter)

app.get('/', (request, response)=>{
    response.send("Welcome to Node API")
})

app.listen(port, ()=>{
    console.log(`listening on port :: ${port}`)
})