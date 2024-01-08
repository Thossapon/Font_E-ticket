import "./navbar.scss";
import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/authContext";
import useAuth from "../../hooks/useAuth";
import { useLoginMutation, useSendLogoutMutation } from "../../features/auth/authApiSlice";
import toast from "react-hot-toast";


const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { Username } = useAuth();
  let menuRef = useRef();
  useEffect(() => {
    // Function to handle clicks outside the menu
    const handleClickOutside = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    // Function to handle the Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuRef]); // Ensure to include any dependencies, such as menuRef,
  const { pathname } = useLocation();
  const { logout, currentUser } = useContext(AuthContext);


  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      sendLogout()
      toast.success('Logout Successfully')
    } catch (error) {
      console.log(error)
    }
  }
  if (isSuccess) navigate(`/login`);
  return (
    <div className="navbar" ref={menuRef}>
      <div className="logo">
        <img src="logo.svg" alt="" />
        <Link to={`/`}>
          <span>E-ticket</span>
        </Link>
      </div>
      <div className="icons">
        <div className="user" onClick={() => setOpen(!open)}>
          <img
            src="./user.svg"
            alt=""
          />
          <span>{Username}</span>
          {open && (
            <div className="options">
              <Link className="link" to="/orders">
                Orders
              </Link>
              <Link className="link" to="/messages">
                Messages
              </Link>
              <Link className="link" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;