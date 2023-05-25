import React from "react"
import { Link } from "react-router-dom"
import "components/layout/Navbar.scss"

function Navbar() {
    return (
        <nav className="navbar full-width">
            <ul className="navbar__list d-flex align-center justify-center full-width pa-3 bg-grey-6 headline-4 white">
                <li className="navbar__item">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/room">Play</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar