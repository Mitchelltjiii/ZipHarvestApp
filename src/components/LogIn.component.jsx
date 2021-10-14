import React, {useStyles} from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

function LogIn({getUsers, executeLogIn, reloadUsers,getUsersLoading,setUsers,attemptLogin}){
    const useStyles = makeStyles((theme) => ({
        container: {
          padding: theme.spacing(3),
        },
      }));

    const classes = useStyles();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogIn = (event) => {
		  logIn();
	  };
    
    function logIn(){
      console.log("Username: " + username);
      console.log("Password: " + password);

      attemptLogin(username,password);
      /*
      console.log("Checking Users");
      console.log("Users String: " + getUsers());
      try{
        let parsedUsers = JSON.parse(getUsers());
        for(const val of parsedUsers){
          console.log("Val: " + val);
          console.log("Val(String): " + JSON.stringify(val));
          if(val.username==username){
            console.log("User Match");
            if(val.password==password){
              console.log("Password Correct!");
              executeLogIn(username,val.apiid);
            }
          }
        }
      }catch(ex){
        console.log("Before ReloadUsers")
        reloadUsers();
        console.log("Exited ReloadUsers")

        console.log("Get Users**: " + getUsers());
        console.log("Parse Users**");
        let parsedUsers = JSON.parse(getUsers()); //error here Uncaught SyntaxError: Unexpected end of JSON input

        console.log("ParsedUsers: " + JSON.stringify(parsedUsers));
        for(const val of parsedUsers){
          console.log("Val: " + val);
          console.log("Val(String): " + JSON.stringify(val));
          if(val.username==username){
            console.log("User Match");
            if(val.password==password){
              console.log("Password Correct!");
              executeLogIn(username,val.apiid);
            }
          }
        }
      }*/
      
	  }

    const handleUsername = (event) => {
		setUsername(event.target.value);
	  };

    const handlePassword = (event) => {
		setPassword(event.target.value);
	  };


    return(
      <div justifyContent="center" alignItems="center">
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
    )
}

export default LogIn;