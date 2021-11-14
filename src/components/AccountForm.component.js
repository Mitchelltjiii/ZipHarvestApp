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

function AccountForm({refreshOuter, userID, setCurrentPage}) {

    const handleClick = (title) => {
      if(title==="Change Password"){
        console.log("Change Password Clicked")
      }else if(title==="Logout"){
        console.log("Logout Clicked")
      }else if(title==="Subscription"){
		setCurrentPage('subscription-form');
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
          width: "450px",
        },
      });

    

    const classes = useStyles();

    function createData(title, subtitle) {
      return {title, subtitle};
    }

    const rows = [];

    rows.push(createData("Email","Example@fl.com"));
    rows.push(createData("Change Password",""));
    rows.push(createData("Subscription",""));
    rows.push(createData("Permissions",""));
    rows.push(createData("About",""));
    rows.push(createData("Version","Beta Test v0.0.0"));
    rows.push(createData("Terms and Conditions",""));
    rows.push(createData("Privacy Policy",""));
    rows.push(createData("Support",""));
    rows.push(createData("Logout",""));

    return(
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">
              <div style={{fontSize: "25px"}}>Account</div>
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


export default AccountForm;

