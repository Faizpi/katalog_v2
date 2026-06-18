import { Link, usePage } from '@inertiajs/react'
import { 
  LetterReveal, 
  WordReveal,
  ScrollReveal 
} from '../Components/AnimatedComponents'
import './ArticleDetail.css'

function ArticleDetail() {
  const { article, relatedArticles = [] } = usePage().props

  // Helper to get image path
  const getImagePath = (article) => {
    if (article.image_url) {
      return article.image_url
    }
    // Fallback to static path
    return `/${article.image || 'tips1.jpg'}`
  }

  if (!article) {
    return (
      <div className="article-detail">
        <div className="container">
          <div className="article-not-found">
            <h2>Artikel Tidak Ditemukan</h2>
            <p>Maaf, artikel yang Anda cari tidak tersedia.</p>
            <Link href="/" className="btn btn-primary">Kembali ke Beranda</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="article-detail">
      {/* Hero Section */}
      <section className="article-hero">
        <div className="article-hero-image">
          <img 
            src={getImagePath(article)} 
            alt={article.title}
            onError={(e) => { e.target.src = '/logo.png' }}
          />
          <div className="article-hero-overlay"></div>
        </div>
        <div className="container">
          <div className="article-hero-content">
            <Link href="/#artikel" className="article-breadcrumb">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Kembali ke Inspirasi
            </Link>
            <ScrollReveal animation="fadeInUp">
              <h1><LetterReveal text={article.title} delay={30} /></h1>
            </ScrollReveal>
            <ScrollReveal animation="fadeInUp" delay={200}>
              <p className="article-excerpt">{article.excerpt || article.content}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="article-content-section">
        <div className="container">
          <ScrollReveal animation="fadeInUp">
            <div 
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />
          </ScrollReveal>

          {/* CTA Section */}
          <ScrollReveal animation="fadeInUp" delay={200}>
            <div className="article-cta">
              <h3>Tertarik dengan Produk Kami?</h3>
              <p>Jelajahi koleksi lengkap produk perawatan tubuh M.B.K Indonesia</p>
              <Link href="/katalog" className="btn btn-primary btn-lg shine">
                Lihat Katalog Produk
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="related-articles-section">
          <div className="container">
            <ScrollReveal animation="fadeInUp">
              <h2>Artikel Lainnya</h2>
            </ScrollReveal>
            <div className="related-articles-grid">
              {relatedArticles.map((item, index) => {
                const getRelatedImage = (item) => {
                  if (item.image_url) return item.image_url
                  return `/${item.image || 'tips1.jpg'}`
                }
                
                return (
                  <ScrollReveal key={item.id} animation="fadeInUp" delay={index * 150}>
                    <Link href={`/artikel/${item.slug}`} className="related-article-card hover-lift">
                      <div className="related-article-image">
                        <img 
                          src={getRelatedImage(item)} 
                          alt={item.title}
                          onError={(e) => { e.target.src = '/logo.png' }}
                        />
                      </div>
                      <div className="related-article-content">
                        <h4>{item.title}</h4>
                        <p>{item.excerpt || item.content}</p>
                        <span className="read-more">
                          Baca Selengkapnya
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default ArticleDetail
