 
const path = require("path");
const express = require("express");
const app = express(); // create express app
const port = process.env.PORT || 3000
const mysql = require('mysql');

const db = require('../app/config/db.config');

const Plant = db.Plant;

const hbQueryString = "select * from hb where userID = '";

const plantsQueryString = "select * from pl where userID = '";

const harvestRecordsQueryString = "select * from hr where userID = '";

const usersQueryString = "select * from users where userID = '";

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

app.get('/api/users/:username/:password', (req, res) => {
  console.log('api/users');
  connection.query(usersQueryString,
    function(err, result) {
      console.log("Username**: "+ req.params.username);
      console.log("Password**: "+ req.params.password);

        console.log("GET USERS RESULT(STRING)- " + JSON.stringify(result));
        let parsedUsers = JSON.parse(JSON.stringify(result));
        for(const val of parsedUsers){
          console.log("Val: " + val);
          console.log("Val(String): " + JSON.stringify(val));
          if(val.username==req.params.username){
            console.log("User Match");
            if(val.password==req.params.password){
              console.log("Password Correct!");
              res.json("0");
            }
          }
        }
        res.json("1");
    });
});

app.get('/api/hb/:id', (req, res) => {
  console.log('api/hb');
  let userID = req.params.id;
  console.log("User ID: " + userID);
  var sql = `${userID}`;
  console.log("Commit Query: " + hbQueryString + sql);
  if(userID != ""){
    connection.query(hbQueryString + sql + "'",
      function(err, result) {
          console.log("GET HARVESTBATCHES RESULT(STRING)- " + JSON.stringify(result));
          res.json(result);
      });
  }
});

app.get('/api/pl/:id', (req, res) => {
  console.log('api/pl');
  let userID = req.params.id;
  console.log("User ID: " + userID);
  var sql = `${userID}`;
  console.log("Commit Query: " + plantsQueryString + sql);
  connection.query(plantsQueryString + sql + "'",
    function(err, result) {
        console.log("GET PLANTS RESULT(STRING)- " + JSON.stringify(result));
        res.json(result);
    });
});

app.get('/api/hr/:id', (req, res) => {
  console.log('api/hr');
  let userID = req.params.id;
  console.log("User ID: " + userID);
  var sql = `${userID}`;
  console.log("Commit Query: " + harvestRecordsQueryString + sql);
  connection.query(harvestRecordsQueryString + sql + "'",
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

app.post('/hb', (req, res) =>{
  var postData  = req.body;

  let name = postData.name;
  let submitted = postData.submitted;
  let userID = postData.userID;
  let type = postData.type;
  let date = postData.date;

  console.log("POST DATA: hb STRINGIFIED: " + JSON.stringify(postData));
  console.log("POST DATA: hb: " + postData);
  console.log("POST DATA: NAME: " + name);

  var postResult = "NO RESULTS";

  const result = connection.query(
    `INSERT INTO hb 
    (name, submitted, userID, type, date) 
    VALUES 
    (?, ?, ?, ?, ?)`, 
    [
      name, submitted, userID, type, date
    ],
    function(err, result2) {
      /*
      if(result2 != undefined){
        console.log("RESULT2- " + result2.insertId);
        postResult = result2.insertId;
        console.log("POSTRESULT- " + postResult);
        console.log("POSTRESULT WITH RESPONSE- " + postResult);
      }else{
        console.log("Result2 undefined");
      }*/
      res.json("{}");
    });  

    console.log("HARVESTBATCH POST RESULT IN SERVER: " + result);
});

app.put('/hb', (req, res) =>{
  var postData  = req.body;

  let name = postData.name;
  let submitted = postData.submitted;
  let userID = postData.userID;
  let type = postData.type;
  let date = postData.date;

  console.log("PUT DATA: HB STRINGIFIED: " + JSON.stringify(postData));
  console.log("PUT DATA: HB: " + postData);
  console.log("PUT DATA: NAME: " + name);

  //var sql = "UPDATE trn_employee set first_name =? , last_name =?  WHERE employee_id = ?";

  const result = connection.query(
    `UPDATE hb set
    submitted =?, userID =?, type =?, date =? WHERE name = ?`, 
    [
      submitted, userID, type, date, name
    ],function(err, result2) {
      res.json("{}");
  });  
});

app.post('/hr', (req, res) =>{
  var postData  = req.body;

  let tag = postData.tag;
  let weight = postData.weight;
  let unit = postData.unit;
  let batchName = postData.batchName;
  let userID = postData.userID;

  console.log("POST DATA: HARVESTEDPLANT STRINGIFIED: " + JSON.stringify(postData));

  var postResult = "NO RESULTS";

  console.log("POST DATA: Tag: " + tag);
  console.log("POST DATA: weight: " + weight);
  console.log("POST DATA: unit: " + unit);
  console.log("POST DATA: batchname: " + batchName);
  console.log("POST DATA: userID: " + userID);

  const result = connection.query(
    `INSERT INTO hr 
    (tag, weight, unit, batchName, userID) 
    VALUES 
    (?, ?, ?, ?, ?)`,
    [
      tag, weight, unit, batchName, userID
    ],function(err, result2) {
      if(result2 != undefined){
        console.log("RESULT2- " + result2.insertId);
        postResult = result2.insertId;
        console.log("POSTRESULT- " + postResult);
        console.log("POSTRESULT WITH RESPONSE- " + postResult);
      }else{
        console.log("Result2 undefined");
      }
      try{
        console.log("Error: " + err);
        console.log("Error msg: " + err.message);
        console.log("Error msg (STRING): " + JSON.stringify(err.message));
      }catch(errrror){
        console.log("Errrrrror!");
      }
      res.json(postResult);
    });  
});

app.put('/hr', (req, res) =>{
  var postData  = req.body;

  let id = postData.id;
  let tag = postData.tag;
  let weight = postData.weight;
  let unit = postData.unit;
  let batchName = postData.batchName;
  let userID = postData.userID;

  console.log("POST DATA: HARVESTEDPLANT STRINGIFIED: " + JSON.stringify(postData));

  const result = connection.query(
    `UPDATE hr set
    tag =?, weight =?, unit =?, batchName =?, userID =? WHERE id = ?`, 
    [
      tag, weight, unit, batchName, userID, id
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

app.post('/pl', (req, res) =>{
  var postData  = req.body;

  let tag = postData.tag;
  let strain = postData.strain;
  let userID = postData.userID;
  let active = postData.active;

  console.log("POST DATA: PLANT STRINGIFIED: " + JSON.stringify(postData));
  console.log("POST DATA: strain: " + strain);

  console.log("USER: " + userID);
  console.log("STRAIN: " + strain);
  console.log("TAG: " + tag);
  console.log("ACTIVE: " + active);

  var postResult = "NO RESULTS";


  const result = connection.query(
    `INSERT INTO pl 
    (tag, strain, userID, active) 
    VALUES 
    (?, ?, ?, ?)`, 
    [
      tag, strain, userID, active
    ],function(err, result2) {
      if(result2 != undefined){
        console.log("RESULT2- " + result2.insertId);
        postResult = result2.insertId;
        console.log("POSTRESULT- " + postResult);
        console.log("POSTRESULT WITH RESPONSE- " + postResult);
      }else{
        console.log("Result2 undefined");
      }
      res.json(postResult);
    });  
});

app.put('/pl', (req, res) =>{
  var postData  = req.body;

  let tag = postData.tag;
  let strain = postData.strain;
  let userID = postData.userID;
  let active = postData.active;

  console.log("PUT DATA ACTIVE: PLANT STRINGIFIED: " + JSON.stringify(postData));

  const result = connection.query(
    `UPDATE pl SET
    strain = ?, userID = ?, active = ? WHERE (tag = ?)`, 
    [
      strain, userID, active, tag
    ],function(err, result2) {
      res.json("{}");
  }); 
});

app.put('/pl/active', (req, res) =>{
  var postData  = req.body;

  let tag = postData.tag;
  let active = postData.active;

  console.log("PUT DATA ACTIVE: PLANT STRINGIFIED: " + JSON.stringify(postData));

  const result = connection.query(
    `UPDATE pl SET
    active = ? WHERE (tag = ?)`, 
    [
      active, tag
    ],function(err, result2) {
      res.json("{}");
  }); 
});



app.delete(`/zhplant/:id`, (req, res) =>{
  console.log("Delete Plant: " + req.params.id);
  let plantID = req.params.id;

  const result = connection.query(`DELETE FROM zhplants WHERE id = ${plantID}`);

    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    res.json(message);
});

/*
app.delete(`/hr/:id`, (req, res) =>{
  console.log("Delete HarvestRecord: " + req.params.id);
  let plantID = req.params.id;

  const result = connection.query(`DELETE FROM hr WHERE id = ${plantID}`);

    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    res.json(message);
});*/

app.delete(`/hr/:id`, (req, res) =>{
  console.log("Delete HarvestRecord: " + req.params.id);
  let plantID = req.params.id;
  var sql = `DELETE FROM hr WHERE id = ${plantID}`;
  connection.query(sql,function(err, result) {
        console.log("GET HARVESTBATCHES RESULT(STRING)- " + JSON.stringify(result));
        res.json(result);
        if (err) {
          console.log('DELETE HR Connection error message: ' + err.message);
          return;
      }
    });
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