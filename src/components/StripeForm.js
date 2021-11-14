import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {isMobile} from 'react-device-detect';

export default function StripeForm({verCode,userFromUrl,userFromLogin}) {

  let formWidth = "450px";
  let formHeight = "250px";

  if(isMobile){
    formWidth = "100%";
  }

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

  const handleContinue = () => {
		doContinue();
	}

  function doContinue(){
    setContinued(true);
  }

let busySettingUser = false;
const [expired,setExpired] = React.useState(false);


const ProductDisplay = () => (
  <div id="product-display" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
          {isMobile ?
          <div style={{width:formWidth,height:formHeight,paddingTop:"40px"}}>
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
          </div> :
          <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,paddingTop:"40px"}}>
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
          </div>
          }
          
</div>
);

const handleGoToProduct = () => {
  goToProduct("lk_1");
}

const handleGetStarted = () => {
  window.location.replace("https://www.zipharvest.app/");
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

  busySettingUser = true;
  updateUser(getUserItem(user,json.id));

  window.location.replace(json.url);
  console.log("fetched create checkout sess");
}

function getUserItem(newUser,sessionid){
  console.log("Enter getUserItem")

  let userItem = {
    apiid: '',
    username: '',
    password: '',
    subid: '',
    linkCode: '',
    facilityName: '',
    firstName: '',
    lastName: '',
    email: '',
    verificationCode: '',
    verified: 0,
    sessionid: '',
    verCodeTime: '',
    linkCodeTime: ''
    };

    userItem.apiid = newUser.username;
    userItem.username = newUser.username;
    userItem.password = newUser.password;
    userItem.facilityName = newUser.facilityName;
    userItem.firstName = newUser.firstName;
    userItem.lastName = newUser.lastName;
    userItem.email = newUser.email;
    userItem.verificationCode = newUser.verificationCode;
    userItem.sessionid = sessionid;

  console.log("Stringified before passed: " + JSON.stringify(userItem));
  console.log("Exit getUserItem")
  return userItem;
}

async function updateUser(userItem){
  console.log("Engage update user");
  const response = fetch('/user', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userItem)
  }).then(function(response) {
    let resp = JSON.stringify(response);
  }).then(function(data) {
  });
  console.log("Before removing busy setting user");
  console.log("BUSYSETTINGUSER before: " + JSON.stringify(busySettingUser)); 
  busySettingUser = (false);
  console.log("BUSYSETTINGHR after: " + JSON.stringify(busySettingUser));       
  console.log("Exit update user");
}


async function updateUserSubId(username,subid){
  console.log("Engage update user subid");
  console.log("**Username: " + username + "**subid: " + subid);
  const response = fetch(`/user/subid/${subid}/${username}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
  }).then(function(response) {
    let resp = JSON.stringify(response);
  }).then(function(data) {
    setUserUpdated(true);
  });
  console.log("Before removing busy setting user");
  console.log("BUSYSETTINGUSER before: " + JSON.stringify(busySettingUser)); 
  busySettingUser = (false);
  console.log("BUSYSETTINGHR after: " + JSON.stringify(busySettingUser));       
  console.log("Exit update user");
}

//value lk_1
const SuccessDisplay = ({ seshId }) => {
  console.log("Checking session now");

  if(session === null || session === [] || session === undefined || JSON.stringify(session) === "[]"){
    console.log("Get session now");
    getSession(sessionId);
  }else{
    console.log("About to update user.");
    if(user.username !== undefined && subscription.id !== undefined && !userUpdated){
      updateUserSubId(user.username,subscription.id);
    }  
  }


  return (
    <div id="Success Display" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {isMobile ?
        <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Grid
            container
            direction="column"
              justifyContent="center"
            alignItems="center"
          >
                <div style={{textAlign:"center"}}>Congrats, your Zipharvest subscription has been created!</div>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGetStarted}>Get Started</Button>
                </Grid>
                </div>
                :
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Grid
            container
            direction="column"
              justifyContent="center"
            alignItems="center"
          >
                <div style={{textAlign:"center"}}>Congrats, your Zipharvest subscription has been created!</div>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGetStarted}>Get Started</Button>
                </Grid>
        </div>
       }
		</div>
  );
}

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
  getUser(false,json.subscription,seshId);
  setSession(json);
}

  

  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');
  let [session,setSession] = useState([]);
  let [user,setUser] = useState([]);
  let [subscription,setSubscription] = useState([]);
  let [userUpdated,setUserUpdated] = useState(false);
  let [continued,setContinued] = useState(false);

  console.log("From User**");

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

  async function getUser(fromUrl,subId,seshId){
    console.log("User from url: " + userFromUrl);
    if(fromUrl){
      let userForFetch = userFromUrl;
      if(userFromUrl === undefined || userFromUrl === ""){
        userForFetch = userFromLogin;
      }
      console.log("Try to get user");
      const response = await fetch(`/get-user/${userForFetch}`);
      const json = await response.json();
      try{
        console.log("sub json: " + json);
      }catch(err){
  
      }
      try{
        console.log("sub json(STRING): " + JSON.stringify(json));
      }catch(err){
      
      }
      let userString = JSON.stringify(json);
      userString = userString.substring(1,userString.length-1);
      console.log("User string: " + userString);
      let newUser = JSON.parse(userString);
      console.log("New user: " + JSON.stringify(newUser));

      if(newUser.verified===1){
        console.log("Checking VerCode");
        if(verCode !== newUser.verificationCode){
          console.log("No Match");
          return;
        }else{
          console.log("Match!");
        }

        console.log("Curr Date Value: " + (new Date()).getTime());
        console.log("New User Date Value: " + newUser.verCodeTime);
        console.log("Difference: " + ((new Date()).getTime()-newUser.verCodeTime));
        if(((new Date()).getTime()-newUser.verCodeTime) > 900000){
          console.log("Code Expired");
          setExpired(true);
          return;
        }else{
          console.log("Code Working still!");
        }

  
        if(userString !== "" && userString !== undefined && userString !== null && userString !== "[]"){
          updateUser(getUserItem(newUser,""));
          setUser(newUser);
        }
      }else{
        if(userString !== "" && userString !== undefined && userString !== null && userString !== "[]"){
          setContinued(true);
          setUser(newUser);
        }
      }
    }else{
      console.log("Try to get user");
      const response = await fetch(`/get-user-seshId/${seshId}`);
      const json = await response.json();
      try{
       console.log("user json: " + json);
     }catch(err){
      
      }
      try{
        console.log("user json(STRING): " + JSON.stringify(json));
      }catch(err){
        
      }
      getSubscription(subId);
      setContinued(true);
      setUser(json)
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
  console.log("User**: " + JSON.stringify(user));
  

  if(!success){
    if(user === null || user === [] || user === undefined || JSON.stringify(user) === "[]"){
      console.log("Get user now*");
      getUser(true,"","");
    }
  }

  const VerifiedForm = () => {
    return(
  <div id="verified-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
          {isMobile ?
          <div style={{width:formWidth,height:formHeight,paddingTop:"40px"}}>
              <Grid
				            container
				            direction="column"
  				          justifyContent="center"
				            alignItems="center"
			              >
                    <div style={{textAlign:"center"}}>You have verified your account!</div>
                    <div style={{textAlign:"center"}}>Please continue to choose your subscription plan.</div>
                    <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleContinue}>Continue</Button>
                  </Grid>    
          </div> :
          <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,paddingTop:"40px"}}>
              <Grid
				            container
				            direction="column"
  				          justifyContent="center"
				            alignItems="center"
			              >
                    <div style={{textAlign:"center"}}>You have verified your account!</div>
                    <div style={{textAlign:"center"}}>Please continue to choose your subscription plan.</div>
                    <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleContinue}>Continue</Button>
                  </Grid>
          </div>
          }
          
</div>
    )
  }

  const handleResend = () => {
		resend();
	}

    function resend(){
        console.log("Click resend");
        getUserForResend();
    }

    async function getUserForResend(){
      console.log("Try to get user");
      const response = await fetch(`/get-user/${userFromUrl}`);
      const json = await response.json();
      try{
        console.log("sub json: " + json);
      }catch(err){
  
      }
      try{
        console.log("sub json(STRING): " + JSON.stringify(json));
      }catch(err){
      
      }
      let userString = JSON.stringify(json);
      userString = userString.substring(1,userString.length-1);
      console.log("userString: " + userString);
      let newUser = JSON.parse(userString);

      console.log("Update user verified");
      if(userString !== "" && userString !== undefined && userString !== null && userString !== "[]"){
        sendVerificationEmail(newUser);
      }
  }

  function getUserItemForResend(userForResend,newCode){
    console.log("Enter getUserItem")
  
    let userItem = {
      apiid: '',
      username: '',
      password: '',
      subid: '',
      linkCode: '',
      facilityName: '',
      firstName: '',
      lastName: '',
      email: '',
      verificationCode: '',
      verified: 1,
      sessionid: '',
      verCodeTime: '',
      linkCodeTime: ''
      };
  
      userItem.apiid = userForResend.username;
      userItem.facilityName = userForResend.facilityName;
      userItem.firstName = userForResend.firstName;
      userItem.lastName = userForResend.lastName;
      userItem.email = userForResend.email;
      userItem.verificationCode = newCode;
      userItem.username = userForResend.username;
      userItem.password = userForResend.password;
      userItem.verCodeTime = JSON.stringify((new Date().getTime()));
  
    console.log("Stringified before passed: " + JSON.stringify(userItem));
    console.log("Exit getUserItem")
    return userItem;
  }

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
          charactersLength));
       }
       return result;
    }

    async function sendVerificationEmail(newUser){
        console.log("Try to send ver email");
        let newCode = makeid(8);
        console.log("New Code: " + newCode);
        const response = await fetch(`/send-verification-email/${newUser.email}/${newCode}/${newUser.username}`);
        const json = await response.json();
        try{
          console.log("Send Verification json: " + json);
        }catch(err){
      
        }
        try{
          console.log("Send Verification json(STRING): " + JSON.stringify(json));
        }catch(err){
        }
        busySettingUser = true;
        updateUser(getUserItemForResend(newUser,newCode));
      }

  const ExpiredForm = ({msg}) => {
    return(
      <div id="Expired Form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {isMobile ?
        <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Grid
            container
            direction="column"
              justifyContent="center"
              alignItems="center"
          >
                <div style={{textAlign:"center"}}>{msg}</div>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleResend}>Resend Code</Button>
                </Grid>
                </div>
                :
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Grid
            container
            direction="column"
              justifyContent="center"
            alignItems="center"
          >
                <div style={{textAlign:"center"}}>{msg}</div>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleResend}>Resend Code</Button>
                </Grid>
        </div>
       }
		</div>
    )
  }
  if(expired){
    return <ExpiredForm msg={"Your verification code expired. Please resend email."}></ExpiredForm>
  }
  if(continued){
    if (!success && message === '') {
      return <ProductDisplay />;
    } else if (success && sessionId !== '') {
      return <SuccessDisplay seshId={sessionId} />;
    } else {
      return <Message message={message} />;
    }
  }else{
    if(user !== null && user !== undefined && user !== [] && JSON.stringify(user) !== "[]"){
      if(user.verificationCode===verCode){
        return <VerifiedForm></VerifiedForm>
      }else{
        return <ExpiredForm msg={"This code doesn't match the last code we sent.\nTry resending or looking for the correct email."}></ExpiredForm>
      }
    }else{
      if (success && sessionId !== '') {
        return <SuccessDisplay seshId={sessionId} />;
      }else{
        return <ExpiredForm msg={"This code isn't correct.\nTry resending or looking for the correct email."}></ExpiredForm>
      }
    }
  }
}

/*<section>
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
    </section> */
