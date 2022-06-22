import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {isMobile} from 'react-device-detect';
import pricingImage1 from '../pricing1.svg';
import pricingImage2 from '../pricing2.svg';
import pricingImage3 from '../pricing3.svg';
import pricingImage4 from '../pricing3.svg';
import SwipeableViews from 'react-swipeable-views';
import leafImage1 from '../leafImage0.svg';
import leafImage2 from '../leafImage1.svg';
import leafImage3 from '../leafImage2.svg';
import leafImage4 from '../leafImage3.svg';


export default function StripeForm({verCode,userFromUrl,userFromLogin,setCurrentPage,getOffer,setOffer,newUsername}) {

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

  let green = "#729d3f";

  var seeMoreFeatures = <a href="https://flora-sol.com/pricing#b04aad02-7057-4a2b-97d8-2e361e3cd289" style={{cursor:"pointer",color:"#000000",textDecoration:"underline",letterSpacing:"1"}}>LEARN MORE</a>;
  var seeMoreFeatures2 = <a href="https://flora-sol.com/pricing#4234583d-852b-4753-b64e-c6e17a520e78" style={{cursor:"pointer",color:"#000000",textDecoration:"underline",letterSpacing:"1"}}>LEARN MORE</a>;
  var seeMoreFeatures3 = <a href="https://flora-sol.com/pricing#d793dccc-e5f2-4f89-81ea-922233de0cc0" style={{cursor:"pointer",color:"#000000",textDecoration:"underline",letterSpacing:"1"}}>LEARN MORE</a>;
  var seeMoreFeatures4 = <a href="https://flora-sol.com/pricing#d4b43337-6bf9-41e5-a9ae-3c5743e62e40" style={{cursor:"pointer",color:"#000000",textDecoration:"underline",letterSpacing:"1"}}>LEARN MORE</a>;

  /*slide1: {
      background: '#FEA900',
    },
    slide2: {
      background: '#B3DC4A',
    },
    slide3: {
      background: '#6AC0FF',
    }, */

  let formWidth = "450px";
  let formHeight = "250px";
  let pricingImageHeight = "50px";
  let pricingImageWidth = "150px";
  let leafImageHeight = "100px";

  if(isMobile){
    formWidth = "100%";
  }

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

  const handleGoToHome = () => {
    setOffer(false);
    window.location.replace("https://www.zipharvest.app/");
  }  

const [expired,setExpired] = React.useState(false);

let offer = getOffer();

const ProductDisplay = () => (
  <div id="product-display" style={{position:"absolute",top:"75px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center', backgroundColor:"#eeeeee"}}>
          <Grid
          container
          direction="column"
            justifyContent="center"
          alignItems="center"
        >
          <div style={{width:"80%",height:"70%",borderRadius:5,backgroundColor:"#eeeeee"}}>
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
            style={{marginLeft:"10px",marginRight:"20px",backgroundColor:"#ffffff"}}
			        >
              <div style={{marginTop:"40px",textAlign:"center",fontWeight:"bold",fontSize:"29px"}}>Basic</div>
              <img alt="leafImage1" src={leafImage1} style={{height:leafImageHeight,marginTop:"20px",marginBottom:"15px"}}/>
              <img alt="pricingImage" src={pricingImage1} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
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
              <div style={{marginTop:"25px",textAlign:"center",fontSize:"23px",fontWeight:"bold"}}>Export up to 625</div>
              <div style={{marginTop:"2px",textAlign:"center",fontSize:"23px",fontWeight:"bold"}}>plants per month</div>
              </Grid>
              </Grid>
              </Grid>
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToBasic}>Buy Now</Button>
              {offer ? 
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToBasicOutdoor}>3 Months 50% OFF</Button>
              :<Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToBasicYear}>Get One Year 50% OFF</Button>
              }
              <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"20px",fontSize:"11px",fontFamily:"Arial, Helvetica, sans-serif",letterSpacing:2}}>{seeMoreFeatures}</div>
              </Grid>
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
            style={{marginLeft:"20px",marginRight:"20px",backgroundColor:"#ffffff"}}
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
              <div style={{marginTop:"25px",textAlign:"center",fontSize:"23px",fontWeight:"bold"}}>Export up to 1,250</div>
              <div style={{marginTop:"2px",textAlign:"center",fontSize:"23px",fontWeight:"bold"}}>plants per month</div>
              </Grid>
              </Grid>
              </Grid>
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToStandard}>Buy Now</Button>
              {offer ? 
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToStandardOutdoor}>Get 3 Months 50% OFF</Button>
              :<Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToStandardYear}>Get One Year 50% OFF</Button>
              }
              <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"20px",fontSize:"11px",fontFamily:"Arial, Helvetica, sans-serif",letterSpacing:2}}>{seeMoreFeatures2}</div>
              </Grid>
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
            style={{marginLeft:"20px",marginRight:"20px",backgroundColor:"#ffffff"}}
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
              <div style={{marginTop:"25px",textAlign:"center",fontSize:"23px",fontWeight:"bold"}}>Export up to 2,500</div>
              <div style={{marginTop:"2px",textAlign:"center",fontSize:"23px",fontWeight:"bold"}}>plants per month</div>
              </Grid>
              </Grid>
              </Grid>
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToPremium}>Buy Now</Button>
              {offer ? 
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToPremiumOutdoor}>Get 3 Months 50% OFF</Button>
              :<Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToPremiumYear}>Get One Year 50% OFF</Button>
              }
              <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"20px",fontSize:"11px",fontFamily:"Arial, Helvetica, sans-serif",letterSpacing:2}}>{seeMoreFeatures3}</div>
              </Grid>
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
            style={{marginLeft:"20px",marginRight:"10px",backgroundColor:"#ffffff"}}
			        >
              <div style={{marginTop:"40px",textAlign:"center",fontWeight:"bold",fontSize:"29px"}}>Deluxe</div>
              <img alt="leafImage1" src={leafImage4} style={{height:leafImageHeight,marginTop:"20px",marginBottom:"15px"}}/>
              <img alt="pricingImage" src={pricingImage4} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
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
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToDeluxe}>Buy Now</Button>
              {offer ? 
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToDeluxeOutdoor}>Get 3 Months 50% OFF</Button>
              :<Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToDeluxeYear}>Get One Year 50% OFF</Button>
              }
              <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"20px",fontSize:"11px",fontFamily:"Arial, Helvetica, sans-serif",letterSpacing:2}}>{seeMoreFeatures4}</div>
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
              <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#000000",fontSize:"29px"}}>Basic</div>
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
              <div style={{marginTop:"25px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>Export up to 625</div>
              <div style={{marginTop:"2px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>plants per month</div>
              </Grid>
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"15px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToBasic}>Buy Now</Button>
              {offer ? 
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToBasicOutdoor}>Get 3 Months 50% OFF</Button>
              :<Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToBasicYear}>Get One Year 50% OFF</Button>
              }
              <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"15px",fontSize:"14px", fontFamily:"Arial, Helvetica, sans-serif",letterSpacing:2}}>{seeMoreFeatures}</div>
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
              <div style={{marginRight:"70px",fontWeight:"bold",color:green,fontSize:"50px"}}>&#10094;</div>
              <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b",fontSize:"18px",marginTop:"2px"}}>Billed monthly</div>
              <div style={{marginLeft:"70px",fontWeight:"bold",color:green,fontSize:"50px"}}>&#10095;</div>
              </Grid>
            <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{marginTop:"25px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>Export up to 1,250</div>
              <div style={{marginTop:"2px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>plants per month</div>
              </Grid>
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"15px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToStandard}>Buy Now</Button>
              {offer ? 
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToStandardOutdoor}>Get 3 Months 50% OFF</Button>
              :<Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToStandardYear}>Get One Year 50% OFF</Button>
              }
              <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"15px",fontSize:"14px", fontFamily:"Arial, Helvetica, sans-serif",letterSpacing:2}}>{seeMoreFeatures2}</div>
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
              <div style={{marginLeft:"70px",fontWeight:"bold",color:green,fontSize:"50px"}}>&#10095;</div>
              </Grid>
            <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{marginTop:"25px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>Export up to 2,500</div>
              <div style={{marginTop:"2px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>plants per month</div>
              </Grid>
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"15px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToPremium}>Buy Now</Button>
              {offer ? 
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToPremiumOutdoor}>Get 3 Months 50% OFF</Button>
              :<Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToPremiumYear}>Get One Year 50% OFF</Button>
              }              
              <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"15px",fontSize:"14px", fontFamily:"Arial, Helvetica, sans-serif",letterSpacing:2}}>{seeMoreFeatures3}</div>
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
              <div style={{marginTop:"20px",textAlign:"center",fontWeight:"bold",color:"#000000",fontSize:"29px"}}>Deluxe</div>
              <img alt="leafImage1" src={leafImage4} style={{height:leafImageHeight,marginTop:"10px",marginBottom:"10px"}}/>
              <img alt="pricingImage" src={pricingImage4} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
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
              <div style={{marginTop:"25px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>Export up to 5,000</div>
              <div style={{marginTop:"2px",textAlign:"center",color:"#000000",fontSize:"23px",fontWeight:"bold"}}>plants per month</div>
              </Grid>
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"60px",marginRight:"5px",marginLeft:"5px",marginTop:"25px",marginBottom:"15px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToDeluxe}>Buy Now</Button>
              {offer ? 
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToDeluxeOutdoor}>Get 3 Months 50% OFF</Button>
              :<Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",height:"50px",marginRight:"5px",marginLeft:"5px",marginTop:"5px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF"}} onClick={handleGoToDeluxeYear}>Get One Year 50% OFF</Button>
              }
              <div style={{textAlign:"center",color:"#5b5b5b",marginBottom:"15px",fontSize:"14px", fontFamily:"Arial, Helvetica, sans-serif",letterSpacing:2}}>{seeMoreFeatures4}</div>
              </Grid>
          </div>
        </SwipeableViews>
  </div>
);

/*<Grid
				    container
				    direction="row"
            justifyContent="center"
				    alignItems="center"
              wrap="nowrap"
              style={{height:"50px",marginBottom:"5px"}}
			        >
                <div style={{fontSize:"18px",fontWeight:"bold",height:"50px",color:"#000000"}}>SWIPE FOR MORE OPTIONS</div>
                </Grid> */

const handleLeft = () => {
}

const handleRight = () => {
}

const handleGoToBasicYear = () => {
  goToProduct("basicyear");
}

const handleGoToStandardYear = () => {
  goToProduct("standardyear");
}

const handleGoToPremiumYear = () => {
  goToProduct("premiumyear");
}

const handleGoToDeluxeYear = () => {
  goToProduct("deluxeyear");
}


const handleGoToBasicOutdoor = () => {
  goToProduct("basicoutdoor");
}

const handleGoToStandardOutdoor = () => {
  goToProduct("standardoutdoor");
}

const handleGoToPremiumOutdoor = () => {
  goToProduct("premiumoutdoor");
}

const handleGoToDeluxeOutdoor = () => {
  goToProduct("deluxeoutdoor");
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

const handleGoToDeluxe = () => {
  goToProduct("deluxe");
}

async function goToProduct(lookup_key){
  const response = await fetch(`/create-checkout-session/${lookup_key}`, {
        method: 'POST',
        mode: 'no-cors'
  });
  const json = await response.json();

  console.log("gtp: a");
  if(user.username !== null && user.username !== ""){
    console.log("gtp: b");
    updateUserSessionID(user.username,json.id);
  }else{
    console.log("gtp: newUsername: " + newUsername + ", Lookupkey: " + lookup_key);
    if((""+lookup_key).includes("outdoor")){
      console.log("gtp: c");
      updateUserSessionID(newUsername,(lookup_key+""));
    }else{
      console.log("gtp: d");
      updateUserSessionID(newUsername,json.id);
    }
  }
  window.location.replace(json.url);
}

async function updateUserSessionID(username,id){
  fetch(`/user/updateUserSessionID/${username}/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
  }).then(function(response) {
  }).then(function(data) {
  });
}

async function getSessionID(username){
  const response = await fetch(`/get-sessionid/${username}`);
    const json = await response.json();
    if(json !== undefined){
      let sessionid = JSON.stringify(json);
      sessionid = sessionid.substring(1,sessionid.length-1);
      console.log("getSessionID sessionID: " + sessionid);

      fetch(`/user/subid/${sessionid}/${username}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
  }).then(function(response) {
    console.log("Get session id resp: " + response);
  }).then(function(data) {
    console.log("Get session id data: " + data);
    setUserUpdated(true);
  });
    }  
}

async function updateUserSubId(username,subid){
  console.log("Update sub id: " + subid);
  if(subid===null){
    console.log("subid is null");
    getSessionID(username);
  }else{
    fetch(`/user/subid/${subid}/${username}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
}).then(function(response) {
}).then(function(data) {
  setUserUpdated(true);
});
  }
}

async function updateUserVerified(username){
  let today = JSON.stringify((new Date()).getTime());
  /*if(!username.includes("Mitchell")){
    today = "0";
  }*/

  fetch(`/user/verified/${username}/${today}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
  }).then(function(response) {
  }).then(function(data) {
  });
}

async function updateUserVerificationCode(username,newCode){
  let verCodeTime = JSON.stringify((new Date()).getTime());

  fetch(`/user/updateVerificationCode/${username}/${newCode}/${verCodeTime}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
  }).then(function(response) {
  }).then(function(data) {
  });
}

const SuccessDisplay = ({ seshId }) => {
  if(session === null || session === [] || session === undefined || JSON.stringify(session) === "[]"){
    getSession(sessionId);
  }else{
    if(user.username !== undefined && subscription.id !== undefined && !userUpdated){
      updateUserSubId(user.username,subscription.id);
    }  
  }


  return (
    <div id="Success Display" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {isMobile ?
        <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Grid
            container
            direction="column"
              justifyContent="center"
            alignItems="center"
          >
                <div style={{textAlign:"center"}}>Congrats, your Zipharvest subscription has been created!</div>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                </Grid>
                </div>
                :
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Grid
            container
            direction="column"
              justifyContent="center"
            alignItems="center"
          >
                <div style={{textAlign:"center"}}>Congrats, your Zipharvest subscription has been created!</div>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                </Grid>
        </div>
       }
		</div>
  );
}

async function getSession(seshId){
  const response = await fetch(`/get-session/${seshId}`);
  const json = await response.json();
  getUser(false,json.subscription,seshId);
  setSession(json);
}

  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');
  let [session,setSession] = useState([]);
  let [user,setUser] = useState([]);
  let [subscription,setSubscription] = useState([]);
  let [userUpdated,setUserUpdated] = useState(false);
  let [continued,setContinued] = useState(false);

  async function getSubscription(subId){
    const response = await fetch(`/get-subscription/${subId}`);
    const json = await response.json();
    setSubscription(json);
  }

  async function getUser(fromUrl,subId,seshId){
    if(fromUrl){
      let userForFetch = userFromUrl;
      if(userFromUrl === undefined || userFromUrl === ""){
        userForFetch = userFromLogin;
      }
      const response = await fetch(`/get-user/${userForFetch}`);
      const json = await response.json();
      let userString = JSON.stringify(json);
      userString = userString.substring(1,userString.length-1);
      let newUser = JSON.parse(userString);

      if(newUser.verified===1){
        if(verCode !== newUser.verificationCode){
          return;
        }

        if(((new Date()).getTime()-newUser.verCodeTime) > 900000){
          setExpired(true);
          return;
        }

  
        if(userString !== "" && userString !== undefined && userString !== null && userString !== "[]"){
          updateUserVerified(newUser.username);
          setUser(newUser);
        }
      }else{
        if(userString !== "" && userString !== undefined && userString !== null && userString !== "[]"){
          setContinued(true);
          setUser(newUser);
        }
      }
    }else{
      const response = await fetch(`/get-user-seshId/${seshId}`);
      const json = await response.json();
      getSubscription(subId);
      setContinued(true);
      setUser(json)
    }
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  if(!success){
    if(user === null || user === [] || user === undefined || JSON.stringify(user) === "[]"){
      getUser(true,"","");
    }
  }

  const VerifiedForm = () => {
    return(
  <div id="verified-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
          {isMobile ?
          <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
              <Grid
				            container
				            direction="column"
  				          justifyContent="center"
				            alignItems="center"
			              >
                    <div style={{textAlign:"center"}}>You have verified your account!</div>
                    <div style={{textAlign:"center"}}>Your 14-day free trial starts now!</div>
                    <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                  </Grid>    
          </div> :
          <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
              <Grid
				            container
				            direction="column"
  				          justifyContent="center"
				            alignItems="center"
			              >
                    <div style={{textAlign:"center"}}>You have verified your account!</div>
                    <div style={{textAlign:"center"}}>Your 14-day free trial starts now!</div>
                    <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                  </Grid>
          </div>
          }
          
</div>
    )
  }

  const handleResend = () => {
		resend();
	}

    function resend(){
        getUserForResend();
    }

    async function getUserForResend(){
      const response = await fetch(`/get-user/${userFromUrl}`);
      const json = await response.json();
      let userString = JSON.stringify(json);
      userString = userString.substring(1,userString.length-1);
      let newUser = JSON.parse(userString);

      if(userString !== "" && userString !== undefined && userString !== null && userString !== "[]"){
        sendVerificationEmail(newUser);
      }
    }

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
          charactersLength));
       }
       return result;
    }

    async function sendVerificationEmail(newUser){
        let newCode = makeid(8);
        const response = await fetch(`/send-verification-email/${newUser.email}/${newCode}/${newUser.username}`);
        await response.json();
        updateUserVerificationCode(newUser.username,newCode);
      }

  const ExpiredForm = ({msg}) => {
    return(
      <div id="Expired Form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {isMobile ?
        <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Grid
            container
            direction="column"
              justifyContent="center"
              alignItems="center"
          >
                <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center"}}>{msg}</div>
                <Button style={{marginTop:"10px",marginRight:"5px"}} variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleResend}>Resend Code</Button>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                </Grid>
                </div>
                :
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Grid
            container
            direction="column"
              justifyContent="center"
            alignItems="center"
          >
                <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center"}}>{msg}</div>
                <Button style={{marginTop:"10px",marginRight:"5px"}} variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleResend}>Resend Code</Button>
                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                </Grid>
        </div>
       }
		</div>
    )
  }
  if(expired){
    return <ExpiredForm msg={"Your verification code expired. Please resend email."}></ExpiredForm>
  }
  
  if(continued){
    if (!success && message === '') {
      try{
          if(isMobile){
            return <ProductDisplayMobile />;
          }else{
            return <ProductDisplay />;
          }
      }catch(err){
      }
    } else if (success && sessionId !== '') {
      return <SuccessDisplay seshId={sessionId} />;
    } else {
      return <Message message={message} />;
    }
  }else{
    if(user !== null && user !== undefined && user !== [] && JSON.stringify(user) !== "[]"){
      if(user.verificationCode===verCode){
        return <VerifiedForm></VerifiedForm>
      }else{
        return <ExpiredForm msg={"This code doesn't match the last code we sent.\nTry resending or looking for the correct email."}></ExpiredForm>
      }
    }else{
      if (success && sessionId !== '') {
        return <SuccessDisplay seshId={sessionId} />;
      }else{
        if(offer){
          try{
            if(isMobile){
              return <ProductDisplayMobile />;
            }else{
              return <ProductDisplay />;
            }
        }catch(err){
        }
        }else{
          return <ExpiredForm msg={"This code isn't correct.\nTry resending or looking for the correct email."}></ExpiredForm>
        }
      }
    }
  }
}

/*<section>
      <div>
        <div>
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <form action="/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section> 
    
    
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
            style={{marginLeft:"50px",marginRight:"10px",backgroundColor:"#ffffff"}}
			        >
              <div style={{marginTop:"40px",textAlign:"center",fontWeight:"bold"}}>Basic</div>
              <div style={{height:"120px",width:"100px"}}></div>
              <img alt="pricingImage" src={pricingImage} style={{width:pricingImageWidth,height:pricingImageHeight}}/>
              <div style={{marginTop:"15px",textAlign:"center",fontWeight:"bold",color:"#5b5b5b"}}>Billed monthly</div>
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
              <div style={{marginTop:"35px",textAlign:"center"}}>Export up to 2000</div>
              <div style={{marginTop:"2px",textAlign:"center"}}>plants per month</div>
              </Grid>
              </Grid>
              </Grid>
              <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" style={{width:"90%",marginRight:"5px",marginLeft:"5px",marginTop:"35px",marginBottom:"10px",backgroundColor:"#047AF6"}} onClick={handleGoToBasic}>Start a free trial</Button>
              <div style={{textAlign:"center",fontWeight:"bold",color:"#5b5b5b",marginBottom:"20px"}}>or see more features</div>
              </Grid> 
              <Grid
				    container
				    direction="column"
            justifyContent="center"
				    alignItems="center"
			        >
              <div style={{textAlign:"center"}}>Standard</div>
              <div style={{textAlign:"center"}}>Export up to 5000 plants per month</div>
              <div style={{textAlign:"center"}}>$200 per month</div>
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
              <div style={{textAlign:"center"}}>$350 per month</div>
                    <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToPremium}>Select</Button>
              </Grid> 
              </Grid>*/
