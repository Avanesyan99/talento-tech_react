import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_inner">
        <div className="footer_brand">
          <h3>React App</h3>
          <p>Tu tienda de tecnología. Productos de calidad con entrega rápida.</p>
        </div>
        <div className="footer_links">
          <h4>Tienda</h4>
          <ul>
            <li><a href="/productos">Todos los productos</a></li>
            <li><a href="/carrito">Mi carrito</a></li>
          </ul>
        </div>
      </div>
      <div className="footer_bottom">
        <p>© 2025 React Api Store. David Avanesyan</p>
        <div className="footer_bottom-links">
          <a href="#privacy">Privacidad</a>
          <a href="#terms">Términos</a>
        </div>
      </div>
    </footer>
  )
}
