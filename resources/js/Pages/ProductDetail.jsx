import { Link, usePage } from '@inertiajs/react'
import ProductCard from '../Components/ProductCard'
import './ProductDetail.css'

function ProductDetail() {
  const { product, relatedProducts = [], settings = {} } = usePage().props

  // Logo paths
  const shopeeLogoSrc = '/Shopee_logo.svg'
  const tokopediaLogoSrc = '/Tokopedia_Mascot.png'
  const whatsappLogoSrc = '/whatsapp-logo.svg'

  const defaultWhatsappNumber = '6281234567890'
  const normalizeWhatsapp = (value) => (value || '').toString().replace(/[^0-9]/g, '')

  // Get whatsapp number from product or settings
  const whatsappNumber = normalizeWhatsapp(
    product?.whatsapp || settings?.contact_whatsapp || defaultWhatsappNumber
  )

  const defaultImage = 'https://via.placeholder.com/600x600/FAF8F5/D4A574?text=No+Image'

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="error-state">
            <h3>Produk Tidak Ditemukan</h3>
            <p>Maaf, produk yang Anda cari tidak tersedia</p>
            <Link href="/katalog" className="btn btn-primary">
              Kembali ke Katalog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const whatsappText = product
    ? `Halo, saya tertarik dengan produk ${product.name}${product.price_formatted ? ` (${product.price_formatted})` : ''}`
    : 'Halo, saya tertarik dengan produk Anda'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <section className="product-breadcrumb">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Beranda</Link>
            <span>/</span>
            <Link href="/katalog">Katalog</Link>
            {product.category_name && (
              <>
                <span>/</span>
                <Link href={`/katalog/${product.category_slug}`}>{product.category_name}</Link>
              </>
            )}
            <span>/</span>
            <span>{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="product-detail">
        <div className="container">
          <div className="product-detail-grid">
            {/* Product Image */}
            <div className="product-image-section">
              <div className="product-image-main">
                <img 
                  src={product.image_url || defaultImage} 
                  alt={product.name}
                />
                {product.featured && (
                  <span className="product-badge">Unggulan</span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info-section">
              {product.category_name && (
                <Link href={`/katalog/${product.category_slug}`} className="product-category-link">
                  {product.category_name}
                </Link>
              )}
              
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-price-box">
                <span className="product-price">{product.price_formatted}</span>
              </div>

              <div className="product-description">
                <h3>Deskripsi Produk</h3>
                <div className="description-content">
                  {product.description?.split('\n').map((line, i) => (
                    <p key={i}>{line || <br />}</p>
                  ))}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="product-cta">
                {/* Marketplace Buttons */}
                {(product.shopee_link || product.tokopedia_link) && (
                  <div className="product-marketplace-buttons">
                    {product.shopee_link && (
                      <a 
                        href={product.shopee_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-marketplace btn-shopee"
                      >
                        <img src={shopeeLogoSrc} alt="Shopee" />
                        Beli di Shopee
                      </a>
                    )}
                    {product.tokopedia_link && (
                      <a 
                        href={product.tokopedia_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-marketplace btn-tokopedia"
                      >
                        <img src={tokopediaLogoSrc} alt="Tokopedia" />
                        Beli di Tokopedia
                      </a>
                    )}
                  </div>
                )}
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg btn-whatsapp"
                >
                  <img className="whatsapp-logo" src={whatsappLogoSrc} alt="WhatsApp" />
                  Hubungi via WhatsApp
                </a>
                <Link href="/katalog" className="btn btn-outline btn-lg">
                  Lihat Produk Lain
                </Link>
              </div>

              {/* Product Meta */}
              <div className="product-meta">
                <div className="meta-item">
                  <span className="meta-label">Kategori:</span>
                  <Link href={`/katalog/${product.category_slug}`}>{product.category_name}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts?.length > 0 && (
        <section className="related-products section">
          <div className="container">
            <div className="section-header">
              <h2>Produk Terkait</h2>
              <p>Produk lain yang mungkin Anda suka</p>
            </div>
            <div className="products-grid">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetail
