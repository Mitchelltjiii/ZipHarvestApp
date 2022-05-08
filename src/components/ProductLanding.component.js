import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';
import {InputAdornment,IconButton} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CreateUserMiniForm from './CreateUserMiniForm.component';
import zhlogotransparent from '../zhlogotransparent.png';


/*

        <div style={{backgroundColor:"#e1e1e1", position:"absolute",top:"80px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
<div style={{width:"70%",marginBottom:"200px"}}>
        <div style={{float:"left",backgroundColor:"#e4e4e4",width:"60%",height:"95%"}}>
        <Grid
      container
      direction="column"
        justifyContent="center"
      alignItems="left">
<div style={{fontSize:"60px",fontWeight:"bold"}}>WELCOME TO ZIPHARVEST</div>
<div style={{fontSize:"25px"}}>&#10004;Record plant harvest weights faster than ever with a single voice command</div>
<div style={{fontSize:"25px"}}>&#10004;Report harvest batches to Metrc easily with our reliable export feature</div>
<div style={{fontSize:"25px"}}>&#10004;14-day free trial for all users and price tiers available based on usage</div>
<div style={{fontSize:"25px"}}>&#10004;Get started in just a few minutes without any obligation</div>
<div style={{fontSize:"25px"}}>&#10004;No special equipment required, just your voice, phone and the scales you already own</div>

</Grid>
        </div>
        <div style={{float:"right",backgroundColor:"#e4e4e4",width:"30%",height:"95%"}}>
        <CreateUserMiniForm></CreateUserMiniForm>
</div>
    </div>
          </div>
*/

function ProductLanding({setCurrentPage,logVisit}) {

  let lineSpacing = "5px";
  
  const [accountCreated,setAccountCreated] = React.useState(false);
  const [resent,setResent] = React.useState(false);
  const [newUsername,setNewUsername] = React.useState("");
  console.log("Product landing - account created: " + accountCreated);

  let newLink = "";
    if(resent){
      newLink = "new "
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

        async function sendVerificationEmail(user){
          let address = user.email;
          let newCode = makeid(8);
          const response = await fetch(`/send-verification-email/${address}/${newCode}/${newUsername}`);
          await response.json();
          
          updateUserVerificationCode(user.username,newCode);
        }
  
        async function updateUserVerificationCode(username,newCode){
          let verCodeTime = JSON.stringify((new Date()).getTime());
        
          fetch(`/user/updateVerificationCode/${username}/${newCode}/${verCodeTime}`, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
          }).then(function(response) {
          }).then(function(data) {
          });
        }

  if(isMobile){
    return (
      <div></div>
    );
  }else{
    return (
        <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
style={{backgroundColor:"#444444",height:"100%",width:"100%"}}
      >
          <div style={{width:"100%",height:"80px",backgroundColor:"#000000"}}>
<Grid
      container
      direction="column"
        justifyContent="center"
      alignItems="center"
style={{width:"100%"}}>
<div style={{width:"70%",marginTop:"10px",marginBottom:"10px",color:"#FFFFFF"}}>
      <img alt="logo" src={zhlogotransparent} style={{minHeight:"62px",maxHeight: "62px",float:"left"}}/>

      {accountCreated ? null :       
      <Button style={{height:"40px",marginTop:"10px",marginBottom:"10px",
      color:"#FFFFFF",borderColor:"#FFFFFF",float:"right"}} aria-controls="simple-menu" aria-haspopup="true" variant="outlined">Sign In</Button>		
      }

        </div>
  
</Grid>
      
</div>
<div style={{backgroundColor:"#444444", position:"absolute",top:"80px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
         {accountCreated ? 
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
                     <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontWeight:"bold",fontSize:"36px",color:"#FFFFFF"}}>Congrats, your new account has been created!</div>
                     <div style={{marginTop:"20px",marginBottom:"5px",paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontSize:"24px",color:"#729d3f"}}>We sent you a {newLink}link to verify your account.</div>
                     <div style={{marginBottom:"20px",paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontSize:"24px",color:"#FFFFFF"}}>It will expire 15 minutes after creation.</div>
                     </Grid>
                     <Grid
         container
         direction="row"
           justifyContent="center"
         alignItems="center"
           >
                     <Button style={{marginTop:"10px",marginRight:"5px",color:"#FFFFFF",borderColor:"#FFFFFF"}} 
                     variant="outlined" aria-controls="simple-menu" aria-haspopup="true"
                     onClick={handleResend}>Resend Code</Button>
                     <Button style={{marginTop:"10px",backgroundColor:"#000000",color:"#FFFFFF",
                     borderColor:"#000000"}} variant="contained" aria-controls="simple-menu" 
                     aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                     </Grid>
                     </Grid>
                     :
          <div style={{width:"70%",marginBottom:"200px"}}>
                  <div style={{float:"left",backgroundColor:"#444444",width:"60%",height:"95%"}}>
                  <Grid
				container
				direction="column"
			  	justifyContent="center"
				alignItems="left">
          <div style={{fontSize:"55px",fontWeight:"bold",color:"#FFFFFF"}}>WELCOME TO ZIPHARVEST</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing}}>&#10004;Record plant harvest weights faster than ever with a single voice command</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing}}>&#10004;Report harvest batches to Metrc easily with our reliable export feature</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing}}>&#10004;14-day free trial for all users and price tiers available based on usage</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing}}>&#10004;Get started in just a few minutes without any obligation</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing}}>&#10004;No special equipment required, just your voice, phone and the scales you already own</div>

        </Grid>
                  </div>
                  <div style={{float:"right",backgroundColor:"#e4e4e4",width:"30%",height:"95%",borderRadius:"5px"}}>
                  <CreateUserMiniForm setAccountCreated={setAccountCreated} setNewUsername={setNewUsername}></CreateUserMiniForm>
        </div>
              </div>
  }
					</div>
      </Grid>
    );
  }
}

export default ProductLanding;


