import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import { useNavigate, NavLink } from "react-router-dom"

const Header = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
    const history = useNavigate();

    const logoutUser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("https://mernback-uw10.onrender.com/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const resData = await res.json();

        if (res.status === 201) {
            localStorage.removeItem("usersdatatoken");
            setLoginData(false);
            history("/");
        } else {
            console.log("error during logout");
        }
    }

    const goDash = () => {
        history("/dash")
    }

    const goError = () => {
        history("*")
    }

    return (
        <>
            <header>
                <nav>
                    <NavLink to="/"><h1>HP Cloud</h1></NavLink>
                    <div className="avtar">
                        {
                            logindata.ValidUserOne ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={goDash}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue" }} onClick={goError} />
                        }
                    </div>

                    <div className="nav-btn">
                        {
                            logindata.ValidUserOne ? (
                                <ul>
                                    <li onClick={goDash}>Dashboard</li>
                                    <li onClick={logoutUser}>Logout</li>
                                </ul>
                            ) : null
                        }
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;
