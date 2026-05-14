import React from 'react'
import {Link} from 'react-router-dom'
import './Item.css'

export default function Item({ product }) {
    const { id, title, price, image, category, rating } = product

  return (
    <article>
        <div>
            <img src={image} alt={title} />
        </div>
        <div>
            <span>{category}</span>
            <h3>{title}</h3>
            <p className="item-card-rating">
                <span>★</span>{rating?.rate} ({rating?.count} reseñas)
            </p>
            <div className="item-card-footer">
                <span className="item-card-price">${price?.toFixed(2)}</span>
                <Link to={`/producto/${id}`} className="item-card-btn">Ver más</Link>
            </div>
        </div>
    </article>
  )
}
