import './App.css'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
//import Test01 from './Components/teenee/Test01'
import Navbar from './Components/Navbar/Navbar'

// Import React router dom
import {
  createBrowserRouter,
  RouterProvider
}from 'react-router-dom'

//creater a router
const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard/></div>
  },
  // {
  //   path: '/Teenee',
  //   element: <div><Test01/></div>
  // },
  {
    path: '/navbar',
    element: <div><Navbar/></div>
  }
  
])


function App() {


  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
