import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext";
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Tracking from "./pages/tracking/Tracking";
import Task from './components/task/Task'
function App() {

  const {currentUser}  = useContext(AuthContext);
  const queryClient = new QueryClient()
  const Layout = () => {
    return(
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar/>
          <div>
            <Outlet/>
          </div>
        </div>
      </QueryClientProvider>
      )
  }
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login"/>;
    }
    return children;
  };
  const router = createBrowserRouter([
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
          path:'/tracking',
          element : <Tracking/>
        },
        {
          path:'/tracking/:id',
          element : <Task/>
        }
      ]
    },
    {
      path:'/login',
      element:<Login/>
    }
  ])
  return <RouterProvider router={router}/>
}
export default App;
