import { useState } from 'react'
import { LinearProgress } from '@mui/material'
import { Autocomplete, TextField } from '@mui/material'
import moment from 'moment'
import AddModal from '../modal/Modal'
const Progress = (props) => {


    //format date to locale th
    const formatDate = (dateString) => {
        const momentDate = moment(dateString).locale('th');
        return momentDate.format('DD MMMM YYYY hh:mm:ss A');
    };
    console.log(`kidoo ${props.data[0]?.TrackID}`)
    return (
        <div>
            <ul>
                <li>
                    {props.slug === 1 ? <AddModal TrackID={props.data[0]?.TrackID} /> : null}
                    {
                        props.data.length > 0 ?
                            props.data?.map((item) => (
                                <div>
                                    <h2 style={{ color: '#ffb703' }}> {item.StatusName} 👨🏻‍💻</h2>
                                    <p style={{ color: '#023047' }}>{item.StatusDescription } 👨🏻‍💻</p>
                                    <time style={{ color: "#8ecae6" }}>{formatDate(item.UpdateDate)}</time>
                                </div>

                            )) : <div>
                                <h2 style={{ color: '#ffb703' }}>รับเคสแล้ว👨🏻‍💻</h2>
                                <p style={{ color: '#023047' }}>เจ้าหน้าที่รับเคสเรียบร้อย 👨🏻‍💻</p>
                                <time style={{ color: "#8ecae6" }}>{formatDate(props.UpdateDate)}</time>
                            </div>
                    }
                </li>
            </ul>
        </div>
    )
}

export default Progress