import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';
import {InputAdornment,IconButton} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function ResetPasswordForm({setCurrentPage,linkCode,userFromUrl,fromAccountSettings,userID}) {
    const [logInFailed,setLogInFailed] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordAgain, setPasswordAgain] = React.useState('');
    const [success,setSuccess] = React.useState(false);
    const [linkSent,setLinkSent] = React.useState(false);
    let fromUrl = (userFromUrl.length!==0);
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

    const [passwordExisted,setPasswordExisted] = React.useState(false);

    let errorText = "";
    let error = false;

    if(stepOne && fromAccountSettings){
      if(logInFailed && password === ""){
        error = true;
        errorText = "Password is incorrect."
      }
    }

    const handleSendResetLink = () => {
      getEmail();
	  }

    const handleForgotID = () => {
      clickForgotID();
    };

    function clickForgotID(){
      setCurrentPage('find-user-form');
    }

    var forgotIDLink = <a href="/#" onClick={handleForgotID} style={{cursor:"pointer",color:"#3d85c6",textDecoration:"none"}}>ID?</a>;
    
    async function getEmail(){
      const response = await fetch(`/get-email/${username}`);
      const text = await response.text();
      let str = text;
      let textWithoutQuotes = str.substring(1,str.length-1);

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
      if(str.length < minNumberofChars || str.length > maxNumberofChars){
        return false;
      }
      if(!regularExpression.test(str)) {
        return false;
      }
      return true;
    }

    if(passwordError && password.length !== 0 && password !== failedPassword){
      setFailedPassword("");
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
        updateUserPassword();
      }else{
        if(!isPasswordValid(password)){
          setFailedPassword(password);
          setPasswordHelperText("(8-16 letters,numbers,!@#$%^&*)")
          setPasswordError(true);
        }
        if(!isPasswordValid(passwordAgain) || (password !== passwordAgain)){
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
        let newCode = makeid(8);
        
        const response = await fetch(`/send-reset-link/${address}/${newCode}/${username}`);
        await response.json();
        updateUserLinkCode(newCode,JSON.stringify((new Date().getTime())),username);
      }
      
    async function updateUserLinkCode(newLinkCode,linkCodeTime,userID){
        if(newLinkCode === ""){
          newLinkCode = "blank";
        }
        if(linkCodeTime === ""){
          linkCodeTime = "blank";
        }
        fetch(`/user/updateLinkCode/${newLinkCode}/${linkCodeTime}/${userID}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(function(response) {
        }).then(function(data) {
        });
        setLinkSent(true);
        setGotUser(true);
      }

      async function updateUserPassword(){
        let userForFetch = userFromUrl;
        if(fromAccountSettings){
          userForFetch = userID;
        }
        const response = await fetch(`/pr/check/${userForFetch}/${password}`);
        const text = await response.text();  

        if(text === "1"){
          const response2 = await fetch(`/user/resetPassword/${userForFetch}/${password}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          const text2 = await response2.text(); 
          let fixedText = text2;
          createPasswordRecord(fixedText);
        }else{
          setFailedPassword(password)
          setPasswordHelperText("Cannot reuse previous password.");
          setPasswordError(true);
        }
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
      attemptLogin();
  };

  async function executeLogInFailed(){
    setPassword("")
    setLogInFailed(true);
  }

  async function attemptLogin(){
    if(userID === "" || password === ""){
        executeLogInFailed();      
        return;
    }
    const response = await fetch(`/api/users/${userID}/${password}`);
    const text = await response.text();

    let gotResponse = false;

    if(text === "0" || text === "1" || text === "2"){
      gotResponse = true;
      setPassword("")
      setLogInFailed(false);
      setStepOne(false);
    }
    
    if(!gotResponse){
      executeLogInFailed();
    }
  }

  async function createPasswordRecord(hash){
    const response = fetch(`/pr/create/${hash}/${userID}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    });

    try{
      await response.text();
    }catch(err){
    }
    setSuccess(true);
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
        const response = await fetch(`/get-user/${userFromUrl}`);
        const json = await response.json();
        let userString = JSON.stringify(json);
        userString = userString.substring(1,userString.length-1);
        let newUser = JSON.parse(userString);
  
        if(newUser.linkCode === linkCode){
          if(((new Date()).getTime()-newUser.linkCodeTime) > 900000){
            setExpired(true);
            return;
          }
              
          if(userString !== "" && userString !== undefined && userString !== null && userString !== "[]"){
            updateUserLinkCode('','',newUser.username);
          }
        }
    }

	return (
		<div id="reset-password-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
          <div>
            {fromAccountSettings ?
            <div>{success ?
              <div>
              {isMobile ?
              <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
              <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              >
                  <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center"}}>Your password has been reset!</div>
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
  helperText={errorText}
  error={error}
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
  helperText={errorText}
  error={error}
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
