import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
// import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Form, Button, Card, Grid, FormGroup, FormControl, InputLabel, Input } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import { Box, TextField, InputAdornment, Typography, Snackbar, Alert } from "@mui/material"
import { AccountCircle, Password, Email } from '@mui/icons-material'
// import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import api function
import { userAPI } from '../api/user';

import LoginBackgroundImage from '../components/pic/cote_d_azur_fr.jpeg';

// const StyledFormItem = styled(Form.Item)`
//     margin: 30px 0px;
//     text-align: left;
// `

const LOCALSTORAGE_KEY = "save-password";

const useStyled = makeStyles({
    formStyle: {
        margin: 'auto',
        padding: 20,
        paddingTop: 20,

    },
    boxStyle: {
        margin: '10px 0',
        width: '100%',
        // justifyContent: 'center'
    },
    text: {
        color: 'gray',
        fontWeight: 700,
        fontSize: 'large'
    }
})

export default function Login({ user, USERKEY, setUser }) {
    const saveUser = localStorage.getItem(LOCALSTORAGE_KEY)
    // const [form] = Form.useForm();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [login, setLogin] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);

    const usernameMaxLength = 12
    const passwordMaxLength = 12

    const navigate = useNavigate();

    useEffect(() => {
        if (login === true) {
            navigate('/personal');
        }
    }, [login])

    // 將username更新為上次登錄者
    useEffect(() => {
        console.log("login:" + login)
        try {
            localStorage.setItem(LOCALSTORAGE_KEY, name);
        } catch (err) {
            setName("" || saveUser)  // 將username更新為上次登錄者
        }
    }, [])

    const onFinish = async () => {
        // login 的 api function
        const loginResponse = await userAPI.signInCheck({ name: name, password: password, email: email })

        if (loginResponse.status === 200) {
            const { data, status } = await userAPI.indexOneUser(loginResponse.data._id)
            setUser(data)
            // console.log('login user', data)
            setLogin(true)
            localStorage.setItem(USERKEY, JSON.stringify(data))
        }
        else {
            setOpenAlert(true)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Received Error of form: ', errorInfo);
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = () => setOpenAlert(false);

    const classes = useStyled()
    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center',
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${LoginBackgroundImage})` }}>
            <Card style={{ width: '420px', textAlign: 'center', justifyContent: 'center', padding: '24px' }}>
                <Typography variant="h4" className={classes.title} style={{ fontWeight: 900, marginBottom: '15px' }}>TraveLaurence</Typography>
                <Typography variant='p' className={classes.text}> Welcome to TraveLaurence <br /> login to start the trip </Typography>
                <FormGroup className={classes.formStyle}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className={classes.boxStyle}>
                        <TextField id="input-with-sx"
                            label="使用者 Username"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{ maxLength: usernameMaxLength }} // 限制 Username 長度
                            style={{ width: '100%' }}
                            value={name}
                            onChange={(inputValue) => { setName(inputValue.target.value) }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className={classes.boxStyle}>
                        <TextField id="input-with-sx"
                            label="電子信箱 e-mail"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>
                                )
                            }}
                            // inputProps={{ maxLength: 12 }} // 限制 e-mail 長度
                            style={{ width: '100%' }}
                            value={email}
                            onChange={(inputValue) => { setEmail(inputValue.target.value) }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className={classes.boxStyle}>
                        <TextField id="input-with-sx"
                            label="密碼 Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Password />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            inputProps={{ maxLength: passwordMaxLength }} // 限制 Password 長度
                            style={{ width: '100%' }}
                            value={password}
                            onChange={(inputValue) => { setPassword(inputValue.target.value) }}
                        />
                    </Box>

                    <Button variant="contained" size="medium" style={{ marginTop: '15px' }} onClick={() => { onFinish() }}>
                        LogIn
                    </Button>
                </FormGroup>
                <Typography variant='p' style={{ color: 'gray' }} gutterBottom={true}>
                    <p>Don't have an account? &nbsp; </p>
                    <Link to="/register">Sign up </Link>
                </Typography>
            </Card>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openAlert}
                onClose={handleClose}
                key={'top-center'}
            >
                <Alert severity="error" onClose={handleClose}> Not Exist User (wrong email / name / password)</Alert>
            </Snackbar>
        </div>
    )
}
