import { useState, useEffect } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import './Navbar.css'

function Navbar() {
  const logoSrc = '/logo.png'
  const { url, settings = {} } = usePage().props
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [url])

  // Handle click untuk section links
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault()
    
    // Jika di halaman lain, navigate ke home dulu dengan hash
    if (url !== '/') {
      router.visit('/#' + sectionId)
    } else {
      // Jika sudah di home, langsung scroll
      const element = document.getElementById(sectionId) || document.querySelector(`#${sectionId}, footer[id="${sectionId}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <span className="logo-icon"><img src={logoSrc} alt="Hibiscus Efsya" style={{ width: 48, height: 48, objectFit: 'contain' }} /></span>
          <div className="logo-text">
            <span className="logo-name">{settings?.site_name || 'Hibiscus Efsya'}</span>
            <span className="logo-tagline">{settings?.site_tagline || 'part of M.B.K Indonesia'}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav">
          <Link 
            href="/" 
            className={`nav-link ${url === '/' ? 'active' : ''}`}
          >
            Beranda
          </Link>
          <Link 
            href="/katalog" 
            className={`nav-link ${url.startsWith('/katalog') ? 'active' : ''}`}
          >
            Katalog
          </Link>
          <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="nav-link">Tentang Kami</a>
          <a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')} className="nav-link">Kontak</a>
        </nav>

        {/* CTA Button */}
        <Link href="/katalog" className="navbar-cta btn btn-primary btn-sm">
          Lihat Produk
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
        <nav className="mobile-nav">
          <Link href="/" className="mobile-nav-link">Beranda</Link>
          <Link href="/katalog" className="mobile-nav-link">Katalog</Link>
          <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="mobile-nav-link">Tentang Kami</a>
          <a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')} className="mobile-nav-link">Kontak</a>
          <Link href="/katalog" className="btn btn-primary btn-block">
            Lihat Produk
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
