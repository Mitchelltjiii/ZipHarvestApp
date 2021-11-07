import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function FindUserForm({setCurrentPage}) {

    const [email,setEmail] = React.useState('');
    const [emailSent,setEmailSent] = React.useState(false);

    const handleSendFindUserLink = () => {
		  sendFindUserLink();
	  }

    async function sendFindUserLink(){
        console.log("Try to send find user Link");
        const response = await fetch(`/send-find-user/${email}`);
        const json = await response.json();
        try{
          console.log("Send find user email json: " + json);
        }catch(err){
      
        }
        try{
          console.log("Send find user email json(STRING): " + JSON.stringify(json));
        }catch(err){
          
        }
        setEmailSent(true);
      }
      
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    let formWidth = "450px";
    let formHeight = "250px";

	return (

    <div id="find-user-form" style={{display:'flex',alignItems: 'center',justifyContent: 'center'}}>
            <Grid
				        container
				        direction="column"
  				        justifyContent="center"
				        alignItems="center"
			        >
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto"}}>
                {emailSent ? <div>Username Sent</div> :
                    <Grid
				        container
				        direction="column"
  				        justifyContent="center"
				        alignItems="center"
			        >
                    <div style={{letterSpacing:"1px"}}>RECOVER USERNAME</div>
                    <TextField id="Email" value={email} onChange={handleEmail} label="Email" variant="outlined"></TextField>
                    <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleSendFindUserLink}>Send Email</Button>
                    </Grid>
                    }
                    </div>  
                </Grid>
                
		</div>
	);
}

export default FindUserForm;
