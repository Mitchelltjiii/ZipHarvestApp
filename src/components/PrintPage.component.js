import React from 'react';
import {isMobile} from 'react-device-detect';
import Grid from '@material-ui/core/Grid';

function PrintPage(print) {

    let formWidth = "800px";
    let formHeight = "3200px";
    let margR = "80px";
    let margL = "80px";
    let fontSize = "20px";
    let smallFontSize = "16px";

    if(isMobile){
     margR = "10px";
     margL = "10px";
     fontSize = "12px";
     smallFontSize = "10px"
     formWidth = "100%";
     formHeight = "2500px";
    }

    console.log("Print: " + print);

    return(
      <div id="print-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {print}
		</div>
    );
}	


export default PrintPage;
