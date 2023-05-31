import React, { useState, useEffect } from 'react';
import {
  Card, CardActionArea, CardActions, CardContent, CardMedia,
  Button, Typography, makeStyles,
  Dialog, DialogContent, DialogTitle,
  List, ListItem, ListItemText
} from '@material-ui/core/';
import { Box, Rating, TextField, Snackbar, Alert, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';

import { userAPI } from '../api/user';
import { reviewAPI } from '../api/review';
import defaultPic from './pic/Italy.jpg';
import YourReviewItem from './YourReviewItem';

const useStyles = makeStyles({
  root: {
    width: 360,
    margin: 20
  },
});

const labels = {
  0: '0.0',
  0.5: '0.5',
  1: '1.0',
  1.5: '1.5',
  2: '2.0',
  2.5: '2.5',
  3: '3.0',
  3.5: '3.5',
  4: '4.0',
  4.5: '4.5',
  5: '5.0',
};

export default function SpotCard({ spot, user, setUser }) {
  const classes = useStyles();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  const [commentList, setCommentList] = useState([]);
  const [commentContent, setCommentContent] = useState('');

  const SendComments = async () => {
    // console.log('user:', user._id, 'spot:', spot._id, 'content:', commentContent, 'rating:', value)
    const newComment = await reviewAPI.createReview({ user: user._id, spot: spot._id, content: commentContent, rating: value })
    // console.log('newComment', newComment)
    setCommentList([...commentList, newComment])
    setOpenSuccess(true)
    setValue(0)
    setCommentContent('')
  }

  useEffect(() => {
    setCommentList(spot.review)
    // console.log(commentList)
  }, [spot]);


  const [spotRating, setSpotRating] = useState(0);

  useEffect(() => {
    let totalRating = 0
    commentList.map((review, index) => {
      totalRating += review.rating
    })
    totalRating = totalRating / commentList.length
    setSpotRating(totalRating)
  }, [commentList]);

  const [openAlert, setOpenAlert] = useState(false)
  const addWish = async () => {
    let isExist_WishList = false
    for (let index = 0; index < user.wishlist.length; index++) {
      if (user.wishlist[index]._id === spot._id) {
        isExist_WishList = true
        setOpenAlert(true)
      }
    }
    if (isExist_WishList === false) {
      const addStatus = await userAPI.updateUserWishlist({ id: user._id, wishlist: [...user.wishlist, spot._id] })
      // console.log('addStatus:', addStatus)
      const { data, status } = await userAPI.indexOneUser(user._id)
      // console.log("update user data:", data)
      setUser(data)
    }
  }
  useEffect(() => {
    console.log('alert:', openAlert)
  }, [openAlert]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt=""
          height="140"
          image={spot.pic ? spot.pic : defaultPic}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {spot.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            地址：{spot.location}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            電話：{spot.phone}
          </Typography>
          <br />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'self-end' }}>
            <Typography variant="body2" color="textSecondary" component="p">
              評分：
            </Typography>
            <Rating name="read-only" value={spotRating} precision={0.1} readOnly />
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Button size="small" color="primary" onClick={() => { addWish() }} disabled={!user}>
          {user ? ('Add to your wish list') : ('Login to continue')}
        </Button>
        <Button size="small" color="primary" onClick={handleOpen}>
          View Comments
        </Button>
      </CardActions>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openAlert}
        onClose={() => { setOpenAlert(false) }}
        key={'top-center'}
      >
        <Alert severity="error" onClose={() => { setOpenAlert(false) }}> This Spot Has Already Added </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{spot.name} 的評論</DialogTitle>
        <DialogContent dividers='true'>
          <List>
            <ListItem divider>
              <ListItemText
                secondary={
                  <>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Typography> 評分 </Typography>
                      <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        disabled={!user}
                      />
                      <div>
                        {value !== null && (
                          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                      </div>
                    </div>
                    <br />
                    <TextField
                      id="outlined-multiline-static"
                      label={user ? ("Your Comment") : ("Login To Comment")}
                      multiline
                      fullWidth
                      rows={4}
                      placeholder="Type your comment here."
                      value={commentContent}
                      onChange={(inputValue) => { setCommentContent(inputValue.target.value) }}
                      disabled={!user}
                    />
                    <br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <Button variant="contained" color="secondary" endIcon={<SendIcon />} onClick={SendComments} disabled={!user}>
                        {user ? ('Comment') : ('Login To Comment')}
                      </Button>
                    </div>
                    <br />
                  </>
                }
              />
            </ListItem>
            {/* others review */}
            <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {commentList.map((comment, index) => {
              let cUser = comment.user
              return (
                cUser._id === user._id ?
                // (<></>)
                  (<YourReviewItem comment={comment} username={cUser.name} getLabelText={getLabelText} commentList={commentList} setCommentList={setCommentList} />)
                  : (<ListItem divider>
                    <ListItemText
                      primary={
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Typography variant="h6">{comment.user.name}</Typography>
                          <Rating name="read-only" value={comment.rating} precision={0.5} readOnly />
                        </div>
                      }
                      secondary={
                        <>
                          <p></p>
                          <Typography variant="body1">{comment.content}</Typography>
                        </>
                      }
                    />
                  </ListItem>)
              )
            })}
            </div>
          </List>
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSuccess}
        onClose={() => { setOpenSuccess(false) }}
        key={'top-center'}
      >
        <Alert severity="success" onClose={() => { setOpenSuccess(false) }}> Comment Successfully </Alert>
      </Snackbar>
    </Card>
  );
}
