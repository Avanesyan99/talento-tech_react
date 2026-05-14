import React from 'react'
import { useState, useEffect } from 'react'
import Item from './Item'
import './ItemListContainer.css'


export default function ItemListContainer() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState("")
  const [activeCategory, setActiveCategory] = useState("all");


  useEffect(() => {
    setLoading(true)
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, []);

  const categories = ["all", ...new Set(products.map(p => p.category))]
  const filtered = activeCategory === "all" ? products : products.filter(p => p.category === activeCategory)


  if (loading) {
    return (
      <div className="catalog_loading">
        <p>Loading products...</p>
      </div>
    )
  }


  if (error) {
    return <p>Error al cargar productos: {error.message}</p>
  }

  return (
    <section>
      <div>
        <h1>Productos</h1>
        <span>{products.length} Resultados</span>
      </div>

      <div className="catalog_filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter_btn ${activeCategory === category ? "filter_btn--active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="catalog_grid">
        {filtered.map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
