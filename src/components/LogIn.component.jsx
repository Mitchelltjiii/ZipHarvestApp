import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';
import logo from './logo.png'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {InputAdornment,IconButton} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function LogIn({getUsers, executeLogIn, reloadUsers,getUsersLoading,setUsers,attemptLogin,setCurrentPage,logInFailed}){

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [staySignedIn, setStaySignedIn] = React.useState(false);
    const [showPassword,setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    let errorText = "";
    let error = false;
    if(logInFailed && username === "" && password === ""){
      error = true;
      errorText = "Username or password is incorrect."
    }

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
      window.open("https://app.termly.io/document/terms-of-use-for-saas/0fc8020f-e374-48f6-b222-fdaa3d482d39", '_blank');
    }

    const handlePrivacyPolicy = () => {
      clickPrivacyPolicy();
    };

    function clickPrivacyPolicy(){
      window.open("https://app.termly.io/document/privacy-policy/a880128c-82ae-40b1-bec3-7d5b495a1d24", '_blank');
    }

    var forgotIDLink = <a onClick={handleForgotID} style={{cursor:"pointer",color:"#3d85c6"}}>ID</a>;
    var forgotPasswordLink = <a onClick={handleForgotPassword} style={{cursor:"pointer",color:"#3d85c6"}}>password</a>;
    var createIDLink = <a onClick={handleCreateID} style={{cursor:"pointer",color:"#3d85c6"}}>Create one</a>;
    var termsOfServiceLink = <a onClick={handleTermsOfService} style={{cursor:"pointer",color:"#3d85c6"}}>Terms of Service</a>;
    var privacyPolicyLink = <a onClick={handlePrivacyPolicy} style={{cursor:"pointer",color:"#3d85c6"}}>Privacy Policy.</a>;

    const handleLogIn = (event) => {
		  logIn();
	  };

    const handleStaySignedInChanged = (event) => {
		  setStaySignedIn(event.target.checked);
	  };
    
    function logIn(){
      attemptLogin(username,password,staySignedIn);
      setUsername("");
      setPassword("");
	  }

    const handleUsername = (event) => {
		  setUsername(event.target.value);
	  };

    const handlePassword = (event) => {
		  setPassword(event.target.value);
	  };
      
    let formWidth = "350px";
    let formHeight = "500px";

    if(isMobile){
      formWidth = "100%";
    }

    const handleOnKeyDown = (event) => {
      if(event.keyCode === 13){
        logIn();
      }
    }

    return(
      <Grid
					  container
					  direction="column"
  				  justifyContent="center"
					  alignItems="center"
					  >
            <div style={{display:"flex",justifyContent:"center",alignContent:"center",height:"100vh",alignItems: 'center'}}>
              <div style={{width:formWidth,height:formHeight,display:"flex",justifyContent:"center",alignContent:"center"}}>
                  <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  >
                  {isMobile ?
                   <div style={{width:formWidth,height:formHeight,paddingTop:"40px"}}>
                   <Grid
                           container
                           direction="column"
                           justifyContent="center"
                           alignItems="center"
                           >
                                   <div style={{backgroundColor:"#444444",borderRadius:5,marginBottom:"10px"}}>
                                       <img alt="logo" src={logo} style={{minHeight:"62px",maxHeight: "62px"}}/>
                                   </div>    
                                   <TextField error={error} id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined"></TextField>
                                   <TextField
                                   onKeyDown={handleOnKeyDown}
  error={error}
  helperText={errorText}
  style={{marginTop:"10px",marginBottom:"10px",width:"248px"}}
  value={password}
  label='Password'
  variant="outlined"
  type={showPassword ? "text" : "password"} // <-- This is where the magic happens
  onChange={handlePassword} 
  InputProps={{ // <-- This is where the toggle button is added.
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visiblity"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>
                                     <FormControlLabel onChange={handleStaySignedInChanged} control={<Checkbox/>} label="Stay signed in" />
                                   <Button color="secondary" type="submit" variant="contained" onClick={handleLogIn} style={{marginTop:"10px",marginBottom:"20px"}}>Sign in</Button>
                                   <div style={{backgroundColor:"#999999",minHeight:"1px",maxHeight:"1px",width:"90%"}}></div>
                                   <div style={{marginTop:"5px",marginBottom:"5px"}}>Forgot {forgotIDLink} or {forgotPasswordLink}</div>
                                   <div style={{backgroundColor:"#999999",minHeight:"1px",maxHeight:"1px",width:"90%"}}></div>
                                   <div style={{marginTop:"5px",marginBottom:"5px"}}>Don't have an ID? {createIDLink}</div>
                                   <div style={{backgroundColor:"#999999",minHeight:"1px",maxHeight:"1px",width:"90%"}}></div>
                                   <div style={{marginTop:"5px",marginBottom:"5px",fontSize:"12px",textAlign:"center",width:"248px"}}>By signing in, you agree to our {termsOfServiceLink} and {privacyPolicyLink}</div>
                               </Grid>
                   </div> :
                   <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,paddingTop:"40px"}}>
                   <Grid
                           container
                           direction="column"
                           justifyContent="center"
                           alignItems="center"
                           >
                                   <div style={{backgroundColor:"#444444",borderRadius:5,marginBottom:"10px"}}>
                                       <img alt="logo" src={logo} style={{minHeight:"62px",maxHeight: "62px"}}/>
                                   </div>    
                                   <TextField error={error} id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined"></TextField>
                                   <TextField
                                   onKeyDown={handleOnKeyDown}
  helperText={errorText}
  error={error}
  style={{marginTop:"10px",marginBottom:"10px",width:"248px"}}
  value={password}
  label='Password'
  variant="outlined"
  type={showPassword ? "text" : "password"} // <-- This is where the magic happens
  onChange={handlePassword} 
  InputProps={{ // <-- This is where the toggle button is added
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>   
                                   <FormControlLabel onChange={handleStaySignedInChanged} control={<Checkbox/>} label="Stay signed in" />
                                   <Button color="secondary" type="submit" variant="contained" onClick={handleLogIn} style={{marginTop:"10px",marginBottom:"20px"}}>Sign in</Button>
                                   <div style={{backgroundColor:"#999999",minHeight:"1px",maxHeight:"1px",width:"90%"}}></div>
                                   <div style={{marginTop:"5px",marginBottom:"5px"}}>Forgot {forgotIDLink} or {forgotPasswordLink}</div>
                                   <div style={{backgroundColor:"#999999",minHeight:"1px",maxHeight:"1px",width:"90%"}}></div>
                                   <div style={{marginTop:"5px",marginBottom:"5px"}}>Don't have an ID? {createIDLink}</div>
                                   <div style={{backgroundColor:"#999999",minHeight:"1px",maxHeight:"1px",width:"90%"}}></div>
                                   <div style={{marginTop:"5px",marginBottom:"5px",fontSize:"12px",textAlign:"center",width:"248px"}}>By signing in, you agree to our {termsOfServiceLink} and {privacyPolicyLink}</div>
                               </Grid>
                   </div>
                  }  
                  </Grid>
                </div> 
            </div></Grid>
    )
}

export default LogIn;


/*                          <FormControlLabel control={<Checkbox/>} label="Stay signed in" />
*/