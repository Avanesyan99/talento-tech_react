import { useEffect, useState } from "react";
import "./ProductForm.css";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  image: "",
  category: "",
  stock: "",
};

export default function ProductForm({ initialProduct, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setForm({
        title: initialProduct.title ?? "",
        description: initialProduct.description ?? "",
        price: initialProduct.price ?? "",
        image: initialProduct.image ?? "",
        category: initialProduct.category ?? "",
        stock: initialProduct.stock ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialProduct]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        image: form.image,
        category: form.category,
        stock: Number(form.stock),
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="product-form_overlay">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>{initialProduct ? "Editar producto" : "Nuevo producto"}</h2>

        <label>
          Título
          <input name="title" required value={form.title} onChange={handleChange} />
        </label>

        <label>
          Descripción
          <textarea
            name="description"
            required
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <div className="product-form_row">
          <label>
            Precio
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              value={form.price}
              onChange={handleChange}
            />
          </label>

          <label>
            Stock
            <input
              name="stock"
              type="number"
              min="0"
              required
              value={form.stock}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          Categoría
          <input name="category" required value={form.category} onChange={handleChange} />
        </label>

        <label>
          URL de imagen
          <input name="image" type="url" required value={form.image} onChange={handleChange} />
        </label>

        <div className="product-form_actions">
          <button type="button" className="product-form_cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="product-form_submit" disabled={submitting}>
            {submitting ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
