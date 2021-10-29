import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function VerificationForm({refreshOuter, userID,setCurrentPage}) {


    const handleResend = () => {
		resend();
	}

    function resend(){
        console.log("Click resend");
        /*if(verificationCode===codeFromUser){
            setCurrentPage('stripe-form');
        }*/
    }

    let formWidth = "450px";
    let formHeight = "250px";

	return (
		<div id="forgot-password-form" style={{
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
                
                        <Grid
				container
				direction="column"
  				justifyContent="center"
				alignItems="center"
			    >
                    <div>We sent you a link to verify your account. If you haven't recieved it, try checking your spam folder.</div>
                    <div>If you are still having trouble, you can send a new code below. Code will expire 15 minutes after creation.</div>
                    </Grid>
                    </div>                
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleResend}>Resend Code</Button>
			</Grid>
		</div>
	);
}

export default VerificationForm;
