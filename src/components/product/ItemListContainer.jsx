import { useEffect, useMemo, useState } from 'react'
import Item from './Item'
import { subscribeToProducts } from '../../firebase/products'
import './ItemListContainer.css'

const PAGE_SIZE = 8

export default function ItemListContainer() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data)
      setLoading(false)
    })
    return unsubscribe
  }, []);

  const categories = ["all", ...new Set(products.map(p => p.category))]

  const filtered = useMemo(() => {
    return products
      .filter(p => activeCategory === "all" || p.category === activeCategory)
      .filter(p => p.title?.toLowerCase().includes(search.trim().toLowerCase()))
  }, [products, activeCategory, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleCategoryChange(category) {
    setActiveCategory(category)
    setPage(1)
  }

  function handleSearchChange(value) {
    setSearch(value)
    setPage(1)
  }

  if (loading) {
    return (
      <div className="catalog_loading">
        <p>Cargando productos...</p>
      </div>
    )
  }

  return (
    <section className="catalog">
      <div className="catalog_header">
        <h1 className="catalog_title">Productos</h1>
        <span className="catalog_count">{filtered.length} Resultados</span>
      </div>

      <input
        type="search"
        className="catalog_search"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      <div className="catalog_filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter_btn ${activeCategory === category ? "filter_btn--active" : ""}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="catalog_grid">
        {paginated.map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && <p className="catalog_empty">No se encontraron productos.</p>}

      {totalPages > 1 && (
        <div className="catalog_pagination">
          <button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
            ← Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>
            Siguiente →
          </button>
        </div>
      )}
    </section>
  )
}
