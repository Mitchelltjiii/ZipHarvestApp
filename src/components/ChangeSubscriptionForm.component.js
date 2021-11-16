import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';

function ChangeSubscriptionForm({setCurrentPage,userID}) {

    const handleGoToHome = () => {
      window.location.replace("https://www.zipharvest.app/");
    }  

    let formWidth = "450px";
    let formHeight = "250px";

    if(isMobile){
      formWidth = "100%";
    }

    const handleGoToBasic = () => {
        goToProduct("basic");
      }
      
      const handleGoToStandard = () => {
        goToProduct("standard");
      }
      
      const handleGoToPremium = () => {
        goToProduct("premium");
      }


async function goToProduct(lookup_key){
    console.log("Engage go to product.");
    const response = await fetch(`/create-checkout-session/${lookup_key}`, {
          method: 'POST',
          mode: 'no-cors'
    });
    const json = await response.json();
    try{
        console.log("new session json: " + json);
    }catch(err){
    
    }
    try{
        console.log("new session json(STRING): " + JSON.stringify(json));
    }catch(err){
        
    }
  
    updateUserSessionID(json.id);
  
    window.location.replace(json.url);
    console.log("fetched create checkout sess");
  }

  async function updateUserSessionID(sessionid){
    const response = fetch(`/user/set-session-id/${userID}/${sessionid}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
  }).then(function(response) {
    let resp = JSON.stringify(response);
    console.log("Response from updateusersessionid: " + resp);
    if(resp !== "" && resp !== null && resp !== undefined){
      console.log("Updateuser responded");
    }
  }).then(function(data) {
  });
  }

	return (
<div id="product-display" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
          {isMobile ?
          <div style={{width:formWidth,height:formHeight,paddingTop:"40px"}}>
              <Grid
				    container
				    direction="row"
            justifyContent="center"
				    alignItems="center"
			        >
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{textAlign:"center"}}>Basic</div>
              <div style={{textAlign:"center"}}>Export up to 2000 plants per month</div>
              <div style={{textAlign:"center"}}>$200 per month</div>
                    <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToBasic}>Select</Button>
              </Grid>  
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{textAlign:"center"}}>Standard</div>
              <div style={{textAlign:"center"}}>Export up to 5000 plants per month</div>
              <div style={{textAlign:"center"}}>$475 per month</div>
                    <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToStandard}>Select</Button>
              </Grid> 
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{textAlign:"center"}}>Premium</div>
              <div style={{textAlign:"center"}}>Export up to 10000 plants per month</div>
              <div style={{textAlign:"center"}}>$800 per month</div>
                    <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToPremium}>Select</Button>
              </Grid> 
              </Grid>
          </div> :
          <div style={{width:"650px",height:"400px",border:"1px solid #d7d7d7",borderRadius:5,paddingTop:"40px"}}>
              <Grid
				    container
				    direction="row"
            justifyContent="center"
				    alignItems="center"
            wrap="nowrap"
			        >
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{textAlign:"center"}}>Basic</div>
              <div style={{textAlign:"center"}}>Export up to 2000 plants per month</div>
              <div style={{textAlign:"center"}}>$200 per month</div>
                    <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToBasic}>Select</Button>
              </Grid>  
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{textAlign:"center"}}>Standard</div>
              <div style={{textAlign:"center"}}>Export up to 5000 plants per month</div>
              <div style={{textAlign:"center"}}>$475 per month</div>
                    <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToStandard}>Select</Button>
              </Grid> 
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{textAlign:"center"}}>Premium</div>
              <div style={{textAlign:"center"}}>Export up to 10000 plants per month</div>
              <div style={{textAlign:"center"}}>$800 per month</div>
                    <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToPremium}>Select</Button>
              </Grid> 
              </Grid>
          </div>
          }
</div>
    
	);
}

export default ChangeSubscriptionForm;
