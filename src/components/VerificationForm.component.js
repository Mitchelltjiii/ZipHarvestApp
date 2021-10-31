import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function VerificationForm({refreshOuter, userID,setCurrentPage,possibleUsername}) {

    let busySettingPossibleSub = false;

    const handleResend = () => {
		resend();
	}

    function resend(){
        console.log("Click resend");
        sendVerificationEmail();
    }

    async function getPossibleSubscription(){
          console.log("Try to get possible subscription");
          const response = await fetch(`/get-possible-subscription/${possibleUsername}`);
          const json = await response.json();
          try{
            console.log("sub json: " + json);
          }catch(err){
      
          }
          try{
            console.log("sub json(STRING): " + JSON.stringify(json));
          }catch(err){
          
          }
          let possibleSubString = JSON.stringify(json);
          possibleSubString = possibleSubString.substring(1,possibleSubString.length-1);
          console.log("Possible sub string: " + possibleSubString);
          let newPossibleSub = JSON.parse(possibleSubString);
    
          console.log("Update possible subscription verified");
          if(possibleSubString !== "" && possibleSubString !== undefined && possibleSubString !== null && possibleSubString !== "[]"){
            sendVerificationEmail(newPossibleSub);
          }
      }

    function getPossibleSubItem(possibleSub,newCode){
        console.log("Enter getPossibleSubItem")
      
        let subItem = {
          verificationCode: '',
          username: '',
          password: '',
          sessionid: '',
          verified: 1
          };
      
          subItem.verificationCode = newCode;
          subItem.username = possibleUsername;
          subItem.password = possibleSub.password;
      
        console.log("Stringified before passed: " + JSON.stringify(subItem));
        console.log("Exit getPossibleSubItem")
        return subItem;
      }
      
      async function updatePossibleSub(possibleSubItem){
        console.log("Engage update possiblesub");
        const response = fetch('/possibleSub', {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(possibleSubItem)
        });
        console.log("Create possiblesubitem should be done - no indicator");
        try{
          console.log("AWAITING RESPONSE UPDATE possiblesubitem")
          await response.text();
          console.log("RESPONSE RECIEVED UPDATE possiblesubitem")
        }catch(err){
          console.log("NO RESPONSE RECIEVED UPDATE possiblesubitem")
        }
        console.log("Before removing busy setting possiblesubitem");
        console.log("BUSYSETTINGpossiblesubitem before: " + JSON.stringify(busySettingPossibleSub)); 
        busySettingPossibleSub = (false);
        console.log("BUSYSETTINGpossiblesubitem after: " + JSON.stringify(busySettingPossibleSub));       
        console.log("Exit update possiblesubitem")
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

    async function sendVerificationEmail(possibleSub){
        console.log("Try to send ver email");
        let address = "Mitchelltjiii@gmail.com";
        let newCode = makeid(8);
        console.log("New Code: " + newCode);
        const response = await fetch(`/send-verification-email/${address}/${newCode}/${possibleUsername}`);
        const json = await response.json();
        try{
          console.log("Send Verification json: " + json);
        }catch(err){
      
        }
        try{
          console.log("Send Verification json(STRING): " + JSON.stringify(json));
        }catch(err){
          
        }
        busySettingPossibleSub = true;
        updatePossibleSub(getPossibleSubItem(possibleSub,newCode));
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
