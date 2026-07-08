import { useState } from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCarrito } from '../../context/CarritoContext'
import { useTheme } from '../../context/ThemeContext'
import LightModeIcon from '/images/light-mode.png'
import DarkModeIcon from '/images/dark-mode.png'
import './Header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, isAdmin, logout } = useAuth()
  const { totalItems } = useCarrito()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function closeUserMenu() {
    setIsUserMenuOpen(false)
  }

  function handleUserMenuBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      closeUserMenu()
    }
  }

  async function handleLogout() {
    await logout()
    closeUserMenu()
    closeMenu()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header_inner">
        <Link className='header_logo' to="/" onClick={closeMenu}>React App</Link>

        <button
          className={`header_toggle ${isMenuOpen ? 'header_toggle--open' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`header_menu ${isMenuOpen ? 'header_menu--open' : ''}`}>
          <nav className='header_nav'>
            <NavLink className={({ isActive }) => isActive ? "nav_link nav_link--active" : "nav_link"} to="/" onClick={closeMenu}>Inicio</NavLink>
            <NavLink className={({ isActive }) => isActive ? "nav_link nav_link--active" : "nav_link"} to="/productos" onClick={closeMenu}>Productos</NavLink>
            {isAdmin && (
              <NavLink className={({ isActive }) => isActive ? "nav_link nav_link--active" : "nav_link"} to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
            )}
          </nav>

          <div className="header_actions">
            <button
              className="theme_toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              <img
                className="theme_toggle-icon"
                src={theme === 'dark' ? LightModeIcon : DarkModeIcon}
                alt=""
                aria-hidden="true"
              />
            </button>

            {user ? (
              <div className="header_user" onBlur={handleUserMenuBlur}>
                <button
                  type="button"
                  className="header_user-trigger"
                  onClick={() => setIsUserMenuOpen((open) => !open)}
                  aria-expanded={isUserMenuOpen}
                >
                  {user.displayName || user.email}
                  <span className="header_user-caret">▾</span>
                </button>

                {isUserMenuOpen && (
                  <div className="header_user-menu">
                    <NavLink
                      className="header_user-menu-item"
                      to="/carrito"
                      onClick={() => { closeMenu(); closeUserMenu() }}
                    >
                      Carrito
                      {totalItems > 0 && <span className="cart_badge">{totalItems}</span>}
                    </NavLink>
                    <button
                      type="button"
                      className="header_user-menu-item"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="header_auth-links">
                <NavLink className='nav_link' to="/login" onClick={closeMenu}>Iniciar sesión</NavLink>
                <NavLink className='nav_link' to="/registro" onClick={closeMenu}>Registrarse</NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
