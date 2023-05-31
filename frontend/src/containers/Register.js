import React, { useState, useEffect } from 'react'
// import { Card } from 'antd';
// import { Col, Row } from 'antd';
// import { Typography } from 'antd';
// import { Button, Form, Input } from 'antd';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Form, Button, Card, Grid, FormGroup, FormControl, InputLabel, Input } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import { Box, TextField, InputAdornment, Typography, Snackbar, Alert } from "@mui/material"
import { AccountCircle, CloudOff, Password, Check, Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import IconButton from '@mui/material/IconButton';

// 要 import api function
import { userAPI } from '../api/user'

import RegisterBackgroundImage from '../components/pic/mmm.jpeg';

// const StyledFormItem = styled(Form.Item)`
//     margin: 30px 0px;
//     text-align: left;
// `

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
    },
    title: {
        marginBottom: '20px'
    }
})

export default function Register() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [isSame, setIsSame] = useState(false)
    const usernameMaxLength = 12
    const passwordMaxLength = 12
    // const [ form ] = Form.useForm();
    // ------------------------------------------------------------------------
    // 要重新 import api 檔案的 function
    // const { register, registerToBE } = useChat();
    // ------------------------------------------------------------------------

    // test useState variable -> delete after modify api
    const [register, setRegister] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    // ------------------------------------------------------

    const navigate = useNavigate();

    const classes = useStyled()

    useEffect(() => {
        if (register === true) {
            navigate('/')
        }
    }, [register])

    useEffect(() => {
        if (password !== confirm)
            setIsSame(true)
        else
            setIsSame(false)
    }, [password, confirm])

    const onFinish = async () => {
        // register 的 api function
        const { data, status } = await userAPI.signUpNewUser({ name: name, password: password, email: email })
        console.log('signup status:', status)
        if (status === 200) {
            setRegister(true)
        }
        else {
            setOpenAlert(true)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Received Error of form: ', errorInfo);
    };

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseDownPassword2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClose = () => setOpenAlert(false);

    return (
        <div style={{
            height: '100%', width: '100%', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center',
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${RegisterBackgroundImage})`
        }}>
            <Card style={{ width: '420px', textAlign: 'center', justifyContent: 'center', padding: '24px' }}>
                <Grid>
                    <Typography variant="h4" className={classes.title} style={{ fontWeight: 900, marginBottom: '15px' }}>TraveLaurence</Typography>
                    <Typography variant='p' className={classes.text}>Sign up to get an access to Travelaurence.</Typography>
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
                                type={showPassword2 ? 'text' : 'password'}
                                variant="outlined"
                                // type="password"
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
                                                onClick={handleClickShowPassword2}
                                                onMouseDown={handleMouseDownPassword2}
                                                edge="end"
                                            >
                                                {showPassword2 ? <VisibilityOff /> : <Visibility />}
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
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className={classes.boxStyle}>
                            <TextField id="input-with-sx"
                                error={isSame}
                                helperText={isSame ? "Please confirm your password!" : ""}
                                label="密碼確認 Confirmed Password "
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                // type="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Check />
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
                                value={confirm}
                                onChange={(inputValue) => { setConfirm(inputValue.target.value) }}
                            />
                        </Box>
                        <Button variant="contained" size="medium" style={{ marginTop: '15px' }} disabled={isSame} onClick={() => { onFinish() }}>
                            Register
                        </Button>
                    </FormGroup>
                    <Typography variant='body1' style={{ color: 'gray', display: 'block' }} gutterBottom={true}>
                        Already have an account? &nbsp;
                        <Link to="/login">Login </Link>
                    </Typography>
                    <Typography variant='body1' style={{ color: 'gray' }} gutterBottom={true}>
                        By signing up, you are agree to our <b>Terms</b>, <b>Data Policy</b> and <b>Cookies Policy</b>.
                    </Typography>
                </Grid>
            </Card>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openAlert}
                onClose={handleClose}
                key={'top-center'}
            >
                <Alert severity="error" onClose={handleClose}> Already Exist Name / Email </Alert>
            </Snackbar>
        </div>
    )
}
