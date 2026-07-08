import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import "./CartPage.css";

export default function CartPage() {
  const { items, incrementItem, decrementItem, removeItem, clearCart, totalPrice } = useCarrito();

  if (items.length === 0) {
    return (
      <div className="cart-placeholder">
        <h1 className="cart-placeholder_title">Carrito</h1>
        <p className="cart_empty">Tu carrito está vacío.</p>
        <Link to="/productos" className="cart-placeholder_link">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1 className="cart_title">Carrito</h1>

      <ul className="cart_list">
        {items.map((item) => (
          <li key={item.id} className="cart_item">
            <img className="cart_item-img" src={item.image} alt={item.title} />
            <div className="cart_item-info">
              <span className="cart_item-title">{item.title}</span>
              <span className="cart_item-price">${item.price.toFixed(2)}</span>
            </div>
            <div className="cart_item-qty">
              <button onClick={() => decrementItem(item.id)}>−</button>
              <span>{item.quantity}</span>
              <button
                onClick={() => incrementItem(item.id)}
                disabled={item.stock != null && item.quantity >= item.stock}
              >
                +
              </button>
            </div>
            <span className="cart_item-subtotal">${(item.price * item.quantity).toFixed(2)}</span>
            <button className="cart_item-remove" onClick={() => removeItem(item.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="cart_summary">
        <button className="cart_clear" onClick={clearCart}>
          Vaciar carrito
        </button>
        <span className="cart_total">Total: ${totalPrice.toFixed(2)}</span>
      </div>

      <Link to="/productos" className="cart-placeholder_link">
        ← Seguir comprando
      </Link>
    </div>
  );
}
