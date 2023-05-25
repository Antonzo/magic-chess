import React from "react"
import {Outlet} from "react-router-dom"
import Navbar from "components/layout/Navbar"

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout