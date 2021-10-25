import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';
import StripeContainer from './StripeContainer';
import Stripe from 'stripe';


function LogIn({getUsers, executeLogIn, reloadUsers,getUsersLoading,setUsers,attemptLogin}){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    var stripe = Stripe("pk_test_51JmpUwGBqcLC10HcR83rJs3pzuuVNBccQnf6InpAaLtuTdo6SWH9ITX1QZcCFze1n2St0yk3PEa8flb4QHvSgMR000sINbKwaM");

    const handleLogIn = (event) => {
		  logIn();
	  };
    
    function logIn(){
      attemptLogin(username,password);
	  }

    const handleTryStripe = (event) => {
		  tryStripe();
	  };
    
    function tryStripe(){
      
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

    const [showItem, setShowItem] = React.useState(false);


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
                    <Button color="secondary" type="submit" variant="contained" onClick={handleTryStripe}>Stripe</Button>             
                    <div class="product">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="14px" height="16px" viewBox="0 0 14 16" version="1.1">
                   <defs/>
                   <g id="Flow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="0-Default" transform="translate(-121.000000, -40.000000)" fill="#E184DF">
                     <path d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z" id="Pilcrow"/>
                 </g>
            </g>
        </svg>
        <div class="description">
          <h3>Premium plan</h3>
          <h5>$100.00 / month</h5>
        </div>
        </div>
      </Grid>
      </div>
			</div>	
        
      </div>
    )
}

export default LogIn;


/*<div>   
                    <h1>The Spatula Store</h1>
			              {showItem ? (
			              	<StripeContainer />
			              ) : (
			            	<>
				          	<h3>$10.00</h3>
				          	<button onClick={() => setShowItem(true)}>Purchase Spatula</button>
				        </>
			        )} 
            </div>*/