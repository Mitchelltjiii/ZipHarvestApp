 
const path = require("path");
const express = require("express");
const app = express(); // create express app
const port = process.env.PORT || 3000
const mysql = require('mysql');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const bcrypt = require('bcrypt');

var pool  = mysql.createPool({
  host     : 'db-mysql-sfo3-15933-do-user-9039451-0.b.db.ondigitalocean.com',
  user     : 'doadmin',
  password : 'xo6wgtevue3qzrmw',
  database : 'defaultdb',
  port: '25060'
});

const hbQueryString = "select * from hb where userID = '";

const plantsQueryString = "select * from pl where userID = '";

const dryRoomsQueryString = "select * from dr where userID = '";

const exportRecordsQueryString = "select * from er where userID = '";

const harvestRecordsQueryString = "select * from hr where userID = '";

const usersQueryString = "select * from users";

const usersQueryStringFromUsername = "select * from users where username = '";

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.get('/send-verification-email/:address/:verificationCode/:username', async (req,res) =>{
    const msg = {
      to: req.params.address, // Change to your recipient
      from: 'support@zipharvest.app', // Change to your verified sender
      subject: 'Verification Code',
      text: 'Here is your verification code: ',
      html: 'Here is your verification link: <strong>' + "https://www.zipharvest.app/verCode=" + req.params.verificationCode + '/username=' + req.params.username + '</strong>',
    }
    
    sgMail.send(msg).then((response) => {
        res.json(0);
      }).catch((error) => {
        res.json(1);
      })
  })

  app.get('/send-reset-link/:address/:linkCode/:username', async (req,res) =>{
    const msg = {
      to: req.params.address, // Change to your recipient
      from: 'support@zipharvest.app', // Change to your verified sender
      subject: 'Reset Password Link',
      text: 'Here',
      html: 'Here is the link to reset your password: <strong>' + "https://www.zipharvest.app/linkCode=" + req.params.linkCode + '/username=' + req.params.username + '</strong>',
    }

    sgMail.send(msg).then((response) => {
        res.json(0);
      }).catch((error) => {
        res.json(1);
      })
  }) 
  
  app.get('/send-find-user/:email', async (req,res) =>{
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query(usersQueryString, (err, rows) => {
          connection.release(); // return the connection to pool
          if(err) throw err;
          let foundUser = false;
          try{
            for(const val of rows){
              if((val.email).toLowerCase()===(req.params.email).toLowerCase()){
                foundUser = true;

                const msg = {
                  to: req.params.email, // Change to your recipient
                  from: 'support@zipharvest.app', // Change to your verified sender
                  subject: 'Username Recovery',
                  text: 'Here',
                  html: 'Your username is ' + val.username +'.\nhttps://www.zipharvest.app/',
                }
                sgMail.send(msg).then((response) => {
                    res.json(0);
                  }).catch((error) => {
                    res.json(1);
                  })
              }
            }
          }catch(error){
          }
          if(!foundUser){
            res.json(1);
          }
    });
  });    
}) 

app.get("/api/users/:username/:password",(req,res) => {
  pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query(usersQueryString, (err, rows) => {
          connection.release(); // return the connection to pool
          if(err) throw err;
          let foundLogin = false;
          let verified = false;
          let subscription = false;

          let foundUser = false;
          try{
            for(const val of rows){
              if(val.username==req.params.username){
                foundUser = true;
                bcrypt.compare(req.params.password, val.password, function(err, resp) {
                  if (resp) {
                    foundLogin = true;
                    if(val.verified===0){
                      verified = true;
                    }
                    if(val.subid !== ""){
                      subscription = true;
                    }

                    if(subscription){
                      res.json(0);
                    }else if(verified){
                      res.json(1);
                    }else{
                      res.json(2);
                    }
                  } else {
                    res.json(3);
                  }
                });
              }
            }
          }catch(error){
            res.json(3);
          }
          if(!foundUser){
            res.json(3);
          }
    });
  });
});

app.get("/api/user-exists/:username",(req,res) => {
  pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query(usersQueryString, (err, rows) => {
          connection.release(); // return the connection to pool
          let userExists = false;
          if(err) throw err;
          try{
            for(const val of rows){
              if(val.username==req.params.username){
                userExists=true;
                res.json(0);
              }
            }
          }catch(error){
          }
          if(!userExists){
            res.json(1);
          }
    });
  });
});

app.get("/api/email-exists/:email",(req,res) => {
  pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query(usersQueryString, (err, rows) => {
          connection.release(); // return the connection to pool
          let emailExists = false;
          if(err) throw err;
          try{
            for(const val of rows){
              if(val.email==req.params.email){
                /*emailExists=true;
                res.json(0);*/
              }
            }
          }catch(error){
          }
          if(!emailExists){
            res.json(1);
          }
    });
  });
});

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
  res.json(session);
})

app.get('/get-subscription/:subscriptionId', async (req,res) =>{
  const subscription = await stripe.subscriptions.retrieve(req.params.subscriptionId);
  res.json(subscription);
})

app.get('/cancel-subscription/:subscriptionId', async (req,res) =>{
  const deleted = await stripe.subscriptions.del(req.params.subscriptionId);
  res.json(deleted);
})

app.get('/get-user/:username', async (req,res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    let username = req.params.username;
    var sql = `${username}`;
    connection.query(usersQueryStringFromUsername + sql + "'", (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) throw err;
        res.json(rows);
    });
  })
})

app.get('/get-email/:username', async (req,res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    let username = req.params.username;
    var sql = `${username}`;
    connection.query(usersQueryStringFromUsername + sql + "'", (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) throw err;
        if(rows[0] !== null && rows[0] !== undefined && rows[0] !== []){
          res.json(rows[0].email);
        }else{
          res.json("");
        }
    });
  })
})

app.get('/get-subid/:username', async (req,res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    let username = req.params.username;
    var sql = `${username}`;
    connection.query(usersQueryStringFromUsername + sql + "'", (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) throw err;
        res.json(rows[0].subid);
    });
  })
})

app.get('/get-user-seshId/:seshId', async (req,res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query("select * from users", (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) throw err;
        for(const val of rows){
          if(val.sessionid === req.params.seshId){
            res.json(val);
          }
        }
    });
  })
})

app.get('/update-subscription/:subid/:priceid', async (req,res) =>{
  const subscription = await stripe.subscriptions.retrieve(req.params.subid);

  stripe.subscriptions.update(req.params.subid, {
  cancel_at_period_end: false,
  proration_behavior: 'create_prorations',
  items: [{
    id: subscription.items.data[0].id,
    price: req.params.priceid,
  }]
});
  res.json(subscription);
})

app.get('/get-products', async (req,res) =>{
  const products = await stripe.products.list({limit: 10,});
  res.json(products);
})

app.get('/get-product/:productId', async (req,res) =>{
  const product = await stripe.products.retrieve(req.params.productId); 
  res.json(product);
})

app.get('/get-prices', async (req,res) =>{
  const prices = await stripe.prices.list({limit: 10,});
  res.json(prices);
})

app.get('/get-price/:priceId', async (req,res) =>{
  const price = await stripe.prices.retrieve(req.params.priceId);   
  res.json(price);
})

app.get('/set-lookup-key/:priceId/:lookupKey', async (req,res) =>{
  const price = await stripe.prices.update(
    req.params.priceId,
    {lookup_key: req.params.lookupKey}); 
  res.json(price);
})



app.post('/create-checkout-session/:lookup_key', async (req, res) => {
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
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case 'customer.subscription.deleted':
        subscription = event.data.object;
        status = subscription.status;
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case 'customer.subscription.created':
        subscription = event.data.object;
        status = subscription.status;
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case 'customer.subscription.updated':
        subscription = event.data.object;
        status = subscription.status;
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      default:
        // Unexpected event type
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.get('/api/hb/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;
    let userID = req.params.id;
    var sql = `${userID}`;
    connection.query(hbQueryString + sql + "'", (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) throw err;
        res.json(rows);
    });
  });
});

app.get('/api/dr/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;
    let userID = req.params.id;
    var sql = `${userID}`;
    connection.query(dryRoomsQueryString + sql + "'", (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) throw err;
        res.json(rows);
    });
  });
});


app.get('/api/er/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;
    let userID = req.params.id;
    var sql = `${userID}`;
    connection.query(exportRecordsQueryString + sql + "'", (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) throw err;
        res.json(rows);
    });
  });
});

app.get('/api/pl/:id', (req, res) => {
    pool.getConnection((err, connection) => {
      if(err) throw err;
      let userID = req.params.id;
      var sql = `${userID}`;
      connection.query(plantsQueryString + sql + "'", (err, rows) => {
          connection.release(); // return the connection to pool
          if(err) throw err;
          res.json(rows);
      });
    });
});

app.get('/api/hr/:id', (req, res) => {
    pool.getConnection((err, connection) => {
      if(err) throw err;
      let userID = req.params.id;
      var sql = `${userID}`;
      connection.query(harvestRecordsQueryString + sql + "'", (err, rows) => {
          connection.release(); // return the connection to pool
          if(err) throw err;
          res.json(rows);
      });
    });
});

app.post('/er/:tag/:time/:userID', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;

  connection.query(`INSERT INTO er 
    (userID, tag, time) 
    VALUES 
    (?, ?, ?)`, 
    [
      req.params.userID, req.params.tag, req.params.time
    ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
});

app.post('/dr', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    var postData  = req.body;

  let name = postData.name;
  let userID = postData.userID;

  connection.query(`INSERT INTO dr 
    (name, userID) 
    VALUES 
    (?, ?)`, 
    [
      name, userID
    ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
});

app.post('/hb', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    var postData  = req.body;

  let name = postData.name;
  let userID = postData.userID;
  let type = postData.type;
  let date = postData.date;

  connection.query(`INSERT INTO hb 
    (name, userID, type, date) 
    VALUES 
    (?, ?, ?, ?)`, 
    [
      name, userID, type, date
    ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
});

app.put('/hb', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    var postData  = req.body;

  let name = postData.name;
  let userID = postData.userID;
  let type = postData.type;
  let date = postData.date;

  connection.query(`UPDATE hb set
  userID =?, type =?, date =? WHERE name = ?`, 
  [
    userID, type, date, name
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
});

app.get("/api/tutorials/:username",(req,res) => {
  pool.getConnection((err, connection) => {
      console.log("Api users get tutorials");
      if(err) throw err;
      let username = req.params.username;
      var sql = `${username}`;
      connection.query(usersQueryStringFromUsername + sql + "'", (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) throw err;
        res.json(rows[0].tutorials);
    });
  });
});

app.put('/user', (req, res) =>{

  pool.getConnection((err, connection) => {
    if(err) throw err;
    var postData  = req.body;

  let apiid = postData.apiid;
  let username = postData.username;
  let password = postData.password;
  let subid = postData.subid;
  let linkCode = postData.linkCode;
  let facilityName = postData.facilityName;
  let firstName = postData.firstName;
  let lastName = postData.lastName;
  let email = postData.email;
  let verificationCode = postData.verificationCode;
  let verified = postData.verified;
  let sessionid = postData.sessionid;
  let verCodeTime = postData.verCodeTime;
  let linkCodeTime = postData.linkCodeTime;
  let tutorials = postData.tutorials;

  if(apiid !== null && username !== null && password !== null && subid !== null){
    bcrypt.hash(password, 10, function(err, hash) {
      connection.query(`UPDATE users set
  apiid =?, password =?, subid =?, linkCode =?, facilityName =?, firstName =?, lastName =?, email =?, verificationCode =?, verified =?, sessionid =?, verCodeTime =?, linkCodeTime =?, tutorials =? WHERE username = ?`,
  [
    apiid, hash, subid, linkCode, facilityName, firstName, lastName, email, verificationCode, verified, sessionid, verCodeTime, linkCodeTime, tutorials, username
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
    });
    
  }else{
    res.json("");
  }
  }); 
});

app.post('/user', (req, res) =>{

  pool.getConnection((err, connection) => {
    if(err) throw err;
    var postData  = req.body;

  let apiid = postData.apiid;
  let username = postData.username;
  let password = postData.password;
  let subid = postData.subid;
  let linkCode = postData.linkCode;
  let facilityName = postData.facilityName;
  let firstName = postData.firstName;
  let lastName = postData.lastName;
  let email = postData.email;
  let verificationCode = postData.verificationCode;
  let verified = postData.verified;
  let sessionid = postData.sessionid;
  let verCodeTime = postData.verCodeTime;
  let linkCodeTime = postData.linkCodeTime;
  let tutorials = postData.tutorials;

  if(apiid !== null && username !== null && password !== null && subid !== null){
    bcrypt.hash(password, 10, function(error, hash) {
    connection.query(`INSERT INTO users 
  (apiid, username, password, subid, linkCode, facilityName, firstName, lastName, email, verificationCode, verified, sessionid, verCodeTime,linkCodeTime,tutorials) 
  VALUES 
  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
  [
    apiid, username, hash, subid, linkCode, facilityName, firstName, lastName, email, verificationCode, verified, sessionid, verCodeTime, linkCodeTime, tutorials
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
  }else{
    res.json("");
  }
  }); 
});

app.put('/user/updateLinkCode/:linkCode/:linkCodeTime/:username', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    let linkCode = req.params.linkCode;
    let linkCodeTime = req.params.linkCodeTime;
    if(linkCode==="blank"){
      linkCode = "";
    }
    if(linkCodeTime==="blank"){
      linkCodeTime = "";
    }

  connection.query(`UPDATE users SET
  linkCode = ?, linkCodeTime = ? WHERE (username = ?)`, 
  [
    linkCode, linkCodeTime, req.params.username
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
});

app.put('/user/subid/:subid/:username', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;

  connection.query(`UPDATE users SET
  subid = ? WHERE (username = ?)`, 
  [
    req.params.subid, req.params.username
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
});

app.put('/user/verified/:username', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;

  connection.query(`UPDATE users SET
  verified = ?, verificationCode = ?, verCodeTime = ? WHERE (username = ?)`, 
  [
    0,"","", req.params.username
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
});

app.put('/user/resetPassword/:username/:password', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;

    bcrypt.hash(req.params.password, 10, function(error, hash) {
  connection.query(`UPDATE users SET
  password = ?, linkCode = ? WHERE (username = ?)`, 
  [
    hash, "", req.params.username
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
  });
});

app.put('/pl/active', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    var postData  = req.body;

  let tag = postData.tag;
  let active = postData.active;

  connection.query(`UPDATE pl SET
  active = ? WHERE (tag = ?)`, 
  [
    active, tag
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
});

app.put('/user/tutorials/:username/:tutorials', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;

  let username = req.params.username;
  let tutorials = req.params.tutorials;

  connection.query(`UPDATE users SET
  tutorials = ? WHERE (username = ?)`, 
  [
    tutorials, username
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
});

app.post('/hr', (req, res) =>{

  pool.getConnection((err, connection) => {
    if(err) throw err;
    var postData  = req.body;

  let tag = postData.tag;
  let weight = postData.weight;
  let unit = postData.unit;
  let batchName = postData.batchName;
  let userID = postData.userID;

  connection.query(`INSERT INTO hr 
  (tag, weight, unit, batchName, userID) 
  VALUES 
  (?, ?, ?, ?, ?)`,
  [
    tag, weight, unit, batchName, userID
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  }); 
});

app.put('/hr', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    var postData  = req.body;

  let id = postData.id;
  let tag = postData.tag;
  let weight = postData.weight;
  let unit = postData.unit;
  let batchName = postData.batchName;
  let userID = postData.userID;

  connection.query(`UPDATE hr set
  tag =?, weight =?, unit =?, batchName =?, userID =? WHERE id = ?`, 
  [
    tag, weight, unit, batchName, userID, id
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  }); 
});

app.post('/pl', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    var postData  = req.body;

  let tag = postData.tag;
  let strain = postData.strain;
  let userID = postData.userID;
  let active = postData.active;

  connection.query(`INSERT INTO pl 
  (tag, strain, userID, active) 
  VALUES 
  (?, ?, ?, ?)`, 
  [
    tag, strain, userID, active
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
  });
  });
});

app.put('/pl', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
    var postData  = req.body;

  let tag = postData.tag;
  let strain = postData.strain;
  let userID = postData.userID;
  let active = postData.active;

  connection.query(`UPDATE pl SET
  strain = ?, userID = ?, active = ? WHERE (tag = ?)`, 
  [
    strain, userID, active, tag
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
});

app.put('/user/set-session-id/:userID/:sessionID', (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;

  let sessionID = req.params.sessionID;
  let userID = req.params.userID;

  connection.query(`UPDATE users SET
  sessionid = ? WHERE (username = ?)`, 
  [
    sessionID, userID
  ], (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
      res.json(result);
    });
  });
});

app.delete(`/hr/:id`, (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
  let plantID = req.params.id;
  var sql = `DELETE FROM hr WHERE id = '${plantID}'`;

  connection.query(sql, (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
      res.json(result);
    });
  });
});

app.delete(`/dr/:id`, (req, res) =>{
  pool.getConnection((err, connection) => {
    if(err) throw err;
  let dryRoomID = req.params.id;
  var sql = `DELETE FROM dr WHERE id = '${dryRoomID}'`;

  connection.query(sql, (err, result) => {
    connection.release(); // return the connection to pool
    if(err) throw err;
    res.json(result);
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port
app.listen(port, () => {});