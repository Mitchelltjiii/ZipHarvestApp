import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {isMobile} from 'react-device-detect';
import {InputAdornment,IconButton} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CreateUserMiniForm from './CreateUserMiniForm.component';
import zhlogotransparent from '../zhlogotransparent.png';


/*

        <div style={{backgroundColor:"#e1e1e1", position:"absolute",top:"80px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
<div style={{width:"70%",marginBottom:"200px"}}>
        <div style={{float:"left",backgroundColor:"#e4e4e4",width:"60%",height:"95%"}}>
        <Grid
      container
      direction="column"
        justifyContent="center"
      alignItems="left">
<div style={{fontSize:"60px",fontWeight:"bold"}}>WELCOME TO ZIPHARVEST</div>
<div style={{fontSize:"25px"}}>&#10004;Record plant harvest weights faster than ever with a single voice command</div>
<div style={{fontSize:"25px"}}>&#10004;Report harvest batches to Metrc easily with our reliable export feature</div>
<div style={{fontSize:"25px"}}>&#10004;14-day free trial for all users and price tiers available based on usage</div>
<div style={{fontSize:"25px"}}>&#10004;Get started in just a few minutes without any obligation</div>
<div style={{fontSize:"25px"}}>&#10004;No special equipment required, just your voice, phone and the scales you already own</div>

</Grid>
        </div>
        <div style={{float:"right",backgroundColor:"#e4e4e4",width:"30%",height:"95%"}}>
        <CreateUserMiniForm></CreateUserMiniForm>
</div>
    </div>
          </div>
*/

function ProductLanding({setCurrentPage,logVisit}) {
  if(isMobile){
    return (
      <div></div>
    );
  }else{
    return (
        <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
style={{backgroundColor:"#444444",height:"100%",width:"100%"}}
      >
          <div style={{width:"100%",height:"80px",backgroundColor:"#32a852"}}>
<Grid
      container
      direction="column"
        justifyContent="center"
      alignItems="center"
style={{width:"100%"}}>
<div style={{width:"70%",marginTop:"10px",marginBottom:"10px",color:"#FFFFFF",backgroundColor:"#e4e4e4"}}>
      <img alt="logo" src={zhlogotransparent} style={{minHeight:"62px",maxHeight: "62px",float:"left"}}/>

      <Button style={{height:"40px",marginTop:"10px",marginBottom:"10px",
      color:"#FFFFFF",float:"right"}} aria-controls="simple-menu" aria-haspopup="true" variant="outlined">Sign In</Button>		

        </div>
  
</Grid>
      
</div>
        
      </Grid>
    );
  }
}

export default ProductLanding;


