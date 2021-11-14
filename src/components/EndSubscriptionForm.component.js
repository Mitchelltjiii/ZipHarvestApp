import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';

function EndSubscriptionForm({setCurrentPage}) {

    const [stepOne,setStepOne] = React.useState(true);

    const handleGoToHome = () => {
      window.location.replace("https://www.zipharvest.app/");
    }  

    let formWidth = "450px";
    let formHeight = "250px";

    if(isMobile){
      formWidth = "100%";
    }

	return (

    <div id="end-subscription-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {isMobile ?
        <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
            {stepOne ? <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                                <div>Cancel your Subscription?</div>
                                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                                </Grid>
                                :
                <Grid
            container
            direction="column"
              justifyContent="center"
            alignItems="center"
          >
                </Grid>
                }
                </div>
                :
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                {stepOne ? <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                                <div>Cancel your Subscription?</div>
                                <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                                </Grid>
                                :
                <Grid
            container
            direction="column"
              justifyContent="center"
            alignItems="center"
            >
                </Grid>
                }
        </div>
       }
		</div>
	);
}

export default EndSubscriptionForm;