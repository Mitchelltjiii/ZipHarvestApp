import React from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Header({currentPageSet, currentPage}){
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose()
  }

  const handleMyAccount = () => {
    handleClose()
  }

  const handleHarvestNow = () => {
    handleClose()
    currentPageSet('harvest-form')
  }

  const handleExistingBatches = () => {
    handleClose()
    currentPageSet('harvest-batches-form')
  }

    return(
        <div>
            <div>
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
        <MenuItem onClick={()=>{handleExistingBatches() }}>Existing Batches</MenuItem>
        <MenuItem onClick={()=>{handleMyAccount() }}>My account</MenuItem>
        <MenuItem onClick={()=>{}}>Logout</MenuItem>
      </Menu>
    </div>
            
        </div>

    )

}

export default Header