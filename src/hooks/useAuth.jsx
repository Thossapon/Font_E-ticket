import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isStaff = false;
    let isAdmin = false;
    let status = "User";

    if (token) {
        const decoded = jwtDecode(token)
        const { Username, Role ,UserID} = decoded

        isAdmin = Role === 1;
        isStaff = Role === 2;

        if (isAdmin) status = "Admin";
        if (isStaff) status = "Staff";

        return { Username, Role, status, isAdmin, isStaff,UserID }
    }

    return { Username: '', Role: [], isAdmin, isStaff, status, }
}
export default useAuth;