import { store } from "../../app/store"
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from "react"
import { Outlet } from 'react-router-dom'
import useAuth from "../../hooks/useAuth"
const Prefetch = ({ allowRoles }) => {
    const { Role } = useAuth();
    useEffect(() => {
        if (allowRoles.includes(Role)) {
            store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }));
            // store.dispatch(usersApiSlice.util.prefetch('getOffices', 'officesList', { force: true }));
        }
    }, [])
    return <Outlet />
}


export default Prefetch;
