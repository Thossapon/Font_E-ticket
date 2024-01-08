import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Autocomplete, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import HandymanIcon from "@mui/icons-material/Handyman";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useUpdateTicketStatusMutation } from '../../features/ticket/ticketApiSlice';


import axios from "axios";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/auth/authSlice';
const style = {
  position: "absolute",
  top: "48%",
  left: "50%",
  height: "90vh",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: 'column',
  p: 2,
};
let devices_type = ["รอดำเนินการ", "กำลังดำเนินการ", "ดำเนินการเสร็จสมบูรณ์"]


const AddModal = ({ TrackID }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const id = TrackID;
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken)

  const [status , setStatus] = useState({
      token: token,
      StatusID : id,
      StatusName:"",
      StatusDescription:"",
      UpdateDate : ""
  })
  const [update, setUpdate] = useState({
    StatusName: '',
    StatusDescription: '',
    UpdateDate: '',
    UpdateBy: 1
  });
  // handlechange
  const handleChange = (e) => {
    setStatus((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(status);
  }
  // call api
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      handleClose();
      await axios.put(`http://172.16.10.151:8800/api/task/update/${``}`, update, { withCredentials: true })
      navigate(`/tracking`);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} sx={{ gap: 1 }} color='info'>
        <EditIcon />แก้ไข
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Container sx={{ m: 0, p: 0 }}>
            <Box sx={style}>
              <Avatar sx={{ m: 1, bgcolor: "orange" }}>
                <HandymanIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                ติดตามการซ่อม
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      disablePortal
                      options={devices_type}
                      sx={{ width: '100' }}
                      onChange={(event, newValue) => {
                        setUpdate((prev) => ({ ...prev, StatusName: newValue }))
                      }}
                      renderInput={(params) => <TextField {...params} label="สถานะ" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box >
                      <input type="datetime-local" name='UpdateDate' onChange={handleChange} style={{width:'100%'}} required/>
                    </Box>
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        onChange={(newValue) => {
                          setUpdate((prev) => ({ ...prev, UpdateDate: newValue.$d }))
                        }}
                        renderInput={(props) => (
                          <TextField
                            {...props}
                            inputProps={{
                              name: 'UpdateDate',
                            }}
                            InputProps={{
                              style: { maxWidth: '200px' }, // Adjust the width as needed
                            }}
                          />
                        )}
                        PopoverProps={{
                          style: { maxWidth: 'none' }, // This will override the default max width
                        }}
                      />
                    </LocalizationProvider> */}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label='รายละเอียด'
                      fullWidth
                      multiline
                      rows={3}
                      name="StatusDescription"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClick}
                >
                  อัพเดตข้อมูล
                </Button>
              </Box>
            </Box>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
export default AddModal;
