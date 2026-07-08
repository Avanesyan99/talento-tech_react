import Header from "./Header";
import Footer from "./Footer";
import { isFirebaseConfigured } from "../../firebase/config";
import './Layout.css'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      {!isFirebaseConfigured && (
        <div className="layout_firebase-warning">
          Firebase no está configurado: creá <code>.env.local</code> (basado en{" "}
          <code>.env.example</code>) con las claves de tu proyecto para habilitar productos,
          login y carrito persistente.
        </div>
      )}
      <main className="layout_main">{children}</main>
      <Footer />
    </div>
  );
}
