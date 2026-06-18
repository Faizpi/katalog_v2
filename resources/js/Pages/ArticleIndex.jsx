import { Link, usePage } from '@inertiajs/react'
import { 
  LetterReveal, 
  ScrollReveal 
} from '../Components/AnimatedComponents'

function ArticleIndex() {
  const { articles = [], settings = {} } = usePage().props

  const articleList = articles?.data ?? articles ?? []

  const getImagePath = (article) => {
    if (article.image_url) return article.image_url
    if (article.image) return `/${article.image}`
    return '/tips1.jpg'
  }

  return (
    <div className="catalog-page">
      {/* Header */}
      <section className="catalog-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Beranda</Link>
            <span>/</span>
            <span>Artikel</span>
          </div>
          <h1>Artikel & Inspirasi</h1>
          <p>Tips, tren, dan cerita seputar perawatan tubuh</p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="catalog-content">
        <div className="container">
          {articleList.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <h3>Belum Ada Artikel</h3>
              <p>Artikel akan segera hadir. Kunjungi halaman ini lagi nanti.</p>
              <Link href="/" className="btn btn-primary">
                Kembali ke Beranda
              </Link>
            </div>
          ) : (
            <div className="products-grid">
              {articleList.map((article, index) => (
                <ScrollReveal 
                  key={article.id} 
                  animation="fadeInUp" 
                  delay={index * 100}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Link href={`/artikel/${article.slug}`} className="inspiration-card hover-lift">
                    <div className="inspiration-image shine">
                      <img 
                        src={getImagePath(article)} 
                        alt={article.title}
                        loading="lazy"
                        onError={(e) => { e.target.src = '/logo.png' }}
                      />
                    </div>
                    <div className="inspiration-content">
                      <h4>{article.title}</h4>
                      <p>{article.excerpt || article.content}</p>
                      <span className="inspiration-link">
                        Baca Selengkapnya
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ArticleIndex
