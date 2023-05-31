import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import { TextField, Button } from '@mui/material';

import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const AddToScheduleModal = ({ openAddModal, closeAddModal, showSpot, addToSchedule, spotStartTime, setSpotStartTime, spotEndTime, setSpotEndTime }) => {
    return (
        <Dialog open={openAddModal} onClose={closeAddModal} fullWidth>
            <DialogTitle> 將 {showSpot.name} 加入您的行程 </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    請選擇您要安排此行程的時間
                </DialogContentText>
                <br />
                <Stack spacing={5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={spotStartTime}
                            onChange={(newValue) => {
                                setSpotStartTime(newValue);
                            }}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={spotEndTime}
                            onChange={(newValue) => {
                                setSpotEndTime(newValue);
                            }}
                        />
                    </LocalizationProvider>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAddModal}> Cancel </Button>
                <Button onClick={addToSchedule}> Add </Button>
            </DialogActions>
        </Dialog>
    )
}
export default AddToScheduleModal;