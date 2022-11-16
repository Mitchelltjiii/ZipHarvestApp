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
import leafImage1 from '../leafImage1.png';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Dictaphone from './Dictaphone.component';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

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
  let tableWidth = 300;
    
    if(isMobile){
      tableWidth = 240;
    }
    const useStyles = makeStyles({
        table: {
          minWidth: tableWidth,
          maxWidth: tableWidth
        },
      });

  const classes = useStyles();

  let lineSpacing = "12px";
  const styles = {
    slide: {
      height: '100%',
      width: '100%',
      color: '#fff',
    },
    slide1: {
      background: '#FFFFFF',
    },
    slide2: {
      background: '#FFFFFF',
    },
    slide3: {
      background: '#FFFFFF',
    },
  };

  function createPlant(tag, strain, active){
		return {tag, strain, active};
  }

  
  
  const [accountCreated,setAccountCreated] = React.useState(false);
  const [resent,setResent] = React.useState(false);
  const [newUsername,setNewUsername] = React.useState("");
  const [searchTag, setSearchTag] = React.useState('');
  const [weight, setWeight] = React.useState('');
	const [unit, setUnit] = React.useState('lbs');
  const [selectedTag, setSelectedTag] = React.useState('');
  const [searchStrain, setSearchStrain] = React.useState('All Strains');

  let unitList = ["lbs","g"];

  const handleSelectedTag = (event) => {
		setSelectedTag(event.target.value);
	  };

  const handleWeight = (event) => {
		setWeight(event.target.value);
	  };

	const handleUnitSelect = (event) => {
		setUnit(event.target.value);
	  };

  let ap = [];
  ap.push(createPlant("1A4200000010000004000001","OG Kush",true));
  ap.push(createPlant("1A4200000010000004000002","Biscotti",true));
  ap.push(createPlant("1A4200000010000004000003","Key Lime Pie",true));

  const [availablePlants,setAvailablePlants] = React.useState(ap);
  let leafImageHeight = "80px";

  let tagList = searchTag ? commitSearch(): ["Search For Results"];

  let currSelectedTag = selectedTag;
	if(tagList.length>0 && selectedTag === ''){
		currSelectedTag = tagList[0];
	}

  function searchTagFromSpeech(searchText,searchText2){
    console.log("Search tag from speech: searchtext1: " + searchText + ", searchtext2: " + searchText2);
		let fixedSearch = searchText;
		    while(fixedSearch.includes(" to ")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" to ")) + 2 + fixedSearch.substring(fixedSearch.indexOf(" to ")+4);
			}
			while(fixedSearch.includes(" to")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" to")) + 2 + fixedSearch.substring(fixedSearch.indexOf(" to")+3);
			}
			while(fixedSearch.includes("to ")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf("to ")) + 2 + fixedSearch.substring(fixedSearch.indexOf("to ")+3);
			}
			while(fixedSearch.includes(" for ")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" for ")) + 4 + fixedSearch.substring(fixedSearch.indexOf(" for ")+5);
			}
			while(fixedSearch.includes(" for")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" for")) + 4 + fixedSearch.substring(fixedSearch.indexOf(" for")+4);
			}
			while(fixedSearch.includes("for ")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf("for ")) + 4 + fixedSearch.substring(fixedSearch.indexOf("for ")+4);
			}
			while(fixedSearch.includes("one")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf("one")) + 1 + fixedSearch.substring(fixedSearch.indexOf("one")+3);
			}
			while(fixedSearch.includes(" ")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" ")) + fixedSearch.substring(fixedSearch.indexOf(" ")+1);
			}
			while(fixedSearch.includes("-")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf("-")) + fixedSearch.substring(fixedSearch.indexOf("-")+1);
			}
			if(searchText2.includes("lb") || searchText2.includes("lbs") || searchText2.includes("pounds")){
				enterWeightFromSpeech(searchText2.substring(0,searchText2.indexOf(" ")),0);
			}else{
				if(searchText2.includes(" ")){
					enterWeightFromSpeech(searchText2.substring(0,searchText2.indexOf(" ")),1);
				}else{
					if(searchText2.includes("g")){
						enterWeightFromSpeech(searchText2.substring(0,searchText2.indexOf("g")),1);
					}
				}
			}
		setSearchTag(fixedSearch);
	}

	function enterWeightFromSpeech(weight,unit){
		if(!isNaN(weight)){
			setWeight(weight);
			if(unit === 0){
				setUnit('lbs');
			}else{
				setUnit('g');
			}
		}
	}

	function nextPlantFromSpeech(){
	}

	function voiceCommand(text){
	}

	function fixStrain(strain){
		if(strain.length>8){
			strain = strain.substring(0,8);
		}
		return strain;
	}

  function commitSearch(){
    console.log("Commit Search, search tag: " + searchTag);
		let newTagList = [];

		for (const val of availablePlants) {
			if(val.active){
        if(val.tag.substring(val.tag.length-searchTag.length)===(searchTag)){
					if((searchStrain === 'All Strains' )|| (searchStrain === val.strain)){
						newTagList.push(val.tag + " | " + fixStrain(val.strain));
					}
				}			
      }
		}

		return newTagList; 
	}

  let margB = "200px";
  if(currUrl.includes("Test1")){
    margB = "40px";
  }

  let newLink = "";
    if(resent){
      newLink = "new "
    }

    const handleGoToFloraSolNewTab = () => {
      window.open("https://www.flora-sol.com/");
    }

    const handleResend = () => {
      resend();
    }
  
      function resend(){
          getUser();
      }
  
      const handleGoToHome = () => {
        setCurrentPage('signin');
      }  
  
      async function getUser(){
            const response = await fetch(`/get-user/${newUsername}`);
            const json = await response.json();
            
            let userString = JSON.stringify(json);
            userString = userString.substring(1,userString.length-1);
            let newUser = JSON.parse(userString);
      
            if(userString !== "" && userString !== undefined && userString !== null && userString !== "[]"){
              sendVerificationEmail(newUser);
            }
        }

        async function sendVerificationEmail(user){
          let address = user.email;
          let newCode = makeid(8);
          const response = await fetch(`/send-verification-email/${address}/${newCode}/${newUsername}`);
          await response.json();
          
          updateUserVerificationCode(user.username,newCode);
        }
  
        async function updateUserVerificationCode(username,newCode){
          let verCodeTime = JSON.stringify((new Date()).getTime());
        
          const response = await fetch(`/user/updateVerificationCode/${username}/${newCode}/${verCodeTime}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
      });
          await response.json();
          
          setResent(true);
        }

        function makeid(length) {
          var result           = '';
          var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
          for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
         }
         return result;
      }
      let currUrl = "";
    try{
      currUrl = window.location.href.toString();
    }catch(err){

    }

    const handleSearchTag = (event) => {
      setSearchTag(event.target.value);
      };

  if(isMobile){
    return (
      <div id="product-display-mobile" style={{width:"100%",backgroundColor:"#444444"}}>
        {accountCreated ? 
        <Grid
         container
         direction="column"
           justifyContent="center"
         alignItems="center"
           >
             <Grid
         container
         direction="column"
           justifyContent="center"
         alignItems="center"
           >
             <div style={{backgroundColor:"#000000",width:"100%"}}>
        <Grid
				container
				direction="row"
			  	justifyContent="center"
				alignItems="center">
                    <img alt="logo" src={zhlogotransparent} style={{height: "50px"}}/>
                    </Grid>
                     </div>
                     <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontWeight:"bold",fontSize:"30px",color:"#FFFFFF",marginTop:"20px"}}>Congrats!</div>
                     <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontWeight:"bold",fontSize:"30px",color:"#FFFFFF",marginTop:"10px"}}>Your new account has been created!</div>
                     <img alt="leafImage1" src={leafImage1} style={{height:leafImageHeight,marginTop:"20px",marginBottom:"15px"}}/>
                     <div style={{marginTop:"20px",marginBottom:"5px",paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontSize:"17px",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif"}}>We sent you a {newLink}link to verify your account.</div>
                     <div style={{marginBottom:"20px",paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontSize:"17px",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif"}}>It will expire 15 minutes after creation.</div>
                     </Grid>
                     <Grid
         container
         direction="row"
           justifyContent="center"
         alignItems="center"
         style={{marginBottom:"50px"}}
           >
                     <Button style={{marginTop:"10px",marginRight:"50px",color:"#FFFFFF",borderColor:"#FFFFFF"}} 
                     variant="outlined" aria-controls="simple-menu" aria-haspopup="true"
                     onClick={handleResend}>Resend Code</Button>
                     <Button style={{marginTop:"10px",backgroundColor:"#000000",color:"#FFFFFF",
                     borderColor:"#000000"}} variant="contained" aria-controls="simple-menu" 
                     aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                     </Grid>
                     </Grid> :
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{width:"100%"}}
      >
        <div style={{backgroundColor:"#000000",width:"100%"}}>
                    <img alt="logo" src={zhlogotransparent} style={{height: "50px",float:"left"}}/>
                    {accountCreated ? null :       
      <Button style={{height:"40px",marginTop:"5px",marginBottom:"5px",
      color:"#FFFFFF",borderColor:"#FFFFFF",float:"right"}} aria-controls="simple-menu" 
      aria-haspopup="true" variant="outlined" onClick={handleGoToHome}>Sign In</Button>		
      }
                     </div>
                     <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{backgroundColor:"#444444",width:"100%"}}
      >
      <div style={{fontSize:"32px",fontWeight:"bold",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif",marginTop:lineSpacing,
      textAlign:"center"}}>WELCOME TO ZIPHARVEST</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Record plant harvest weights faster than ever with a single voice command</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Report harvest batches to Metrc easily with our reliable export feature</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;14-day free trial for all users and price tiers available based on usage</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Get started in just a few minutes without any obligation</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;No special equipment required, just your voice, phone and the scales you already own</div>
          <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToFloraSolNewTab} style={{borderRadius:5,marginTop:lineSpacing,width:"160px",marginBottom:"15px"}}>Learn More</Button>
          </Grid>
          <CreateUserMiniForm setAccountCreated={setAccountCreated} setNewUsername={setNewUsername}></CreateUserMiniForm>
          </Grid>
  }
  </div>
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
          <div style={{width:"100%",height:"80px",backgroundColor:"#000000"}}>
<Grid
      container
      direction="column"
        justifyContent="center"
      alignItems="center"
style={{width:"100%"}}>
<div style={{width:"70%",marginTop:"10px",marginBottom:"10px",color:"#FFFFFF"}}>
      <img alt="logo" src={zhlogotransparent} style={{minHeight:"62px",maxHeight: "62px",float:"left"}}/>

      {accountCreated ? null :       
      <Button style={{height:"40px",marginTop:"10px",marginBottom:"10px",
      color:"#FFFFFF",borderColor:"#FFFFFF",float:"right"}} aria-controls="simple-menu" 
      aria-haspopup="true" variant="outlined" onClick={handleGoToHome}>Sign In</Button>		
      }

        </div>
  
</Grid>
      
</div>
<div style={{backgroundColor:"#444444", position:"absolute",top:"80px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center',flexDirection:"column"}}>
         {accountCreated ? 
         <Grid
         container
         direction="column"
           justifyContent="center"
         alignItems="center"
           >
             <Grid
         container
         direction="column"
           justifyContent="center"
         alignItems="center"
           >
                     <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontWeight:"bold",fontSize:"45px",color:"#FFFFFF"}}>Congrats!</div>
                     <div style={{paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontWeight:"bold",fontSize:"45px",color:"#FFFFFF"}}>Your new account has been created!</div>
                     <img alt="leafImage1" src={leafImage1} style={{height:leafImageHeight,marginTop:"20px",marginBottom:"15px"}}/>
                     <div style={{marginTop:"20px",marginBottom:"5px",paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontSize:"24px",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif"}}>We sent you a {newLink}link to verify your account.</div>
                     <div style={{marginBottom:"20px",paddingLeft:"20px",paddingRight:"20px",textAlign:"center",fontSize:"24px",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif"}}>It will expire 15 minutes after creation.</div>
                     </Grid>
                     <Grid
         container
         direction="row"
           justifyContent="center"
         alignItems="center"
           >
                     <Button style={{marginTop:"10px",marginRight:"50px",color:"#FFFFFF",borderColor:"#FFFFFF"}} 
                     variant="outlined" aria-controls="simple-menu" aria-haspopup="true"
                     onClick={handleResend}>Resend Code</Button>
                     <Button style={{marginTop:"10px",backgroundColor:"#000000",color:"#FFFFFF",
                     borderColor:"#000000"}} variant="contained" aria-controls="simple-menu" 
                     aria-haspopup="true" onClick={handleGoToHome}>Home</Button>
                     </Grid>
                     </Grid>
                     :
          <div style={{width:"70%",marginBottom:margB}}>
                  <div style={{float:"left",backgroundColor:"#444444",width:"60%",height:"95%"}}>
                  <Grid
				container
				direction="column"
			  	justifyContent="center"
				alignItems="left">
          <div style={{fontSize:"55px",fontWeight:"bold",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif",marginBottom:"10px"}}>WELCOME TO ZIPHARVEST</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Record plant harvest weights faster than ever with a single voice command</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Report harvest batches to Metrc easily with our reliable export feature</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;14-day free trial for all users and price tiers available based on usage</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Get started in just a few minutes without any obligation</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;No special equipment required, just your voice, phone and the scales you already own</div>
          <Grid
				container
				direction="column"
			  	justifyContent="center"
				alignItems="center">
          <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToFloraSolNewTab} style={{borderRadius:5,marginTop:lineSpacing,width:"160px"}}>Learn More</Button>
          </Grid>
        </Grid>
                  </div>
                  <div style={{float:"right",backgroundColor:"#e4e4e4",width:"30%",height:"95%",borderRadius:"5px"}}>
                  <CreateUserMiniForm setAccountCreated={setAccountCreated} setNewUsername={setNewUsername}></CreateUserMiniForm>
        </div>
              </div>
  }
  {currUrl.includes("Test1")
  ?
  <div style={{display:"flex",flexDirection:"row"}}>
        <TableContainer component={Paper} style={{marginRight:"50px"}}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Plant Tag</TableCell>
                <TableCell align="center">Strain</TableCell>            
              </TableRow>
            </TableHead>
            <TableBody>
                {availablePlants.map((row) => (
                <TableRow key={row.tag}>
                  <TableCell component="th" scope="row">
                      {row.tag}
                  </TableCell>
                  <TableCell align="center">
                      {row.strain}
                  </TableCell>
                </TableRow>
                ))}
                </TableBody>
          </Table>
          </TableContainer>
  
          <div style={{display:"flex",flexDirection:"column"}}>
          <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
  
          <TextField id="search-field" value={searchTag} label="Search Tag" onChange={handleSearchTag} style={{width:"180px"}}/>
          </Grid>
  
          <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
        
          <Select id="searchTagSelect" value={currSelectedTag} onChange={handleSelectedTag} style={{width:"180px",marginTop:"15px",direction:"rtl"}}>
                    {    
                      tagList.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                 </Select>
          </Grid>
  
          <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
  
          <TextField id="Weight" value={weight} onChange={handleWeight} style={{width: "100px"}}/>
  
          <Select id="unit-select" value={unit} onChange={handleUnitSelect} style={{width:"80px"}}>
                    {unitList.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                 </Select>
          </Grid>
  
          <div style={{display:"flex",flexDirection:"column"}}>
            <div>Click this button and say "001 is 2.4 pounds"</div>
            <Dictaphone searchTagFromSpeech={searchTagFromSpeech} enterWeightFromSpeech={enterWeightFromSpeech}
            voiceCommand={voiceCommand}></Dictaphone>
          </div>
          </div>
      </div>
    :
    null
  }
					</div>
      </Grid>
    );
  }
}

export default ProductLanding;


