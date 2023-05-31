import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { spotAPI } from '../api/spot';

import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, Paper, Button, InputBase, Divider } from '@material-ui/core';
import SpotCard from '../components/SpotCard'
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    wholepage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 'auto'
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignSelf: 'center',
        width: 900,
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
    result: {
        width: 1200,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'left',
        overflow: 'auto'
    }
}));

const SpotResult = ({ user, setUser, searchKey, setSearchKey, spotList, setSpotList }) => {
    const classes = useStyles();

    // const spotList = [
    //     { name: '清水斷崖', location: '972花蓮縣秀林鄉', phone_number: '', rating: 4.7, src: 'https://www.hl-go.com.tw/images/beach.jpg' },
    //     { name: '國立臺灣大學', location: '10617台北市大安區羅斯福路四段1號', phone_number: '02 3366 3366', rating: 4.6, src: 'https://images.chinatimes.com/newsphoto/2021-11-04/656/20211104001129.jpg' },
    //     { name: '一中街夜市', location: '404台中市北區一中街', phone_number: '04 2223 7266', rating: 4.3, src: 'https://taichung.travel/content/images/attractions/31557/1024x768_image637090744523110300.jpg' },
    //     { name: '南寮魚鱗天梯', location: '300新竹市北區新港路', phone_number: '', rating: 4.1, src: 'https://tourism.hccg.gov.tw/tourism555/program_img/hot/hotL/2019082916321354736.jpeg' },
    //     { name: '陽明山國家公園', location: '5HV6+M9 北投區 台北市', phone_number: '02 2861 3601', rating: 4.5, src: 'https://www.ymsnp.gov.tw/upload/cont_att/4e3b534a-112c-4e69-a02a-f243ea3a9f18.jpg' },
    //     { name: '大稻埕碼頭廣場', location: '103台北市大同區', phone_number: '', rating: 4.4, src: 'https://www.taiwan.net.tw/att/1/big_scenic_spots/pic_A12-00004_6.jpg' },
    //     { name: '双生綠豆沙牛奶', location: '700台南市中西區民族路二段281號', phone_number: '06 221 0901', rating: 4.5, src: 'https://static.popdaily.com.tw/u/202201/b63f5a85-4553-425a-88d5-8b116c01a7e0.jpg' },
    //     { name: '小北家灶咖ZAOKA', location: '700台南市中西區郡緯街68號', phone_number: '', rating: 4.7, src: 'https://tenjo.tw/webp/wp-content/uploads/20210801152539_69.jpg.webp' },
    // ]

    const RenderResult = async () => {
        const result = await spotAPI.getSearch(searchKey)
        setSpotList(result)
        // console.log('user', user)
        // console.log('result', result)
    }
    useEffect(() => {
        RenderResult()
    }, []);

    useEffect(() => {
        console.log(spotList)
    }, [spotList])

    return (
        <div className={classes.wholepage}>
            <Paper component="form" elevation={4} className={classes.search}>
                <InputBase
                    className={classes.input}
                    placeholder="Search What You Want To Know"
                    inputProps={{ 'aria-label': 'search schedule or spot' }}
                    onChange={(inputValue) => { setSearchKey(inputValue.target.value) }}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    defaultValue={searchKey}
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
                </Button>
                <Divider className={classes.divider} orientation="vertical" /> */}
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
            <br />
            <br />
            <br />
            <div className={classes.result}>
                {spotList.length != 0 ?
                    (spotList.map((spot, index) => {
                        return (
                            <SpotCard spot={spot} user={user} setUser={setUser} key={index} />
                        )
                    }))
                    : (
                        <Typography variant='p'>
                            <p> No Result. </p><br />
                            <p> Please change your <b>keyword</b> or add a new spot in &nbsp;<Link to="/">Homepage</Link>. </p>
                        </Typography>
                    )
                }
            </div>
        </div>
    )
}

export default SpotResult;