import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {isMobile} from 'react-device-detect';

function ChangeSubscriptionForm({setCurrentPage,userID,reloadSubscription,getSubscriptionType}) {

    const [subscription,setSubscription] = React.useState([]);
    let basicText = "Select";
    let standardText = "Select";
    let premiumText = "Select";
    let subType = getSubscriptionType();
    if(subType === "basic"){
      basicText = "Current";
    }else if(subType === "standard"){
      standardText = "Current";
    }else if(subType === "premium"){
      premiumText = "Current";
    }

    let basicDisabled = (basicText === "Current");
    let standardDisabled = (standardText === "Current");
    let premiumDisabled = (premiumText === "Current");

    let formWidth = "450px";
    let formHeight = "250px";

    if(isMobile){
      formWidth = "100%";
    }

    const handleGoToBasic = () => {
        if(JSON.stringify(subscription) !== "[]"){
            goToProduct("basic");
        }
    }
      
      const handleGoToStandard = () => {
        if(JSON.stringify(subscription) !== "[]"){
            goToProduct("standard");
        }
      }
      
      const handleGoToPremium = () => {
        if(JSON.stringify(subscription) !== "[]"){
            goToProduct("premium");
        }      
    }
    const goToProduct = (subtype) => {
        let newPriceID = "price_1JwFPlGBqcLC10HcdJ30adu9"; //basic
        if(subtype === "standard"){
          newPriceID = "price_1JwFPlGBqcLC10Hc071vnzue";
        }else if(subtype === "premium"){
          newPriceID = "price_1JwFPlGBqcLC10HcrLJD4Vwx";
        }
        updateSubscription(newPriceID);
    }

    const updateSubscription = async(newPriceID) => {
        const response = await fetch(`/update-subscription/${subscription.id}/${newPriceID}`);
        const json = await response.json();
        if(json !== undefined){
          setSubscription(json);
          reloadSubscription();
        }
    }

      if(JSON.stringify(subscription) === "[]"){
        getSubId();
      }
      


    async function getSubId(){
        const response = await fetch(`/get-subid/${userID}`);
        const json = await response.json();
        if(json !== undefined){
            getSubscription(json);
        }
      }
  
      async function getSubscription(subId){
        const response = await fetch(`/get-subscription/${subId}`);
        const json = await response.json();
        if(json !== undefined){
            setSubscription(json);
          }
      }

	return (
<div id="product-display" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
          {isMobile ?
          <div style={{width:formWidth,height:formHeight,paddingTop:"40px",margin:"auto"}}>
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center">
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
              <div style={{textAlign:"center"}}>Export up to 2000</div>
              <div style={{textAlign:"center"}}>plants per month</div>
              <div style={{textAlign:"center"}}>$200 per month</div>
                    <Button disabled={basicDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToBasic}>{basicText}</Button>
              </Grid>  
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{textAlign:"center"}}>Standard</div>
              <div style={{textAlign:"center"}}>Export up to 5000</div>
              <div style={{textAlign:"center"}}>plants per month</div>
              <div style={{textAlign:"center"}}>$475 per month</div>
                    <Button disabled={standardDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToStandard}>{standardText}</Button>
              </Grid> 
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{textAlign:"center"}}>Premium</div>
              <div style={{textAlign:"center"}}>Export up to 10000</div>
              <div style={{textAlign:"center"}}>plants per month</div>
              <div style={{textAlign:"center"}}>$800 per month</div>
                    <Button disabled={premiumDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToPremium}>{premiumText}</Button>
              </Grid> 
              </Grid>
              </Grid>
          </div> :
          <div style={{width:"650px",height:"400px",border:"1px solid #d7d7d7",borderRadius:5,paddingTop:"100px",margin:"auto"}}>
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center">
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
              <div style={{textAlign:"center"}}>Export up to 2000</div>
              <div style={{textAlign:"center"}}>plants per month</div>              
              <div style={{textAlign:"center"}}>$200 per month</div>
                    <Button disabled={basicDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToBasic}>{basicText}</Button>
              </Grid>  
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{textAlign:"center"}}>Standard</div>
              <div style={{textAlign:"center"}}>Export up to 5000</div>
              <div style={{textAlign:"center"}}>plants per month</div>
              <div style={{textAlign:"center"}}>$475 per month</div>
                    <Button disabled={standardDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToStandard}>{standardText}</Button>
              </Grid> 
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{textAlign:"center"}}>Premium</div>
              <div style={{textAlign:"center"}}>Export up to 10000</div>
              <div style={{textAlign:"center"}}>plants per month</div>
              <div style={{textAlign:"center"}}>$800 per month</div>
                    <Button disabled={premiumDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToPremium}>{premiumText}</Button>
              </Grid> 
              </Grid>
              </Grid>
          </div>
          }
</div>
    
	);
}

export default ChangeSubscriptionForm;
