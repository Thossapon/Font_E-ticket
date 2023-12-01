import React from 'react'
import { LinearProgress } from '@mui/material'
const Progress = (props) => {
    return (
        <div >
            <ul>
                <li>
                    <div>
                        <LinearProgress />
                        <h2 style={{color:'#ffb703'}}>{props.StatusName} 👨🏻‍💻</h2>
                        <p style={{color:'#023047'}}>{props.StatusDescription}</p>
                        <time style={{color:"#8ecae6"}}>{props.UpdateDate}</time>
                    </div>
                </li>
                <li>
                    <div>
                    <LinearProgress value={100} variant='determinated'/>
                        <h2 style={{color:'#ffb703',marginTop:'10px'}} >ดำเนินการเสร็จแล้ว ✅</h2>
                        <p style={{color:'#023047'}}>ดำเนินการซ่อมเบื้องต้น</p>
                        <time style={{color:"#8ecae6"}}>{props.UpdateDate}</time>
                    </div>
                </li>
                <li>
                    <div>
                        <LinearProgress value={100} variant='determinated'/>
                        <h2 style={{color:'#ffb703',marginTop:'10px'}} >ดำเนินการเสร็จแล้ว ✅</h2>
                        <p style={{color:'#023047'}}>รับงาน</p>
                        <time style={{color:"#8ecae6"}}>{props.UpdateDate}</time>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Progress