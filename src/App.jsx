import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import Report from "./pages/report/Report";
import Manage from "./pages/manage/Manage";
import Manual from "./pages/manual/Manual";
import User from "./components/user/User";
import Login from "./features/auth/Login";
import PersistLogin from "./features/auth/PersistLogin";
import useAuth from "./hooks/useAuth";
import { ROLES } from './config/roles'
import TicketList from "./features/ticket/TicketList";

function App() {
  const queryClient = new QueryClient()
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
  //? Public Page
  //# Protected Page

  // add role based for login
  const router = createBrowserRouter([

    //?Public (`Register Page`)
    {
      path: '/register',
      element: <Register />
    },
    //?Public (`Register Page`)
    {
      path: '/login',
      element: <Login />
    },
    {
      //#all (`Persist Data to prevent refresh`)
      path: '/',
      element: (
        <PersistLogin />
      ),
      //#all (`children path & element`)
      children: [
        {
          //#all (`Main Layout`)
          path: '/',
          element: <Layout />,
          children: [
            {
              //#all (`Homepage`)
              path: '/',
              element: (
                <Home />
              )
            },
            //#all (`Create Ticket`)
            {
              path: '/create',
              element: <Create />
            },
            //#all (`Track all ticket`)
            {
              path: '/tracking',
              element: (<TicketList />)
            },
            //#all (`view each ticket`)
            {
              path: '/tracking/:id',
              element: <Task />
            },
            //#admin,staff (`all pending ticket`)
            {
              path: '/pending',
              element: (
                <div>
                  <RequireAuth allowRoles={[ROLES.Admin, ROLES.Staff]} />
                  <PendingTask />
                </div>

              )
            }
            ,
            {
              //#admin (`for report`)
              path: '/report',
              element: (
                <div>
                  <RequireAuth RequireAuth allowRoles={[ROLES.Admin]} />
                  <Report />
                </div>
              )
            },
            {
              //#admin (`For User Management`)
              path: '/manage',
              element: (
                <div>
                  <RequireAuth allowRoles={[ROLES.Admin]} />
                  <Manage />
                </div>
              )
            },
            {
              path: '/manage/:id',
              element: <User />
            },
            //#all (`User Manual`)

            {
              path: '/manual',
              element: <Manual />
            }

          ]
        },
      ]
    },
    // {
    //   path: '/',
    //   element:<PersistLogin/>,
    //   children: [
    //     {
    //       path: '/reduxuser',
    //       element: <UsersList />
    //     },
    //   ]
    // },

  ])
  return <RouterProvider router={router} />
}
export default App;
