import { useState } from 'react';

import { reviewAPI } from '../api/review';

import { Rating, TextField } from '@mui/material';
import {
    Typography, IconButton,
    List, ListItem, ListItemText
} from '@material-ui/core/';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';

// 若是自己的留言，可以 edit
const YourReviewItem = ({ comment, username, getLabelText, commentList, setCommentList }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState(comment.rating);
    const [hover, setHover] = useState(-1);
    const [newComment, setNewComment] = useState(comment.content)

    const updateReview = async () => {
        const temp = await reviewAPI.updateReview({ id: comment._id, content: newComment, rating: value })
        const updateArray = commentList.map((obj, index) => {
            if (obj._id === comment._id) {
                return { ...obj, content: newComment }
            }
            else return obj
        })
        setCommentList(updateArray)
        setIsEdit(!isEdit)
    }
    return (
        <ListItem divider>
            <ListItemText
                primary={
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Typography variant="h6"> {username} </Typography>
                        {isEdit ?
                            (<Rating
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
                            />)
                            : (<Rating name="read-only" value={comment.rating} precision={0.5} readOnly />)}
                    </div>
                }
                secondary={
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        {isEdit ?
                            (<TextField
                                fullWidth
                                id="standard-helperText"
                                label="Edit your comment"
                                defaultValue={newComment}
                                variant="standard"
                                value={newComment}
                                onChange={(input) => { setNewComment(input.target.value) }}
                            />)
                            : (<Typography variant="body1">{newComment}</Typography>)
                        }
                        {isEdit ?
                            (<IconButton onClick={() => { updateReview() }}>
                                <CheckIcon />
                            </IconButton>)
                            : (<IconButton onClick={() => { setIsEdit(!isEdit) }}>
                                <EditIcon />
                            </IconButton>)
                        }
                    </div>
                }
            />
        </ListItem >
    )
}
export default YourReviewItem;