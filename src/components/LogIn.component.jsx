import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';
import Stripe from '@stripe/stripe-js'
import logo from './logo.png'


function LogIn({getUsers, executeLogIn, reloadUsers,getUsersLoading,setUsers,attemptLogin,setCurrentPage}){

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleForgotID = () => {
      clickForgotID();
    };

    function clickForgotID(){
      setCurrentPage('find-user-form');
    }

    const handleForgotPassword = () => {
      clickForgotPassword();
    };

    function clickForgotPassword(){
      console.log("Click forgot Password");
      setCurrentPage('reset-password-form');
    }

    const handleCreateID = () => {
      clickCreateID();
    };

    function clickCreateID(){
      setCurrentPage('create-user-form');
    }

    const handleTermsOfService = () => {
      clickTermsOfService();
    };

    function clickTermsOfService(){

    }

    const handlePrivacyPolicy = () => {
      clickPrivacyPolicy();
    };

    function clickPrivacyPolicy(){

    }

    var forgotIDLink = <a onClick={handleForgotID} style={{cursor:"pointer",color:"#3d85c6"}}>ID</a>;
  var forgotPasswordLink = <a onClick={handleForgotPassword} style={{cursor:"pointer",color:"#3d85c6"}}>password</a>;
  var createIDLink = <a onClick={handleCreateID} style={{cursor:"pointer",color:"#3d85c6"}}>Create one</a>;
  var termsOfServiceLink = <a onClick={handleTermsOfService} style={{cursor:"pointer",color:"#3d85c6"}}>Terms of Service</a>;
  var privacyPolicyLink = <a onClick={handlePrivacyPolicy} style={{cursor:"pointer",color:"#3d85c6"}}>Privacy Policy.</a>;

    const handleLogIn = (event) => {
		  logIn();
	  };
    
    function logIn(){
      attemptLogin(username,password);
	  }

    const handleUsername = (event) => {
		setUsername(event.target.value);
	  };

    const handlePassword = (event) => {
		setPassword(event.target.value);
	  };
      

    let formWidth = "350px";
    let formHeight = "500px";

    const outerDiv = () => {	
      
      if(isMobile){
        return (
          <div style={{width:formWidth,height:formHeight,paddingTop:"40px"}}>
          </div>    
        )
      }else{
        return (
          <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,paddingTop:"40px"}}>
          </div>    
        )
      }
    }

    return(
      <Grid
					  container
					  direction="column"
  				  justifyContent="center"
					  alignItems="center"
					  >
            <div style={{display:"flex",justifyContent:"center",alignContent:"center",height:"100vh",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
              <div style={{width:formWidth,height:formHeight,display:"flex",justifyContent:"center",alignContent:"center",height:"100vh",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                  <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  >
                    <outerDiv>
                    <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  >
                          <div style={{backgroundColor:"#444444",borderRadius:5,marginBottom:"10px"}}>
                              <img alt="logo" src={logo} style={{minHeight:"62px",maxHeight: "62px"}}/>
                          </div>    
                          <TextField id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined"></TextField>
                          <TextField id="Password" value={password} onChange={handlePassword} label="Password" variant="outlined" style={{marginTop:"10px",marginBottom:"10px"}}></TextField>
                          <Button color="secondary" type="submit" variant="contained" onClick={handleLogIn} style={{marginTop:"10px",marginBottom:"20px"}}>Sign in</Button>
                          <div style={{backgroundColor:"#999999",minHeight:"1px",maxHeight:"1px",width:"90%"}}></div>
                          <div style={{marginTop:"5px",marginBottom:"5px"}}>Forgot {forgotIDLink} or {forgotPasswordLink}</div>
                          <div style={{backgroundColor:"#999999",minHeight:"1px",maxHeight:"1px",width:"90%"}}></div>
                          <div style={{marginTop:"5px",marginBottom:"5px"}}>Don't have an ID? {createIDLink}</div>
                          <div style={{backgroundColor:"#999999",minHeight:"1px",maxHeight:"1px",width:"90%"}}></div>
                          <div style={{marginTop:"5px",marginBottom:"5px",fontSize:"12px"}}>By signing in, you agree to our {termsOfServiceLink} and {privacyPolicyLink}</div>
                      </Grid>
                    </outerDiv>
                </Grid>
                </div> 
            </div></Grid>
    )
}

export default LogIn;


/*                          <FormControlLabel control={<Checkbox/>} label="Stay signed in" />
*/