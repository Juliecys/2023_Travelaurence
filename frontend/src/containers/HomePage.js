import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {InputBase, Divider, Button, TextField, MenuItem,
        Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Grid } from '@mui/material';
import MyBackgroundImage from '../components/pic/Italy.jpg';
import { spotAPI } from '../api/spot';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        // width: 900,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    all: {
        padding: '8px 4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 1000,
        height: 700
    },
    result: {
        width: 900,
        height: 500,
        overflow: 'auto'
    },
    navbar: {
        width: '100vw'
    },
    picBar: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center'
    },
}));
  
const HomePage = ({setSearchKey}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [isEnter, setIsEnter] = useState(false);
    const [spotModalOpen, setSpotModalOpen] = useState(false);

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [location, setLocation] = useState("")
    const [phone, setPhone] = useState("")
    const [pic, setPic] = useState("")

    useEffect(() => {
        if (isEnter === true) {
            navigate('/spot_result')
        }
    }, [isEnter]);

    const handleSpotCreate = (e) => {
        e.preventDefault();
        setSpotModalOpen(true);
        setName("");
        setType("")
        setPhone("")
        setPic("")
        setLocation("")
    }
    const handleSubmit = async() => {
        const data = {
            name, type, location, phone, pic
        }
        await spotAPI.createSpot(data)
        setSpotModalOpen(false);
    }
    const GoToSpotResult = async (event) => {
        console.log(event)
        event.preventDefault()
        // console.log('search', search)
        setSearchKey(search)
        setIsEnter(true)
    }
    return (
        <>
            {/* <NavBar user={user}/> */}
            {/* <Paper className={classes.all}> */}
            {/* 標題 */}

            <div style={{
                backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)) , url(${MyBackgroundImage})`, width: '100vw', height: 'inherit', backgroundSize: 'cover'
                , backgroundPosition: '105px 0', backgroundRepeat: 'no-repeat'
            }} className={classes.picBar}>
                <Grid container>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={8}>
                        <div>
                            <h3 style={{ fontWeight: 900 }}>歡迎來到 TraveLaurence</h3>
                            <p>這是一個兼具行程安排跟景點評論的地方</p>
                        </div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={9}>
                        <Paper component="form" elevation={4} className={classes.root}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search What You Want To Know"
                                inputProps={{ 'aria-label': 'search schedule or spot' }}
                                value={search}
                                onChange={(inputValue) => { setSearch(inputValue.target.value) }}
                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            {/* <Button
                                color="default"
                                className={classes.iconButton}
                                aria-label="search schedule"
                                startIcon={<SearchIcon />}
                                disabled
                            >
                                找行程
                            </Button> */}
                            {/* <Divider className={classes.divider} orientation="vertical" /> */}
                            <Button
                                color="default"
                                type='button'
                                className={classes.iconButton}
                                aria-label="search spot"
                                startIcon={<SearchIcon />}
                                onClick={GoToSpotResult}
                            >
                                找店家
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3}>
                        <Button onClick={handleSpotCreate}>Add a Spot</Button>                        
                    </Grid>
                </Grid>
            </div>

            <Dialog open={spotModalOpen} onClose={()=>setSpotModalOpen(false)} onSubmit={handleSubmit}>
                <DialogTitle>新增景點/餐廳</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    沒有找到嗎？來新增一個吧！
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="normal"
                    id="name"
                    label="Name"
                    fullWidth
                    variant="standard"
                    onChange={(e)=>setName(e.target.value)}
                />
                <TextField
                    labelId="spottype"
                    id="spottype"
                    label="Type"
                    margin="normal"
                    value={type}
                    fullWidth
                    select
                    onChange={(e)=>setType(e.target.value)}
                >
                    <MenuItem value={"restaurant"}>餐廳</MenuItem>
                    <MenuItem value={"hotel"}>住宿</MenuItem>
                    <MenuItem value={"scene"}>景點</MenuItem>
                </TextField>
                <TextField
                    autoFocus
                    margin="normal"
                    id="pic"
                    label="Pic_url"
                    fullWidth
                    variant="standard"
                    onChange={(e)=>setPic(e.target.value)}
                />                
                <TextField
                    autoFocus
                    margin="normal"
                    id="location"
                    label="Location"
                    fullWidth
                    variant="standard"
                    onChange={(e)=>setLocation(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="normal"
                    id="phone"
                    label="Phone"
                    fullWidth
                    variant="standard"
                    onChange={(e)=>setPhone(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>setSpotModalOpen(false)}>Cancel</Button>
                <Button type='submit' onClick={handleSubmit}>Confirm</Button>
                </DialogActions>
            </Dialog>
            
            {/* 搜尋欄 */}
            {/* 複製搜尋欄到上面 */}
            {/* <Paper component="form" elevation={4} className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Search What You Want To Know"
                    inputProps={{ 'aria-label': 'search schedule or spot' }}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <Button
                    color="default"
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search schedule"
                    startIcon={<SearchIcon />}
                >
                    找行程
                </Button>
                <Divider className={classes.divider} orientation="vertical" />
                <Button
                    color="default"
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search spot"
                    startIcon={<SearchIcon />}
                >
                    找店家
                </Button>
            </Paper>*/}
            {/* <br />
            <Paper className={classes.result} > 
                <SpotTable />
            </Paper>  */}
            {/* </Paper> */}
        </>
    )
}

export default HomePage;