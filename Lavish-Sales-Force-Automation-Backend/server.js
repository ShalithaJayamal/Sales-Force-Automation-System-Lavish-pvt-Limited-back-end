const express=require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');

const app=express();//create an express app

app.use(bodyParser.urlencoded({extended:true}))//for parsing application/x-www-form-urlencoded
app.use(bodyParser.json())//for parsing application/json

// Configuring database
const dbConfig = require('./config/database.config');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {    
    useNewUrlParser: true,
    useUnifiedTopology: true

},err=>{
    if(err){
        console.error("Error found-"+err);
    }else{
        console.log("Successfully connected to the database")
    }
})

const users = require('./app/routes/user.routes.js');

app.use(function(req, res,  next) {
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    next();
    });

// Routes
app.use("",users);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message":"Welcome to Lavish Sales Force Automation System!"});
});

const salesRepRouter = require('./app/routes/salesRep.routes');
const customerRouter = require('./app/routes/customer.routes');
const distributorRouter = require('./app/routes/distributor.routes');

app.use('/salesreps',salesRepRouter);
app.use('/distributors',distributorRouter);
app.use('/customers',customerRouter);
// listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
