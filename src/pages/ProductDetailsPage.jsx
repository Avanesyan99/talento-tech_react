import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById } from '../firebase/products'
import { addReview, subscribeToReviews } from '../firebase/reviews'
import { useCarrito } from '../context/CarritoContext'
import { useAuth } from '../context/AuthContext'
import './ProductDetailPage.css'


export default function ProductDetailsPage() {
    const { id } = useParams()
    const { user } = useAuth()
    const { addToCart } = useCarrito()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        setLoading(true)
        setQuantity(1)
        setAdded(false)
        getProductById(id)
            .then((data) => { setProduct(data); setLoading(false) })
            .catch(() => { setProduct(null); setLoading(false) })
    }, [id]);

    useEffect(() => {
        const unsubscribe = subscribeToReviews(id, setReviews)
        return unsubscribe
    }, [id]);

    function handleAddToCart() {
        if (!user) {
            navigate('/login', { state: { from: `/producto/${id}` } })
            return
        }
        addToCart(product, quantity)
        setAdded(true)
    }

    async function handleReviewSubmit(e) {
        e.preventDefault()
        setSubmittingReview(true)
        try {
            await addReview(id, {
                uid: user.uid,
                userName: user.displayName || user.email,
                rating: Number(rating),
                comment,
            })
            setComment("")
            setRating(5)
        } finally {
            setSubmittingReview(false)
        }
    }

    if (loading) {
        return <p className="detail_loading">Cargando producto...</p>
    }

    if (!product) {
        return (
            <div className="detail_notfound">
                <h2>Producto no encontrado</h2>
                <Link to="/productos" className="btn-back">Volver a productos</Link>
            </div>
        )
    }


  return (
    <div className="detail">
        <Link to="/productos" className="detail_back">← Volver a productos</Link>
        <div className="detail_grid">
        <div className="detail_img-wrap">
          <img src={product.image} alt={product.title} className="detail_img" />
        </div>
        <div className="detail_info">
          <p className="detail_category">{product.category}</p>
          <h1 className="detail_title">{product.title}</h1>
          <p className="detail_rating">{product.stock > 0 ? `${product.stock} unidades en stock` : "Sin stock"}</p>
          <p className="detail_price">${product.price?.toFixed(2)}</p>
          <p className="detail_desc">{product.description}</p>

          {product.stock > 0 && (
            <>
              <div className="detail_qty-row">
                <button
                  className="qty_btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="qty_val">{quantity}</span>
                <button
                  className="qty_btn"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                >
                  +
                </button>
              </div>

              <button
                className={`detail_add ${added ? "detail_add--ok" : ""}`}
                onClick={handleAddToCart}
              >
                {added ? "¡Agregado!" : "Agregar al carrito"}
              </button>
            </>
          )}

          <Link to="/carrito" className="detail_cart-link">Ver carrito</Link>
        </div>
      </div>

      <section className="reviews">
        <h2 className="reviews_title">Opiniones</h2>

        {reviews.length === 0 && <p className="reviews_empty">Todavía no hay opiniones.</p>}

        <ul className="reviews_list">
          {reviews.map((review) => (
            <li key={review.id} className="reviews_item">
              <div className="reviews_item-header">
                <span className="reviews_item-name">{review.userName}</span>
                <span className="reviews_item-rating">{"★".repeat(review.rating)}</span>
              </div>
              <p className="reviews_item-comment">{review.comment}</p>
            </li>
          ))}
        </ul>

        {user ? (
          <form className="reviews_form" onSubmit={handleReviewSubmit}>
            <label>
              Calificación
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} estrella{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Contá tu experiencia con el producto..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" disabled={submittingReview}>
              {submittingReview ? "Enviando..." : "Publicar opinión"}
            </button>
          </form>
        ) : (
          <p className="reviews_login-hint">
            <Link to="/login">Iniciá sesión</Link> para dejar tu opinión.
          </p>
        )}
      </section>
    </div>
  )
}
