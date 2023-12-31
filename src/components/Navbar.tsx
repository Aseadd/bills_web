import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';
// import AdbIcon from '@mui/icons-material/Adb';

import { NavLink } from 'react-router-dom';

const menuItems = [
      { label: 'Bills', to: '/bills' },
      { label: 'Add Bill', to: '/create-bill' },
      { label: 'Payment', to: '/payment' },
      { label: 'Reminder', to: '/reminder' },
      { label: 'Report', to: '/report' },
    ];
    const menuItemsA = [
      { label: 'Users', to: '/users' },
      { label: 'Add Users', to: '/create-user' },
    ];
    const menuItemsC = [
      { label: 'Bills', to: '/bills' },
      { label: 'Payment', to: '/payment' },
      { label: 'Reminder', to: '/reminder' },
      { label: 'Report', to: '/report' },
    ];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [currentIndex, setCurrentIndex] = useState("home");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const userType = localStorage.getItem('user_type');
  const roles: any[] = ['A', 'B', 'C'];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

const logout = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  navigate('/login');

};
  return (
    <AppBar position="static" sx={{ bgcolor: '#1565c0'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/bills"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
           Bills Management
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
              <NavLink
                className= "px-4 cursor-pointer"
                to="/subjects"
                onClick= {() => setCurrentIndex("Subjects")}
                >
                  <MenuItem key="Subjects">
                  <Typography textAlign="center" sx={{color: "white"}}>Subjects</Typography>
                </MenuItem>
              </NavLink>
              {/* {pages.map((page) => (
                  <NavLink 
                  className=" px-4 cursor-pointer"
                  to={page} >
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
                </NavLink>
              ))} */}
            </Menu>
          </Box>
         
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {userType === "B" &&  menuItems.map((page: any) => (
                  <NavLink
                    className={currentIndex === page.label ? "px-4 cursor-pointer text-red-400" : "px-4 cursor-pointer"}
                    to={page.to}
                    onClick= {() => setCurrentIndex(page.label)}
                    >
                  <Button
                    key={page.label}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block', fontWeight: 700, letterSpacing: '.3rem', textDecoration: 'none' }}
                  >
                    {page.label}
                  </Button>
                  </NavLink>
            ))}

          {userType === "C" &&  menuItemsC.map((page: any) => ( 
              <NavLink
                className={currentIndex === page.label ? "px-4 cursor-pointer text-red-400" : "px-4 cursor-pointer"}
                to={page.to}
                onClick= {() => setCurrentIndex(page.label)}
                >
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontWeight: 700, letterSpacing: '.3rem', textDecoration: 'none' }}
              >
                {page.label}
              </Button>
              </NavLink>
        ))}

        {userType === "A" &&  menuItemsA.map((page: any) => ( 
              <NavLink
                className={currentIndex === page.label ? "px-4 cursor-pointer text-red-400" : "px-4 cursor-pointer"}
                to={page.to}
                onClick= {() => setCurrentIndex(page.label)}
                >
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontWeight: 700, letterSpacing: '.3rem', textDecoration: 'none' }}
              >
                {page.label}
              </Button>
              </NavLink>
          ))}
          </Box>
          

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
            <Button
                key={"Logout"}
                onClick={logout}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Logout
              </Button>
            {/* <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;