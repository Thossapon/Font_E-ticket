import { useRef, useEffect, useState } from "react";

import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useNavigate } from 'react-router-dom'


const FakeLogin = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/user')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>
    return (
        <section>
            <header>
                <h1>E-ticket Login</h1>
            </header>
            <main>
                <p ref={errRef} className={errClass}aria-live="assertive">{errMsg}</p>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>
                </form>
            </main>
        </section>
    )
}

export default FakeLogin