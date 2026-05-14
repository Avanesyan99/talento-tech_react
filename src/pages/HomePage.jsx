import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero_content">
          <p className="hero_eyebrow">Tienda online · 2025</p>
          <h1 className="hero_title">Tecnología para tu vida diaria</h1>
          <p className="hero_desc">
            Explorá nuestro catálogo con los mejores productos: ropa, electrónica, joyas y más.
          </p>
          <div className="hero_actions">
            <Link to="/productos" className="btn-primary">Ver productos</Link>
            <Link to="/carrito" className="btn-secondary">Mi carrito</Link>
          </div>
        </div>
        <div className="hero_img-wrap">
          <img
            className="hero_img"
            src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/SGXKTX7PCZAB7MIB7YFRSZJIXY.jpg"
            alt="Producto destacado"
          />
        </div>
      </section>
    </div>
  );
}
