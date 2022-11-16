import React from 'react';
import BrowserDetection from 'react-browser-detection';
import ProductLanding from './ProductLanding.component';

function ProductLandingWrapper({setCurrentPage,logVisit}) {
    let success = false;
    const browserHandler = <ProductLanding setCurrentPage={setCurrentPage} logVisit={logVisit} browser={"Chromeded"}/>;
    try{
        browserHandler = {
            default: (browser) => <ProductLanding setCurrentPage={setCurrentPage} logVisit={logVisit} browser={browser}/>,
            };
        success = true;
    }catch(err){
        
    }
    console.log("Success!");
    
  return(
    <div>{success ? <BrowserDetection>
    { browserHandler }
    </BrowserDetection>
    : null} </div>  
    );
}

export default ProductLandingWrapper;


