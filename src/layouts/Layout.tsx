import React from "react"
import {Outlet} from "react-router-dom"
import Navbar from "components/layout/Navbar"

const Layout = () => {
    return (
        <div className="d-flex flex-column full-height">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout