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
import leafImage1 from '../leafImage1.png';
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

  let lineSpacing = "12px";
  const styles = {
    slide: {
      height: '100%',
      width: '100%',
      color: '#fff',
    },
    slide1: {
      background: '#FFFFFF',
    },
    slide2: {
      background: '#FFFFFF',
    },
    slide3: {
      background: '#FFFFFF',
    },
  };
  
  const [accountCreated,setAccountCreated] = React.useState(false);
  const [resent,setResent] = React.useState(false);
  const [newUsername,setNewUsername] = React.useState("");
  let leafImageHeight = "80px";

  let newLink = "";
    if(resent){
      newLink = "new "
    }

    const handleGoToFloraSolNewTab = () => {
      window.open("https://www.flora-sol.com/");
    }

    const handleResend = () => {
      resend();
    }
  
      function resend(){
          getUser();
      }
  
      const handleGoToHome = () => {
        setCurrentPage('signin');
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
        
          const response = await fetch(`/user/updateVerificationCode/${username}/${newCode}/${verCodeTime}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
      });
          await response.json();
          
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
  

  if(isMobile){
    return (
      <div id="product-display-mobile" style={{width:"100%",backgroundColor:"#444444"}}>
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
             <div style={{backgroundColor:"#000000",width:"100%"}}>
        <Grid
				container
				direction="row"
			  	justifyContent="center"
				alignItems="center">
                    <img alt="logo" src={zhlogotransparent} style={{height: "50px"}}/>
                    </Grid>
                     </div>
                     <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontWeight:"bold",fontSize:"30px",color:"#FFFFFF",marginTop:"20px"}}>Congrats!</div>
                     <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontWeight:"bold",fontSize:"30px",color:"#FFFFFF",marginTop:"10px"}}>Your new account has been created!</div>
                     <img alt="leafImage1" src={leafImage1} style={{height:leafImageHeight,marginTop:"20px",marginBottom:"15px"}}/>
                     <div style={{marginTop:"20px",marginBottom:"5px",paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontSize:"17px",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif"}}>We sent you a {newLink}link to verify your account.</div>
                     <div style={{marginBottom:"20px",paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontSize:"17px",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif"}}>It will expire 15 minutes after creation.</div>
                     </Grid>
                     <Grid
         container
         direction="row"
           justifyContent="center"
         alignItems="center"
         style={{marginBottom:"50px"}}
           >
                     <Button style={{marginTop:"10px",marginRight:"50px",color:"#FFFFFF",borderColor:"#FFFFFF"}} 
                     variant="outlined" aria-controls="simple-menu" aria-haspopup="true"
                     onClick={handleResend}>Resend Code</Button>
                     <Button style={{marginTop:"10px",backgroundColor:"#000000",color:"#FFFFFF",
                     borderColor:"#000000"}} variant="contained" aria-controls="simple-menu" 
                     aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                     </Grid>
                     </Grid> :
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{width:"100%"}}
      >
        <div style={{backgroundColor:"#000000",width:"100%"}}>
                    <img alt="logo" src={zhlogotransparent} style={{height: "50px",float:"left"}}/>
                    {accountCreated ? null :       
      <Button style={{height:"40px",marginTop:"5px",marginBottom:"5px",
      color:"#FFFFFF",borderColor:"#FFFFFF",float:"right"}} aria-controls="simple-menu" 
      aria-haspopup="true" variant="outlined" onClick={handleGoToHome}>Sign In</Button>		
      }
                     </div>
                     <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{backgroundColor:"#444444",width:"100%"}}
      >
      <div style={{fontSize:"32px",fontWeight:"bold",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif",marginTop:lineSpacing,
      textAlign:"center"}}>WELCOME TO ZIPHARVEST</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Record plant harvest weights faster than ever with a single voice command</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Report harvest batches to Metrc easily with our reliable export feature</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;14-day free trial for all users and price tiers available based on usage</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Get started in just a few minutes without any obligation</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif",marginBottom:"25px"}}>&#10004;No special equipment required, just your voice, phone and the scales you already own</div>
          <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToFloraSolNewTab} style={{backgroundColor:"#444444",borderRadius:5,marginTop:lineSpacing,width:"120px"}}>Learn More</Button>
          </Grid>
          <CreateUserMiniForm setAccountCreated={setAccountCreated} setNewUsername={setNewUsername}></CreateUserMiniForm>
          </Grid>
  }
  </div>
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
      color:"#FFFFFF",borderColor:"#FFFFFF",float:"right"}} aria-controls="simple-menu" 
      aria-haspopup="true" variant="outlined" onClick={handleGoToHome}>Sign In</Button>		
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
                     <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontWeight:"bold",fontSize:"45px",color:"#FFFFFF"}}>Congrats!</div>
                     <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontWeight:"bold",fontSize:"45px",color:"#FFFFFF"}}>Your new account has been created!</div>
                     <img alt="leafImage1" src={leafImage1} style={{height:leafImageHeight,marginTop:"20px",marginBottom:"15px"}}/>
                     <div style={{marginTop:"20px",marginBottom:"5px",paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontSize:"24px",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif"}}>We sent you a {newLink}link to verify your account.</div>
                     <div style={{marginBottom:"20px",paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontSize:"24px",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif"}}>It will expire 15 minutes after creation.</div>
                     </Grid>
                     <Grid
         container
         direction="row"
           justifyContent="center"
         alignItems="center"
           >
                     <Button style={{marginTop:"10px",marginRight:"50px",color:"#FFFFFF",borderColor:"#FFFFFF"}} 
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
          <div style={{fontSize:"55px",fontWeight:"bold",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif",marginBottom:"10px"}}>WELCOME TO ZIPHARVEST</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Record plant harvest weights faster than ever with a single voice command</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Report harvest batches to Metrc easily with our reliable export feature</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;14-day free trial for all users and price tiers available based on usage</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Get started in just a few minutes without any obligation</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;No special equipment required, just your voice, phone and the scales you already own</div>
          <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToFloraSolNewTab} style={{backgroundColor:"#444444",borderRadius:5,marginTop:lineSpacing,width:"120px"}}>Learn More</Button>
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


