import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';

function FindUserForm() {

    const [email,setEmail] = React.useState('');
    const [emailSent,setEmailSent] = React.useState(false);

    const handleSendFindUserLink = () => {
		  sendFindUserLink();
	  }

    const handleGoToHome = () => {
      window.location.replace("https://www.zipharvest.app/");
    }  

    async function sendFindUserLink(){
        const response = await fetch(`/send-find-user/${email}`);
        const text = await response.text();
        if(text === "0"){
          setEmailSent(true);
        }else{
        }
      }
      
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };


    let formWidth = "450px";
    let formHeight = "250px";

    if(isMobile){
      formWidth = "100%";
    }

	return (

    <div id="find-user-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {isMobile ?
        <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
            {emailSent ? <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                                <div>We sent you an email with your username.</div>
                                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                                </Grid>
                                :
                <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
          >
                <TextField id="Email" value={email} onChange={handleEmail} label="Email" variant="outlined"></TextField>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleSendFindUserLink}>Send Email</Button>
                </Grid>
                }
                </div>
                :
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                {emailSent ? <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                                <div>We sent you an email with your username.</div>
                                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                                </Grid> :
                    <Grid
				        container
				        direction="column"
  				        justifyContent="center"
				        alignItems="center"
			        >
                    <TextField id="Email" value={email} onChange={handleEmail} label="Email" variant="outlined"></TextField>
                    <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleSendFindUserLink}>Send Email</Button>
                    </Grid>
                    }
        </div>
       }
		</div>
	);
}

export default FindUserForm;
