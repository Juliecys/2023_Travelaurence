import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
    const navigate = useNavigate();
    function handleLogin() {
        setUser(null)
        navigate('/login')
        localStorage.clear()
    };

    function handleHome() {
        navigate('/')
    }

    function handlePersonal() {
        navigate('/personal')
    }

    function handleSchedule() {
        navigate('/ownschedule')
    }

    return (
        <AppBar position='static' style={{ width: '100vw', background: 'white' }} elevation={0}>
            <Toolbar>
                <IconButton size='large' edge='start' aria-label='logo' onClick={handleHome}>
                    <TravelExploreRoundedIcon />
                </IconButton>
                <Typography style={{ color: '#17202A', cursor: 'pointer' }} varient='h6' component='div' sx={{ flexGrow: 1 }} onClick={handleHome} >
                    TraveLaurence
                </Typography>
                <Stack direction='row' spacing={2}>
                    {/* <Button style={{ color: '#17202A' }} onClick={user ? handleSchedule : handleLogin}>Schedule</Button> */}
                    {/* <Button style={{ color: '#17202A' }}>About</Button> */}
                    {(!user) ?
                        (<Button style={{ color: '#17202A' }} onClick={handleLogin}>Login</Button>)
                        : (
                            <Button style={{ color: '#17202A' }} onClick={handleLogin}>Logout</Button>
                        )}
                    <Button style={{ color: '#17202A' }} onClick={user ? handlePersonal : handleLogin}><PersonIcon /></Button>
                    {/* <Button style={{color: '#17202A'}} onClick={handleLogin}>Log In</Button> */}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar