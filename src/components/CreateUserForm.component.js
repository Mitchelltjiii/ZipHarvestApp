import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';

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

    const handleContinue = () => {
		  doContinue();
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

    if(emailError && email.length !== 0){
      setEmailError(false);
    }
    

    function doContinue(){
      console.log("Do Continue in Create User Form")
        if(!stepTwo){
            if(facilityName.length !== 0 && firstName.length !== 0 && lastName.length !== 0 && email.length !== 0 && email.includes("@")){
              console.log("Pass set step two")
              setStepTwo(true);
            }else{
              console.log("Something's not right");
              if(facilityName.length === 0){
                console.log("FacilityName not correct");
                setFacilityNameError(true);
              }
              if(firstName.length === 0){
                console.log("FirstName not correct");
                setFirstNameError(true);
              }
              if(lastName.length === 0){
                console.log("LastName not correct");
                setLastNameError(true);
              }
              if(email.length === 0 || !(email.includes("@"))){
                console.log("Email not correct");
                setEmailError(true);
              }
            }
        }else{
            getUserExists();
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

    if(stepTwo){
      formHeight = "250px";
    }

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
                <div style={{fontSize:"20px",marginTop:"10px",marginBottom:"10px"}}>Create your account</div>
                {isMobile ?
                <div style={{width:formWidth,height:formHeight,paddingTop:"40px"}}>
                {stepTwo ?
                    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
                <TextField id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined" style={{marginTop:"10px",marginBottom:"10px"}}></TextField>
                <TextField id="Password" value={password} onChange={handlePassword} label="Password" variant="outlined"style={{marginBottom:"10px"}}></TextField>
                <TextField id="PasswordAgain" value={passwordAgain} onChange={handlePasswordAgain} label="Password (Verify)" variant="outlined" style={{marginBottom:"10px"}}></TextField>
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
                <TextField id="Email" error={emailError} value={email} onChange={handleEmail} label="Email" variant="outlined" style={{marginBottom:"10px"}}></TextField>
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
      <TextField id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined" style={{marginTop:"10px",marginBottom:"10px"}}></TextField>
      <TextField id="Password" value={password} onChange={handlePassword} label="Password" variant="outlined"style={{marginBottom:"10px"}}></TextField>
      <TextField id="PasswordAgain" value={passwordAgain} onChange={handlePasswordAgain} label="Password (Verify)" variant="outlined" style={{marginBottom:"10px"}}></TextField>
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
      <TextField id="Email" error={emailError} value={email} onChange={handleEmail} label="Email" variant="outlined" style={{marginBottom:"10px"}}></TextField>
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
