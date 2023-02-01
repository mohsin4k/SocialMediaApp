import React from 'react'
import "./Navbar.scss";
import Avatar from '../avatar/Avatar';
import { useNavigate } from "react-router";
function Navbar() {
    const navigate = useNavigate();
  return (
    <div className="Navbar">
            <div className="container">
                <h2 className="banner hover-link" onClick={() => navigate("/")}>
                    Social Media
                </h2>
                <div className="right-side">
                    <div
                        className="profile hover-link"
                        onClick={() => navigate(`/profile/`)}
                        >
                            Avatar
                        <Avatar />
                    </div>
                    <div className="logout hover-link" >
                        {/* <AiOutlineLogout /> */}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Navbar
