import React from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {isMobile} from 'react-device-detect';
import Grid from '@material-ui/core/Grid';
import logo from './logo.png';


function LoginHeader({setCurrentPage, currentPage, executeLogout}){

    const handleGoToHome = () => {
        window.location.replace("https://www.zipharvest.app/");
    }  

    let headerWidth = "100%";
    if(isMobile){
      headerWidth = "340px";
    }
  
      return(
          <div style={{margin:"auto",width:headerWidth,backgroundColor:"#444444",height:"50px"}}>
                <Grid
				container
				direction="column"
			  	justifyContent="center"
				alignItems="center">
                     <Grid
				container
				direction="row"
			  	justifyContent="center"
				alignItems="center">
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome} style={{width: "100%"}}>
                        <img alt="logo" src={logo} style={{maxHeight: "50px"}}/>
                    </Button>
                    </Grid>
                </Grid>
          </div>
      )
}

export default LoginHeader