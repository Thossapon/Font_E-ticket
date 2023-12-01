import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import "./styles/global.scss";
import Menu from "./components/menu/Menu";
import PendingTask from "./pages/pending/PendingTask";
import Forget from "./pages/forget/Forget";
import Report from "./pages/report/Report";
import Manage from "./pages/manage/Manage";
import Test from "./components/dataTable/Test";
import Manual from "./pages/manual/Manual";

const ROLES = {
  'Admin': 1,
  'User': 3
}

function App() {

  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient()
  const [allow, setAllow] = useState(false);
  const checkRole = currentUser?.Role === ROLES.Admin;

  const Layout = () => {
    return (
      <div class="main">
        <div className="custom-navbar">
          <Navbar />
        </div>
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // add role based for login
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: (
              <Home/>
          )
        },
        {
          path: '/testpath',
          element: (
            <ProtectedRoute>
              {<RequireAuth allowRoles={[ROLES.Admin]} />}
              <Tracking />
            </ProtectedRoute>
          )
        },
        {
          path: '/tracking',
          element: (<Tracking />)
        },
        {
          path: '/tracking/:id',
          element: <Task />
        },
        {
          path: '/create',
          element: <Create />
        },
        {
          path: '/pending',
          element: (
            <ProtectedRoute>
              {<RequireAuth allowRoles={[ROLES.Admin]} />}
              <PendingTask />
            </ProtectedRoute>
          )
        }
        ,
        {
          path: '/report',
          element: (
            <ProtectedRoute>
              {<RequireAuth allowRoles={[ROLES.Admin]} />}
              <Report />
            </ProtectedRoute>
          )
        },
        {
          path: '/manage',
          element: (
            <ProtectedRoute>
              {<RequireAuth allowRoles={[ROLES.Admin]} />}
              <Manage />
            </ProtectedRoute>
          )
        },{
          path:'/manual',
          elementW:<Manual/>
        }

      ]
    },
    {
      path: '/login',
      element: <Login />
    },
  ])
  return <RouterProvider router={router} />
}
export default App;
