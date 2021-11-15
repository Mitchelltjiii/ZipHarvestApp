import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';
import {InputAdornment,IconButton} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function ResetPasswordForm({setCurrentPage,linkCode,userFromUrl,executeLogout,fromAccountSettings,userID}) {
  console.log("Reset Password Form");
  console.log("From Account Settings: " + fromAccountSettings);

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordAgain, setPasswordAgain] = React.useState('');
    const [success,setSuccess] = React.useState(false);
    const [linkSent,setLinkSent] = React.useState(false);
    let busySettingUser = false;
    let fromUrl = (userFromUrl.length!==0);
    console.log("From Url Reset Password Form: " + fromUrl);
    console.log("Link Code: " + linkCode);
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordHelperText, setPasswordHelperText] = React.useState(false);
    const [verifyPasswordError, setVerifyPasswordError] = React.useState(false);
    const [verifyPasswordHelperText, setVerifyPasswordHelperText] = React.useState(false);

    const [failedPassword,setFailedPassword] = React.useState('');
    const [failedVerifyPassword,setFailedVerifyPassword] = React.useState('');


    const [showPassword,setShowPassword] = React.useState(false);
    const [showVerifyPassword,setShowVerifyPassword] = React.useState(false);

    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameHelperText, setUsernameHelperText] = React.useState(false);
    const [failedUsername,setFailedUsername] = React.useState('');

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleClickShowVerifyPassword = () => setShowVerifyPassword(!showVerifyPassword);
    const handleMouseDownVerifyPassword = () => setShowVerifyPassword(!showVerifyPassword);

    const [expired,setExpired] = React.useState(false);
    const [gotUser,setGotUser] = React.useState(false);

    const [stepOne, setStepOne] = React.useState(true);



    const handleSendResetLink = () => {
      getEmail();
	  }

    const handleForgotID = () => {
      clickForgotID();
    };

    function clickForgotID(){
      setCurrentPage('find-user-form');
    }

    var forgotIDLink = <a onClick={handleForgotID} style={{cursor:"pointer",color:"#3d85c6"}}>ID?</a>;
    
    async function getEmail(){
      console.log("Get email")
      const response = await fetch(`/get-email/${username}`);
      const text = await response.text();
      try{
        console.log("Get Email JSON: " + text);
      }catch(err){
      }
      let str = text;
      console.log("GEt email str: " + str);
      let textWithoutQuotes = str.substring(1,str.length-1);
      console.log("Text without quotes str: " + textWithoutQuotes);

      if(textWithoutQuotes !== null && textWithoutQuotes !== undefined && textWithoutQuotes !== ""){
        sendResetLink(textWithoutQuotes);
      }else{
        setFailedUsername(username);
        setUsernameHelperText("Username does not exist")
        setUsernameError(true);
      }
    }

    function isPasswordValid(str){
      var minNumberofChars = 8;
      var maxNumberofChars = 16;
      var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
      console.log("Is Password Valid")
      if(str.length < minNumberofChars || str.length > maxNumberofChars){
        console.log("Wrong length")
        return false;
      }
      if(!regularExpression.test(str)) {
        console.log("Nope, somethings wrong")
        return false;
      }
      console.log("Successful password")
      return true;
    }

    if(passwordError && password.length !== 0 && password !== failedPassword){
      setPasswordHelperText("");
      setPasswordError(false);
    }

    if(verifyPasswordError && passwordAgain.length !== 0 && (passwordAgain !== failedVerifyPassword)){
      setVerifyPasswordHelperText("");
      setVerifyPasswordError(false);
    }

    if(usernameError && username.length !== 0 && username !== failedUsername){
      setFailedUsername("");
      setUsernameHelperText("");
      setUsernameError(false);
    }
    
    const handleGoToHome = () => {
        window.location.replace("https://www.zipharvest.app/");
    }  

    const handleConfirmReset = () => {
      if(isPasswordValid(password) && isPasswordValid(passwordAgain) && (password === passwordAgain)){
        console.log("Get user Exists")
        updateUserPassword();
      }else{
        console.log("Something's not right");
        if(!isPasswordValid(password)){
          console.log("Password not correct");
          setFailedPassword(password);
          setPasswordHelperText("(8-16 letters,numbers,!@#$%^&*)")
          setPasswordError(true);
        }
        if(!isPasswordValid(passwordAgain) || (password !== passwordAgain)){
          console.log("PasswordAgain not correct");
          if(password !== passwordAgain){
            setFailedVerifyPassword(passwordAgain);
            setVerifyPasswordHelperText("Passwords do not match");
          }
          setVerifyPasswordError(true);
        }
      }
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

    async function sendResetLink(address){
        console.log("Try to send reset Link");
        console.log("Username: " + username)
        console.log("Email: " + address);
        let newCode = makeid(8);
        console.log("New Code: " + newCode);
        
        const response = await fetch(`/send-reset-link/${address}/${newCode}/${username}`);
        const json = await response.json();
        console.log("Waiting for sendresetlinkfetch")
        try{
          console.log("Send Reset link json: " + json);
        }catch(err){
      
        }
        try{
          console.log("Send Reset Link json(STRING): " + JSON.stringify(json));
        }catch(err){
          
        }
        console.log("Done Waiting for sendresetlinkfetch")
        busySettingUser = true;
        console.log("Go to updateuser")
        console.log("JSON.stringify currentdatetime: " + JSON.stringify((new Date().getTime())));
        updateUserLinkCode(newCode,JSON.stringify((new Date().getTime())),username);
      }
      
    async function updateUserLinkCode(newLinkCode,linkCodeTime,userID){
        console.log("Engage update user with link code");
        console.log("LinkCode: " + newLinkCode);
        console.log("LinkCodeTime: " + linkCodeTime)
        if(newLinkCode === ""){
          newLinkCode = "blank";
        }
        if(linkCodeTime === ""){
          linkCodeTime = "blank";
        }
        const response = fetch(`/user/updateLinkCode/${newLinkCode}/${linkCodeTime}/${userID}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(function(response) {
          let resp = JSON.stringify(response);
          console.log("Response from updateUser: " + resp);
          if(resp !== "" && resp !== null && resp !== undefined){
            console.log("Updateuser responded");
          }
        }).then(function(data) {
        });
        console.log("Before removing busy setting user");
        console.log("BUSYSETTINGUSER before: " + JSON.stringify(busySettingUser)); 
        busySettingUser = (false);
        console.log("BUSYSETTINGHR after: " + JSON.stringify(busySettingUser));       
        console.log("Exit update user");
        setLinkSent(true);
        setGotUser(true);
      }

      async function updateUserPassword(){
        console.log("Engage update user password");
        let userForFetch = userFromUrl;
        if(fromAccountSettings){
          userForFetch = userID;
        }
        const response = fetch(`/user/resetPassword/${userForFetch}/${password}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(function(response) {
          let resp = JSON.stringify(response);
          console.log("Response from updateUser: " + resp);
          if(resp !== "" && resp !== null && resp !== undefined){
            console.log("Updateuser responded");
          }
        }).then(function(data) {
        });
        console.log("Before removing busy setting user");
        console.log("BUSYSETTINGUSER before: " + JSON.stringify(busySettingUser)); 
        busySettingUser = (false);
        console.log("BUSYSETTINGHR after: " + JSON.stringify(busySettingUser));       
        console.log("Exit update user");
        setSuccess(true);
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

    const handleTryPassword = () => {
      console.log("Try Password");
      attemptLogin();
  };

  async function executeLogInFailed(){
    console.log("ExecuteLoginFailed");
  }

  async function attemptLogin(){
    console.log("Get users from DB");
    console.log("User ID: " + userID);
    console.log("Password: " + password)
    if(userID === "" || password === ""){
        executeLogInFailed();      
        return;
    }
    const response = await fetch(`/api/users/${userID}/${password}`);
    const text = await response.text();
    /*const responseTwo = await fetch(`/create-customer`);
    const json = await responseTwo.json();*/

    console.log("Fetched password attempt");

    console.log("Try Login Response: " + text);
    let gotResponse = false;
    console.log("Got Response A: " + gotResponse);

    if(text === "0" || text === "1" || text === "2"){
      console.log("Text === 0,1 or 2");
      gotResponse = true;
    }else{
      console.log("ELSE");
    }
    console.log("After tree");

    console.log("Got Response: " + gotResponse);
    
    if(!gotResponse){
      console.log("Not Got Response");
      executeLogInFailed();
    }
    console.log("Text === over");
  }
    

    let formWidth = "450px";
    let formHeight = "250px";

    if(isMobile){
      formWidth = "100%";
    }

    if(fromUrl && !gotUser){
      getUser()
    }

    async function getUser(){
      console.log("User from url: " + userFromUrl);
        console.log("Try to get user");
        const response = await fetch(`/get-user/${userFromUrl}`);
        const json = await response.json();
        try{
          console.log("sub json: " + json);
        }catch(err){
    
        }
        try{
          console.log("sub json(STRING): " + JSON.stringify(json));
        }catch(err){
        
        }
        let userString = JSON.stringify(json);
        userString = userString.substring(1,userString.length-1);
        console.log("User string: " + userString);
        let newUser = JSON.parse(userString);
        console.log("New user: " + JSON.stringify(newUser));
        console.log("Link code duh: " + linkCode)
  
        if(newUser.linkCode === linkCode){
          console.log("Match");
          console.log("Curr date Value: " + (new Date()).getTime());
          console.log("New User linkcodetime date Value: " + newUser.linkCodeTime);
          console.log("Difference: " + ((new Date()).getTime()-newUser.linkCodeTime));
          if(((new Date()).getTime()-newUser.linkCodeTime) > 900000){
            console.log("Code Expired");
            setExpired(true);
            return;
          }
          
          console.log("Code Working still");
    
          if(userString !== "" && userString !== undefined && userString !== null && userString !== "[]"){
            updateUserLinkCode('','',newUser.username);
          }
        }else{
          console.log("No Match")
        }
    }

	return (
		<div id="reset-password-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
          <div>
            {fromAccountSettings ?
            <div>{isMobile ?
              <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
              {stepOne ? 
                <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              >
<TextField
  error={passwordError}
  style={{marginTop:"10px",marginBottom:"10px",width:"248px"}}
  value={password}
  label='Current Password'
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
<Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleTryPassword}>Next</Button>

              </Grid>
              :
              <Grid
      container
      direction="column"
        justifyContent="center"
      alignItems="center"
        >
                  <TextField
    helperText={passwordHelperText} error={passwordError} 
    style={{marginBottom:"10px",width:"248px"}}
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
  <TextField
    helperText={verifyPasswordHelperText} error={verifyPasswordError} 
    style={{marginBottom:"10px",width:"248px"}}
    value={passwordAgain}
    label='Verify'
    variant="outlined"
    type={showVerifyPassword ? "text" : "password"} // <-- This is where the magic happens
    onChange={handlePasswordAgain} 
    InputProps={{ // <-- This is where the toggle button is added.
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visiblity"
            onClick={handleClickShowVerifyPassword}
            onMouseDown={handleMouseDownVerifyPassword}
          >
          {showVerifyPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    }}
  /><Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleConfirmReset}>Confirm</Button>
                  </Grid>
              }
              
              </div> :
              <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
              
              {stepOne ? 
                <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              >
<TextField
  error={passwordError}
  style={{marginTop:"10px",marginBottom:"10px",width:"248px"}}
  value={password}
  label='Current Password'
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
<Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleTryPassword}>Next</Button>

              </Grid>
              :
              <Grid
      container
      direction="column"
        justifyContent="center"
      alignItems="center"
        >
                  <TextField
    helperText={passwordHelperText} error={passwordError} 
    style={{marginBottom:"10px",width:"248px"}}
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
  <TextField
    helperText={verifyPasswordHelperText} error={verifyPasswordError} 
    style={{marginBottom:"10px",width:"248px"}}
    value={passwordAgain}
    label='Verify'
    variant="outlined"
    type={showVerifyPassword ? "text" : "password"} // <-- This is where the magic happens
    onChange={handlePasswordAgain} 
    InputProps={{ // <-- This is where the toggle button is added.
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visiblity"
            onClick={handleClickShowVerifyPassword}
            onMouseDown={handleMouseDownVerifyPassword}
          >
          {showVerifyPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    }}
  /><Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleConfirmReset}>Confirm</Button>
                  </Grid>
              }
              </div>
              }</div>
            :
            <div>  {success ?
              <div>
              {isMobile ?
              <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
              <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              >
                  <div style={{textAlign:"center"}}>Your password has been reset!</div>
                  <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Return to Login</Button>
              </Grid>
              </div> :
              <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
              <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              >
                  <div style={{textAlign:"center"}}>Your password has been reset!</div>
                  <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Return to Login</Button>
              </Grid>
              </div>
              }
              </div>
          :
          <div>
                  {isMobile ? 
                  <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                  {!fromUrl ?
  
                      <div>
                  {linkSent ? <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          >
                                  <div style={{textAlign:"center"}}>Your password reset link has been sent.</div>
                                  <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                                  </Grid>  :
                  <Grid
              container
              direction="column"
                justifyContent="center"
              alignItems="center"
            >
                  <TextField helperText={usernameHelperText} error={usernameError} id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined"></TextField>
                  <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleSendResetLink}>Send Reset Link</Button>
                  <div style={{marginTop:"5px",marginBottom:"5px"}}>Forgot {forgotIDLink}</div>
                  </Grid>
                  }  
                  </div>
              :
              <div>
              {!expired ? 
                <Grid
      container
      direction="column"
        justifyContent="center"
      alignItems="center"
        >
                  <TextField
    helperText={passwordHelperText} error={passwordError} 
    style={{marginBottom:"10px",width:"248px"}}
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
  <TextField
    helperText={verifyPasswordHelperText} error={verifyPasswordError} 
    style={{marginBottom:"10px",width:"248px"}}
    value={passwordAgain}
    label='Verify'
    variant="outlined"
    type={showVerifyPassword ? "text" : "password"} // <-- This is where the magic happens
    onChange={handlePasswordAgain} 
    InputProps={{ // <-- This is where the toggle button is added.
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visiblity"
            onClick={handleClickShowVerifyPassword}
            onMouseDown={handleMouseDownVerifyPassword}
          >
          {showVerifyPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    }}
  /><Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleConfirmReset}>Confirm</Button>
                  </Grid>
                  :
                  <Grid
              container
              direction="column"
                justifyContent="center"
                alignItems="center"
                  >
                  <div style={{textAlign:"center"}}>Your password reset link has expired.</div>
                  <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                  </Grid>
              }
              </div>
                  }
                  </div>
                  :
                  <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                      {!fromUrl ?
                          <div>
                      {linkSent ? <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          >
                                  <div style={{textAlign:"center"}}>Your password reset link has been sent.</div>
                                  <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                                  </Grid> :
                      <Grid
                  container
                  direction="column"
                    justifyContent="center"
                  alignItems="center"
                >
                      <TextField helperText={usernameHelperText} error={usernameError} id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined"></TextField>
                      <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleSendResetLink}>Send Reset Link</Button>
                      <div style={{marginTop:"5px",marginBottom:"5px"}}>Forgot {forgotIDLink}</div>
                      </Grid>
                      }  
                      </div>
                  :
                  <div>
                  {!expired ?
              <Grid
              container
              direction="column"
                justifyContent="center"
              alignItems="center"
                >
                          <TextField
        helperText={passwordHelperText} error={passwordError} 
        style={{marginBottom:"10px",width:"248px"}}
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
      <TextField
        helperText={verifyPasswordHelperText} error={verifyPasswordError} 
        style={{marginBottom:"10px",width:"248px"}}
        value={passwordAgain}
        label='Verify'
        variant="outlined"
        type={showVerifyPassword ? "text" : "password"} // <-- This is where the magic happens
        onChange={handlePasswordAgain} 
        InputProps={{ // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visiblity"
                onClick={handleClickShowVerifyPassword}
                onMouseDown={handleMouseDownVerifyPassword}
              >
              {showVerifyPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      /> <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleConfirmReset}>Confirm</Button>
                          </Grid>
                    :
                    <Grid
              container
              direction="column"
                justifyContent="center"
                alignItems="center"
                  >
                  <div style={{textAlign:"center"}}>Your password reset link has expired.</div>
                  <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                  </Grid>
                    }
                    </div>
                      }
                      </div>}
        </div>
          }
          </div>
            }
		</div>
    </div>
	);
}

export default ResetPasswordForm;
