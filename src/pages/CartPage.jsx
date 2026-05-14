import { Link } from "react-router-dom";
import "./CartPage.css";

export default function CartPage() {
  return (
    <div className="cart-placeholder">
      <h1 className="cart-placeholder_title">Carrito</h1>
      <Link to="/productos" className="cart-placeholder_link">
        ← Volver al catálogo    
      </Link>
    </div>
  );
}