import { useState, useContext } from 'react';
import { Link, useResolvedPath } from 'react-router-dom';
import SearchBar from './SearchBar';
import Splash from "./SplashScreen"
import { GeneralContext } from '../../App';
import {AppBar,Box,Toolbar,IconButton,Typography,Menu,Container,Avatar,Button,Tooltip,MenuItem,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { SearchContext } from '../../App';

export const RoleTypes = {
    none: 0,
    user: 1,
    business: 2,
    admin: 3,
};

export const checkPermissions = (permissions, userRoleType) => {
    return permissions.includes(userRoleType);
}

export const pages = [
    { route: '/about', title: 'About' },
    { route: '/cards/fav', title: 'Fav cards', permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin] },
    { route: '/cards/my-cards', title: 'My cards', permissions: [RoleTypes.business, RoleTypes.admin] },
    { route: '/admin/sandbox', title: 'Sandbox', permissions: [RoleTypes.admin] },
];

export default function Navbar({ userId }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { userRoleType, theme, setTheme } = useContext(GeneralContext);
    const path = useResolvedPath().pathname;
    const token = localStorage.getItem('x-auth-token');
    const { setSearchResults } = useContext(SearchContext);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

// const handleLogout = () => {
//     localStorage.removeItem('x-auth-token');
//     setUserRoleType(RoleTypes.none);
// };

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <AppBar className='splash-darker' sx={{ marginBottom: '2rem' }} position="static">
            <Container maxWidth="xl" style={{ width: '80vw', paddingLeft: '10px', paddingRight: '10px' }}>
                <Toolbar  disableGutters sx={{ width: '100%' }}>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            fontSize: '1.8rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BCards
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
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' }, }}
                        >
                            {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                                <Link key={p.route} to={p.route} style={{ textDecoration: 'none', color: 'black' }}>
                                    <MenuItem 
                                    onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">{p.title}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
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
                        <b>BCards</b>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                            <Link key={p.route} to={p.route} style={{ textDecoration: 'none', color: 'white' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                        backgroundColor: p.route === path ? 'cornflowerblue' : ''
                                    }}
                                >
                                    {p.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                        
                    <Box className='flex-gap' sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        <div className='search-bar' style={{ position: 'relative' }}>
                            <SearchBar handleSearchResults={handleSearchResults} />
                        </div>
                        

                        <Splash 
                        className=''
                        theme={theme} 
                        setTheme={setTheme} />

                        
                        {!token ? (
                            <div>
                                <Button component={Link} to="/auth/register" color="inherit">SIGNUP</Button>
                                <Button component={Link} to="/auth/login" color="inherit">LOGIN</Button>
                            </div>
                        ) : (
                        <>
                        <Tooltip title="Open settings">
                            <IconButton 
                            onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={"first"} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
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
                            <Link to="/account" style={{ textDecoration: 'none', color: 'black' }}>
                            </Link>
                            <MenuItem component={Link} to="/create" onClick={handleCloseUserMenu}>Create</MenuItem>
                            <MenuItem component={Link} to={`/auth/${userId}/edit`} onClick={handleCloseUserMenu}>Settings</MenuItem>
                            <MenuItem component={Link} to="/auth/logout" onClick={handleCloseUserMenu}>Logout</MenuItem>
                        </Menu>
                        </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}