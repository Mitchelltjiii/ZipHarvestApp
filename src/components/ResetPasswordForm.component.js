import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function ResetPasswordForm({refreshOuter, userID,setCurrentPage,linkCode,userFromUrl}) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordAgain, setPasswordAgain] = React.useState('');
    let busySettingUser = false;
    let fromUrl = (userFromUrl.length!==0);
    console.log("From Url Reset Password Form: " + fromUrl);

    const handleSendResetLink = () => {
		  sendResetLink();
	  }

    const handleConfirmReset = () => {

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
        //updateUser(getUserItem(newCode));
      }

      /*
      function getUserItem(newCode){
        console.log("Enter getUserItem")
      
        let userItem = {
          apiid: '',
          username: '',
          password: '',
          subid: '',
          linkCode: ''
          };
      
          userItem.apiid = possibleSubscription.username;
          userItem.username = possibleSubscription.username;
          userItem.password = possibleSubscription.password;
          userItem.subid = subscription.id;
          userItem.linkCode = newCode
      
        console.log("Stringified before passed: " + JSON.stringify(userItem));
        console.log("Exit getUserItem")
        return userItem;
      }
      
    async function updateUser(userItem){
        console.log("Engage update user");
        if(userItem.subid === null || userItem.subid === undefined){
          return;
        }
        const response = fetch(`/user/${linkCode}/${linkCode}`, {
              method: (userItem.id) ? 'PUT' : 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userItem)
        }).then(function(response) {
          let resp = JSON.stringify(response);
          console.log("Response from updateUser: " + resp);
          if(resp !== "" && resp !== null && resp !== undefined){
            console.log("remove possiblesub now");
            deletePossibleSub();
          }
        }).then(function(data) {
        });
        console.log("Before removing busy setting user");
        console.log("BUSYSETTINGUSER before: " + JSON.stringify(busySettingUser)); 
        busySettingUser = (false);
        console.log("BUSYSETTINGHR after: " + JSON.stringify(busySettingUser));       
        console.log("Exit update user");
        setUserUpdated(true);
      }*/

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

	return (
		<div id="reset-password-form" style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
			<Grid
				container
				direction="column"
  				justifyContent="center"
				alignItems="center"
			>
                <div style={{fontSize:"20px",marginTop:"10px",marginBottom:"10px"}}>Create your account</div>
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5}}>
                
                    {!fromUrl ?
                        <Grid
				container
				direction="column"
  				justifyContent="center"
				alignItems="center"
			    >
                    <TextField id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined"></TextField>
                    <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleSendResetLink}>Send Reset Link</Button>
                    </Grid>
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
			</Grid>
		</div>
	);
}

export default ResetPasswordForm;
