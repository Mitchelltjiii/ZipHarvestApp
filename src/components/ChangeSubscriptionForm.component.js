import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {isMobile} from 'react-device-detect';
import pricingImage1 from '../pricing1.svg';
import pricingImage2 from '../pricing2.svg';
import pricingImage3 from '../pricing3.svg';
import SwipeableViews from 'react-swipeable-views';
import leafImage1 from '../leafImage1.png';
import leafImage2 from '../leafImage2.png';
import leafImage3 from '../leafImage3.png';

function ChangeSubscriptionForm({userID,reloadSubscription,getSubscriptionType}) {

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

    async function goToProduct(lookup_key){
      const response = await fetch(`/create-checkout-session/${lookup_key}`, {
            method: 'POST',
            mode: 'no-cors'
      });
      const json = await response.json();
    
      updateUserSessionID(user.username,json.id,lookup_key);
    
      window.location.replace(json.url);
    }
    
    async function updateUserSessionID(username,id,lookup_key){
      fetch(`/user/updateUserSessionID/${username}/${id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
      }).then(function(response) {
        let newPriceID = "price_1KnQdFGBqcLC10HccckrH60k"; //basic
        if(lookup_key === "standard"){
          newPriceID = "price_1KnQdFGBqcLC10HcWLPXi2Ls";
        }else if(lookup_key === "premium"){
          newPriceID = "price_1KnQdFGBqcLC10HcgFmdFEH4";
        }
        updateSubscription(newPriceID);
      }).then(function(data) {
      });
    }

    const handleGoToBasic = () => {
        if(JSON.stringify(subscription) !== "[]"){
            goToProduct("test");
        }
    }
      
      const handleGoToStandard = () => {
        if(JSON.stringify(subscription) !== "[]"){
            goToProduct("test2");
        }
      }
      
      const handleGoToPremium = () => {
        if(JSON.stringify(subscription) !== "[]"){
            goToProduct("premium");
        }      
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

      const ProductDisplay = () => (
        <div id="product-display" style={{position:"absolute",top:"75px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center', backgroundColor:"#eeeeee"}}>
                <Grid
                container
                direction="column"
                  justifyContent="center"
                alignItems="center"
              >
                <div style={{width:"900px",height:"450px",borderRadius:5,backgroundColor:"#eeeeee"}}>
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
                  style={{marginLeft:"50px",marginRight:"10px",backgroundColor:"#ffffff"}}
                    >
                    <div style={{marginTop:"40px",textAlign:"center",fontWeight:"bold"}}>Basic</div>
                    <img alt="leafImage1" src={leafImage1} style={{height:leafImageHeight,marginTop:"20px",marginBottom:"15px"}}/>
                    <img alt="pricingImage" src={pricingImage1} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
                    <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#5b5b5b"}}>Billed monthly</div>
                    <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                    >
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
                    <div style={{marginTop:"25px",textAlign:"center"}}>Export up to 2000</div>
                    <div style={{marginTop:"2px",textAlign:"center"}}>plants per month</div>
                    </Grid>
                    </Grid>
                    </Grid>
                    <Button disabled={basicDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"10px",backgroundColor:"#047AF6"}} onClick={handleGoToBasic}>{basicText}</Button>
                    <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b",marginBottom:"20px"}}>or see more features</div>
                    </Grid>
                    <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{marginLeft:"50px",marginRight:"10px",backgroundColor:"#ffffff"}}
                    >
                    <div style={{marginTop:"40px",textAlign:"center",fontWeight:"bold"}}>Standard</div>
                    <img alt="leafImage2" src={leafImage2} style={{height:leafImageHeight,marginTop:"20px",marginBottom:"15px"}}/>
                    <img alt="pricingImage" src={pricingImage2} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
                    <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#5b5b5b"}}>Billed monthly</div>
                    <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                    >
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
                    <div style={{marginTop:"25px",textAlign:"center"}}>Export up to 5000</div>
                    <div style={{marginTop:"2px",textAlign:"center"}}>plants per month</div>
                    </Grid>
                    </Grid>
                    </Grid>
                    <Button disabled={standardDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",marginRight:"5px",marginLeft:"5px",
                    marginTop:"25px",marginBottom:"10px",backgroundColor:"#047AF6"}} onClick={handleGoToStandard}>{standardText}</Button>
                    <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b",marginBottom:"20px"}}>or see more features</div>
                    </Grid>
                    <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{marginLeft:"50px",marginRight:"10px",backgroundColor:"#ffffff"}}
                    >
                    <div style={{marginTop:"40px",textAlign:"center",fontWeight:"bold"}}>Premium</div>
                    <img alt="leafImage3" src={leafImage3} style={{height:leafImageHeight,marginTop:"20px",marginBottom:"15px"}}/>
                    <img alt="pricingImage" src={pricingImage3} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
                    <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#5b5b5b"}}>Billed monthly</div>
                    <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                    >
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
                    <div style={{marginTop:"25px",textAlign:"center"}}>Export up to 10,000</div>
                    <div style={{marginTop:"2px",textAlign:"center"}}>plants per month</div>
                    </Grid>
                    </Grid>
                    </Grid>
                    <Button disabled={premiumDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",marginRight:"5px",marginLeft:"5px",
                    marginTop:"25px",marginBottom:"10px",backgroundColor:"#047AF6"}} onClick={handleGoToPremium}>{premiumText}</Button>
                    <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b",marginBottom:"20px"}}>or see more features</div>
                    </Grid> 
                    </Grid>
                </div> 
                </Grid>
      </div>
      );
      
      
      const ProductDisplayMobile = () => (
        <div id="product-display-mobile" style={{width:"100%",height:"100%"}}>
             <SwipeableViews>
                <div style={Object.assign({}, styles.slide, styles.slide1)}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                    style={{width:formWidth}}
                    wrap="nowrap"
                    >
                    <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#000000"}}>Basic</div>
                    <img alt="leafImage1" src={leafImage1} style={{height:leafImageHeight,marginTop:"10px",marginBottom:"10px"}}/>
                    <img alt="pricingImage" src={pricingImage1} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
                    <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  wrap="nowrap"
                  style={{marginTop:"10px"}}
                    >
                    <div style={{marginRight:"30px",fontWeight:"bold",fontSize:"50px"}}>&#8592;</div>
                    <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b"}}>Billed monthly</div>
                    <div style={{marginLeft:"30px",fontWeight:"bold",color:"#000000",fontSize:"50px"}}>&#8594;</div>
                    </Grid>
                  <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                    >
                    <div style={{marginTop:"25px",textAlign:"center",color:"#000000"}}>Export up to 2000</div>
                    <div style={{marginTop:"2px",textAlign:"center",color:"#000000"}}>plants per month</div>
                    </Grid>
                    <Button disabled={basicDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"10px",backgroundColor:"#047AF6"}} onClick={handleGoToBasic}>{basicText}</Button>
                    <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b",marginBottom:"15px"}}>or see more features</div>
                    </Grid> 
                </div>
                <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                    style={{width:formWidth}}
                    wrap="nowrap"
                    >
                    <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#000000"}}>Standard</div>
                    <img alt="leafImage2" src={leafImage2} style={{height:leafImageHeight,marginTop:"10px",marginBottom:"10px"}}/>
                    <img alt="pricingImage" src={pricingImage2} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
                    <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  wrap="nowrap"
                  style={{marginTop:"10px"}}
                    >
                    <div style={{marginRight:"30px",fontWeight:"bold",color:"#000000",fontSize:"50px"}}>&#8592;</div>
                    <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b"}}>Billed monthly</div>
                    <div style={{marginLeft:"30px",fontWeight:"bold",color:"#000000",fontSize:"50px"}}>&#8594;</div>
                    </Grid>
                  <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                    >
                    <div style={{marginTop:"25px",textAlign:"center",color:"#000000"}}>Export up to 5000</div>
                    <div style={{marginTop:"2px",textAlign:"center",color:"#000000"}}>plants per month</div>
                    </Grid>
                    <Button disabled={standardDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",marginRight:"5px",marginLeft:"5px",
                    marginTop:"25px",marginBottom:"10px",backgroundColor:"#047AF6"}} onClick={handleGoToStandard}>{standardText}</Button>
                    <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b",marginBottom:"15px"}}>or see more features</div>
                    </Grid>
                </div>
                <div style={Object.assign({}, styles.slide, styles.slide3)}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                    style={{width:formWidth}}
                    wrap="nowrap"
                    >
                    <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#000000"}}>Premium</div>
                    <img alt="leafImage3" src={leafImage3} style={{height:leafImageHeight,marginTop:"10px",marginBottom:"10px"}}/>
                    <img alt="pricingImage" src={pricingImage3} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
                    <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  wrap="nowrap"
                  style={{marginTop:"10px"}}
                    >
                    <div style={{marginRight:"30px",fontWeight:"bold",color:"#000000",fontSize:"50px"}}>&#8592;</div>
                    <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b"}}>Billed monthly</div>
                    <div style={{marginLeft:"30px",fontWeight:"bold",fontSize:"50px"}}>&#8594;</div>
                    </Grid>
                  <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                    >
                    <div style={{marginTop:"25px",textAlign:"center",color:"#000000"}}>Export up to 10,000</div>
                    <div style={{marginTop:"2px",textAlign:"center",color:"#000000"}}>plants per month</div>
                    </Grid>
                    <Button disabled={premiumDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",marginRight:"5px",marginLeft:"5px",
                    marginTop:"25px",marginBottom:"10px",backgroundColor:"#047AF6"}} onClick={handleGoToPremium}>{premiumText}</Button>
                    <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b",marginBottom:"15px"}}>or see more features</div>
                    </Grid>
                </div>
              </SwipeableViews>
        </div>
      );

      if(isMobile){
        return <ProductDisplayMobile />;
      }else{
        return <ProductDisplay />;
      }
}

export default ChangeSubscriptionForm;
