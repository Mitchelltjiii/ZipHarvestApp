import React from 'react';
import {isMobile} from 'react-device-detect';
import Grid from '@material-ui/core/Grid';

function PrintPage({print}) {

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
     formWidth = "340px";
     formHeight = "25000px";
    }

    console.log("Print: " + print);
    console.log("Print (String): " + JSON.stringify(print));

    let pr = "";
    if(print !== undefined){
      pr = print;
    }

    return(
      <div id="print-form" style={{width:formWidth,height:formHeight,marginRight:margR,marginLeft:margL,fontSize:fontSize,alignItems: 'center',justifyContent: 'center'}}>     
        {pr}
		</div>
    );
}	


export default PrintPage;
