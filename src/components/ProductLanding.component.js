import React from 'react';
import {useRef} from 'react';
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
import CustomPopUp from './CustomPopUp';
import Popup from 'reactjs-popup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


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

  function createPlant(tag, strain, active, weight, unit){
		return {tag, strain, active,weight,unit};
  }
  
  const [accountCreated,setAccountCreated] = React.useState(false);
  const [resent,setResent] = React.useState(false);
  const [newUsername,setNewUsername] = React.useState("");
  const [searchTag, setSearchTag] = React.useState('');
  const [weight, setWeight] = React.useState('');
	const [unit, setUnit] = React.useState('lbs');
  const [selectedTag, setSelectedTag] = React.useState('');
  const [searchStrain, setSearchStrain] = React.useState('OG Kush');

  const [borderColor1, setBorderColor1] = React.useState('#FFFFFF');
  const [borderColor2, setBorderColor2] = React.useState('#FFFFFF');
  const [borderColor3, setBorderColor3] = React.useState('#FFFFFF');

  let searchForList = ["OG Kush","Blue Dream","Biscotti"];

  let unitList = ["lbs","g"];

  const handleClickedStrain1 = () => {
      /*setBorderColor1("#000000");
      setBorderColor2("#FFFFFF");
      setBorderColor3("#FFFFFF");*/
      document.getElementById('popupbutton').click();
      logVisit("Vote: OG Kush");
      setSearchStrain("OG Kush");
	};

  const handleClickedStrain2 = () => {
    /*setBorderColor1("#FFFFFF");
    setBorderColor2("#000000");
    setBorderColor3("#FFFFFF");*/
    document.getElementById('popupbutton').click();
    logVisit("Vote: Blue Dream");
    setSearchStrain("Blue Dream");
  };

  const handleClickedStrain3 = () => {
    /*setBorderColor1("#FFFFFF");
    setBorderColor2("#FFFFFF");
    setBorderColor3("#000000");*/
    document.getElementById('popupbutton').click();
    logVisit("Vote: Biscotti");
    setSearchStrain("Biscotti");
  };

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
  ap.push(createPlant("000001","OG Kush",true,0,''));
  ap.push(createPlant("000002","OG Kush",true,0,''));
  ap.push(createPlant("000003","OG Kush",true,0,''));
  ap.push(createPlant("000004","OG Kush",true,0,''));
  ap.push(createPlant("000005","OG Kush",true,0,''));

  ap.push(createPlant("001001","Blue Dream",true,0,''));
  ap.push(createPlant("001002","Blue Dream",true,0,''));
  ap.push(createPlant("001003","Blue Dream",true,0,''));
  ap.push(createPlant("001004","Blue Dream",true,0,''));
  ap.push(createPlant("001005","Blue Dream",true,0,''));

  ap.push(createPlant("002001","Biscotti",true,0,''));
  ap.push(createPlant("002002","Biscotti",true,0,''));
  ap.push(createPlant("002003","Biscotti",true,0,''));
  ap.push(createPlant("002004","Biscotti",true,0,''));
  ap.push(createPlant("002005","Biscotti",true,0,''));

  const [plants,setPlants] = React.useState(ap);
  let leafImageHeight = "80px";

  let tagList = searchTag ? commitSearch(): ["Search For Results"];

  let currSelectedTag = selectedTag;
	if(tagList.length>0 && selectedTag === ''){
		currSelectedTag = tagList[0];
	}

  let harvestedCount = 0;
  for(const val of plants){
    if(!val.active){
      harvestedCount++;
    }
  }

  let micText1 = "Click the mic and say";
  let micText2 = '"001 is 2 pounds"';
  if(harvestedCount === 3){
    micText1 = "Great! Now start your free trial";
    micText2 = "and import your plants from Metrc.";
  }else if(harvestedCount>0){
    micText1 = "That's it!";
    micText2 = "Let's try that again."
  }else if(harvestedCount===0&&searchStrain==="Choose One"){
    micText1 = "First, pick a strain.";
    micText2 = "Which do you prefer?"
  }

  function searchTagFromSpeech(searchText,searchText2){
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
		if(strain.length>16){
			strain = strain.substring(0,16);
		}
		return strain;
	}

  function commitSearch(){
		let newTagList = [];

		for (const val of plants) {
			if(val.active){
        if(val.tag.substring(val.tag.length-searchTag.length)===(searchTag)){
					if(searchStrain === val.strain){
						newTagList.push(val.tag + " | " + fixStrain(val.strain));
					}
				}			
      }
		}

		return newTagList; 
	}

  function isNumeric(str) {
		if (typeof str !== "string") return false // we only process strings!  
		return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
			   !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
	  }

  let currUrl = "";
    try{
      currUrl = window.location.href.toString();
    }catch(err){

    }

  let margB = "40px";

  let newLink = "";
    if(resent){
      newLink = "new "
    }

    const handleNextPlant = () => {
      nextPlant();
    }

    function nextPlant(){

      let newPlants = [];

      if(isNumeric(weight) && weight !== '0'){
          let plantTag = currSelectedTag;
          if(plantTag !== ''){
            plantTag = plantTag.substring(0,plantTag.indexOf(" | "));
          
            let newPlant = [];
            for(const val of plants){
              if(val.tag === plantTag){
                newPlant = val;
                newPlant.weight = parseFloat(weight);
                newPlant.unit = unit;
                newPlant.active = false;
                newPlants.push(newPlant);
              }else{
                newPlants.push(val);
              }
            }
            logVisit("Harvest");
            setPlants(newPlants);
            setSearchTag('');
            setWeight('');
            setSelectedTag('');
          }         
        }
        
    }

    const handleGoToFloraSolNewTab = () => {
      logVisit("ToFloraSol");
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

    const handleSearchTag = (event) => {
      setSearchTag(event.target.value);
      };

      //    <div style={{float:"left",fontSize:"38px",fontWeight:"bold",color:"#FFFFFF",fontFamily:"Arial, Helvetica, sans-serif",marginBottom:"10px"}}>Try it now!</div>

      function getWeightAndUnit(w,u){
        if(w==0){
          return "";
        }else{
          return w + " " + u;
        }
      }


        let harvestedPlants = [];
        let availablePlants = [];
        for(const val of plants){
          if(val.strain === searchStrain){
            if(val.active){
              availablePlants.push(val);
            }else{
              harvestedPlants.push(val);
            }
          }
        }

        let tableFontSize = "18px";
        let tableFontSizeBig = "20px";

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
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;ZipHarvest is free forever in protest of Metrc and Casa Verde Capital</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Record plant harvest weights faster than ever with a single voice command</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Report harvest batches to Metrc easily with our reliable export feature</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Get started in just a few minutes without any obligation</div>
          <div style={{paddingLeft:"20px",paddingRight:"20px",fontSize:"17px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;No special equipment required, just your voice, phone and the scales you already own</div>
          <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGoToFloraSolNewTab} style={{borderRadius:5,marginTop:lineSpacing,width:"160px",marginBottom:"15px"}}>Learn More</Button>
          </Grid>
          <CreateUserMiniForm setAccountCreated={setAccountCreated} setNewUsername={setNewUsername}></CreateUserMiniForm>
          <div style={{display:"flex",flexDirection:"column",backgroundColor:"#F5F5F5",width:"100%"}}>
           <div style={{marginTop:"15px",marginBottom:"5px",fontSize:"20px",fontFamily:"Arial, Helvetica, sans-serif",textAlign:"center",
          fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bold"}}>Try our Voice-Activated Harvesting now!</div>
                <div style={{display:"flex",flexDirection:"column"}}>
                      <div style={{textAlign:"center",fontSize:"18px",marginTop:"5px",marginBottom:"2px",fontFamily:"Arial, Helvetica, sans-serif"}}>Select your preferred strain</div>
                      <div style={{textAlign:"center",fontSize:"18px",marginBottom:"10px",fontFamily:"Arial, Helvetica, sans-serif"}}>to get started</div>
                      <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"20px"}}>
                  <Button style={{width:"100%",height:"80px",backgroundColor:"#444444",color:"#FFFFFF",marginLeft:"10px",marginRight:"10px"}} variant={"contained"} onClick={handleClickedStrain1}>OG Kush</Button>
                  <Button style={{width:"100%",height:"80px",backgroundColor:"#444444",color:"#FFFFFF",marginLeft:"10px",marginRight:"10px"}} variant={"contained"} onClick={handleClickedStrain2}>Blue Dream</Button>
                  <Button style={{width:"100%",height:"80px",backgroundColor:"#444444",color:"#FFFFFF",marginLeft:"10px",marginRight:"10px"}} variant={"contained"} onClick={handleClickedStrain3}>Biscotti</Button>
                </div>
                </div>      
          <Popup
    trigger={<Button id="popupbutton" style={{display:"none"}}></Button>}
    modal
    nested
    style={{width:"100%",display:"flex"}}
  >
    {close => (
      <div style={{width:"100vw",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex"}}>

        <div style={{backgroundColor:"#e4e4e4",margin:"auto",position:"relative",minWidth:"280px"}}>
        <Button className="close" onClick={close}>
          &times;
        </Button>
        <div className="header" style={{width:"100%",textAlign:"center",fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bold"}}>Harvest Now</div>
        {harvestedCount > 0 || searchTag !== "" ?
          null
          :
          <div style={{display:"flex",flexDirection:"column"}}>
            <div style={{width:"100%",textAlign:"center",marginTop:"10px",marginBottom:"3px"}}>Click the mic and say</div>
            <div style={{width:"100%",textAlign:"center"}}>"001 is 2 pounds"</div>
          </div>
          } 

          <div style={{display:"flex",flexDirection:"column"}}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <div style={{width:"80%",marginTop:"10px",marginBottom:"10px"}}>
              <Dictaphone searchTagFromSpeech={searchTagFromSpeech} enterWeightFromSpeech={enterWeightFromSpeech}
              voiceCommand={voiceCommand}></Dictaphone>
            </div>
            </Grid>
            {harvestedCount > 0 || searchTag !== "" ?
            <div style={{display:"flex",flexDirection:"column"}}>
              <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
  
          <TextField id="search-field" value={searchTag} label="Searching For Tag" onChange={handleSearchTag} style={{width:"80%"}}/>
          </Grid>
  
          <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
        
        <FormControl style={{width:"80%",marginTop:"15px"}}>
            <InputLabel id="search-results-label">Results</InputLabel>
            <Select 
              id="search-results-select"
              label="Results"
              labelId ="search-results-label" 
              value={currSelectedTag} 
              onChange={handleSelectedTag} 
              >
                    {tagList.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                 </Select>
          </FormControl>
          </Grid>

          <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
  
          <div style={{display:"flex",flexDirection:"row",flexWrap:"nowrap",width:"80%"}}>
  
          <TextField id="Weight" label="Weight" value={weight} onChange={handleWeight} style={{width:"100%"}}/>
  
          <FormControl fullWidth>
            <InputLabel id="unit-select-label">Unit</InputLabel>
            <Select 
              id="unit-select"
              label="Unit"
              labelId ="unit-select-label" 
              value={unit} 
              onChange={handleUnitSelect} 
              style={{width:"100%"}}>
                    {unitList.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                 </Select>
          </FormControl>
          
          </div>    
          <Button style={{marginTop:"10px",marginBottom:"15px",width:"80%",backgroundColor:"#444444",color:"#FFFFFF",height:"50px"}} 
          variant={"contained"} onClick={handleNextPlant}>Save Plant</Button>     
          </Grid>  
            
          
              </div>
              : null
          }
          {harvestedCount > 0 ? 
          <div style={{display:"flex",flexDirection:"column",height:"240px",overflowY:"scroll",width:"100%",backgroundColor:"#FFFFFF"}}>
            <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
              <div style={{display:"flex",flexDirection:"row",width:"90%",marginTop:"15px",marginBottom:"5px"}}>
                <div style={{textAlign:"left",width:"100%",whiteSpace:"nowrap",fontWeight:"bold",fontFamily:"Arial, Helvetica, sans-serif",
              fontSize:tableFontSizeBig}}>Harvested Plants</div>
                <div style={{textAlign:"right",width:"100%",whiteSpace:"nowrap",fontWeight:"bold",fontFamily:"Arial, Helvetica, sans-serif",
              fontSize:tableFontSizeBig}}>Weight</div>
              </div>
              {harvestedPlants.map((row) => (
                <div style={{display:"flex",flexDirection:"row",width:"90%",marginTop:"5px",marginBottom:"5px"}}>
                  <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                    <div style={{fontWeight:"bold",textAlign:"left",whiteSpace:"nowrap",fontFamily:"Arial, Helvetica, sans-serif",fontSize:tableFontSize}}>{row.tag}</div>
                    <div style={{textAlign:"left",whiteSpace:"nowrap",fontFamily:"Arial, Helvetica, sans-serif",fontSize:tableFontSize}}>{row.strain}</div>
                  </div>
                  <div style={{textAlign:"right",width:"100%",fontWeight:"bold",fontFamily:"Arial, Helvetica, sans-serif",fontSize:tableFontSize}}>{getWeightAndUnit(row.weight,row.unit)}</div>
                </div>
            ))}
            </div>
            <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
              <div style={{textAlign:"left",whiteSpace:"nowrap",fontWeight:"bold",marginTop:"10px",
              marginBottom:"5px",width:"90%",fontFamily:"Arial, Helvetica, sans-serif",fontSize:tableFontSizeBig}}>Available Plants</div>
              {availablePlants.map((row) => (
                <div style={{display:"flex",flexDirection:"column",width:"90%",marginTop:"5px",marginBottom:"5px"}}>
                  <div style={{fontWeight:"bold",textAlign:"left",whiteSpace:"nowrap",fontFamily:"Arial, Helvetica, sans-serif",fontSize:tableFontSize}}>{row.tag}</div>
                  <div style={{textAlign:"left",whiteSpace:"nowrap",fontFamily:"Arial, Helvetica, sans-serif",fontSize:tableFontSize}}>{row.strain}</div>
                </div>
              ))}
            </div>
          </div>
        :null}
          </div>  
      </div>
      </div>
    )}
  </Popup> 
        </div> 
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
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;ZipHarvest is free forever in protest of Metrc and Casa Verde Capital</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Record plant harvest weights faster than ever with a single voice command</div>
          <div style={{fontSize:"22px",color:"#FFFFFF",marginTop:lineSpacing,fontFamily:"Arial, Helvetica, sans-serif"}}>&#10004;Report harvest batches to Metrc easily with our reliable export feature</div>
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
                  <div style={{float:"right",backgroundColor:"#e4e4e4",width:"30%",height:"95%",borderRadius:"5px",paddingBottom:"20px"}}>
                  <CreateUserMiniForm setAccountCreated={setAccountCreated} setNewUsername={setNewUsername}></CreateUserMiniForm>
        </div>
              </div>
  }
  <div style={{display:"flex",flexDirection:"column",width:"70%"}}>
    <div style={{display:"flex",flexDirection:"column",backgroundColor:"#e4e4e4",borderRadius: '3px',width:"60%"}}>
          <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
          <div style={{width:"100%",fontSize:"25px",marginTop:"20px",marginBottom:"20px",textAlign:"center",
          fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bold"}}>Try our Voice-Activated Harvesting now!</div>
            <div style={{display:"flex",flexDirection:"column"}}>
            <div style={{textAlign:"center",fontSize:"24px",marginBottom:"25px"}}>Select your preferred strain to get started</div>
            <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"20px"}}>
                  <Button style={{width:"100%",height:"80px",backgroundColor:"#444444",color:"#FFFFFF",marginLeft:"25px",marginRight:"25px"}} variant={"contained"} onClick={handleClickedStrain1}>OG Kush</Button>
                  <Button style={{width:"100%",height:"80px",backgroundColor:"#444444",color:"#FFFFFF",marginLeft:"25px",marginRight:"25px"}} variant={"contained"} onClick={handleClickedStrain2}>Blue Dream</Button>
                  <Button style={{width:"100%",height:"80px",backgroundColor:"#444444",color:"#FFFFFF",marginLeft:"25px",marginRight:"25px"}} variant={"contained"} onClick={handleClickedStrain3}>Biscotti</Button>
                </div>
            <div style={{width:"100%",display:"flex"}}>
            <Popup
    trigger={<Button id="popupbutton" style={{display:"none"}}></Button>}
    modal
    nested
    style={{width:"100%",display:"flex"}}
  >
    {close => (
        <div style={{width:"100vw",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex"}}>

      <div style={{backgroundColor:"#e4e4e4",margin:"auto",position:"relative"}}>
        <Button className="close" onClick={close}>
          &times;
        </Button>
      
         <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>

          <div style={{display:"flex",flexDirection:"column",minWidth:"300px"}}>
          <div className="header" style={{width:"100%",textAlign:"center",fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bold",marginTop:"20px"}}>Harvest Now</div>
          {harvestedCount > 0 || searchTag !== "" ?
          null
          :
          <div style={{display:"flex",flexDirection:"column"}}>
            <div style={{width:"100%",textAlign:"center",marginTop:"10px",marginBottom:"3px"}}>Click the mic and say</div>
            <div style={{width:"100%",textAlign:"center"}}>"001 is 2 pounds"</div>
          </div>
          } 
            <div style={{marginRight:"10px",marginLeft:"10px",marginTop:"35px",marginBottom:"15px"}}>
              <Dictaphone searchTagFromSpeech={searchTagFromSpeech} enterWeightFromSpeech={enterWeightFromSpeech}
              voiceCommand={voiceCommand}></Dictaphone>
              </div>
              
            {harvestedCount > 0 || searchTag !== "" ?
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
          <div style={{width:"100%",fontSize:"20px",marginTop:"20px",marginBottom:"5px",textAlign:"center",
          fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bold"}}>Plant Info</div>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
  
          <TextField id="search-field" value={searchTag} label="Searching For Tag" onChange={handleSearchTag} style={{width:"80%"}}/>
          </Grid>
  
          <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
        
        <FormControl style={{width:"80%",marginTop:"15px"}}>
            <InputLabel id="search-results-label">Results</InputLabel>
            <Select 
              id="search-results-select"
              label="Results"
              labelId ="search-results-label" 
              value={currSelectedTag} 
              onChange={handleSelectedTag} 
              >
                    {tagList.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                 </Select>
          </FormControl>
          </Grid>
  
          <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
  
          <div style={{width:"80%",display:"flex",flexWrap:"nowrap"}}>
          <TextField id="Weight" label="Weight" value={weight} onChange={handleWeight} style={{width:"100%"}}/>
  
          <FormControl fullWidth>
            <InputLabel id="unit-select-label">Unit</InputLabel>
            <Select 
              id="unit-select"
              label="Unit"
              labelId ="unit-select-label" 
              value={unit} 
              onChange={handleUnitSelect} 
              style={{width:"100%"}}>
                    {unitList.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                 </Select>
          </FormControl>
            </div>
          </Grid>
          <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
          <div style={{width:"80%"}}>
              <Button style={{marginTop:"10px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF",width:"100%",height:"50px"}} variant={"contained"} onClick={handleNextPlant}>Save Plant</Button>   
            </div>
            </Grid>
         </div>
         : null}
        </div>
        {harvestedCount>0 ? 
        <div style={{display:"flex",flexDirection:"column"}}>
          <TableContainer component={Paper} style={{backgroundColor:"#e4e4e4",width:"320px",minWidth:"320px"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize:"20px",fontWeight:"bold",fontFamily:"Arial, Helvetica, sans-serif"}}>Harvested Plants</TableCell>
            <TableCell align="right" style={{fontSize:"20px",fontWeight:"bold",fontFamily:"Arial, Helvetica, sans-serif"}}>Weight</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
            {harvestedPlants.map((row) => (
              <TableRow key={row.tag}>
                <TableCell>
                  <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{fontWeight:"bold",fontFamily:"Arial, Helvetica, sans-serif"}}>{row.tag}</div>
                    <div style={{fontFamily:"Arial, Helvetica, sans-serif"}}>{row.strain}</div>
                  </div>  
              </TableCell>
              <TableCell align="right">
              <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{fontWeight:"bold",fontFamily:"Arial, Helvetica, sans-serif"}}>
                      {getWeightAndUnit(row.weight,row.unit)}
                    </div>
                    <div style={{fontFamily:"Arial, Helvetica, sans-serif"}}></div>
                  </div> 
              </TableCell>
            </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

        <TableContainer component={Paper} style={{backgroundColor:"#e4e4e4",width:"320px",minWidth:"320px"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize:"20px",fontWeight:"bold",fontFamily:"Arial, Helvetica, sans-serif"}}>Available Plants</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {availablePlants.map((row) => (
              <TableRow key={row.tag}>
                <TableCell>
                  <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{fontWeight:"bold",fontFamily:"Arial, Helvetica, sans-serif"}}>{row.tag}</div>
                    <div style={{fontFamily:"Arial, Helvetica, sans-serif"}}>{row.strain}</div>
                  </div>  
              </TableCell>
            </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
        : null}
        </div>
      </div>
      </div>
    )}
  </Popup>
  </div>
          </div>
            </Grid>
            </div>
      </div>
					</div>
      </Grid>
    );
  }
}

export default ProductLanding;


/* <div style={{width:"100%",justifyContent:"center"}}>
          <Button
            className="button"
            onClick={() => {
              close();
            }}
            style={{width:"80%",marginTop:"10px",marginBottom:"10px",backgroundColor:"#444444",color:"#FFFFFF",width:"80%",height:"50px"}} 
            variant={"outlined"}
          >
            Got It
          </Button>
        </div>

        <div className="actions" style={{margin:"auto",width:"100%"}}>
          <Button
            className="button"
            style={{marginTop:"10px",marginBottom:"15px",marginRight:"10px",marginLeft:"10px",backgroundColor:"#444444",color:"#FFFFFF",height:"50px"}} 
            variant={"outlined"}
            onClick={() => {
              close();
            }}
          >
            Got It
          </Button>
        </div>*/



        /*<TableContainer component={Paper} style={{backgroundColor:"#FFFFFF",height:harvestedTableHeight,overflowY:"hidden"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Harvested Plants</TableCell>
            <TableCell>Weight</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
            {harvestedPlants.map((row) => (
              <TableRow key={row.tag}>
              <TableCell>
                  <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{fontWeight:"bold"}}>{row.tag}</div>
                    <div>{row.strain}</div>
                  </div>  
              </TableCell>
              <TableCell>
                  {getWeightAndUnit(row.weight,row.unit)}
              </TableCell>
            </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <TableContainer component={Paper} style={{backgroundColor:"#FFFFFF",height:availableTableHeight,overflowY:"hidden"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Available Plants</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {availablePlants.map((row) => (
              <TableRow key={row.tag}>
              <TableCell>
                  <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{fontWeight:"bold"}}>{row.tag}</div>
                    <div>{row.strain}</div>
                  </div>  
              </TableCell>
            </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer> */