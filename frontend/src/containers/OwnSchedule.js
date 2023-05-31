import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { userAPI } from '../api/user';
import { spotAPI } from '../api/spot';
import { scheduleAPI } from '../api/schedule';

import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Typography from '@material-ui/core/Typography';
import NavBar from './NavBar';
import { AppBar, Box, Grid, Backdrop, IconButton } from '@mui/material';
import { List, ListItem, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import eatPic from '../components/pic/eat.jpg'
import { margin, padding } from '@mui/system';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ScheduleCard from '../components/ScheduleCard';
import SpotCard from '../components/SpotCard'
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SendIcon from '@mui/icons-material/Send';
import Rating from '@mui/material/Rating';

import AddToScheduleModal from '../components/AddToScheduleModal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Router, Schedule } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    bar: {
        marginBottom: 'auto'
    },
    category: {
        display: 'flex',
        flexFlow: 'row nowrap',
        width: '100vw',
        height: "100%",
        justifyContent: 'center'
    },
    wholePage: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'max-content'
    },
    card: {
        width: '276px',
        height: 180,
        margin: '20px 0 20px 16px',
        cursor: 'pointer'
    },
    cardContent: {
        padding: '0px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardContext: {
        fontWeight: 900
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignSelf: 'center',
        width: '100%',
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
    modal: {
        width: '700px'
    },
    buttonArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '50%',
        margin: '30px 0',
        height: '62px'
    }
}))

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const OwnSchedule = ({ user, setUser, searchKey, setSearchKey, spotList, setSpotList, scheduleID, USERKEY }) => {
    const classes = useStyles();

    function removeObjectInWishList(arr, id_value) {
        return arr.filter(function (ele) {
            // console.log('ele:', ele._id)
            return ele._id != id_value;
        });
    }

    const deleteFromWishList = async (remove_id) => {
        const tempList = user.wishlist
        const updateList = removeObjectInWishList(tempList, remove_id)
        const response = await userAPI.updateUserWishlist({ id: user._id, wishlist: updateList })
        const { data, status } = await userAPI.indexOneUser(user._id)
        setUser(data)
        // whether need to delete from schedule ??
    }

    // control Tab
    const [value, setValue] = React.useState('1');

    const cardWidth = 300
    const cardHeight = 50

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // control modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setSearchKey('')
        setSpotList([])
        setOpen(false);
    };

    // Controll search inside Modal
    const [searchType, setSearchType] = useState('')
    const RenderResult = async () => {
        const result = await spotAPI.getSearch(searchKey)
        setSpotList(result)
    }
    
    const [dateStart, setDateStart] = useState('hellllllo')
    const [dateEnd, setDateEnd] = useState(new Date())

    const [showSpot, setShowSpot] = useState({ _id: '', name: '', location: '', phone: '', src: '', rating: 0 })
    const showSpotInfo = async (wish) => {
        const tempSpot = await spotAPI.indexOneSpot(wish._id)
        console.log('temp:', tempSpot)
        let totalRating = 0
        tempSpot.review.map((review, index) => {
            totalRating += review.rating
        })
        totalRating = totalRating / tempSpot.review.length

        setShowSpot({ _id: tempSpot._id, name: tempSpot.name, location: tempSpot.location, phone: tempSpot.phone, src: tempSpot.pic, rating: totalRating })
        // console.log('ShowSpot', showSpot)
    }

    const [publicPac, setPublicPac] = useState(true)
    const handlePublicChange = (event) => {
        setPublicPac(event.target.checked)
    }

    // useEffect(()=>{
    //     console.log('publicPac', publicPac)
    // },[publicPac])

    const [openAddModal, setOpenAddModal] = useState(false)
    const closeAddModal = () => {
        setOpenAddModal(false)
    }
    // add to schedule
    const addToSchedule = () => {
        // add to schedule api
        setOpenAddModal(false)
        console.log({ startDate: spotStartTime.toISOString(), endDate: spotEndTime.toISOString(), title: showSpot.name, spot: showSpot._id, time: spotStartTime.toISOString() })
        setDetail([...detail, { startDate: spotStartTime.toISOString(), endDate: spotEndTime.toISOString(), title: showSpot.name, spot: showSpot._id, time: spotStartTime.toISOString() }])
    }

    // save journey
    const SaveJourney = async () => {
        console.log("saved")
        const result = { detail: [...user.schedule[scheduleID].detail, ...detail] }
        // console.log("correct form", result)
        const testSchedule = {name: user.schedule[scheduleID].name, user: user._id, publicToAll: !publicPac}
        console.log(testSchedule)
        const packet = { id: user.schedule[scheduleID]._id, ...testSchedule, ...result }
        // console.log("sent data",packet)
        const sentData = await scheduleAPI.updateSchedule(packet)
        // console.log("returned data", sentData)
        const { data, status } = await userAPI.indexOneUser(user._id)
        // console.log("newUser", data)
        // let updateUser = user
        // updateUser.schedule = newSchedule
        setUser(data)
        localStorage.setItem(USERKEY, JSON.stringify(data))
    }


    // Add To Schedule Modal Time
    const [spotStartTime, setSpotStartTime] = useState(new Date());
    const [spotEndTime, setSpotEndTime] = useState(new Date());
    // useEffect(() => {
    //     console.log('start:', spotStartTime)
    //     console.log('end:', spotEndTime)
    // }, [spotStartTime, spotEndTime]);


    // 暫存data
    // Input: {"name": "行程一", "user": "63af1b9aa2648aba52f0a5fd", "publicToAll": Boolean(is default true), "detail": [{"time": "9:00-15:00", "spot": "63b277cadadddead5d39f677"}] }
    // const [tempSchedule, setTempSchedule] = useState({ name: "好玩的行程", user: "63af1b9aa2648aba52f0a5fd", publicToAll: true });
    const [detail, setDetail] = useState([])


    // useEffect(()=> {
    //     if(user){
    //         setSchedule(user.schedule[scheduleID])
    //         // console.log("check:", user.schedule[scheduleID])
    //         setDetail(user.schedule[scheduleID].detail)
    //         // console.log("DETAIL",user.schedule[scheduleID].detail)
    //     }
    //     console.log(user)
    // },[user])

    // useEffect(() =>{
    //     console.log(detail)
    // }, [detail])

    return (
        <>
            {/* <NavBar></NavBar> */}
            <div className={classes.wholePage} style={{ backgroundColor: 'rgba(176, 224, 230, 0.4)' }}>
                <div style={{ height: '100px', width: '100%', display: 'flex', justifyContent: 'space-evenly', marginRight: '1vw' }}>
                    <div className={classes.category}>
                        <Card sx={{ width: cardWidth, height: cardHeight }} className={classes.card} onClick={() => { handleOpen(); setSearchType('scene') }} >
                            {/* <CardMedia
                                sx={{ height: 140 }}
                                image={`${eatPic}`}
                                title="green iguana"
                            /> */}
                            <CardActionArea className={classes.cardContent} style={{ padding: '9px 0px 0px 0px' }}>
                                <Typography gutterBottom variant="h5" component="div" sx={{ height: 40 }} className={classes.cardContext}>
                                    景點
                                </Typography>
                            </CardActionArea>
                        </Card>
                        <Card sx={{ width: cardWidth, height: cardHeight }} className={classes.card}>
                            {/* <CardMedia
                                sx={{ height: 140 }}
                                image={`${eatPic}`}
                                title="green iguana"
                            /> */}
                            <CardActionArea className={classes.cardContent} style={{ padding: '9px 0px 0px 0px' }} onClick={() => { handleOpen(); setSearchType('hotel') }} >
                                <Typography gutterBottom variant="h5" component="div" sx={{ height: 40 }} className={classes.cardContext}>
                                    住宿
                                </Typography>
                            </CardActionArea>
                        </Card>
                        <Card sx={{ width: cardWidth, height: cardHeight }} className={classes.card}>
                            {/* <CardMedia
                                sx={{ height: 140 }}
                                image={`${eatPic}`}
                                title="green iguana"
                            /> */}
                            <CardActionArea className={classes.cardContent} style={{ padding: '9px 0px 0px 0px' }} onClick={() => { handleOpen(); setSearchType('restaurant') }}>
                                <Typography gutterBottom variant="h5" component="div" sx={{ height: 40 }} className={classes.cardContext}>
                                    餐廳
                                </Typography>
                            </CardActionArea>
                        </Card>
                        <Dialog
                            // hideBackdrop
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="child-dialog-title"
                            aria-describedby="child-dialog-description"
                            maxWidth="md"
                            fullWidth
                            scroll='paper'
                        >
                            <DialogTitle>
                                {/* <Box sx={{ ...style, width: 700 }} className={classes.modal}> */}
                                <Paper component="form" elevation={4} className={classes.search}>
                                    <InputBase
                                        className={classes.input}
                                        defaultValue={searchKey}
                                        placeholder="Search What You Want To Know"
                                        inputProps={{ 'aria-label': 'search schedule or spot' }}
                                        onChange={(inputValue) => { setSearchKey(inputValue.target.value) }}
                                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                    />
                                    <Divider className={classes.divider} orientation="vertical" />
                                    <Button
                                        color="default"
                                        className={classes.iconButton}
                                        aria-label="search spot"
                                        startIcon={<SearchIcon />}
                                        onClick={RenderResult}
                                    >
                                        找店家
                                    </Button>
                                </Paper>
                            </DialogTitle>
                            <Divider sx={{ borderBottomWidth: 5 }} />
                            <DialogContent>
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                    {spotList.map((spot, index) => {
                                        if (searchType === spot.type) {
                                            return <SpotCard spot={spot} user={user} setUser={setUser} key={index} />
                                        }
                                        else {
                                            return <></>
                                        }
                                    })
                                    }
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div style={{ width: '100vw', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'self-end' }}>
                    <div></div>
                    {user ? (<Typography variant='h2' sx={{ fontWeight: 'bold' }}> {user.schedule[scheduleID].name} </Typography>) : (<></>)}
                    <div className={classes.buttonArea}>
                        <div>
                            <FormGroup>
                                <FormControlLabel control={<Switch defaultChecked checked={publicPac} onChange={handlePublicChange} />} label="旅程是否設為私人" />
                            </FormGroup>
                        </div>
                        <br />
                        <br />
                        <div>
                            <Button variant="contained" color='primary' endIcon={<SendIcon />} onClick={SaveJourney}>保存旅程</Button>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div>
                    <Box sx={{ width: '100vw', typography: 'body1' }} style={{ marginLeft: '20px', marginRight: '20px' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="你的行程" value="1" />
                                    <Tab label="願望清單" value="2" />
                                    {/* <Tab label="Item Three" value="3" /> */}
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                {user ? (<ScheduleCard dateStart={dateStart} dateEnd={dateEnd} detail={[...user.schedule[scheduleID].detail, ...detail]} ></ScheduleCard>) : (<div></div>)}
                            </TabPanel>
                            <TabPanel value="2">
                                <Stack direction="row" spacing={5}>
                                    <Paper style={{ width: '50%', height: '50vh' }} >
                                        <List style={{ height: '100%', overflow: 'auto' }} >

                                            {user ? (user.wishlist.map((wish, index) => {
                                                // console.log(user.wishlist)
                                                return (
                                                    <ListItemButton divider
                                                        onClick={() => { showSpotInfo(wish) }}
                                                    >
                                                        <ListItemText
                                                            primary={wish.name}
                                                        />
                                                        <IconButton>
                                                            <AddIcon onClick={() => { setOpenAddModal(true) }} />
                                                        </IconButton>
                                                        <IconButton edge="end" aria-label="delete">
                                                            <DeleteIcon onClick={() => { deleteFromWishList(wish._id) }} />
                                                        </IconButton>
                                                    </ListItemButton>)
                                            })) : (<></>)
                                            }
                                        </List>
                                    </Paper>

                                    <Card style={{ width: '50%', height: '100%' }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Spot Picture"
                                                height="140"
                                                image={showSpot.src}
                                                title="Spot Picture"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {showSpot.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    地址：{showSpot.location}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    電話：{showSpot.phone}
                                                </Typography>
                                                <br />
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'self-end' }}>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        評分：
                                                    </Typography>
                                                    <Rating name="read-only" value={showSpot.rating} precision={0.1} readOnly />
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Stack>
                                <AddToScheduleModal
                                    openAddModal={openAddModal}
                                    closeAddModal={closeAddModal}
                                    showSpot={showSpot}
                                    addToSchedule={addToSchedule}
                                    spotStartTime={spotStartTime}
                                    setSpotStartTime={setSpotStartTime}
                                    spotEndTime={spotEndTime}
                                    setSpotEndTime={setSpotEndTime}
                                />
                            </TabPanel>
                            {/* <TabPanel value="3">Item Three</TabPanel> */}
                        </TabContext>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default OwnSchedule