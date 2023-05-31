import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CreateScheduleModal = ({ open, handleCreate, handleClose, newScheduleName, setNewScheduleName }) => {
  return (
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle> 建立一個新的行程（Schedule）</DialogTitle>
        <DialogContent>
          <DialogContentText>
            請在此輸入新的行程的名字。
            <br />
            To create a new schedule, please enter your schedule name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="schedule_name"
            label="Schedule Name"
            fullWidth
            variant="standard"
            value={newScheduleName}
            onChange={(input) => {setNewScheduleName(input.target.value)}}
          />
        </DialogContent>
        <DialogActions style={{marginBottom: '5px', marginRight: '5px'}}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>Create a new schedule</Button>
        </DialogActions>
      </Dialog>
  );
}
export default CreateScheduleModal;