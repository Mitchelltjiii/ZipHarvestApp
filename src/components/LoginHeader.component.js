import React from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {isMobile} from 'react-device-detect';


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
              <Button style={{marginTop:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
          </div>
      )
}

export default LoginHeader