import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {isMobile} from 'react-device-detect';
import pricingImage1 from '../pricing1.svg';
import pricingImage2 from '../pricing2.svg';
import pricingImage3 from '../pricing3.svg';
import SwipeableViews from 'react-swipeable-views';
import leafImage2 from '../leafImage2.svg';
import leafImage3 from '../leafImage3.svg';

function ChangeSubscriptionForm({userID,reloadSubscription,getSubscriptionType}) {
  let testMode = false;
  const styles = {
    slide: {
      height: '100%',
      width: '100%',
      color: '#fff',
    },
    slide1: {
      background: '#FFFFFF',
    },
    slide2: {
      background: '#FFFFFF',
    },
    slide3: {
      background: '#FFFFFF',
    },
  };
  
  const handleGoToHome = () => {
    window.location.replace("https://www.zipharvest.app/");
  }  

  let green = "#729d3f";

  var seeMoreFeatures2 = <a href="https://flora-sol.com/pricing#d793dccc-e5f2-4f89-81ea-922233de0cc0" style={{cursor:"pointer",color:"#000000",textDecoration:"underline",letterSpacing:"1"}}>LEARN MORE</a>;
  var seeMoreFeatures3 = <a href="https://flora-sol.com/pricing#d4b43337-6bf9-41e5-a9ae-3c5743e62e40" style={{cursor:"pointer",color:"#000000",textDecoration:"underline",letterSpacing:"1"}}>LEARN MORE</a>;


  const [success,setSuccess] = React.useState("");
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

    let formWidth = "450px";
    let formHeight = "250px";
    let pricingImageHeight = "50px";
    let pricingImageWidth = "150px";
    let leafImageHeight = "100px";

    if(isMobile){
      formWidth = "100%";
    }

    async function goToProduct(lookup_key){
      let newPriceID = "price_1KnQdpGBqcLC10HcMhAEuBbM"; //basic
      if(testMode){
        if(lookup_key === "basic"){
          newPriceID = "price_1JwFPlGBqcLC10HcdJ30adu9";
        }else if(lookup_key === "standard"){
          newPriceID = "price_1JwFPlGBqcLC10Hc071vnzue";
        }else if(lookup_key === "premium"){
          newPriceID = "price_1JwFPlGBqcLC10HcrLJD4Vwx";
        }
      }else{
        if(lookup_key === "standard"){
          newPriceID = "price_1KrDrOGBqcLC10Hcic8ZAGNk";
        }else if(lookup_key === "premium"){
          newPriceID = "price_1KnQdFGBqcLC10HcgFmdFEH4";
        }
      }
        updateSubscription(newPriceID);
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

    const updateSubscription = async(newPriceID) => {
      console.log("Sub id: " + subscription.id);
      console.log("newPriceID: " + newPriceID);
        const response = await fetch(`/update-subscription/${subscription.id}/${newPriceID}`);
        const json = await response.json();
        if(json !== undefined){
          setSubscription(json);
          reloadSubscription();
          setSuccess("Yes");
        }else{
          setSuccess("No");
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

      let backgroundColor = "#eeeeee";
      if(success==="Yes"){
        backgroundColor = "#ffffff";
      }

      const ProductDisplay = () => (
        <div id="product-display" style={{position:"absolute",top:"35px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center', backgroundColor:"#eeeeee"}}>
                {(success==="Yes") ?
          <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
          <Grid
      container
      direction="column"
        justifyContent="center"
      alignItems="center"
    >
          <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center"}}>Success! Your subscription has been updated.</div>
          <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
          </Grid>
        </div>
          :   
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
                    {(subType === "basic") ? 
                    <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{marginLeft:"50px",marginRight:"10px",backgroundColor:"#ffffff"}}
                    >
                    <div style={{marginTop:"40px",textAlign:"center",fontWeight:"bold",fontSize:"29px"}}>Standard</div>
                    <img alt="leafImage1" src={leafImage2} style={{height:leafImageHeight,marginTop:"20px",marginBottom:"15px"}}/>
                    <img alt="pricingImage" src={pricingImage2} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
                    <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#5b5b5b",fontSize:"18px"}}>Billed monthly</div>
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
                    <div style={{marginTop:"25px",textAlign:"center",fontSize:"23px",fontWeight:"bold"}}>Export up to 5,000</div>
                    <div style={{marginTop:"2px",textAlign:"center",fontSize:"23px",fontWeight:"bold"}}>plants per month</div>
                    </Grid>
                    </Grid>
                    </Grid>
                    <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToStandard}>Start a free trial</Button>
                    <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"20px",fontSize:"11px",fontFamily:"Arial, Helvetica, serif",letterSpacing:2}}>{seeMoreFeatures2}</div>
                    </Grid>
                    : null}
                    <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{marginLeft:"50px",marginRight:"10px",backgroundColor:"#ffffff"}}
                    >
                    <div style={{marginTop:"40px",textAlign:"center",fontWeight:"bold",fontSize:"29px"}}>Premium</div>
                    <img alt="leafImage1" src={leafImage3} style={{height:leafImageHeight,marginTop:"20px",marginBottom:"15px"}}/>
                    <img alt="pricingImage" src={pricingImage3} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
                    <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#5b5b5b",fontSize:"18px"}}>Billed monthly</div>
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
                    <div style={{marginTop:"25px",textAlign:"center",fontSize:"23px",fontWeight:"bold"}}>Export up to 10,000</div>
                    <div style={{marginTop:"2px",textAlign:"center",fontSize:"23px",fontWeight:"bold"}}>plants per month</div>
                    </Grid>
                    </Grid>
                    </Grid>
                    <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToPremium}>Start a free trial</Button>
                    <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"20px",fontSize:"11px",fontFamily:"Arial, Helvetica, serif",letterSpacing:2}}>{seeMoreFeatures3}</div>
                    </Grid>
                    </Grid>
                </div> 
                </Grid>
}
      </div>
      );
      
      
      const ProductDisplayMobile = () => (
        <div id="product-display-mobile" style={{width:"100%",height:"100%"}}>
          {(success==="Yes") ?
          <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Grid
            container
            direction="column"
              justifyContent="center"
              alignItems="center"
          >
                <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center"}}>Success! Your subscription has been updated.</div>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                </Grid>
                </div>
          : 
          <div>
            {(subType === "basic") ? 
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
              <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#000000",fontSize:"29px"}}>Standard</div>
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
              <div style={{marginRight:"70px",fontWeight:"bold",fontSize:"50px"}}>&#10094;</div>
              <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b",fontSize:"18px",marginTop:"2px"}}>Billed monthly</div>
              <div style={{marginLeft:"70px",fontWeight:"bold",color:green,fontSize:"50px"}}>&#10095;</div>
              </Grid>
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
              >
              <div style={{marginTop:"25px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>Export up to 5,000</div>
              <div style={{marginTop:"2px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>plants per month</div>
              </Grid>
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"15px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToStandard}>Start a free trial</Button>
              <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"15px",fontSize:"14px", fontFamily:"Arial, Helvetica, serif",letterSpacing:2}}>{seeMoreFeatures2}</div>
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
              <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#000000",fontSize:"29px"}}>Premium</div>
              <img alt="leafImage1" src={leafImage3} style={{height:leafImageHeight,marginTop:"10px",marginBottom:"10px"}}/>
              <img alt="pricingImage" src={pricingImage3} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
              <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            wrap="nowrap"
            style={{marginTop:"10px"}}
              >
              <div style={{marginRight:"70px",fontWeight:"bold",color:green,fontSize:"50px"}}>&#10094;</div>
              <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b",fontSize:"18px",marginTop:"2px"}}>Billed monthly</div>
              <div style={{marginLeft:"70px",fontWeight:"bold",fontSize:"50px"}}>&#10095;</div>
              </Grid>
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
              >
              <div style={{marginTop:"25px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>Export up to 10,000</div>
              <div style={{marginTop:"2px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>plants per month</div>
              </Grid>
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"15px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToPremium}>Start a free trial</Button>
              <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"15px",fontSize:"14px", fontFamily:"Arial, Helvetica, serif",letterSpacing:2}}>{seeMoreFeatures3}</div>
              </Grid>
          </div>
        </SwipeableViews>
        :
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
              style={{width:formWidth}}
              wrap="nowrap"
              >
              <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#000000",fontSize:"29px"}}>Premium</div>
              <img alt="leafImage1" src={leafImage3} style={{height:leafImageHeight,marginTop:"10px",marginBottom:"10px"}}/>
              <img alt="pricingImage" src={pricingImage3} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
              <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            wrap="nowrap"
            style={{marginTop:"10px"}}
              >
              <div style={{marginRight:"70px",fontWeight:"bold",color:green,fontSize:"50px"}}>&#10094;</div>
              <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b",fontSize:"18px",marginTop:"2px"}}>Billed monthly</div>
              <div style={{marginLeft:"70px",fontWeight:"bold",fontSize:"50px"}}>&#10095;</div>
              </Grid>
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
              >
              <div style={{marginTop:"25px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>Export up to 10,000</div>
              <div style={{marginTop:"2px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>plants per month</div>
              </Grid>
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"15px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToPremium}>Start a free trial</Button>
              <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"15px",fontSize:"14px", fontFamily:"Arial, Helvetica, serif",letterSpacing:2}}>{seeMoreFeatures3}</div>
              </Grid>
               }
          </div>
        }
        </div>
      );
/*
      const ProductDisplay = () => (
        <div id="product-display" style={{position:"absolute",top:"30px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center', backgroundColor:backgroundColor}}>
          {(success==="Yes") ?
          <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
          <Grid
      container
      direction="column"
        justifyContent="center"
      alignItems="center"
    >
          <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center"}}>Success! Your subscription has been updated.</div>
          <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
          </Grid>
        </div>
          : 
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
                      {(subType === "basic") ? 
                      <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      style={{marginLeft:"50px",marginRight:"10px",backgroundColor:"#ffffff",maxWidth:"400px"}}
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
                        : null}
                    <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{marginLeft:"50px",marginRight:"10px",backgroundColor:"#ffffff",maxWidth:"400px"}}
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
        }
      </div>
      );
      
      
      const ProductDisplayMobile = () => (
        <div id="product-display-mobile" style={{width:"100%",height:"100%"}}>
          {(success==="Yes") ?
          <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Grid
            container
            direction="column"
              justifyContent="center"
              alignItems="center"
          >
                <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center"}}>Success! Your subscription has been updated.</div>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                </Grid>
                </div>
          : 
          <div>
            {(subType === "basic") ? 
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
              <div style={{marginTop:"25px",textAlign:"center",color:"#000000"}}>Export up to 5000</div>
              <div style={{marginTop:"2px",textAlign:"center",color:"#000000"}}>plants per month</div>
              </Grid>
              <Button disabled={standardDisabled} variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",marginRight:"5px",marginLeft:"5px",
              marginTop:"25px",marginBottom:"10px",backgroundColor:"#047AF6"}} onClick={handleGoToStandard}>{standardText}</Button>
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
        :
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
               }
          </div>
        }   
        </div>
      );
*/
      if(isMobile){
        return <ProductDisplayMobile />;
      }else{
        return <ProductDisplay />;
      }
}

export default ChangeSubscriptionForm;
