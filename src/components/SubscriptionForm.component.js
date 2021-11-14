import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function SubscriptionForm({refreshOuter, userID, setCurrentPage}) {

    const handleClick = (title) => {
      if(title==="Change Password"){
        console.log("Change Password Clicked")
      }else if(title==="Logout"){
        console.log("Logout Clicked")
      }
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
                        <div style={{fontSize: "22px", cursor: "pointer"}}>
                            <b>{title}</b>
		                </div>
                        <div style={{fontSize: "21px"}}>
                            {subtitle}
		                </div>
                    </div>
			    </Grid>
            </div>

        );
    };
	const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    

    const classes = useStyles();

    function createData(title, subtitle) {
      return {title, subtitle};
    }

    const rows = [];

    rows.push(createData("Subscription Type","Premium"));
    rows.push(createData("Unique Plant Tags Exported This Month",""));
    rows.push(createData("Unique Plant Tags Per Month",""));
    rows.push(createData("Renewal Date",""));
    rows.push(createData("Change Subscription",""));
    rows.push(createData("End Subscription",""));

    return(
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">
              <div style={{fontSize: "25px"}}>Subscription</div>
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

