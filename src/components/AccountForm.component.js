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

function AccountForm({userID, setCurrentPage, setFromAccountSettings,executeLogout,executePrint}) {

    const handleClick = (title) => {
      if(title==="Change Password"){
        setFromAccountSettings(true);
        setCurrentPage('reset-password-form');
      }else if(title==="Subscription"){
		    setCurrentPage('subscription-form');
	    }else if(title==="Terms of Service"){
        window.open("https://app.termly.io/document/terms-of-use-for-saas/0fc8020f-e374-48f6-b222-fdaa3d482d39", '_blank');
      }else if(title==="Privacy Policy"){
        window.open("https://app.termly.io/document/privacy-policy/a880128c-82ae-40b1-bec3-7d5b495a1d24", '_blank');
      }else if(title==="Log Out"){
        executeLogout();
      }else if(title==="Print"){
        setCurrentPage('print-page');
      }
	  }
    
    const [email,setEmail] = React.useState('');
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
    rows.push(createData("Email",email));
    rows.push(createData("Change Password",""));
    //rows.push(createData("Subscription",""));
    //rows.push(createData("Permissions",""));
    //rows.push(createData("About",""));
    rows.push(createData("Version","v0.0.0"));
    rows.push(createData("Terms of Service",""));
    rows.push(createData("Privacy Policy",""));
/*rows.push(createData("Support","Zipharvest-Support@flora-sol.com"));*/
  if(userID === "Mitchelltj35"){  
    rows.push(createData("Print",""));
  }
    rows.push(createData("Log Out",""));
    async function getEmail(){
      const response = await fetch(`/get-email/${userID}`);
      const text = await response.text();
      let str = text;
      let textWithoutQuotes = str.substring(1,str.length-1);

      setEmail(textWithoutQuotes);
    }

    if(email === ""){
      getEmail();
    }

    

    let formWidth = "500px";
    let formHeight = "450px";

    if(isMobile){
      formWidth = "100%";
    }

    if(isMobile){
      return(
          <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
              <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell align="left">
                <div style={{fontSize: "21px"}}>Account</div>
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
      );
    }else{
      return(
        <div id="subsctiption-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
        <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
  <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell align="left">
                <div style={{fontSize:"21px"}}>Account</div>
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
      </div>
      );
    }
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


export default AccountForm;

