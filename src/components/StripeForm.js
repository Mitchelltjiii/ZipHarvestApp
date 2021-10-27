import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function StripeForm({username,password}) {

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

let busySettingUser = false;

const ProductDisplay = () => (
  <Grid
				container
				direction="column"
        justifyContent="center"
				alignItems="center"
			>
        <div>Premium One</div>
        <div>$0.50 per month</div>
      <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToProduct}>Checkout</Button>
    </Grid>
);

const handleGoToProduct = () => {
  goToProduct("premiumone");
}


async function goToProduct(lookup_key){
  console.log("Engage go to product");
  const response = fetch(`/create-checkout-session/${lookup_key}`, {
        method: 'POST',
        mode: 'no-cors'
  });
  const json = await response.json();
  try{
      console.log("price json: " + json);
  }catch(err){
  
  }
        try{
          console.log("price json(STRING): " + JSON.stringify(json));
        }catch(err){
      
        }

  window.location.replace(json.url);
  console.log("fetched create checkout sess");
}

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
  busySettingUser = (false);
  console.log("BUSYSETTINGHR after: " + JSON.stringify(busySettingUser));       
  console.log("Exit update user")
}

//value lk_1
const SuccessDisplay = ({ seshId }) => {
  console.log("success Session ID: " + seshId);
  let session = getSession(seshId);
  let subId = session.subscription;
  console.log("success sub ID: " + subId);
  busySettingUser = true;
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

async function getSession(seshId){
  console.log("Try to get session");
  const response = await fetch(`/get-session/${seshId}`);
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

  console.log("Enter stripeform username: " + username);
  console.log("Enter stripeform password: " + password);

  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');
  let [subscriptionId, setSubscriptionId] = useState('');

  console.log("Stripeform load - subscriptionID: " + subscriptionId)
  console.log("Stripeform load - sessionID: " + sessionId)


  async function getSession(seshId){
    console.log("Try to get session");
    const response = await fetch(`/get-session/${seshId}`);
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

  async function getSubscription(subId){
    console.log("Try to get subscription");
    const response = await fetch(`/get-subscription/${subId}`);
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
    return <SuccessDisplay seshId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
}



