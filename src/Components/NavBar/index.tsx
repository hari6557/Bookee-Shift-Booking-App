import React from "react"
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="pt-30 text-24">
      <ul className="flex justify-center">
        <li className="mr-40">
          <Link to="/">My shifts</Link>
        </li>
        <li>
          <Link to="/available-shifts">Available shifts</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
