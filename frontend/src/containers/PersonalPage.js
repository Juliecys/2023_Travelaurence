import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { userAPI } from '../api/user';
import {scheduleAPI} from '../api/schedule'
import TripCard from '../components/TripCard';
import CreateScheduleModal from '../components/CreateScheduleModal';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, CardActionArea } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    bar: {
        marginBottom: 'auto'
    },
    result: {
        display: 'flex',
        flexFlow: 'row wrap',
        overflow: 'auto',
        width: "100vw",
        marginLeft: "40px"
        // justifyContent: 'space-around',
    },
    wholePage: {
        display: 'flex',
        flexFlow: 'column nowrap',
        // justifyContent: 'center',
        alignItems: 'center',
    }
}))


const PersonalPage = ({user,setUser, setScheduleID, SCHEDULEKEY}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const [packageList, setPackageList] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [newScheduleName, setNewScheduleName] = useState('');

    function handleSchedule(id){

        navigate('/ownschedule')
        console.log("schedule id:", id)
        setScheduleID(id)
        localStorage.setItem(SCHEDULEKEY, id)
    }

    const fetchData = async () => {
        // console.log(user._id)
        const userData = await userAPI.indexOneUser(user._id)
        // console.log(userData)
        if(userData.data.schedule)
            setPackageList([...userData.data.schedule]);
    }
    useEffect(() => {
        if (user)
            fetchData();
    }, [user])

    const handleCreate = async () => {
        // console.log('name:', newScheduleName)
        // Click create a new schedule
        const sendData = {name: newScheduleName, user: user._id, publicToAll: true, detail: [] }
        const returnedData = await scheduleAPI.createSchedule(sendData)
        // console.log(returnedData)
        setPackageList([...packageList, returnedData])
        const { data, status } = await userAPI.indexOneUser(user._id)
        setUser(data)
        // console.log(packageList)
        setOpenCreate(false)
    }

    // useEffect(() => {
    //     console.log(packageList)
    // }, [packageList])
    const handleClose = () => {
        setOpenCreate(false)
    }
    return (
        <div className={classes.wholePage} style={{ height: '100%', backgroundColor: 'rgba(176, 224, 230, 0.4)' }}>
            <div className={classes.result}>
                <Card sx={{ width: 345 }} style={{ margin: '10px 20px' }} onClick={() => { setOpenCreate(true) }}>
                    <CardActionArea sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant='h5' align='center'><b> Click to <br /> create a new schedule </b></Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <CreateScheduleModal
                    open={openCreate}
                    handleCreate={handleCreate}
                    handleClose={handleClose}
                    newScheduleName={newScheduleName}
                    setNewScheduleName={setNewScheduleName}
                />
                {packageList.length === 0 ?
                    (<p style={{ color: '#ccc' }}> No character... </p>) :
                    (packageList.map((packages, index) => {
                        return (
                            <TripCard packages={packages} id={index} handleSchedule={handleSchedule}></TripCard>
                        )
                    }))
                }
            </div>
        </div>
    )
}

export default PersonalPage 