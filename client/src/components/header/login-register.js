import React from 'react';
import { Link } from 'react-router-dom';

const LoginRegister = () => {
    return (
        <div className="top-button">
            <ul className="menu float-right">
            <li>
                <Link to="/register">
                    Register
                </Link>
            </li>
            <li className="dropdown-login">
                <Link to="/login" className="loginReg">
                    Log in
                </Link>
            </li>
            </ul>
        </div>
    );
}

export default LoginRegister;
