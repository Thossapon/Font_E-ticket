import { useState } from 'react'
import { LinearProgress } from '@mui/material'
import { Autocomplete, TextField } from '@mui/material'
import moment from 'moment'
import AddModal from '../modal/Modal'
const Progress = (props) => {

    //format date to locale th
    return (
        <div>
            <ul>
                <li>
                    <div>
                        <h2 style={{ color: '#ffb703' }}> {props.data.StatusName} 👨🏻‍💻</h2>
                        <p style={{ color: '#023047' }}>{props.data.StatusDescription} 👨🏻‍💻</p>
                        <time style={{ color: "#8ecae6" }}>{props.data.CreateDate}</time>

                    </div>
                    {/* {props.slug === 1 ? <AddModal TrackID={props.data[0]?.TrackID} /> : null}
                    {
                        props.data.length > 2 ?
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
                    } */}
                </li>
            </ul>
        </div>
    )
}

export default Progress