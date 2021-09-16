import React, {useStyles} from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

function LogIn({getUsers, executeLogIn, reloadUsers,getUsersLoading,setUsers}){
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

      console.log("Checking Users");
      console.log("Users String: " + getUsers());
      try{
        setUsers("");
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

        console.log("Usersloading: " + getUsersLoading());
        let x = 0;
        while(x<500 && getUsersLoading()){
           console.log("getUsersLoading()... x: " + x)
           setTimeout('',10000);
           x++;
        }

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
      }
      
	  }

    const handleUsername = (event) => {
		setUsername(event.target.value);
	  };

    const handlePassword = (event) => {
		setPassword(event.target.value);
	  };



    return(
        <Container className={classes.container} maxWidth="xs">
        <div class="centered">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="Username" value={username} onChange={handleUsername} label="Username" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="Password" value={password} onChange={handlePassword} label="Password" variant="outlined"/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button color="secondary" type="submit" variant="contained" onClick={handleLogIn} maxWidth="200px">
                Log in
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    )
}

export default LogIn;