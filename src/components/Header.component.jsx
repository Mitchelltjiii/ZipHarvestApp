import React from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {isMobile} from 'react-device-detect';


function Header({setCurrentPage}){
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    handleClose()
    setCurrentPage('account-form');
  }

  const handleHarvestNow = () => {
    handleClose()
    setCurrentPage('harvest-form')
  }

  const handleManagePlants = () => {
    handleClose()
    setCurrentPage('manage-plants-form')
  }
  const handleManageDryRooms = () => {
    handleClose()
    setCurrentPage('manage-dry-rooms-form')
  }

  const handleExistingBatches = () => {
    handleClose()
    setCurrentPage('harvest-batches-form')
  }

  const handleTutorial = () => {
    handleClose()
    setCurrentPage('tutorial-form')
  }

  let headerWidth = "650px";
  if(isMobile){
    headerWidth = "340px";
  }

    return(
            <div style={{margin:"auto",width:headerWidth}}>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{handleHarvestNow() }}>Harvest Now</MenuItem>
        <MenuItem onClick={()=>{handleExistingBatches() }}>Harvest Batches</MenuItem>
        <MenuItem onClick={()=>{handleManagePlants() }}>Manage Plants</MenuItem>
        <MenuItem onClick={()=>{handleManageDryRooms() }}>Manage Dry Rooms</MenuItem>
        <MenuItem onClick={()=>{handleMyAccount() }}>My Account</MenuItem>
        <MenuItem onClick={()=>{handleTutorial() }}>Tutorial</MenuItem>
      </Menu>
    </div>
            

    )
}

export default Header;
