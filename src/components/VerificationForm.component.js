import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function VerificationForm({refreshOuter, userID,setCurrentPage}) {

    const [codeFromUser, setCodeFromUser] = React.useState('');

    const handleContinue = () => {
		doContinue();
	}

    function doContinue(){
        console.log("Click verify");
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
                    <TextField id="VerificationCode" value={codeFromUser} onChange={setCodeFromUser} label="Verification Code" variant="outlined"></TextField>
                    </Grid>
                    </div>                
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleContinue}>Verify</Button>
			</Grid>
		</div>
	);
}

export default VerificationForm;
