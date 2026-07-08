import React from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useCarrito } from '../../context/CarritoContext'
import { useAuth } from '../../context/AuthContext'
import './Item.css'

export default function Item({ product }) {
    const { id, title, price, image, category, stock } = product
    const { addToCart } = useCarrito()
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    function handleAddToCart() {
        if (!user) {
            navigate('/login', { state: { from: location.pathname } })
            return
        }
        addToCart(product, 1)
    }

  return (
    <article className="item-card">
        <div className="item-card-img-wrap">
            <img className="item-card-img" src={image} alt={title} />
        </div>
        <div className="item-card-body">
            <span className="item-card-category">{category}</span>
            <h3 className="item-card-title">{title}</h3>
            <p className="item-card-stock">{stock > 0 ? `${stock} en stock` : "Sin stock"}</p>
            <div className="item-card-footer">
                <span className="item-card-price">${price?.toFixed(2)}</span>
                <Link to={`/producto/${id}`} className="item-card-btn">Ver más</Link>
            </div>
            <button
                className="item-card-add"
                disabled={!stock}
                onClick={handleAddToCart}
            >
                Agregar al carrito
            </button>
        </div>
    </article>
  )
}
