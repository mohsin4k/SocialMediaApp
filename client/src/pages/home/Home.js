import React from 'react';
import {Outlet} from "react-router";
import Navbar from "../../components/navbar/Navbar"

function Home() {
  return (
    <div>
      <Navbar/>
      <div className="outlet" style={{ marginTop: "60px" }}>
                <Outlet />
      </div>
    </div>
  )
}

export default Home
