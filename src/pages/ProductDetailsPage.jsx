import React, { use, useEffect, useState } from 'react'
import { useParams, Link} from 'react-router-dom'
import './ProductDetailPage.css'


export default function ProductDetailsPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => { setProduct(data); setLoading(false)})
        .catch(() => { setProduct(null); setLoading(false) })
    }, [id]);

    if (loading) {
        return <p>Loading your product...</p>
    }

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product not found</h2>
                <Link to="/productos">Back to Products</Link>
            </div>
        )
    }


  return (
    <div className="detail">
        <Link to="/productos">← Back to Products</Link>
        <div className="detail_grid">
        <div className="detail_img-wrap">
          <img src={product.image} alt={product.title} className="detail_img" />
        </div>
        <div className="detail_info">
          <p className="detail_category">{product.category}</p>
          <h1 className="detail_title">{product.title}</h1>
          <p className="detail_rating">
            <span>★</span> {product.rating?.rate} — {product.rating?.count} reseñas
          </p>
          <p className="detail_price">${product.price?.toFixed(2)}</p>
          <p className="detail_desc">{product.description}</p>
        </div>
      </div>
    </div>
  )
}
