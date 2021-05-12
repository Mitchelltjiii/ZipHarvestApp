 
const path = require("path");
const express = require("express");
const app = express(); // create express app
const port = process.env.PORT || 3000
const mysql = require('mysql');            

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.get('/api/harvestbatches', (req, res) => {
  
  console.log('API/HARVESTBATCHES');

  const queryString = 'select * from harvestbatches';
  var hbString = '';

  connection.connect((err) => {
    if (err) {
        console.log('Connection error message: ' + err.message);
        return;
    }
    console.log('Connected!')
  });
  
  connection.query(queryString, (err, res, fields) => {
    if (err) {
     console.log('Error: ' + err);
      return;
   }
   console.log('Here is the result of the query:');
   console.log('===========================================');
   console.log(res);
   console.log('===========================================');
   hbString = res;

   connection.end();

   res.json(hbString);
  });
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

connection.connect((err) => {
  if (err) {
      console.log('Connection error message: ' + err.message);
      return;
  }
  console.log('Connected!')
});

connection.end();