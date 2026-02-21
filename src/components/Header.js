import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import { useNavigate, NavLink } from "react-router-dom"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
        handleClose();
    }

    return (
        <>
            <header>
                <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <NavLink to="/" style={{ textDecoration: "none" }}><h1>HP Cloud</h1></NavLink>
                    <div className="avtar" style={{ cursor: "pointer" }}>
                        {
                            logindata.ValidUserOne ? (
                                <Avatar 
                                    style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} 
                                    onClick={handleClick}
                                >
                                    {logindata.ValidUserOne.fname[0].toUpperCase()}
                                </Avatar>
                            ) : (
                                <Avatar style={{ background: "blue" }} />
                            )
                        }
                    </div>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {
                            logindata.ValidUserOne ? (
                                <>
                                    <MenuItem onClick={goDash}>Dashboard</MenuItem>
                                    <MenuItem onClick={() => { logoutUser(); handleClose(); }}>Logout</MenuItem>
                                </>
                            ) : null
                        }
                    </Menu>
                </nav>
            </header>
        </>
    )
}

export default Header;
