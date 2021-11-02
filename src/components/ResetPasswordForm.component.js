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
        //updatePossibleSub(getPossibleSubItem(newCode));
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
                    </Grid>
                    }
                    </div>                
			</Grid>
		</div>
	);
}

export default ResetPasswordForm;
