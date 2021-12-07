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


function SubscriptionForm({refreshOuter, userID, setCurrentPage, getUniqueIDCount}) {

    const handleClick = (title) => {
      if(title==="Cancel Subscription"){
        setCurrentPage('end-subscription-form');
      }else if(title==="Change Subscription"){
        setCurrentPage('change-subscription-form');
      }
	  }

    const [subscription,setSubscription] = React.useState([]);
    const [plantCount,setPlantCount] = React.useState("");
    
    let subscriptionType = "";

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let renewalDate = "Renewal Date"
    if(JSON.stringify(subscription) !== "[]"){
      let newDate = new Date();
      newDate.setTime(Number(subscription.current_period_end)*1000);
      renewalDate = (newDate.toLocaleDateString(undefined, options));
      subscriptionType = subscription.items.data[0].price.lookup_key;
    }

    let possiblePlantCount = "";
    let subType = "";
    if(subscriptionType === "basic"){
      possiblePlantCount = "2000";
      subType = "Basic";
    }else if(subscriptionType === "standard"){
      possiblePlantCount = "5000";
      subType = "Standard";
    }else if(subscriptionType === "premium"){
      possiblePlantCount = "10000";
      subType = "Premium";
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
    rows.push(createData("Unique Plant Tags Exported This Month",plantCount));
    rows.push(createData("Unique Plant Tags Per Month",possiblePlantCount));
    rows.push(createData("Renewal Date",renewalDate));
    rows.push(createData("Change Subscription",""));
    rows.push(createData("Cancel Subscription",""));

    async function getSubId(){
      const response = await fetch(`/get-subid/${userID}`);
      const json = await response.json();
      
      if(json !== undefined){
          getSubscription(json);
        }
    }

    async function getSubscription(subId){
      const response = await fetch(`/get-subscription/${subId}`);
      const json = await response.json();
      setSubscription(json);
      setPlantCount(getUniqueIDCount());
    }

    if(JSON.stringify(subscription) === "[]"){
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
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
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

