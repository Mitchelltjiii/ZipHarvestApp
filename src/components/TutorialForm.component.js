import React from 'react';
import {isMobile} from 'react-device-detect';
import TutorialText from './TutorialText.txt';

function TutorialForm() {

    let formWidth = "700px";
    let formHeight = "900px";

    if(isMobile){
      formWidth = "100%";
    }

    return(
      <div id="tutorial-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {isMobile ?
        <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                {TutorialText}
                </div>
                :
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
        {TutorialText}
        </div>
       }
		</div>
    );
}	


export default TutorialForm;

