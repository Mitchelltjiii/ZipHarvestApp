import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { setUserAgent } from 'react-device-detect';

export default function StripeForm({verCode,userFromUrl}) {

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

let busySettingUser = false;
let busySettingPossibleSub = false;


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
  goToProduct("lk_1");
}


async function goToProduct(lookup_key){
  console.log("Engage go to product.");
  const response = await fetch(`/create-checkout-session/${lookup_key}`, {
        method: 'POST',
        mode: 'no-cors'
  });
  const json = await response.json();
  try{
      console.log("new session json: " + json);
  }catch(err){
  
  }
  try{
          console.log("new session json(STRING): " + JSON.stringify(json));
  }catch(err){
      
  }

  busySettingPossibleSub = true;
  updatePossibleSub(getPossibleSubItem(possibleSubscription,json.id));

  window.location.replace(json.url);
  console.log("fetched create checkout sess");
}

function getPossibleSubItem(newPossibleSub,sessionid){
  console.log("Enter getPossibleSubItem")

  let subItem = {
    verificationCode: '',
    username: '',
    password: '',
    sessionid: '',
    verified: 0
    };

    subItem.verificationCode = verCode;
    subItem.username = newPossibleSub.username;
    subItem.password = newPossibleSub.password;
    subItem.verified = 0;
    subItem.sessionid = sessionid;

  console.log("Stringified before passed: " + JSON.stringify(subItem));
  console.log("Exit getPossibleSubItem")
  return subItem;
}

async function updatePossibleSub(possibleSubItem){
  console.log("Engage update possiblesub");
  const response = fetch('/possibleSub', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(possibleSubItem)
  });
  console.log("Create possiblesubitem should be done - no indicator");
  try{
    console.log("AWAITING RESPONSE UPDATE possiblesubitem")
    await response.text();
    console.log("RESPONSE RECIEVED UPDATE possiblesubitem")
  }catch(err){
    console.log("NO RESPONSE RECIEVED UPDATE possiblesubitem")
  }
  console.log("Before removing busy setting possiblesubitem");
  console.log("BUSYSETTINGpossiblesubitem before: " + JSON.stringify(busySettingPossibleSub)); 
  busySettingPossibleSub = (false);
  console.log("BUSYSETTINGpossiblesubitem after: " + JSON.stringify(busySettingPossibleSub));       
  console.log("Exit update possiblesubitem")
}

function getUserItem(){
  console.log("Enter getUserItem")
  console.log("Enter sub ID: " + subscription.id);

  let userItem = {
    apiid: '',
    username: '',
    password: '',
    subid: ''
    };

    userItem.apiid = possibleSubscription.username;
    userItem.username = possibleSubscription.username;
    userItem.password = possibleSubscription.password;
    userItem.subid = subscription.id;

  console.log("Stringified before passed: " + JSON.stringify(userItem));
  console.log("Exit getUserItem")
  return userItem;
}

async function updateUser(userItem){
  console.log("Engage update user");
  if(userItem.subid === null || userItem.subid === undefined){
    return;
  }
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
  console.log("Exit update user");
  setUserUpdated(true);
}

//value lk_1
const SuccessDisplay = ({ seshId }) => {
  console.log("Checking session now");

  if(session === null || session === [] || session === undefined || JSON.stringify(session) === "[]"){
    console.log("Get session now");
    getSession(sessionId);
  }else{
    console.log("About to update user");
    let userItem = getUserItem();
    console.log("User Item in success display: " + JSON.stringify(userItem));
    if(userItem.apiid !== null && userItem.apiid !== "" && userItem.apiid !== undefined){
    if(userItem.username !== null && userItem.username !== "" && userItem.username !== undefined){
      if(userItem.password !== null && userItem.password !== "" && userItem.password !== undefined){
        if(userItem.subid !== null && userItem.subid !== "" && userItem.subid !== undefined){
          if(!userUpdated){
            updateUser(userItem);
          }
        }
      }
    }
  }
}

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
  getPossibleSubscription(false,json.subscription,seshId);
  setSession(json);
}

  

  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');
  let [session,setSession] = useState([]);
  let [possibleSubscription,setPossibleSubscription] = useState([]);
  let [subscription,setSubscription] = useState([]);
  let [userUpdated,setUserUpdated] = useState(false);


  console.log("From PossibleSubscription**");

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
    setSubscription(json);
  }

  async function getPossibleSubscription(fromUrl,subId,seshId){
    console.log("User from url: " + userFromUrl);
    if(fromUrl){
      if(userFromUrl === undefined){
        return;
      }
      console.log("Try to get possible subscription");
      const response = await fetch(`/get-possible-subscription/${userFromUrl}`);
      const json = await response.json();
      try{
        console.log("sub json: " + json);
      }catch(err){
  
      }
      try{
        console.log("sub json(STRING): " + JSON.stringify(json));
      }catch(err){
      
      }
      let possibleSubString = JSON.stringify(json);
      possibleSubString = possibleSubString.substring(1,possibleSubString.length-1);
      console.log("Possible sub string: " + possibleSubString);
      let newPossibleSub = JSON.parse(possibleSubString);

      console.log("Update possible subscription verified");
      if(possibleSubString !== "" && possibleSubString !== undefined && possibleSubString !== null && possibleSubString !== "[]"){
        updatePossibleSub(getPossibleSubItem(newPossibleSub,""));
        setPossibleSubscription(newPossibleSub);
      }
    }else{
      
      console.log("Try to get possible subscription");
      const response = await fetch(`/get-possible-subscription-seshId/${seshId}`);
      const json = await response.json();
      try{
       console.log("sub json: " + json);
     }catch(err){
      
      }
      try{
        console.log("sub json(STRING): " + JSON.stringify(json));
      }catch(err){
        
      }
      
      getSubscription(subId);
      setPossibleSubscription(json)
    }
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  console.log("Session**: " + JSON.stringify(session));
  console.log("Subscription**: " + JSON.stringify(subscription));
  console.log("Possible Subscription**: " + JSON.stringify(possibleSubscription));
  

  if(!success){
    if(possibleSubscription === null || possibleSubscription === [] || possibleSubscription === undefined || JSON.stringify(possibleSubscription) === "[]"){
      console.log("Get possiblesubcription now*");
      getPossibleSubscription(true,"","");
    }
  }

  if (!success && message === '') {
    return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    return <SuccessDisplay seshId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
}


/* if(success){
    let sesh = await getSession(sessionId);
      console.log("sesh: " + sesh);
      console.log("sesh(String): " + JSON.stringify(sesh));

      let sub = await getSubscription(sesh.subscription);
      console.log("Got sub: " + JSON.stringify(sub));

      let possibleSub = await getPossibleSubscription(sessionId);
      console.log("Got possible sub: " + JSON.stringify(possibleSub));
  }*/
