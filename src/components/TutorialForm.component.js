import React from 'react';
import {isMobile} from 'react-device-detect';
import Grid from '@material-ui/core/Grid';

function TutorialForm() {

    let formWidth = "700px";
    let formHeight = "900px";

    if(isMobile){
      formWidth = "100%";
    }
    /*
    Introduction:
Welcome to ZipHarvest!

ZipHarvest lets you create your Metrc harvest data quickly and easily using voice control. ZipHarvest is intended to work on mobile devices with only one hand needed, allowing you to manipulate plants with the other. 

There are three simple steps: import your data, harvest, and export your data for upload to Metrc. We have provided step-by-step instructions that go into more detail.

    */

    const TutorialText = () => {	  
		return (
            <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
        >
            <div style={{textAlign:"center",fontSize:"20px"}}><b>Welcome to ZipHarvest!</b></div>
            <div style={{textAlign:"center",marginTop:"5px"}}>ZipHarvest lets you create your Metrc harvest data quickly and easily using voice control. ZipHarvest is intended to work on mobile devices with only one hand needed, allowing you to manipulate plants with the other.</div>
            <div style={{textAlign:"center",marginTop:"5px"}}>There are three simple steps: import your data, harvest, and export your data for upload to Metrc. We have provided step-by-step instructions that go into more detail.</div>

            </Grid>
		);
	  };

    return(
      <div id="tutorial-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {isMobile ?
        <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                <TutorialText></TutorialText>
                </div>
                :
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
            <TutorialText></TutorialText>
        </div>
       }
		</div>
    );
}	


export default TutorialForm;

