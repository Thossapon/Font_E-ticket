import React, { useState, useEffect ,useContext} from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import 'moment-timezone'
import 'moment/locale/th'
import { Grid, TextField } from '@mui/material'
import { AuthContext } from '../../context/authContext'
const User = () => {
    const {currentUser} = useContext(AuthContext);
    const state = useLocation().state;
    const [user, setUser] = useState(state ? state : {});
    const [update,setUpdate] = useState();
    const handleChange = (e) => {
        setUpdate((prev) => ({ ...prev,[e.target.name]: e.target.value }))
        console.log(update);
    }
    return (
        <div>
            <Grid container>
                <Grid item>
                    <TextField
                    defaultValue={user.Username}
                    onChange={handleChange}
                    name='Username'
                    />
                </Grid>
                <Grid item>
                    <TextField
                    defaultValue={user.FirstName}
                    onChange={handleChange}
                    name='FirstName'
                    />
                </Grid>
                <Grid item>
                    <TextField
                    defaultValue={user.LastName}
                    onChange={handleChange}
                    name='LastName'
                    />
                </Grid>
            </Grid>

        </div>

    )
}

export default User