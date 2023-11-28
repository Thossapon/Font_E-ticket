import React from 'react'
import { LinearProgress } from '@mui/material'
const Progress = (props) => {
    return (
        <div>
            <ul>
                <li>
                    <div>
                        <LinearProgress />
                        <h2>{props.StatusName} 👨🏻‍💻</h2>
                        <p>{props.StatusDescription}</p>
                        <time>{props.UpdateDate}</time>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Progress