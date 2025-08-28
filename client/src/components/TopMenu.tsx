//import * as React from 'react';
import Button from '@mui/material/Button';
//import Menu from '@mui/material/Menu';
//import MenuItem from '@mui/material/MenuItem';
import { Link, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";

export default function TopMenu() {
  const location = useLocation();
  //const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //const open = Boolean(anchorEl);
  
  return (
    <div>
      <Stack direction="row" spacing={2} justifyContent="center">
      <Button
        component={Link}
        to="/novels"
        variant={location.pathname === "/novels" ? "contained" : "outlined"}
        id="novels"
      >
        Novels
      </Button>
     
      <Button
        component={Link}
        to="/shortstories"
        variant={location.pathname === "/shortstories" ? "contained" : "outlined"}
        id="shortstories"
      >
        Short Stories
      </Button>
     
      <Button
        component={Link}
        to="/plays"
        variant={location.pathname === "/plays" ? "contained" : "outlined"}
        id="plays"
      >
        Plays
      </Button>
      </Stack>
    </div>
  );
}


{/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu> */}