import React, { useContext } from 'react'
import './home.scss'
const Home = () => {
  return (
    <div className="home">
      <div className="box box1">
        <span style={{color:'pink',fontWeight:'bold',fontSize:'30px'}}>คอมพิวเตอร์</span>
      </div>
      <div className="box box7">
        <span style={{color:'darkblue',fontWeight:'bold',fontSize:'30px'}}>ปริ้นเตอร์</span>
      </div>
      <div className="box box4">
        <span style={{color:'pink',fontWeight:'bold',fontSize:'30px'}}>All-in-One</span>
      </div>
      <div className="box box8">
        UPS
      </div>
      <div className="box box9">Box 9</div>
    </div>
  )
}

export default Home