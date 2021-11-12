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
    let busySettingUser = false;

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
      console.log("Is Username Valid")
      if(username.length < minNumberofChars || username.length > maxNumberofChars){
        console.log("Wrong length")
        return false;
      }
      if(!regularExpression.test(username)) {
        console.log("Nope, somethings wrong")
        return false;
      }
      console.log("Successful password")
      return true;
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

    function isValidString(str){
      var minNumberofChars = 1;
      var maxNumberofChars = 24;
      var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{1,24}$/;
      console.log("Is String Valid: " + str)
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

    function isValidStringEmail(str){
      var minNumberofChars = 1;
      var maxNumberofChars = 24;
      var regularExpression = /^[a-zA-Z0-9!@#$%^&*.]{1,24}$/;
      console.log("Is String Valid: " + str)
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
      console.log("Do Continue in Create User Form")
        if(!stepTwo){
            if(email.includes("@") && isValidString(facilityName) && isValidString(firstName) && isValidString(lastName) && (email.includes("@")) && isValidStringEmail(email)){
              console.log("Pass set step two")
              getEmailExists();

              //setStepTwo(true);
            }else{
              console.log("Something's not right");
              if(!isValidString(facilityName)){
                console.log("FacilityName not correct");
                setFacilityNameError(true);
              }
              if(!isValidString(firstName)){
                console.log("FirstName not correct");
                setFirstNameError(true);
              }
              if(!isValidString(lastName)){
                console.log("LastName not correct");
                setLastNameError(true);
              }
              if(!(email.includes("@")) || !isValidStringEmail(email)){
                console.log("Email not correct");
                setFailedEmail(email);
                if(!(email.includes("@"))){
                  setEmailHelperText("Must include @");
                }
                setEmailError(true);
              }
            }
        }else{
            if(isUsernameValid() && isPasswordValid(password) && isPasswordValid(passwordAgain) && (password === passwordAgain)){
              console.log("Get user Exists")
              getUserExists();
            }else{
              console.log("Something's not right");
              if(!isUsernameValid()){
                console.log("Username not correct");
                setFailedUsername(username);
                setUsernameHelperText("(8-16 letters & numbers)")
                setUsernameError(true);
              }
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
    }

    async function getUserExists(){
      console.log("Get user exist")
      const response = await fetch(`/api/user-exists/${username}`);
      const text = await response.text();
      try{
        console.log("User exists JSON: " + text);
      }catch(err){
  
      }
      try{
        console.log("User exists JSON(STRING): " + JSON.stringify(text));
      }catch(err){
        
      }
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
      console.log("Get email exist")
      const response = await fetch(`/api/email-exists/${email}`);
      const text = await response.text();
      try{
        console.log("Email exists JSON: " + text);
      }catch(err){
  
      }
      try{
        console.log("Email exists JSON(STRING): " + JSON.stringify(text));
      }catch(err){
        
      }
  
      if(text === "1"){
        setStepTwo(true);    
      }else{
        setEmailHelperText("Email is already registered");
        setFailedEmail(email);
        setEmailError(true);
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

    function getUserItem(newCode){
      console.log("Enter getUserItem")
    
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
        verCodeTime: ''
        };
    
        userItem.apiid = username;
        userItem.username = username;
        userItem.password = password;
        userItem.facilityName = facilityName;
        userItem.firstName = firstName;
        userItem.lastName = lastName;
        userItem.email = email;
        userItem.verificationCode = newCode;
        userItem.verCodeTime = JSON.stringify((new Date()).getTime());
    
      console.log("Stringified before passed: " + JSON.stringify(userItem));
      console.log("Exit getUserItem")
      return userItem;
    }
    
    async function updateUser(userItem){
      console.log("Engage update user");
      const response = fetch('/user', {
            method: (userItem.id) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userItem)
      }).then(function(response) {
        let resp = JSON.stringify(response);
      }).then(function(data) {
      });
      console.log("Before removing busy setting user");
      console.log("BUSYSETTINGUSER before: " + JSON.stringify(busySettingUser)); 
      busySettingUser = (false);
      console.log("BUSYSETTINGHR after: " + JSON.stringify(busySettingUser));       
      console.log("Exit update user");
    }

    async function sendVerificationEmail(){
        console.log("Try to send ver email");
        let newCode = makeid(8);
        console.log("New Code: " + newCode);
        const response = await fetch(`/send-verification-email/${email}/${newCode}/${username}`);
        const json = await response.json();
        try{
          console.log("Send Verification json: " + json);
        }catch(err){
      
        }
        try{
          console.log("Send Verification json(STRING): " + JSON.stringify(json));
        }catch(err){
          
        }
        busySettingUser = true;
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
  style={{marginBottom:"10px",width:"80px"}}
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
  style={{marginBottom:"10px",width:"100px"}}
  value={passwordAgain}
  label='Verify Password'
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
  style={{marginBottom:"10px",width:"80px"}}
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
  style={{marginBottom:"10px",width:"100px"}}
  value={passwordAgain}
  label='Verify Password'
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
/> </Grid>
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
