 
const path = require("path");
const express = require("express");
const app = express(); // create express app
const port = process.env.PORT || 3000
const mysql = require('mysql2');

const db = require('../app/config/db.config');

const Plant = db.Plant;

const hbQueryString = 'select * from harvestbatches';
var hbString = '';

const plantsQueryString = 'select * from plants';
var plantsString = '';

const harvestedPlantsQueryString = 'select * from harvestedplants';
var harvestedPlantsString = '';
/*
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));*/

const router = require('../app/routers/router');


// get the promise implementation, we will use bluebird
//const bluebird = require('bluebird');

const connection = mysql.createConnection({
  host     : 'db-mysql-sfo3-15933-do-user-9039451-0.b.db.ondigitalocean.com',
  user     : 'doadmin',
  password : 'xo6wgtevue3qzrmw',
  database : 'defaultdb',
  port: '25060'
});

let appPostDone = true;

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());

app.get('/api/harvestbatches', (req, res) => {
  res.json(hbString);
});

app.get('/api/plants', (req, res) => {
  res.json(plantsString);
});

app.get('/api/harvestedplants', (req, res) => {
  res.json(harvestedPlantsString);
});

app.post('/posttest', (req, res) =>{

  
    let strain = 'strain1';
    let tag = 'tag1';
    let createdAt = 'ss';
    let updatedAt = 'ss';
    
    console.log("Posttest start");
    (async () => {
      console.log("Async wrapper start");
      const result = await connection.query(
        `INSERT INTO plants 
        (strain, tag, createdAt, updatedAt) 
        VALUES 
        (?, ?, ?, ?)`, 
        [
          strain, tag, createdAt, updatedAt
        ]
      );
      console.log("Async wrapper ended");
    })();

    console.log("After async wrap");

    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    res.json(message);

  
  /*
  console.log("Start posttest");
  let appPostResponse = 'Didnt process apppost';
  appPostDone = false;
  console.log("Before apppostfunc");

  appPostResponse = appPost(req,res);
  console.log("After apppostfunction");

  while(appPostDone === false){
    sleep(100);
    console.log("Sleep");
  }

  console.log("appPostResponse: " + appPostResponse);

  res.json(appPostResponse);*/
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

async function appPost(req, res){
  console.log("Enter Apppost");

  appPostDone = true;
  console.log("returning form apppost");



  return "Got to apppost";
  /*
  let strain = 'strain1';
    let tag = 'tag1';
    const result = await connection.query(
      `INSERT INTO plants 
      (strain, tag) 
      VALUES 
      (?, ?)`, 
      [
        strain, tag
      ]
    );
  
    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    return message;*/
}

//app.use('/', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
/*
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  Plant.sync().then(() => {
    const plants = [
      { id: '1', strain: 'Runtz', tag: '001'},
      { id: '2', strain: 'Venom OG', tag: '002'},
      { id: '3', strain: 'Bruce Banner', tag: '003'},
      { id: '4', strain: 'Key Lime Pie', tag: '004'},
      { id: '5', strain: 'Gelato 41', tag: '005'},
      { id: '6', strain: 'Sour Sunset Sherbert', tag: '006'}
    ]
    
    for(let i=0; i<plants.length; i++){
      Plant.create(plants[i]);
    }
  });
});*/ 




/*

app.get('/api/harvestbatches', (req, res) => {
  res.json(hbString);
});

app.get('/api/plants', (req, res) => {
  res.json(plantsString);
});

app.get('/api/harvestedplants', (req, res) => {
  res.json(harvestedPlantsString);
});

app.put('/api/plant', (req, res) => {
  let plant = {};
    try{
        console.log("CREATE PLANT");
        // Building plant object from upoading request's body
        plant.id = 9;
        plant.strain = "strain1";
        plant.tag = "tag1";
    
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

app.post('/api/plant', async (req, res) => {
  try{
    console.log("UPDATE PLANT");

    if(!plant){
        // return a response to client
        res.status(404).json({
            message: "Not Found for updating a plant with id = " + plantId,
            error: "404"
        });
    } else {    
        // update new change to database
        let updatedObject = {
            id: "9",
            strain: req.body.strain,
            tag: req.body.tag
        }
        let result = await Plant.update(updatedObject,
                          { 
                            returning: true, 
                            where: {id: "9"},
                            attributes: ['id', 'strain', 'tag']
                          }
                        );

        // return the response to client
        if(!result) {
            res.status(500).json({
                message: "Error -> Can not update a plant with id = " + req.params.id,
                error: "Can NOT Updated",
            });
        }

        res.status(200).json(result);
    }
  } catch(error){
    res.status(500).json({
        message: "Error -> Can not update a plant with id = " + req.params.id,
        error: error.message
    });
  }
});
*/

// start express server on port
app.listen(port, () => {
  console.log("server started on port " + port);
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