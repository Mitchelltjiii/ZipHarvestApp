import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';

function VerificationForm({setCurrentPage,newUsername}) {

    let busySettingUser = false;

    const handleResend = () => {
		resend();
	}

    function resend(){
        console.log("Click resend");
        getUser();
    }

    const handleGoToHome = () => {
      window.location.replace("https://www.zipharvest.app/");
    }  

    async function getUser(){
          console.log("Try to get user");
          const response = await fetch(`/get-user/${newUsername}`);
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

      function getUserItem(newUser,newCode){
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
          verCodeTime: ''
          };
      
          userItem.apiid = newUsername;
          userItem.facilityName = newUser.facilityName;
          userItem.firstName = newUser.firstName;
          userItem.lastName = newUser.lastName;
          userItem.email = newUser.email;
          userItem.verCodeTime = JSON.stringify((new Date()).getTime());
          userItem.username = newUsername;
          userItem.password = newUser.password;
          userItem.verificationCode = newCode;
      
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

    async function sendVerificationEmail(user){
        console.log("Try to send ver email");
        let address = "Mitchelltjiii@gmail.com";
        let newCode = makeid(8);
        console.log("New Code: " + newCode);
        const response = await fetch(`/send-verification-email/${address}/${newCode}/${newUsername}`);
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
        updateUser(getUserItem(user,newCode));
      }


    let formWidth = "450px";
    let formHeight = "250px";

	return (
		<div id="verification-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                {isMobile ? 
                                <div style={{width:formWidth,height:formHeight}}>
                                <Grid
                container
                direction="column"
                  justifyContent="center"
                alignItems="center"
                  >
                    <Grid
            container
            direction="column"
              justifyContent="center"
            alignItems="center"
              >
                            <div>We sent you a link to verify your account. If you haven't recieved it, try checking your spam folder.</div>
                            <div>If you are still having trouble, you can send a new code below. Code will expire 15 minutes after creation.</div>
                            </Grid>
                            <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            >
                            <Button style={{marginTop:"10px"}} variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleResend}>Resend Code</Button>
                            <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                            </Grid>
                        </Grid>
                            </div>
                            :
                            <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5}}>
                
                            <Grid
            container
            direction="column"
              justifyContent="center"
            alignItems="center"
              >
                <Grid
            container
            direction="column"
              justifyContent="center"
            alignItems="center"
              >
                        <div>We sent you a link to verify your account. If you haven't recieved it, try checking your spam folder.</div>
                        <div>If you are still having trouble, you can send a new code below. Code will expire 15 minutes after creation.</div>
                        </Grid>
                        <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleResend}>Resend Code</Button>
                        </Grid>

                        </div>}                
		</div>
	);
}

export default VerificationForm;
