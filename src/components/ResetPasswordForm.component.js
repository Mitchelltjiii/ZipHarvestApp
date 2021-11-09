import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';

function ResetPasswordForm({setCurrentPage,linkCode,userFromUrl,executeLogout}) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordAgain, setPasswordAgain] = React.useState('');
    const [success,setSuccess] = React.useState(false);
    const [linkSent,setLinkSent] = React.useState(false);
    let busySettingUser = false;
    let fromUrl = (userFromUrl.length!==0);
    console.log("From Url Reset Password Form: " + fromUrl);

    const handleSendResetLink = () => {
		  sendResetLink();
	  }

    const handleGoToHome = () => {
        window.location.replace("https://www.zipharvest.app/");
    }  

    const handleConfirmReset = () => {
        if(password === passwordAgain){
            updateUserPassword();
        }
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

    async function sendResetLink(){
        console.log("Try to send reset Link");
        let address = "Mitchelltjiii@gmail.com";
        let newCode = makeid(8);
        console.log("New Code: " + newCode);
        const response = await fetch(`/send-reset-link/${address}/${newCode}/${username}`);
        const json = await response.json();
        try{
          console.log("Send Reset link json: " + json);
        }catch(err){
      
        }
        try{
          console.log("Send Reset Link json(STRING): " + JSON.stringify(json));
        }catch(err){
          
        }
        busySettingUser = true;
        updateUser(newCode);
      }
      
    async function updateUser(linkCode){
        console.log("Engage update user");
        const response = fetch(`/user/${linkCode}/${username}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(function(response) {
          let resp = JSON.stringify(response);
          console.log("Response from updateUser: " + resp);
          if(resp !== "" && resp !== null && resp !== undefined){
            console.log("Updateuser responded");
          }
        }).then(function(data) {
        });
        console.log("Before removing busy setting user");
        console.log("BUSYSETTINGUSER before: " + JSON.stringify(busySettingUser)); 
        busySettingUser = (false);
        console.log("BUSYSETTINGHR after: " + JSON.stringify(busySettingUser));       
        console.log("Exit update user");
        setLinkSent(true);
      }

      async function updateUserPassword(){
        console.log("Engage update user password");
        const response = fetch(`/user/resetPassword/${userFromUrl}/${password}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(function(response) {
          let resp = JSON.stringify(response);
          console.log("Response from updateUser: " + resp);
          if(resp !== "" && resp !== null && resp !== undefined){
            console.log("Updateuser responded");
          }
        }).then(function(data) {
        });
        console.log("Before removing busy setting user");
        console.log("BUSYSETTINGUSER before: " + JSON.stringify(busySettingUser)); 
        busySettingUser = (false);
        console.log("BUSYSETTINGHR after: " + JSON.stringify(busySettingUser));       
        console.log("Exit update user");
        setSuccess(true);
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };


    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordAgain = (event) => {
        setPasswordAgain(event.target.value);
    };

    let formWidth = "450px";
    let formHeight = "250px";

    if(isMobile){
      formWidth = "100%";
    }

	return (
		<div id="reset-password-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
          <div>  {success ?
            <div>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Return to Login</Button>
            </div>
        :
        <div>
                {isMobile ? 
                <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                {!fromUrl ?

                    <div>
                {linkSent ? <div>Link Sent</div> :
                <Grid
            container
            direction="column"
              justifyContent="center"
            alignItems="center"
          >
                <TextField id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined"></TextField>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleSendResetLink}>Send Reset Link</Button>
                </Grid>
                }  
                </div>
            :
            <Grid
    container
    direction="column"
      justifyContent="center"
    alignItems="center"
      >
                <TextField id="Password" value={password} onChange={handlePassword} label="Password" variant="outlined"></TextField>
                <TextField id="PasswordAgain" value={passwordAgain} onChange={handlePasswordAgain} label="Password (Verify)" variant="outlined"></TextField>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleConfirmReset}>Confirm</Button>
                </Grid>
                }
                </div>
                :
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5}}>
                    {!fromUrl ?

                        <div>
                    {linkSent ? <div>Link Sent</div> :
                    <Grid
				        container
				        direction="column"
  				        justifyContent="center"
				        alignItems="center"
			        >
                    <TextField id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined"></TextField>
                    <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleSendResetLink}>Send Reset Link</Button>
                    </Grid>
                    }  
                    </div>
                :
                <Grid
				container
				direction="column"
  				justifyContent="center"
				alignItems="center"
			    >
                    <TextField id="Password" value={password} onChange={handlePassword} label="Password" variant="outlined"></TextField>
                    <TextField id="PasswordAgain" value={passwordAgain} onChange={handlePasswordAgain} label="Password (Verify)" variant="outlined"></TextField>
                    <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleConfirmReset}>Confirm</Button>
                    </Grid>
                    }
                    </div>}
			</div>
        }
        </div>
		</div>

	);
}

export default ResetPasswordForm;
