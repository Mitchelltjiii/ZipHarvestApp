import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function LogIn({getUsers, executeLogIn, reloadUsers,getUsersLoading,setUsers,attemptLogin}){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

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


    return(
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
      <div style={{width:"350px",height:"500px",border:"1px solid #d7d7d7",borderRadius:5}}>
				<div style={{
			position: 'absolute', left: '50%', top: '50%',
			transform: 'translate(-50%, -50%)'}}>
        <Grid
					container
					direction="column"
  				justifyContent="center"
					alignItems="center"
					>
                    <TextField id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined"></TextField>
                    <TextField id="Password" value={password} onChange={handlePassword} label="Password" variant="outlined" style={{marginTop:"10px",marginBottom:"10px"}}></TextField>
                    <Button color="secondary" type="submit" variant="contained" onClick={handleLogIn}>Log in</Button>
          </Grid>
      </div>
			</div>	
        
      </div>
    )
}

export default LogIn;