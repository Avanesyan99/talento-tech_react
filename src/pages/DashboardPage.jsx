import { useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  seedProductsFromFakeStore,
  subscribeToProducts,
  updateProduct,
} from "../firebase/products";
import ProductForm from "../components/dashboard/ProductForm";
import "./DashboardPage.css";

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function openCreateForm() {
    setEditingProduct(null);
    setShowForm(true);
  }

  function openEditForm(product) {
    setEditingProduct(product);
    setShowForm(true);
  }

  async function handleSubmit(data) {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
    } else {
      await addProduct(data);
    }
    setShowForm(false);
  }

  async function handleDelete(product) {
    if (confirm(`¿Eliminar "${product.title}"?`)) {
      await deleteProduct(product.id);
    }
  }

  async function handleSeed() {
    setSeeding(true);
    try {
      const result = await seedProductsFromFakeStore();
      if (!result.seeded) {
        alert("Ya hay productos cargados, no se agregó nada.");
      }
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard_header">
        <h1>Dashboard de productos</h1>
        <div className="dashboard_actions">
          <button className="dashboard_seed" onClick={handleSeed} disabled={seeding}>
            {seeding ? "Cargando..." : "Cargar productos de ejemplo"}
          </button>
          <button className="dashboard_new" onClick={openCreateForm}>
            + Nuevo producto
          </button>
        </div>
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="dashboard_table-wrap">
          <table className="dashboard_table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img className="dashboard_thumb" src={product.image} alt={product.title} />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td className="dashboard_row-actions">
                    <button onClick={() => openEditForm(product)}>Editar</button>
                    <button onClick={() => handleDelete(product)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <p>No hay productos todavía.</p>}
        </div>
      )}

      {showForm && (
        <ProductForm
          initialProduct={editingProduct}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
