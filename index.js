var mysql = require('mysql')
var express = require('express')
var bodyparser = require('body-parser')
const userRoute = require('./routes/userRouters.js')
const port = 8000
const hostname="0.0.0.0"
var app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(userRoute)
app.listen(port, hostname,()=>{
    console.log('server ready')
})