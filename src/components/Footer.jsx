import React, {useContext}from 'react';
import Box from '@mui/material/Box';
import { pages, checkPermissions } from './navbar/Navbar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { GeneralContext } from '../App';

const Footer = () => {
    const { userRoleType } = useContext(GeneralContext);

    return (
        <div className='footer-container splash-darker'>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', gap: '12rem' }}>
                {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                    <Link key={p.route} to={p.route} style={{ textDecoration: 'none'}}>
                        <Button 
                        className='splash-darker'
                        sx={{
                            my: 2,
                            color: '#282c36',
                            display: 'block'}}>
                        {p.title}
                        </Button>
                    </Link>
                ))}
            </Box>
        </div>

        
    );
}

export default Footer;