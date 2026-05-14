import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header_inner">
        <Link className='header_logo' to="/">React App</Link>
        <nav className='header_nav'>
          <NavLink className={({ isActive }) => isActive ? "nav_link nav_link--active" : "nav_link"} to="/">Inicio</NavLink>
          <NavLink className={({ isActive }) => isActive ? "nav_link nav_link--active" : "nav_link"} to="/productos">Products</NavLink>
        </nav>
          <NavLink className='nav_link' to="/carrito">Carrito</NavLink>
      </div>
    </header>
  )
}
