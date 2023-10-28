import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Header.css'
import { FcGoogle } from "react-icons/fc";
import { usercontext } from '../../Context/UserContext'
import { auth } from '../../Firebase/firebaseConfig'
import { signOut } from 'firebase/auth'
import logo from '../../assets/imgs/logo.png'
import { useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
    const { isAuth, toggleAuth } = useContext(usercontext)
    const [username, setUserName] = useState(null)
    const [userphoto, setUserphoto] = useState(null)

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const loc = useLocation();
    const navi = useNavigate();

    const logoutHandler = async () => {
        await signOut(auth);
        localStorage.clear();
        toggleAuth(false);
    }

    useEffect(() => {
        const authdata = localStorage.getItem('auth');
        if (authdata) {
            const authData = JSON.parse(authdata);
            setUserName(authData.name);
            setUserphoto(authData.photoURL);
            toggleAuth(true);
        }
    }, []);


    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <Link to={'/'}><img src={logo} alt="error-loading" /></Link>
                </div>
                <div className={`menu-icon`} onClick={toggleMenu}>
                    {isOpen ? <FiX /> : <FiMenu />}
                </div>
                <div className={`flexCme ${isOpen ? 'active' : ''}`}>
                    <div className="menus">
                        <Link to={'/'} className={`${loc.pathname === '/' ? "active" : ""}`} onClick={closeMenu} >Home</Link>
                        <Link to={'/blogs'} className={`${loc.pathname === '/blogs' ? "active" : ""}`} onClick={closeMenu} >Blogs</Link>
                        <Link to={'/create'} className={`${loc.pathname === '/create' ? "active" : ""}`} onClick={closeMenu} >Create</Link>
                    </div>
                    <div className="user">
                        {
                            isAuth ? (
                                <div className="loginUser">
                                    <p>{username}</p>
                                    <img src={userphoto} alt="userInfo" />
                                    <button className='btnL' onClick={logoutHandler}>Logout</button>
                                </div>
                            ) : (<button className='btnL' onClick={() => navi('/login')}><FcGoogle onClick={closeMenu}  />Login</button>)
                        }


                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Header