import React from 'react';
import BrowserDetection from 'react-browser-detection';
import ProductLanding from './ProductLanding.component';

function ProductLandingWrapper({setCurrentPage,logVisit}) {
    const browserHandler = {
        default: (browser) => <ProductLanding setCurrentPage={setCurrentPage} logVisit={logVisit} browser={browser}></ProductLanding>,
        };
    
  return(
    <BrowserDetection>
    { browserHandler }
    </BrowserDetection>);
}

export default ProductLandingWrapper;


