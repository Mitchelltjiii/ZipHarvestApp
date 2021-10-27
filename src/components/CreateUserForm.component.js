import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function CreateUserForm({refreshOuter, userID,setCurrentPage,setUser,setPass}) {

    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordAgain, setPasswordAgain] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [facilityName, setFacilityName] = React.useState('');
    const [stepTwo,setStepTwo] = React.useState(false);

    const handleContinue = () => {
		doContinue();
	}

    function doContinue(){
        if(!stepTwo){
            setStepTwo(true);
        }else{
            setUser(username);
            setPass(password);
            setCurrentPage('stripe-form');
        }
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
    let formHeight = "250px";

	return (
		<div id="forgot-password-form" style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
			<Grid
				container
				direction="column"
  				justifyContent="center"
				alignItems="center"
			>
                <div style={{fontSize:"20px",marginTop:"10px",marginBottom:"10px"}}>Create your account</div>
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5}}>
                
                    {stepTwo ?
                        <Grid
				container
				direction="column"
  				justifyContent="center"
				alignItems="center"
			    >
                    <TextField id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined"></TextField>
                    <TextField id="Password" value={password} onChange={handlePassword} label="Password" variant="outlined"></TextField>
                    <TextField id="PasswordAgain" value={passwordAgain} onChange={handlePasswordAgain} label="Password (Verify)" variant="outlined"></TextField>
                    </Grid>
                :
                <Grid
				container
				direction="column"
  				justifyContent="center"
				alignItems="center"
			    >
                    <TextField id="FacilityName" value={facilityName} onChange={handleFacilityName} label="Facility Name" variant="outlined"></TextField>
                    <TextField id="First Name" value={firstName} onChange={handleFirstName} label="First Name" variant="outlined"></TextField>
                    <TextField id="Last Name" value={lastName} onChange={handleLastName} label="Last Name" variant="outlined"></TextField>
                    <TextField id="Email" value={email} onChange={handleEmail} label="Email" variant="outlined"></TextField>
                </Grid>
                    }
                    </div>                
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleContinue}>Continue</Button>
			</Grid>
		</div>
	);
}

export default CreateUserForm;
