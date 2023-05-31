import React, { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
import { scheduleAPI } from '../api/schedule';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
//     })
//     (({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//     }),
// }));


const TripCard = ({packages, id, handleSchedule}) => {
    // const [expanded, setExpanded] = useState(false);
    const [details, setDetails] = useState([])
    const fetchData = async() => {
        const schedules = await scheduleAPI.indexOne(packages._id);
        setDetails([...schedules.detail])
        // console.log(schedules)
    }
    const makeDetail = (details) => {
        let ret = "";
        for(let i = 0;i < details.length;i++){
            ret += details[i].spot.name;
            ret += ", "
            if(i === 1)
                break;
        }

        ret += "..."
        return ret;
    };
    
    useEffect(() => {
        fetchData();
    }, [])

    // const handleExpandClick = () => {
    // setExpanded(!expanded);
//   };

  return (
    <Card sx={{ width: 345 }} style={{margin: '10px 20px'}}>
        <CardHeader
            // action={
            // <IconButton aria-label="settings">
            //     <MoreVertIcon />
            // </IconButton>
            // }
            title={packages.name}
            // subheader="September 14, 2016"
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
               {makeDetail(details)}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>            
            <Button size="small" style={{marginLeft:'auto'}} onClick={() => handleSchedule(id)}>詳細行程</Button>
        </CardActions>
    </Card>
  );
}

export default TripCard