 
const path = require("path");
const express = require("express");
const app = express(); // create express app
const port = process.env.PORT || 3000
const mysql = require('mysql');

const db = require('../app/config/db.config');

const Plant = db.Plant;

const hbQueryString = 'select * from harvestbatches';

const plantsQueryString = 'select * from plants';

const harvestedPlantsQueryString = 'select * from harvestedplants';

const router = require('../app/routers/router');

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
  console.log('api/harvestbatches');
  connection.query(hbQueryString,
    function(err, result) {
        console.log("GET HARVESTBATCHES RESULT(STRING)- " + JSON.stringify(result));
        res.json(result);
    });
});

app.get('/api/plants', (req, res) => {
  console.log('api/plants');
  connection.query(plantsQueryString,
    function(err, result) {
        console.log("GET PLANTS RESULT(STRING)- " + JSON.stringify(result));
        res.json(result);
    });
});

app.get('/api/harvestedplants', (req, res) => {
  console.log('api/harvestedplants');
  connection.query(harvestedPlantsQueryString,
    function(err, result) {
        console.log("GET HARVESTEDPLANTS RESULT(STRING)- " + JSON.stringify(result));
        res.json(result);
    });
});

//rest api to create a new record into mysql database
app.post('/posttest', (req, res) =>{
  //var postData  = req.body;

  let strain = 'strain3';
  let tag = 'tag3';
  let createdAt = '2021-05-03 22:06:12';
  let updatedAt = '2021-05-03 22:06:12';

  const result = connection.query(
    `INSERT INTO plants 
    (strain, tag, createdAt, updatedAt) 
    VALUES 
    (?, ?, ?, ?)`, 
    [
      strain, tag, createdAt, updatedAt
    ]
  );  

    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    res.json(message);
});

app.post('/harvestbatch', (req, res) =>{
  var postData  = req.body;

  let name = postData.name;
  let finalized = postData.finalized;
  let plantList = postData.plantList;
  let type = postData.type;
  let date = postData.date;
  let createdAt = '2021-05-03 22:06:12';
  let updatedAt = '2021-05-03 22:06:12';

  console.log("POST DATA: HARVESTBATCH STRINGIFIED: " + JSON.stringify(postData));
  console.log("POST DATA: HARVESTBATCH: " + postData);
  console.log("POST DATA: NAME: " + name);

  var postResult = "NO RESULTS";

  const result = connection.query(
    `INSERT INTO harvestbatches 
    (name, finalized, plantList, type, date, createdAt, updatedAt) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?)`, 
    [
      name, finalized, plantList, type, date, createdAt, updatedAt
    ],
    function(err, result2) {
        console.log("RESULT2- " + result2.insertId);
        postResult = result2.insertId;
        console.log("POSTRESULT- " + postResult);
        console.log("POSTRESULT WITH RESPONSE- " + postResult);

        res.json(postResult);
    });  

    console.log("HARVESTBATCH POST RESULT IN SERVER: " + result);

    
});

app.put('/harvestbatch', (req, res) =>{
  var postData  = req.body;

  let id = postData.id;
  let name = postData.name;
  let finalized = postData.finalized;
  let plantList = postData.plantList;
  let type = postData.type;
  let date = postData.date;
  let createdAt = '2021-05-03 22:06:12';
  let updatedAt = '2021-05-03 22:06:12';

  console.log("PUT DATA: HARVESTBATCH STRINGIFIED: " + JSON.stringify(postData));
  console.log("PUT DATA: HARVESTBATCH: " + postData);
  console.log("PUT DATA: NAME: " + name);

  //var sql = "UPDATE trn_employee set first_name =? , last_name =?  WHERE employee_id = ?";

  const result = connection.query(
    `UPDATE harvestbatches set
    name =?, finalized =?, plantList =?, type =?, date =?, createdAt =?, updatedAt =? WHERE id = ?`, 
    [
      name, finalized, plantList, type, date, createdAt, updatedAt, id
    ]
  );  

    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    res.json(message);
});

app.post('/harvestedplant', (req, res) =>{
  var postData  = req.body;

  let uid = postData.uid;
  let strain = postData.strain;
  let tag = postData.tag;
  let weight = postData.weight;
  let unit = postData.unit;
  let createdAt = '2021-05-03 22:06:12';
  let updatedAt = '2021-05-03 22:06:12';

  console.log("POST DATA: HARVESTEDPLANT STRINGIFIED: " + JSON.stringify(postData));
  console.log("POST DATA: UID: " + uid);

  const result = connection.query(
    `INSERT INTO harvestedplants 
    (uid, strain, tag, weight, unit, createdAt, updatedAt) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?)`, 
    [
      uid, strain, tag, weight, unit, createdAt, updatedAt
    ]
  );  

    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    res.json(message);
});

app.put('/harvestedplant', (req, res) =>{
  var postData  = req.body;

  let uid = postData.uid;
  let strain = postData.strain;
  let tag = postData.tag;
  let weight = postData.weight;
  let unit = postData.unit;
  let createdAt = '2021-05-03 22:06:12';
  let updatedAt = '2021-05-03 22:06:12';

  console.log("POST DATA: HARVESTEDPLANT STRINGIFIED: " + JSON.stringify(postData));
  console.log("POST DATA: UID: " + uid);

  const result = connection.query(
    `UPDATE harvestedplants set
    uid =?, strain =?, tag =?, weight =?, unit =?, createdAt =?, updatedAt =? WHERE id = ?`, 
    [
      uid, strain, tag, weight, unit, createdAt, updatedAt, id
    ]
  );  

    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    res.json(message);
});

app.delete(`/plant/:id`, (req, res) =>{
  console.log("Delete Plant: " + req.params.id);
  let plantID = req.params.id;

  const result = connection.query(`DELETE FROM plants WHERE id = ${plantID}`);

    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    res.json(message);
});

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

// start express server on port
app.listen(port, () => {
  console.log("server started on port " + port);
});

connection.connect((err) => {
  if (err) {
      console.log('Connection error message: ' + err.message);
      return;
  }
  console.log('Connected!')
});