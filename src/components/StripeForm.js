import React, { useState, useEffect } from 'react';

let [busySettingUser, setBusySettingUser] = useState('');
let [username, setUsername] = useState('');
let [password, setPassword] = useState('');


const ProductDisplay = () => (
  <section>
    <div className="product">
      <div className="description">
        <h3>Premium One</h3>
        <h5>$0.50 / month</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <input type="hidden" name="lookup_key" value="premiumone" />
      <button id="checkout-and-portal-button" type="submit">
        Checkout
      </button>
    </form>
  </section>
);

function getUserItem(subscriptionId){
  console.log("Enter getUserItem")
  console.log("Enter sub ID: " + subscriptionId);

  let userItem = {
    apiid: '',
    username: '',
    password: '',
    subid: ''
    };

    userItem.apiid = "apiid";
    userItem.username = username;
    userItem.password = password;
    userItem.subid = subscriptionId;
  if(user.id!==""){
    userItem.id = user.id;
  }

  console.log("Stringified before passed: " + JSON.stringify(userItem));
  console.log("Exit getUserItem")
  return userItem;
}

async function updateUser(userItem){
  console.log("Engage update user");
  const response = fetch('/user', {
        method: (userItem.id) ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userItem)
  });
  console.log("Create user should be done - no indicator");
  try{
    console.log("AWAITING RESPONSE UPDATEUser")
    await response.text();
    console.log("RESPONSE RECIEVED UPDATEUser")
  }catch(err){
    console.log("NO RESPONSE RECIEVED UPDATEUser")
  }
  console.log("Before removing busy setting user");
  console.log("BUSYSETTINGUSER before: " + JSON.stringify(busySettingUser)); 
  setBusySettingUser(false);
  console.log("BUSYSETTINGHR after: " + JSON.stringify(busySettingUser));       
  console.log("Exit update user")
}

//value lk_1
const SuccessDisplay = ({ sessionId }) => {
  console.log("success Session ID: " + sessionId);
  let session = getSession(sessionId);
  let subId = session.subscription;
  console.log("success sub ID: " + sessionId);
  setBusySettingUser(true);
  updateUser(getUserItem(subId));
  
  return (
    <section>
      <div>
        <div>
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <form action="/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

async function getSession(sessionId){
  console.log("Try to get session");
  const response = await fetch(`/get-session/${sessionId}`);
  const json = await response.json();
  try{
    console.log("session json: " + json);
  }catch(err){

  }
  try{
    console.log("Session json(STRING): " + JSON.stringify(json));
  }catch(err){
    
  }
  try{
    console.log("Sub ID: " + json.subscription);
  }catch(err){

  }
  return json.subscription;
}

export default function StripeForm({user,pass}) {
  console.log("Enter stripeform user: " + user);
  console.log("Enter stripeform pass: " + pass);

  setUsername(user);
  setPassword(pass);
  console.log("Enter stripeform username: " + username);
  console.log("Enter stripeform password: " + username);

  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');
  let [subscriptionId, setSubscriptionId] = useState('');

  console.log("Stripeform load - subscriptionID: " + subscriptionId)
  console.log("Stripeform load - sessionID: " + sessionId)


  async function getSession(sessionId){
    console.log("Try to get session");
    const response = await fetch(`/get-session/${sessionId}`);
    const json = await response.json();
    try{
      console.log("session json: " + json);
    }catch(err){
  
    }
    try{
      console.log("Session json(STRING): " + JSON.stringify(json));
    }catch(err){
      
    }
    try{
      console.log("Sub ID: " + json.subscription);
    }catch(err){

    }
    return json.subscription;
  }

  async function getSubscription(subscriptionId){
    console.log("Try to get subscription");
    const response = await fetch(`/get-subscription/${subscriptionId}`);
    const json = await response.json();
    try{
      console.log("sub json: " + json);
    }catch(err){
  
    }
    try{
      console.log("sub json(STRING): " + JSON.stringify(json));
    }catch(err){
      
    }
    return json.id;
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
      let sesh = getSession(query.get('session_id'));
      console.log("sesh: " + sesh);
      console.log("sesh(String): " + JSON.stringify(sesh));

      let sub = getSubscription(sesh.subscription);

      setSubscriptionId(sesh.subscription);
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  if (!success && message === '') {
    return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
}



