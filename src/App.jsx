import "./styles/global.scss";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Task from './components/task/Task'
import RequireAuth from "./components/requireAuth/RequireAuth";
import Create from "./pages/create/Create";
import Footer from "./components/footer/Footer";
import Register from "./pages/register/Register";
import Menu from "./components/menu/Menu";
import PendingTask from "./pages/pending/PendingTask";
import Report from "./pages/report/Report";
import Manage from "./pages/manage/Manage";
import Manual from "./pages/manual/Manual";
import User from "./components/user/User";
import Login from "./features/auth/Login";
import PersistLogin from "./features/auth/PersistLogin";
import Prefetch from "./features/auth/Prefetch";
import ErrorPage from "./components/error/ErrorPage";
import { ROLES } from './config/roles'
import TicketList from "./features/ticket/TicketList";
import useAuth from "./hooks/useAuth";
function App() {
  const {Role} = useAuth();
  const queryClient = new QueryClient()
  const Layout = () => {
    return (
      <div className="main">
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

  //? Public Page < No Need to Login />
  //# Protected Page < Need to Login First />

  // add role based for login
  const router = createBrowserRouter([
    {
      path: '*',
      element: <ErrorPage />
    },
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
              element: (
                <div>
                  <Prefetch allowRoles={[ROLES.Admin]}/>
                </div>
              ),
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
                      <RequireAuth allowRoles={[ROLES.Admin, ROLES.Staff]} />
                      <Report />
                    </div>
                  )
                },
                {
                  //#admin (`for user management `)
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
      ]
    },
  ])
  return <RouterProvider router={router} />
}
export default App;
