import { Link } from '@inertiajs/react'
import { useEffect, useRef } from 'react'
import './ProductCard.css'

function ProductCard({ product }) {
  const defaultImage = 'https://via.placeholder.com/400x400/FAF8F5/D4A574?text=No+Image'
  const shopeeLogoSrc = '/Shopee_logo.svg'
  const tokopediaLogoSrc = '/Tokopedia_Mascot.png'
  const nameRef = useRef(null)

  useEffect(() => {
    const el = nameRef.current
    if (!el) return

    const check = () => {
      if (el.scrollWidth > el.clientWidth + 1) {
        const inner = el.querySelector('.product-name-inner')
        const gap = 50
        el.classList.add('is-overflow')
        if (inner) {
          inner.style.setProperty('--scroll-distance', (inner.scrollWidth + gap) + 'px')
        }
      } else {
        el.classList.remove('is-overflow')
      }
    }

    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [product.name])

  return (
    <div className="product-card">
      <Link href={`/produk/${product.slug}`} className="product-card-link">
        <div className="product-card-image">
          <img 
            src={product.image_url || defaultImage} 
            alt={product.name}
            loading="lazy"
          />
          {product.featured && (
            <span className="product-badge">Unggulan</span>
          )}
        </div>
        <div className="product-card-content">
          {product.category_name && (
            <span className="product-category">{product.category_name}</span>
          )}
          <h3 className="product-name" ref={nameRef}>
            <span className="product-name-inner">
              <span className="product-name-text">{product.name}</span>
              <span className="product-name-text product-name-clone" aria-hidden="true">{product.name}</span>
            </span>
          </h3>
          <p className="product-price">{product.price_formatted}</p>
        </div>
      </Link>
      {(product.shopee_link || product.tokopedia_link) && (
        <div className="product-marketplace-links">
          {product.shopee_link && (
            <a 
              href={product.shopee_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="marketplace-btn shopee-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={shopeeLogoSrc} alt="Shopee" />
              <span>Shopee</span>
            </a>
          )}
          {product.tokopedia_link && (
            <a 
              href={product.tokopedia_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="marketplace-btn tokopedia-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={tokopediaLogoSrc} alt="Tokopedia" />
              <span>Tokopedia</span>
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductCard
