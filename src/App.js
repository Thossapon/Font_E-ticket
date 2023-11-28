import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext";
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Tracking from "./pages/tracking/Tracking";
import Task from './components/task/Task'
import Unauthorized from "./components/unauthorized/Unauthorized";
import RequireAuth from "./components/requireAuth/RequireAuth";
import Create from "./pages/create/Create";
import Footer from "./components/footer/Footer";
import Register from "./pages/register/Register";

const ROLES = {
  'Admin': 1,
  'User': 3
}

function App() {

  const { currentUser}  = useContext(AuthContext);
  const queryClient = new QueryClient()
  const Layout = () => {
    return(
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar/>
          <div>
            <Outlet/>
          </div>
          <Footer/>
        </div>
      </QueryClientProvider>
      )
  }
  function bald () {
    return (
      <div>
        auth
      </div>
    )
  }
  // add role based for login
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login"/>;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/',
      element : (
      <ProtectedRoute>
          <Layout />
      </ProtectedRoute>
      ),
      children:[
        {
          path:'/',
          element : <Home/>
        },
        {
          path:'/testpath',
          element : (
            <ProtectedRoute>
            {<RequireAuth allowRoles={[ROLES.Admin]}/>}
              <Tracking/>
            </ProtectedRoute>
          )
        },
        {
          path:'/tracking',
          element : (<Tracking/>)
        },
        {
          path:'/tracking/:id',
          element : <Task/>
        },
        {
          path:'/create',
          element: <Create/>
        }
        
      ]
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/unauthorized',
      element: <Unauthorized />
    }
  ])
  return <RouterProvider router={router}/>
}
export default App;
