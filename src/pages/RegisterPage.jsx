import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setSubmitting(true);
    try {
      await register(email, password, name);
      navigate("/");
    } catch (err) {
      if (err.message?.includes("no está configurado")) {
        setError(err.message);
      } else {
        setError(
          err.code === "auth/email-already-in-use"
            ? "Ese email ya está registrado."
            : "No se pudo crear la cuenta. Intentá de nuevo."
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth">
      <h1 className="auth_title">Crear cuenta</h1>
      {error && <p className="auth_error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="auth_field">
          <label htmlFor="name">Nombre</label>
          <input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="auth_field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth_field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="auth_field">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="auth_submit" type="submit" disabled={submitting}>
          {submitting ? "Creando cuenta..." : "Registrarme"}
        </button>
      </form>
      <p className="auth_footer">
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </div>
  );
}
