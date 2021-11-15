import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';
import {InputAdornment,IconButton} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function EndSubscriptionForm({setCurrentPage,logInFailed}) {

    const [stepOne,setStepOne] = React.useState(true);
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);

    let errorTxt = "";
    let failedLogIn = false;
    if(logInFailed){
      failedLogIn = true;
      errorTxt = "Username or password is incorrect."
    }
    console.log("failedlogin: " + failedLogIn);
    console.log("errorTxt: " + errorTxt);

    const [errorText, setErrorText] = React.useState(errorTxt);
    const [logInFailedHandeled,setLoginFailedHandled] = React.useState(false);
    const [failed,setFailed] = React.useState(false);

    const [showPassword,setShowPassword] = React.useState(false);

    if(!logInFailedHandeled && logInFailed){
      setPassword("");
      setFailed(true);
      setLoginFailedHandled(true);
    }

    if(failed && !passwordError){
      console.log("Set username error true");
      setPasswordError(true);
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleGoToHome = () => {
      setCurrentPage('harvest-form');
    }  

    const handleGoToStepTwo = () => {
      setStepOne(false);
    }  

    const handleAttemptCancel = () => {
      console.log("Attempt Cancel");
    }  

    const handlePassword = (event) => {
		  setPassword(event.target.value);
	  };

    let formWidth = "450px";
    let formHeight = "250px";

    if(isMobile){
      formWidth = "100%";
    }

    if(passwordError && password.length !== 0){
      setErrorText("");
      setPasswordError(false);
      setFailed(false);
    }

	return (

    <div id="end-subscription-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {isMobile ?
        <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
            {stepOne ? <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                                <div>Cancel your Subscription?</div>
                                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToStepTwo}>Cancel Subscription</Button>
                                <Button style={{marginTop:"30px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                                </Grid>
                                :
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
                                <TextField
  error={passwordError}
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
<div>{errorText}</div>
                                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleAttemptCancel}>Cancel Subscription</Button>
                                <Button style={{marginTop:"30px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                                </Grid>
                </Grid>
                }
                </div>
                :
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                {stepOne ? <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                                <div>Cancel your Subscription?</div>
                                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToStepTwo}>Cancel Subscription</Button>
                                <Button style={{marginTop:"30px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                          </Grid>
                                :
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
                                                    <TextField
                      error={passwordError}
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
                    <div>{errorText}</div>
                                                    <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleAttemptCancel}>Cancel Subscription</Button>
                                                    <Button style={{marginTop:"30px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                                                    </Grid>
                                    </Grid>
                }
        </div>
       }
		</div>
	);
}

export default EndSubscriptionForm;