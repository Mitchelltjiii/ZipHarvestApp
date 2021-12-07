import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';
import {InputAdornment,IconButton} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function CreateUserForm({setCurrentPage,setNewUsername}) {

    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordAgain, setPasswordAgain] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [facilityName, setFacilityName] = React.useState('');
    const [stepTwo,setStepTwo] = React.useState(false);

    const [facilityNameError, setFacilityNameError] = React.useState(false);
    const [firstNameError, setFirstNameError] = React.useState(false);
    const [lastNameError, setLastNameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameHelperText, setUsernameHelperText] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordHelperText, setPasswordHelperText] = React.useState(false);
    const [verifyPasswordError, setVerifyPasswordError] = React.useState(false);
    const [verifyPasswordHelperText, setVerifyPasswordHelperText] = React.useState(false);
    const [failedUsername,setFailedUsername] = React.useState('');
    const [emailHelperText, setEmailHelperText] = React.useState(false);    
    const [failedEmail,setFailedEmail] = React.useState('');
    const [failedPassword,setFailedPassword] = React.useState('');
    const [failedVerifyPassword,setFailedVerifyPassword] = React.useState('');

    const [showPassword,setShowPassword] = React.useState(false);
    const [showVerifyPassword,setShowVerifyPassword] = React.useState(false);


    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleClickShowVerifyPassword = () => setShowVerifyPassword(!showVerifyPassword);
    const handleMouseDownVerifyPassword = () => setShowVerifyPassword(!showVerifyPassword);


    const handleContinue = () => {
		  doContinue();
	  }

    function isUsernameValid(){
      var minNumberofChars = 8;
      var maxNumberofChars = 16;
      var regularExpression = /^[a-zA-Z0-9]{8,16}$/;
      if(username.length < minNumberofChars || username.length > maxNumberofChars){
        return false;
      }
      if(!regularExpression.test(username)) {
        return false;
      }
      return true;
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

    function isValidString(str){
      var minNumberofChars = 1;
      var maxNumberofChars = 24;
      var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{1,24}$/;
      if(str.length < minNumberofChars || str.length > maxNumberofChars){
        return false;
      }
      if(!regularExpression.test(str)) {
        return false;
      }
      return true;
    }

    function isValidStringEmail(str){
      var minNumberofChars = 1;
      var maxNumberofChars = 24;
      var regularExpression = /^[a-zA-Z0-9!@#$%^&*.]{1,24}$/;
      if(str.length < minNumberofChars || str.length > maxNumberofChars){
        return false;
      }
      if(!regularExpression.test(str)) {
        return false;
      }
      return true;
    }


    if(facilityNameError && facilityName.length !== 0){
      setFacilityNameError(false);
    }

    if(firstNameError && firstName.length !== 0){
      setFirstNameError(false);
    }

    if(lastNameError && lastName.length !== 0){
      setLastNameError(false);
    }

    if(emailError && email.length !== 0 && email !== failedEmail){
      setFailedEmail("");
      setEmailHelperText("");
      setEmailError(false);
    }

    if(usernameError && username.length !== 0 && username !== failedUsername){
      setFailedUsername("");
      setUsernameHelperText("");
      setUsernameError(false);
    }

    if(passwordError && password.length !== 0 && password !== failedPassword){
      setPasswordHelperText("");
      setPasswordError(false);
    }

    if(verifyPasswordError && passwordAgain.length !== 0 && (passwordAgain !== failedVerifyPassword)){
      setVerifyPasswordHelperText("");
      setVerifyPasswordError(false);
    }
    

    function doContinue(){
        if(!stepTwo){
            if(email.includes("@") && isValidString(facilityName) && isValidString(firstName) && isValidString(lastName) && (email.includes("@")) && isValidStringEmail(email)){
              getEmailExists();

              //setStepTwo(true);
            }else{
              if(!isValidString(facilityName)){
                setFacilityNameError(true);
              }
              if(!isValidString(firstName)){
                setFirstNameError(true);
              }
              if(!isValidString(lastName)){
                setLastNameError(true);
              }
              if(!(email.includes("@")) || !isValidStringEmail(email)){
                setFailedEmail(email);
                if(!(email.includes("@"))){
                  setEmailHelperText("Must include @");
                }
                setEmailError(true);
              }
            }
        }else{
            if(isUsernameValid() && isPasswordValid(password) && isPasswordValid(passwordAgain) && (password === passwordAgain)){
              getUserExists();
            }else{
              if(!isUsernameValid()){
                setFailedUsername(username);
                setUsernameHelperText("(8-16 letters & numbers)")
                setUsernameError(true);
              }
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
    }

    async function getUserExists(){
      const response = await fetch(`/api/user-exists/${username}`);
      const text = await response.text();
      let newUsername = username;
  
      if(text === "1"){
        sendVerificationEmail();
        setNewUsername(newUsername);
        setCurrentPage('verification-form');      
      }else{
        setUsernameHelperText("Username already exists");
        setFailedUsername(username);
        setUsernameError(true);
      }
    }

    async function getEmailExists(){
      const response = await fetch(`/api/email-exists/${email}`);
      const text = await response.text();
  
      if(text === "1"){
        setStepTwo(true);    
      }else{
        setEmailHelperText("Email is already registered");
        setFailedEmail(email);
        setEmailError(true);
      }
    }

    function getUserItem(newCode){    
      let userItem = {
        apiid: '',
        username: '',
        password: '',
        subid: '',
        linkCode: '',
        facilityName: '',
        firstName: '',
        lastName: '',
        email: '',
        verificationCode: '',
        verified: 1,
        sessionid: '',
        verCodeTime: '',
        linkCodetime: ''
        };
    
        userItem.apiid = makeid(8);
        userItem.username = username;
        userItem.password = password;
        userItem.facilityName = facilityName;
        userItem.firstName = firstName;
        userItem.lastName = lastName;
        userItem.email = email;
        userItem.verificationCode = newCode;
        userItem.verCodeTime = JSON.stringify((new Date()).getTime());
      return userItem;
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
    
    async function updateUser(userItem){
      fetch('/user', {
            method: (userItem.id) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userItem)
      }).then(function(response) {
      }).then(function(data) {
      });
    }

    async function sendVerificationEmail(){
        let newCode = makeid(8);
        const response = await fetch(`/send-verification-email/${email}/${newCode}/${username}`);
        await response.json();
        updateUser(getUserItem(newCode));
      }

    const handleFacilityName = (event) => {
        setFacilityName(event.target.value);
    };

    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordAgain = (event) => {
        setPasswordAgain(event.target.value);
    };

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


    var termsOfServiceLink = <a href="/#" onClick={handleTermsOfService} style={{cursor:"pointer",color:"#3d85c6",textDecoration:"none"}}>Terms of Service</a>;
    var privacyPolicyLink = <a href="/#" onClick={handlePrivacyPolicy} style={{cursor:"pointer",color:"#3d85c6",textDecoration:"none"}}>Privacy Policy.</a>;  

    let formWidth = "450px";
    let formHeight = "300px";

    if(isMobile){
      formWidth = "100%";
    }

	return (
		<div id="create-user-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
			<Grid
				container
				direction="column"
  				justifyContent="center"
				alignItems="center"
			>
                <div style={{fontSize:"22px",marginTop:"10px",marginBottom:"10px"}}><b>Welcome to ZipHarvest!</b></div>
                {isMobile ?
                <div style={{width:formWidth,height:formHeight,paddingTop:"40px"}}>
                {stepTwo ?
                    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
                <TextField id="Username" helperText={usernameHelperText} error={usernameError} value={username} onChange={handleUsername} label="Username" variant="outlined" style={{marginTop:"10px",marginBottom:"10px"}}></TextField>
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
/> 
<div style={{marginTop:"5px",marginBottom:"5px",fontSize:"12px",textAlign:"center",width:"248px"}}>By creating an account, you agree to our {termsOfServiceLink} and {privacyPolicyLink}</div>                
                </Grid>
            :
            <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
                <TextField id="FacilityName" error={facilityNameError} value={facilityName} onChange={handleFacilityName} label="Facility Name" variant="outlined" style={{marginTop:"10px",marginBottom:"10px"}}></TextField>
                <TextField id="First Name" error={firstNameError} value={firstName} onChange={handleFirstName} label="First Name" variant="outlined" style={{marginBottom:"10px"}}></TextField>
                <TextField id="Last Name" error={lastNameError} value={lastName} onChange={handleLastName} label="Last Name" variant="outlined" style={{marginBottom:"10px"}}></TextField>
                <TextField id="Email" helperText={emailHelperText} error={emailError} value={email} onChange={handleEmail} label="Email" variant="outlined" style={{marginBottom:"10px"}}></TextField>
            </Grid>
                }
      </div> :
      <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,paddingTop:"40px"}}>
      {stepTwo ?
          <Grid
container
direction="column"
justifyContent="center"
alignItems="center"
>
      <TextField id="Username" helperText={usernameHelperText} error={usernameError} value={username} onChange={handleUsername} label="Username" variant="outlined" style={{marginTop:"10px",marginBottom:"10px"}}></TextField>
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
/> 
<div style={{marginTop:"5px",marginBottom:"5px",fontSize:"12px",textAlign:"center",width:"248px"}}>By creating an account, you agree to our {termsOfServiceLink} and {privacyPolicyLink}</div>
</Grid>
  :
  <Grid
container
direction="column"
justifyContent="center"
alignItems="center"
>
      <TextField id="FacilityName" error={facilityNameError} value={facilityName} onChange={handleFacilityName} label="Facility Name" variant="outlined" style={{marginTop:"10px",marginBottom:"10px"}}></TextField>
      <TextField id="First Name" error={firstNameError} value={firstName} onChange={handleFirstName} label="First Name" variant="outlined" style={{marginBottom:"10px"}}></TextField>
      <TextField id="Last Name" error={lastNameError} value={lastName} onChange={handleLastName} label="Last Name" variant="outlined" style={{marginBottom:"10px"}}></TextField>
      <TextField id="Email" helperText={emailHelperText} error={emailError} value={email} onChange={handleEmail} label="Email" variant="outlined" style={{marginBottom:"10px"}}></TextField>
  </Grid>
      }
</div>
                }
                
      <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleContinue}>Continue</Button>
			</Grid>
		</div>
	);
}

export default CreateUserForm;
