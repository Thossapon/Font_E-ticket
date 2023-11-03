import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AuthContext} from "../../context/authContext";
import {DarkModeContext} from '../../context/darkModeContext'
import axios from 'axios';
const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setErr] = useState(null)
    const navigate = useNavigate();
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const {login} = useContext(AuthContext);
    const {darkMode} = useContext(DarkModeContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
           navigate("/");
        } catch (err) {
            console.log(err.response.data);
        }
    };
    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />
                {err && err}
                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login