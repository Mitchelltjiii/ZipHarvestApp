import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {isMobile} from 'react-device-detect';

function VerificationForm({newUsername}) {

    const [email,setEmail] = React.useState('');
    const [resent,setResent] = React.useState(false);

    if(email === '' && newUsername !== ""){
      getEmail();
    }

    const handleResend = () => {
		resend();
	}

    function resend(){
        getUser();
    }

    const handleGoToHome = () => {
      window.location.replace("https://www.zipharvest.app/");
    }  

    async function getUser(){
          const response = await fetch(`/get-user/${newUsername}`);
          const json = await response.json();
          
          let userString = JSON.stringify(json);
          userString = userString.substring(1,userString.length-1);
          let newUser = JSON.parse(userString);
    
          if(userString !== "" && userString !== undefined && userString !== null && userString !== "[]"){
            sendVerificationEmail(newUser);
          }
      }

      async function getEmail(){
        const response = await fetch(`/get-email/${newUsername}`);
        const json = await response.json();
        if(json !== null && json !== undefined && json !== ""){
          setEmail(json);
        }
    }

      function getUserItem(newUser,newCode){
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
          linkCodeTime: '',
          tutorials: '1'
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
        return userItem;
      }
      
      async function updateUser(userItem){
        fetch('/user', {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userItem)
        }).then(function(response) {
        }).then(function(data) {
        });
        setResent(true);
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
        let address = "Mitchelltjiii@gmail.com";
        let newCode = makeid(8);
        const response = await fetch(`/send-verification-email/${address}/${newCode}/${newUsername}`);
        await response.json();
        
        updateUser(getUserItem(user,newCode));
      }

    let newLink = "";
    if(resent){
      newLink = "new "
    }


    let formWidth = "450px";
    let formHeight = "250px";

    if(isMobile){
      formWidth = "100%";
    }

	return (
    <div id="verification-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {isMobile ?
        <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
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
                            <div style={{textAlign:"center"}}>We sent you a {newLink}link to verify your account. If you haven't recieved it, try checking your spam folder.</div>
                            <div style={{textAlign:"center"}}>If you are still having trouble, you can send a new code below. Code will expire 15 minutes after creation.</div>
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
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
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
                        <div style={{textAlign:"center"}}>We sent you a {newLink}link to verify your account. If you haven't recieved it, try checking your spam folder.</div>
                        <div style={{textAlign:"center"}}>If you are still having trouble, you can send a new code below. Code will expire 15 minutes after creation.</div>
                        </Grid>
                        <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleResend}>Resend Code</Button>
                        </Grid>
        </div>
       }
		</div>
	);
}

export default VerificationForm;
