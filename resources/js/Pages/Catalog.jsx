import { Link, router, usePage } from '@inertiajs/react'
import ProductCard from '../Components/ProductCard'
import { ScrollReveal } from '../Components/AnimatedComponents'
import './Catalog.css'

function Catalog() {
  const { 
    products = [], 
    categories = [], 
    selectedCategory = null,
    search_query = '',
    meta = null
  } = usePage().props

  const categorySlug = selectedCategory?.slug || null

  const handleSearch = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const search = formData.get('search')?.trim()
    const url = categorySlug ? `/katalog/${categorySlug}` : '/katalog'
    router.get(url, search ? { search } : {}, { preserveState: true })
  }

  const handleCategoryChange = (slug) => {
    const url = slug ? `/katalog/${slug}` : '/katalog'
    router.get(url)
  }

  const clearFilters = () => {
    router.get('/katalog')
  }

  const handlePageChange = (page) => {
    const url = categorySlug ? `/katalog/${categorySlug}` : '/katalog'
    router.get(url, { page }, { preserveScroll: true })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentCategory = categories.find(c => c.slug === categorySlug)
  const currentPage = meta?.current_page || 1

  return (
    <div className="catalog-page">
      {/* Header */}
      <section className="catalog-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Beranda</Link>
            <span>/</span>
            <span>Katalog</span>
            {currentCategory && (
              <>
                <span>/</span>
                <span>{currentCategory.name}</span>
              </>
            )}
          </div>
          <h1>{currentCategory ? currentCategory.name : 'Katalog Produk'}</h1>
          <p>Temukan produk perawatan tubuh M.B.K untuk kesegaran Anda</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="catalog-content">
        <div className="container">
          <div className="catalog-layout">
            {/* Sidebar */}
            <aside className="catalog-sidebar">
              {/* Search */}
              <div className="sidebar-section">
                <h3>Cari Produk</h3>
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    name="search"
                    className="input"
                    placeholder="Cari produk..."
                    defaultValue={search_query}
                  />
                  <button type="submit" className="btn btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                  </button>
                </form>
              </div>

              {/* Categories Filter */}
              <div className="sidebar-section">
                <h3>Kategori</h3>
                <ul className="category-filter">
                  <li>
                    <Link 
                      href="/katalog" 
                      className={`filter-link ${!categorySlug ? 'active' : ''}`}
                    >
                      Semua Produk
                    </Link>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link 
                        href={`/katalog/${cat.slug}`}
                        className={`filter-link ${categorySlug === cat.slug ? 'active' : ''}`}
                      >
                        {cat.name}
                        <span className="count">({cat.product_count})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Active Filters */}
              {(categorySlug || search_query) && (
                <div className="sidebar-section">
                  <h3>Filter Aktif</h3>
                  <div className="active-filters">
                    {categorySlug && (
                      <span className="filter-tag">
                        {currentCategory?.name}
                        <Link href="/katalog" className="remove-filter">×</Link>
                      </span>
                    )}
                    {search_query && (
                      <span className="filter-tag">
                        "{search_query}"
                        <button onClick={clearFilters} className="remove-filter">×</button>
                      </span>
                    )}
                  </div>
                  <button onClick={clearFilters} className="btn btn-outline btn-sm clear-all">
                    Hapus Semua Filter
                  </button>
                </div>
              )}
            </aside>

            {/* Products Grid */}
            <div className="catalog-main">
              {/* Results Info */}
              <div className="results-info">
                <p>
                  Menampilkan {products.length} dari {meta?.total || products.length} produk
                  {search_query && ` untuk "${search_query}"`}
                </p>
              </div>

              {products.length > 0 ? (
                <>
                  <div className="products-grid">
                    {products.map((product, index) => (
                      <ScrollReveal key={product.id} animation="fadeInUp" delay={index * 80} style={{ display: 'flex', flexDirection: 'column' }}>
                        <ProductCard product={product} />
                      </ScrollReveal>
                    ))}
                  </div>

                  {/* Pagination */}
                  {meta && meta.last_page > 1 && (
                    <div className="pagination">
                      <button
                        className="pagination-btn"
                        disabled={currentPage <= 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        ← Sebelumnya
                      </button>
                      
                      <div className="pagination-pages">
                        {[...Array(meta.last_page)].map((_, i) => (
                          <button
                            key={i}
                            className={`pagination-page ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        className="pagination-btn"
                        disabled={currentPage >= meta.last_page}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Selanjutnya →
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">🔍</div>
                  <h3>Produk Tidak Ditemukan</h3>
                  <p>Coba ubah kata kunci pencarian atau filter Anda</p>
                  <button onClick={clearFilters} className="btn btn-primary">
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Catalog
