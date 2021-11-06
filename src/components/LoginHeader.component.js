import React from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {isMobile} from 'react-device-detect';


function LoginHeader({setCurrentPage, currentPage, executeLogout}){


    let headerWidth = "100%";
    if(isMobile){
      headerWidth = "340px";
    }
  
      return(
          <div style={{margin:"auto",width:headerWidth,backgroundColor:"#444444",height:"50px"}}></div>
      )
}

export default LoginHeader