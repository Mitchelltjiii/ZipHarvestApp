import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {isMobile} from 'react-device-detect';


function SubscriptionForm({userID, setCurrentPage, getUniqueIDCount,getFreeTrial,getFreeTrialEnds,getOutdoorOffer,
getSubscriptionType}) {

    const handleClick = (title) => {
      if(title==="Cancel Subscription"){
        setCurrentPage('end-subscription-form');
      }else if(title==="Upgrade Subscription"){
        setCurrentPage('change-subscription-form');
      }
	  }



    const [subscription,setSubscription] = React.useState([]);
    const [plantCount,setPlantCount] = React.useState("");

    let freeTrial = getFreeTrial();
    let outdoorOffer = getOutdoorOffer();
    console.log("Free trial: " + freeTrial);
    
    let subscriptionType = "";

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let renewalDate = "Renewal Date"
    if(JSON.stringify(subscription) !== "[]"){
      let newDate = new Date();
      newDate.setTime(Number(subscription.current_period_end)*1000);
      renewalDate = (newDate.toLocaleDateString(undefined, options));
      subscriptionType = subscription.items.data[0].price.lookup_key;
    }else{
      let newDate = new Date("12 1 2022");
      renewalDate = (newDate.toLocaleDateString(undefined, options));
      subscriptionType = getSubscriptionType();
    }
    

    if(freeTrial){
      renewalDate = "Free trial ends " + getFreeTrialEnds();
    }

    let possiblePlantCount = "";
    let subType = "";
    if(subscriptionType.includes("basic")){
      possiblePlantCount = "625";
      subType = "Basic";
    }else if(subscriptionType.includes("standard")){
      possiblePlantCount = "1250";
      subType = "Standard";
    }else if(subscriptionType.includes("premium")){
      possiblePlantCount = "2500";
      subType = "Premium";
    }else if(subscriptionType.includes("deluxe")){
      possiblePlantCount = "5000";
      subType = "Deluxe";
    }

    if(subscriptionType.includes("year")){
      subType += " Yearly";
    }else{
      subType += " Monthly"
    }

    if(subscriptionType==="Basic Fall 2022"){
      possiblePlantCount = "625";
      subType = subscriptionType;
    }else if(subscriptionType==="Standard Fall 2022"){
      possiblePlantCount = "1250";
      subType = subscriptionType;
    }else if(subscriptionType==="Premium Fall 2022"){
      possiblePlantCount = "2500";
      subType = subscriptionType;
    }else if(subscriptionType==="Deluxe Fall 2022"){
      possiblePlantCount = "5000";
      subType = subscriptionType;
    }

    if(freeTrial){
      subType = "Free Trial";
    }


    const Tab = ({title,subtitle}) => {
        return(
            <div>
                <Grid
				container
				direction="column"
  				justifyContent="center"
				alignItems="flex-start">
                    <div>
                        <div style={{fontSize: "17px", cursor: "pointer"}}>
                            <b>{title}</b>
		                </div>
                        <div style={{fontSize: "16px"}}>
                            {subtitle}
		                </div>
                    </div>
			    </Grid>
            </div>

        );
    };
	const useStyles = makeStyles({
        table: {
          minWidth: "300px",
        },
      });

    

    const classes = useStyles();

    function createData(title, subtitle) {
      return {title, subtitle};
    }

    const rows = [];

    rows.push(createData("Subscription Type",subType));
    if(!freeTrial){
      rows.push(createData("Unique Plant Tags Exported This Month",plantCount));
      rows.push(createData("Unique Plant Tags Per Month",possiblePlantCount));
    }
    rows.push(createData("Renewal Date",renewalDate));
    if(subType !== "Deluxe Monthly" && subType !== "Deluxe Yearly" && !freeTrial && !outdoorOffer){
      rows.push(createData("Upgrade Subscription",""));
    }
    if(!freeTrial && !outdoorOffer){
      rows.push(createData("Cancel Subscription",""));
    }

    async function getSubId(){
      const response = await fetch(`/get-subid/${userID}`);
      const json = await response.json();
      
      if(json !== undefined){
          getSubscription(json);
        }
    }

    async function getSubscription(subId){
      if(!subId.includes("outdoorx")){
        const response = await fetch(`/get-subscription/${subId}`);
        const json = await response.json();
        setSubscription(json);
      }
        setPlantCount(getUniqueIDCount());
    }

    if(JSON.stringify(subscription) === "[]" && !freeTrial){
      getSubId();
    }

    let formWidth = "500px";
    let formHeight = "500px";

    if(isMobile){
      formWidth = "100%";
    }

    return(
      <div id="subsctiption-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {isMobile ?
        <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">
              <div style={{fontSize: "21px"}}>Subscription</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow key={row.tag}>
                <TableCell onClick={() => handleClick(row.title)}>
                  <Tab title={row.title} subtitle={row.subtitle}></Tab>
                </TableCell>
            </TableRow>
            ))}
            </TableBody>
      </Table>
      </TableContainer>
                </div>
                :
                <div style={{width:formWidth,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">
              <div style={{fontSize: "21px"}}>Subscription</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow key={row.tag}>
                <TableCell onClick={() => handleClick(row.title)}>
                  <Tab title={row.title} subtitle={row.subtitle}></Tab>
                </TableCell>
            </TableRow>
            ))}
            </TableBody>
      </Table>
      </TableContainer>
        </div>
       }
		</div>
    );
}

/*
                Email
                Change Password
                Subscription - Type, Renewal date, Upgrade/Downgrade, End sub
			# of plants per month, # of plants this month
                Permissions
                About
                -Version
                -Terms and Conditions
                -Privacy Policy
                -Support
                Logout	  
*/		


export default SubscriptionForm;

