import React from 'react';
import BrowserDetection from 'react-browser-detection';
import ProductLanding from './ProductLanding.component';

function ProductLandingWrapper({setCurrentPage,logVisit}) {
    let success = false;
    const browserHandler = {
        default: (browser) => <div>Browser Handler</div>,
        };
    try{
        browserHandler = {
            default: (browser) => <ProductLanding setCurrentPage={setCurrentPage} logVisit={logVisit} browser={browser}/>,
            };
        success = true;
    }catch(err){
        
    }
    console.log("Success: " + success);
    
  return(
    <div>{success ? <BrowserDetection>
    { browserHandler }
    </BrowserDetection>
    :  <ProductLanding setCurrentPage={setCurrentPage} logVisit={logVisit} browser={"Chromeded"}/>} </div>  
    );
}

export default ProductLandingWrapper;


