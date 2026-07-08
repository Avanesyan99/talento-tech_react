import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_inner">
        <div className="footer_top">
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
        <div className="footer_cards">
          <h4>Clientes satisfechos</h4>
          <div className="footer_card-grid">
            <article className="footer_card">
              <p className="footer_card-quote">"Excelente atención y entrega puntual. Volveré a comprar seguro."</p>
              <span className="footer_card-name">María P.</span>
              <small className="footer_card-role">Compradora frecuente</small>
            </article>
            <article className="footer_card">
              <p className="footer_card-quote">"La calidad del producto superó mis expectativas. Muy recomendados."</p>
              <span className="footer_card-name">Andrés L.</span>
              <small className="footer_card-role">Cliente satisfecho</small>
            </article>
            <article className="footer_card">
              <p className="footer_card-quote">"Fácil proceso de compra y excelente servicio al cliente."</p>
              <span className="footer_card-name">Camila R.</span>
              <small className="footer_card-role">Compra reciente</small>
            </article>
          </div>
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
