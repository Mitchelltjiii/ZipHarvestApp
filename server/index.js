 
const path = require("path");
const express = require("express");
const app = express(); // create express app
const port = process.env.PORT || 3000
const mysql = require('mysql');  

const db = require('../app/config/db.config');

const Plant = db.Plant;

const hbQueryString = 'select * from harvestbatches';
var hbString = '';

const plantsQueryString = 'select * from plants';
var plantsString = '';

const harvestedPlantsQueryString = 'select * from harvestedplants';
var harvestedPlantsString = '';

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.get('/api/harvestbatches', (req, res) => {
  res.json(hbString);
});

app.get('/api/plants', (req, res) => {
  res.json(plantsString);
});

app.get('/api/harvestedplants', (req, res) => {
  res.json(harvestedPlantsString);
});

app.get('/api/plant', (req, res) => {
  let plant = {};

    try{
        console.log("CREATE PLANT");
        // Building plant object from upoading request's body
        plant.strain = req.body.strain;
        plant.tag = req.body.tag;
        plant.id = "9";
    
        // Save to MySQL database
        Plant.create(plant, 
                          {attributes: ['id', 'strain', 'tag']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port
app.listen(port, () => {
  console.log("server started on port " + port);
});

const connection = mysql.createConnection({
  host     : 'db-mysql-sfo3-15933-do-user-9039451-0.b.db.ondigitalocean.com',
  user     : 'doadmin',
  password : 'xo6wgtevue3qzrmw',
  database : 'defaultdb',
  port: '25060'
});

connection.connect((err) => {const queryString = 'select * from harvestbatches';
var hbString = '';
  if (err) {
      console.log('Connection error message: ' + err.message);
      return;
  }
  console.log('Connected!')
});

connection.query(hbQueryString, (err, res, fields) => {
  if (err) {
   console.log('Error: ' + err);
    return;
 }
 console.log('Here is the result of the query:');
 console.log('===========================================');
 console.log(res);
 console.log('===========================================');
 hbString = res;
});

connection.query(plantsQueryString, (err, res, fields) => {
  if (err) {
   console.log('Error: ' + err);
    return;
 }
 console.log('Here is the result of the query:');
 console.log('===========================================');
 console.log(res);
 console.log('===========================================');
 plantsString = res;
});

connection.query(harvestedPlantsQueryString, (err, res, fields) => {
  if (err) {
   console.log('Error: ' + err);
    return;
 }
 console.log('Here is the result of the query:');
 console.log('===========================================');
 console.log(res);
 console.log('===========================================');
 harvestedPlantsString = res;
});

connection.end();