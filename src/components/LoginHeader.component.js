import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import zhlogo from './zhlogo.png';


function LoginHeader({setCurrentPage}){

    const handleGoToHome = () => {
        setCurrentPage('signin');
      }  

    let headerWidth = "100%";
  
      return(
          <div style={{margin:"auto",width:headerWidth,backgroundColor:"#444444"}}>
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
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToHome} style={{width:"100%"}}>
                            <img alt="zhlogo" src={zhlogo} style={{width: "248px"}}/>
                        </Button>
                    </Grid>
                </Grid>
          </div>
      )
}

export default LoginHeader