import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';

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

    let formWidth = "350px";
    let formHeight = "500px";

    if(isMobile){
      formWidth = "230px";
      formHeight = "330px";
    }

    async function tryStripe(){
      // Set your secret key. Remember to switch to your live secret key in production.
      // See your keys here: https://dashboard.stripe.com/apikeys
      const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'usd',
        payment_method_types: ['card'],
        receipt_email: 'jenny.rosen@example.com',
      });

      try{
        console.log("Payment Intent.text: " + paymentIntent.text());
      }catch(err){
      }

      try{
        console.log("Payment Intent: " + paymentIntent);
      }catch(err){
      }
    }

    tryStripe();

    

    return(
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
      <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5}}>
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