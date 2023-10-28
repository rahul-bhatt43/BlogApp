import React, { useContext } from 'react'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../../Firebase/firebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import { usercontext } from '../../Context/UserContext'

import './Login.css'

const Login = () => {

    const { toggleAuth, setUserInfo } = useContext(usercontext)
    const navi = useNavigate()

    const loginHandler = async () => {
        try {

            const { user } = await signInWithPopup(auth, provider);
            const authInfo = {
                userId: user.uid,
                name: user.displayName,
                photoURL: user.photoURL,
                isAuth: true
            };
            setUserInfo(authInfo);
            // console.log(authInfo);
            localStorage.setItem("auth", JSON.stringify(authInfo));
            toggleAuth(true);
            navi('/create');
        } catch (error) {
            console.error('Authentication error:', error);
        }
    }

    return (
        <div className='loginSection'>
            <div className="container">
                <p>Sign with Google to Continue</p>

                <button onClick={loginHandler}>
                    <FcGoogle />Sign in with Google
                </button>
            </div>
        </div>
    )
}

export default Login