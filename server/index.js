 
const path = require("path");
const express = require("express");
const app = express(); // create express app
const port = process.env.PORT || 3000
const mysql = require('mysql');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

var pool  = mysql.createPool({
  host     : 'db-mysql-sfo3-15933-do-user-9039451-0.b.db.ondigitalocean.com',
  user     : 'doadmin',
  password : 'xo6wgtevue3qzrmw',
  database : 'defaultdb',
  port: '25060'
});

const db = require('../app/config/db.config');

const Plant = db.Plant;

const hbQueryString = "select * from hb where userID = '";

const plantsQueryString = "select * from pl where userID = '";

const harvestRecordsQueryString = "select * from hr where userID = '";

const usersQueryString = "select * from users";

const possibleSubQueryString = "select * from possibleSub where username = '";

const router = require('../app/routers/router');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

/*
const msg = {
  to: 'sophiameryn@gmail.com', // Change to your recipient
  from: 'support@zipharvest.app', // Change to your verified sender
  subject: 'No Fuckin Way',
  text: 'Look at this shit',
  html: '<strong>its so crazy</strong>',
}

sgMail.send(msg).then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  }).catch((error) => {
    console.error(error)
  })*/

app.get('/send-verification-email/:address/:verificationCode/:username', async (req,res) =>{
    const msg = {
      to: req.params.address, // Change to your recipient
      from: 'support@zipharvest.app', // Change to your verified sender
      subject: 'Verification Code',
      text: 'Here is your verification code: ',
      html: 'Here is your verification link: <strong>' + "https://www.zipharvest.app/verCode=" + req.params.verificationCode + '/username=' + req.params.username + '</strong>',
    }
    
    sgMail.send(msg).then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
        res.json(0);
      }).catch((error) => {
        console.error(error)
        res.json(1);
      })
  })

app.get("/api/users/:username/:password",(req,res) => {
  pool.getConnection((err, connection) => {
      if(err) throw err;
      console.log('connected as id ' + connection.threadId);
      connection.query(usersQueryString, (err, rows) => {
          connection.release(); // return the connection to pool
          if(err) throw err;
          console.log('The data from users table are: \n', rows);
          let foundLogin = false;
          try{
            console.log("Trying iteration without parse");
            for(const val of rows){
              console.log("Row: " + val);
              console.log("Row.stringify: " + JSON.stringify(val));
              if(val.username==req.params.username){
                console.log("User Match");
                if(val.password==req.params.password){
                  console.log("Password Correct!");
                  foundLogin = true;
                }
              }
            }
            console.log("Found Login: " + foundLogin);
          }catch(error){
            console.log("Caught error 1");
          }
          if(foundLogin){
            res.json(0);
          }else{
            res.json(1);
          }
    });
  });
});
/*
const connection = mysql.createConnection({
  host     : 'db-mysql-sfo3-15933-do-user-9039451-0.b.db.ondigitalocean.com',
  user     : 'doadmin',
  password : 'xo6wgtevue3qzrmw',
  database : 'defaultdb',
  port: '25060'
});*/

let appPostDone = true;

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());

const YOUR_DOMAIN = 'https://www.zipharvest.app/';

app.get('/get-session/:sessionId', async (req,res) =>{
  const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
  console.log("Before response from getsession")
  res.json(session);
})

app.get('/get-subscription/:subscriptionId', async (req,res) =>{
  const subscription = await stripe.subscriptions.retrieve(req.params.subscriptionId);
  console.log("Before response from getSubscription")
  res.json(subscription);
})

app.get('/get-possible-subscription/:username', async (req,res) =>{
  pool.getConnection((err, connection) => {
    console.log("get Possible sub");
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    let username = req.params.username;
    var sql = `${username}`;
    console.log("Commit Query: " + possibleSubQueryString + sql);
    connection.query(possibleSubQueryString + sql + "'", (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) throw err;
        console.log('The data from possiblesub table are: \n', rows);
        res.json(rows);
    });
  })
})

app.get('/get-possible-subscription-seshId/:seshId', async (req,res) =>{
  pool.getConnection((err, connection) => {
    console.log("get Possible sub with sesh ID");
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query("select * from possibleSub", (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) throw err;
        console.log('The data from possiblesub all table are: \n', rows);
        for(const val of rows){
          if(val.sessionid === req.params.seshId){
            res.json(val);
          }
        }
    });
  })
})

app.get('/get-products', async (req,res) =>{
  const products = await stripe.products.list({limit: 10,});
  console.log("Before response from getProducts")
  res.json(products);
})

app.get('/get-product/:productId', async (req,res) =>{
  const product = await stripe.products.retrieve(req.params.productId); 
   console.log("Before response from getproduct")
  res.json(product);
})

app.get('/get-prices', async (req,res) =>{
  const prices = await stripe.prices.list({limit: 10,});
  console.log("Before response from getPrices")
  res.json(prices);
})

app.get('/get-price/:priceId', async (req,res) =>{
  const price = await stripe.prices.retrieve(req.params.priceId);   
  console.log("Before response from getprice")
  res.json(price);
})

app.get('/set-lookup-key/:priceId/:lookupKey', async (req,res) =>{
  const price = await stripe.prices.update(
    req.params.priceId,
    {lookup_key: req.params.lookupKey}); 
  console.log("Before response from setprice")
  res.json(price);
})



app.post('/create-checkout-session/:lookup_key', async (req, res) => {
  console.log("Create session in index.js");
  const prices = await stripe.prices.list({
    lookup_keys: [req.params.lookup_key],
    expand: ['data.product'],
  });
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    payment_method_types: ['card'],
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${YOUR_DOMAIN}?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  try{
    console.log("Session in index.js: " + session);
  }catch(err){

  }
  try{
    console.log("Session(text) in index.js: " + JSON.stringify(session));
  }catch(err){

  }
  res.json(session);
});
app.post('/create-portal-session', async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });
  res.redirect(303, portalSession.url);
});
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    console.log("Webhook engaged!");
    const event = request.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = 'whsec_L9PpqfRIsJna3rvtEzfIAhKPca1gbEEq';
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.trial_will_end':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case 'customer.subscription.deleted':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case 'customer.subscription.created':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case 'customer.subscription.updated':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);



/*
app.get('/api/users/:username/:password', (req, res) => {
  try{
    console.log('api/users');
    connection.query(usersQueryString,
      function(err, result) {
        console.log("Username**: "+ req.params.username);
        console.log("Password**: "+ req.params.password);
  
          console.log("GET USERS RESULT- " + result);
          console.log("GET USERS RESULT(STRING)- " + JSON.stringify(result));
  
          if(result!="" && result!=undefined){
            let parsedUsers = result;
            let foundLogin = false;
            for(const val of parsedUsers){
              console.log("Val: " + val);
              console.log("Val(String): " + JSON.stringify(val));
              if(val.username==req.params.username){
                console.log("User Match");
                if(val.password==req.params.password){
                  console.log("Password Correct!");
                  foundLogin = true;
                  res.json(0);
                }
              }
            }
            if(!foundLogin){
              console.log("Respond: 1");
              res.json(1);
            }
          }else{
            console.log("Caught error userquery**");
            connection.connect((err) => {
            if (err) {
              console.log('Connection error message: ' + err.message);
               res.json(2);
             }else{
             console.log('Connected!')
             res.json(3);
            }
            });
          }
      });
  }catch(error){
    console.log("Caught error userquery");
    connection.connect((err) => {
      if (err) {
          console.log('Connection error message: ' + err.message);
          res.json(2);
        }else{
          console.log('Connected!')
          res.json(3);
        }
    });
  }
  
});*/

app.get('/api/hb/:id', (req, res) => {
  /*
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
  }*/
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    console.log('api/hb');
    let userID = req.params.id;
    console.log("User ID: " + userID);
    var sql = `${userID}`;
    console.log("Commit Query: " + hbQueryString + sql);
    connection.query(hbQueryString + sql + "'", (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) throw err;
        console.log('The data from hb table are: \n', rows);
        res.json(rows);
    });
  });
});

app.get('/api/pl/:id', (req, res) => {
  /*
  console.log('api/pl');
  let userID = req.params.id;
  console.log("User ID: " + userID);
  var sql = `${userID}`;
  console.log("Commit Query: " + plantsQueryString + sql);
  connection.query(plantsQueryString + sql + "'",
    function(err, result) {
        console.log("GET PLANTS RESULT(STRING)- " + JSON.stringify(result));
        res.json(result);
    });*/
    pool.getConnection((err, connection) => {
      if(err) throw err;
      console.log('connected as id ' + connection.threadId);
      console.log('api/pl');
      let userID = req.params.id;
      console.log("User ID: " + userID);
      var sql = `${userID}`;
      console.log("Commit Query: " + plantsQueryString + sql);
      connection.query(plantsQueryString + sql + "'", (err, rows) => {
          connection.release(); // return the connection to pool
          if(err) throw err;
          console.log('The data from plants table are: \n', rows);
          res.json(rows);
      });
    });
});

app.get('/api/hr/:id', (req, res) => {
  /*
  console.log('api/hr');
  let userID = req.params.id;
  console.log("User ID: " + userID);
  var sql = `${userID}`;
  console.log("Commit Query: " + harvestRecordsQueryString + sql);
  connection.query(harvestRecordsQueryString + sql + "'",
    function(err, result) {
        console.log("GET HARVESTEDPLANTS RESULT(STRING)- " + JSON.stringify(result));
        res.json(result);
    });*/
    pool.getConnection((err, connection) => {
      if(err) throw err;
      console.log('connected as id ' + connection.threadId);
      console.log('api/hb');
      let userID = req.params.id;
      console.log("User ID: " + userID);
      var sql = `${userID}`;
      console.log("Commit Query: " + harvestRecordsQueryString + sql);
      connection.query(harvestRecordsQueryString + sql + "'", (err, rows) => {
          connection.release(); // return the connection to pool
          if(err) throw err;
          console.log('The data from hr table are: \n', rows);
          res.json(rows);
      });
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
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    var postData  = req.body;

  let name = postData.name;
  let userID = postData.userID;
  let type = postData.type;
  let date = postData.date;

  console.log("POST DATA: hb STRINGIFIED: " + JSON.stringify(postData));
  console.log("POST DATA: hb: " + postData);
  console.log("POST DATA: NAME: " + name);

  connection.query(`INSERT INTO hb 
    (name, userID, type, date) 
    VALUES 
    (?, ?, ?, ?)`, 
    [
      name, userID, type, date
    ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    console.log('The post hb result is: ', result);
    res.json(result);
    });
  });
});

app.put('/hb', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    var postData  = req.body;

  let name = postData.name;
  let userID = postData.userID;
  let type = postData.type;
  let date = postData.date;

  console.log("PUT DATA: HB STRINGIFIED: " + JSON.stringify(postData));
  console.log("PUT DATA: HB: " + postData);
  console.log("PUT DATA: NAME: " + name);

  connection.query(`UPDATE hb set
  userID =?, type =?, date =? WHERE name = ?`, 
  [
    userID, type, date, name
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    console.log('The put hb result is: ', result);
    res.json(result);
    });
  });
});

app.post('/user', (req, res) =>{

  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    var postData  = req.body;

  let apiid = postData.apiid;
  let username = postData.username;
  let password = postData.password;
  let subid = postData.subid;

  if(subid === null || subid === undefined){
    res.json("");
  }

  console.log("POST DATA: apiid: " + apiid);
  console.log("POST DATA: username: " + username);
  console.log("POST DATA: password: " + password);
  console.log("POST DATA: subid: " + subid);

  console.log("POST DATA: HARVESTEDPLANT STRINGIFIED: " + JSON.stringify(postData));

  if(apiid !== null && username !== null && password !== null && subid !== null){
    connection.query(`INSERT INTO users 
  (apiid, username, password, subid) 
  VALUES 
  (?, ?, ?, ?)`,
  [
    apiid, username, password, subid
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    console.log('The post user result is: ', result);
    res.json(result);
    });
  }else{
    res.json("");
  }
  }); 
});

/*
app.post('/justPost', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
  }
})
*/

app.post('/possibleSub', (req, res) =>{

  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    var postData  = req.body;

    let verificationCode = postData.verificationCode;
    let username = postData.username;
    let password = postData.password;
    let sessionid = postData.sessionid;
    let verified = postData.verified;
  
    console.log("POST DATA: sessionid: " + sessionid);
    console.log("POST DATA: username: " + username);
    console.log("POST DATA: password: " + password);
    console.log("POST DATA: verficationCode: " + verificationCode);
    console.log("POST DATA: verified: " + verified);

  console.log("POST DATA: possiblesub STRINGIFIED: " + JSON.stringify(postData));

  connection.query(`INSERT INTO possibleSub 
  (username, password, verificationCode, verified, sessionid) 
  VALUES 
  (?, ?, ?, ?, ?)`,
  [
    username, password, verificationCode, verified, sessionid 
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    console.log('The post user result is: ', result);
    res.json(result);
    });
  }); 
});

app.put('/possibleSub', (req, res) =>{

  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    var postData  = req.body;

  let verificationCode = postData.verificationCode;
  let username = postData.username;
  let password = postData.password;
  let sessionid = postData.sessionid;
  let verified = postData.verified;

  console.log("POST DATA: sessionid: " + sessionid);
  console.log("POST DATA: username: " + username);
  console.log("POST DATA: password: " + password);
  console.log("POST DATA: verficationCode: " + verificationCode);
  console.log("POST DATA: verified: " + verified);

  console.log("POST DATA: possiblesub STRINGIFIED: " + JSON.stringify(postData));

  connection.query(`UPDATE possibleSub set
  password =?, verificationCode =?, verified =?, sessionid =? WHERE username = ?`,
  [
    password, verificationCode, verified, sessionid, username
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    console.log('The post user result is: ', result);
    res.json(result);
    });
  }); 
});

app.post('/hr', (req, res) =>{

  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    var postData  = req.body;

  let tag = postData.tag;
  let weight = postData.weight;
  let unit = postData.unit;
  let batchName = postData.batchName;
  let userID = postData.userID;

  console.log("POST DATA: Tag: " + tag);
  console.log("POST DATA: weight: " + weight);
  console.log("POST DATA: unit: " + unit);
  console.log("POST DATA: batchname: " + batchName);
  console.log("POST DATA: userID: " + userID);

  console.log("POST DATA: HARVESTEDPLANT STRINGIFIED: " + JSON.stringify(postData));

  connection.query(`INSERT INTO hr 
  (tag, weight, unit, batchName, userID) 
  VALUES 
  (?, ?, ?, ?, ?)`,
  [
    tag, weight, unit, batchName, userID
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    console.log('The post hr result is: ', result);
    res.json(result);
    });
  }); 
});

app.put('/hr', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    var postData  = req.body;

  let id = postData.id;
  let tag = postData.tag;
  let weight = postData.weight;
  let unit = postData.unit;
  let batchName = postData.batchName;
  let userID = postData.userID;

  console.log("POST DATA: HARVESTEDPLANT STRINGIFIED: " + JSON.stringify(postData));

  connection.query(`UPDATE hr set
  tag =?, weight =?, unit =?, batchName =?, userID =? WHERE id = ?`, 
  [
    tag, weight, unit, batchName, userID, id
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    console.log('The post hr result is: ', result);
    res.json(result);
    });
  }); 
});

app.delete(`/plant/:id`, (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    console.log("Delete Plant: " + req.params.id);
    let plantID = req.params.id;
    connection.query(`DELETE FROM plants WHERE id = ${plantID}`);
  });
});

app.delete(`/possibleSub/:username`, (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log("Delete PossibleSub: " + req.params.username);
    connection.query(`DELETE FROM possibleSub WHERE username = ${req.params.username}`);
  });
});

app.post('/pl', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
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

  connection.query(`INSERT INTO pl 
  (tag, strain, userID, active) 
  VALUES 
  (?, ?, ?, ?)`, 
  [
    tag, strain, userID, active
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    console.log('The post plants result is: ', result);
    res.json(result);
  });
  /*
  connection.query(
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
    });*/
  });
  /*
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
    });  */
});

app.put('/pl', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    var postData  = req.body;

  let tag = postData.tag;
  let strain = postData.strain;
  let userID = postData.userID;
  let active = postData.active;

  console.log("PUT DATA ACTIVE: PLANT STRINGIFIED: " + JSON.stringify(postData));

  connection.query(`UPDATE pl SET
  strain = ?, userID = ?, active = ? WHERE (tag = ?)`, 
  [
    strain, userID, active, tag
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    console.log('The put pl result is: ', result);
    res.json(result);
    });
  });
});

app.put('/pl/active', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    var postData  = req.body;

  let tag = postData.tag;
  let active = postData.active;

  console.log("PUT DATA ACTIVE: PLANT STRINGIFIED: " + JSON.stringify(postData));


  connection.query(`UPDATE pl SET
  active = ? WHERE (tag = ?)`, 
  [
    active, tag
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    console.log('The update active pl result is: ', result);
    res.json(result);
    });
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
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    console.log("Delete HarvestRecord: " + req.params.id);
  let plantID = req.params.id;
  var sql = `DELETE FROM hr WHERE id = ${plantID}`;

  connection.query(sql, (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    console.log('The update active pl result is: ', result);
    res.json(result);
    });
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
/*
connection.connect((err) => {
  if (err) {
      console.log('Connection error message: ' + err.message);
      return;
  }
  console.log('Connected!')
});*/