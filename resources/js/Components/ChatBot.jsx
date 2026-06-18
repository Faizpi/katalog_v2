import { useState, useEffect, useRef } from 'react'
import { usePage } from '@inertiajs/react'
import './ChatBot.css'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const pageProps = usePage().props
  const settingsData = pageProps.settings || {}

  const productData = pageProps.chatbot_products || []
  const categoryData = pageProps.chatbot_categories || []

  const defaultWhatsappNumber = '6281234567890'
  const normalizeWhatsapp = (value) => (value || '').toString().replace(/[^0-9]/g, '')
  const whatsappNumber = normalizeWhatsapp(
    settingsData?.contact_whatsapp || settingsData?.contact_phone || defaultWhatsappNumber
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Hibiscus Efsya, saya butuh bantuan')}`

  // Quick suggestions
  const quickSuggestions = [
    { text: '⭐ Produk unggulan', query: 'Lihat produk unggulan' },
    { text: '🏷️ Kategori', query: 'Kategori produk' },
    { text: '🤔 Rekomendasi', query: 'Rekomendasi produk buat bau badan' },
    { text: '💰 Harga', query: 'Berapa kisaran harga' },
    { text: '📍 Cara beli', query: 'Cara beli' },
    { text: '✨ Tentang kami', query: 'Tentang Hibiscus Efsya' },
  ]

  useEffect(() => { scrollToBottom() }, [messages])
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }
  const toggleChat = () => { setIsOpen(!isOpen) }

  const addBotMessage = (text, showSuggestions = false) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text, showSuggestions, timestamp: new Date() }])
  }
  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text, timestamp: new Date() }])
  }

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return
    addUserMessage(text)
    setInputValue('')
    setIsTyping(true)
    setTimeout(() => {
      const response = generateResponse(text.toLowerCase())
      setIsTyping(false)
      addBotMessage(response.text, response.showSuggestions)
    }, 800 + Math.random() * 700)
  }

  // ===== KNOWLEDGE BASE & HELPERS =====

  const siteName = settingsData?.site_name || 'Hibiscus Efsya'

  const productsByCategory = productData.reduce((acc, p) => {
    const cat = p.category_name || 'Lainnya'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  // Maps user needs/problems to category keywords
  const needPatterns = [
    { pattern: /(bau badan|bb|ketek|ketiak|baju bau|keringat bau|badan bau)/, categories: ['deodorant', 'roll on'], icon: '🧴', desc: 'Untuk masalah bau badan, Deodorant Roll On adalah solusi terbaik! Memberikan perlindungan hingga 24 jam.' },
    { pattern: /(keringat|keringetan|lembab|sumuk|panas)/, categories: ['powder', 'bedak'], icon: '✨', desc: 'Untuk mengatasi keringat berlebih, Bedak Tabur M.B.K sangat efektif menyerap kelembapan!' },
    { pattern: /(wangi|harum|parfum|segar|fresh|perfume)/, categories: ['mist', 'lotion'], icon: '🌸', desc: 'Untuk tampil wangi sepanjang hari, coba Body Mist atau Body Lotion kami!' },
    { pattern: /(kulit kering|pelembab|moisturiz|kulit kasar)/, categories: ['lotion'], icon: '🧴', desc: 'Untuk kulit kering dan butuh kelembapan, Body Lotion M.B.K adalah pilihan tepat!' },
    { pattern: /(biang keringat|gatal|ruam|iritasi)/, categories: ['bedak', 'biang keringat'], icon: '✨', desc: 'Untuk biang keringat dan gatal-gatal, Bedak Biang Keringat M.B.K sangat ampuh menenangkan kulit!' },
    { pattern: /(murah|terjangkau|budget|hemat|ekonomis)/, categories: ['bedak', 'biang keringat'], icon: '💰', desc: 'Produk kami sangat terjangkau! Mulai dari Rp 9.000 saja.' },
    { pattern: /(pria|cowok|laki|men|suami)/, categories: ['deodorant'], icon: '💪', desc: 'Untuk pria, kami punya Deodorant Roll On varian Black dan Blue yang maskulin!', nameFilter: /(black|blue|men|pria)/i },
    { pattern: /(wanita|cewek|perempuan|ladies|women)/, categories: ['deodorant'], icon: '💖', desc: 'Untuk wanita, kami punya Deodorant Roll On varian Pink dan Purple yang feminine!', nameFilter: /(pink|purple|women|wanita)/i },
  ]

  // Maps category keywords to product list
  const categoryPatterns = [
    { pattern: /(deodorant|deodoran|deo|roll on|roll-on)/, key: 'deodorant', icon: '🧴', desc: 'Deodorant Roll On M.B.K memberikan perlindungan hingga 24 jam dari bau badan. Tersedia untuk pria dan wanita!' },
    { pattern: /(bedak|powder|tabur|po powder|p\.o)/, key: 'powder|bedak|po', icon: '✨', desc: 'Bedak tabur M.B.K membantu menyerap keringat dan memberikan aroma segar sepanjang hari!' },
    { pattern: /(biang keringat|bk)/, key: 'biang keringat|bedak', icon: '🌿', desc: 'Bedak Biang Keringat M.B.K sangat ampuh mengatasi gatal dan iritasi akibat keringat!' },
    { pattern: /(body mist|mist|parfum|wangi|fresh)/, key: 'mist', icon: '🌸', desc: 'Body Mist M.B.K memberikan keharuman segar yang tahan lama!' },
    { pattern: /(lotion|body lotion|pelembab|moisturiz)/, key: 'lotion', icon: '🧴', desc: 'Body Lotion M.B.K melembabkan kulit dan memberikan aroma harum!' },
  ]

  const formatPrice = (price) => {
    if (!price) return 'Rp -'
    return `Rp ${parseInt(price).toLocaleString('id-ID')}`
  }

  const truncate = (text, max = 100) => {
    if (!text) return ''
    const clean = text.replace(/<[^>]*>/g, '').replace(/\n+/g, ' ').trim()
    return clean.length > max ? clean.substring(0, max) + '...' : clean
  }

  const formatProductList = (products, limit = 6) => {
    return products.slice(0, limit).map(p =>
      `• **${p.name}** - ${p.price_formatted || formatPrice(p.price)}${p.featured ? ' ⭐' : ''}`
    ).join('\n')
  }

  const formatProductDetail = (p) => {
    let text = `📦 **${p.name}**\n`
    text += `💰 Harga: ${p.price_formatted || formatPrice(p.price)}\n`
    text += `📂 Kategori: ${p.category_name || '-'}\n`
    if (p.featured) text += `⭐ Produk Unggulan\n`
    if (p.description) text += `\n${truncate(p.description, 200)}`
    text += `\n\nTertarik? Hubungi kami via WhatsApp untuk pemesanan!`
    return text
  }

  const findProductsByCategory = (keywords) => {
    return productData.filter(p => {
      const name = p.name?.toLowerCase() || ''
      const cat = p.category_name?.toLowerCase() || ''
      return keywords.some(k => name.includes(k) || cat.includes(k))
    })
  }

  const findProductByName = (query) => {
    const words = query.split(/\s+/).filter(w => w.length > 2)
    let bestMatch = null
    let bestScore = 0
    productData.forEach(p => {
      const name = p.name?.toLowerCase() || ''
      const cat = p.category_name?.toLowerCase() || ''
      let score = 0
      if (name.includes(query)) score += 10
      words.forEach(w => {
        if (name.includes(w)) score += 3
        if (cat.includes(w)) score += 2
        if (p.description?.toLowerCase().includes(w)) score += 1
      })
      if (score > bestScore) { bestScore = score; bestMatch = p }
    })
    return bestScore >= 2 ? bestMatch : null
  }

  // ===== MAIN RESPONSE GENERATOR =====

  const generateResponse = (query) => {
    const q = query.toLowerCase().trim()

    // === GREETINGS ===
    if (q.match(/^(hai|halo|hi|hello|hey|p$|permisi|selamat|assalam|assalamualaikum|pagi|siang|sore|malam)/)) {
      const greetings = [
        `Halo! 😊 Senang bertemu dengan Anda!\n\nSaya siap membantu Anda menemukan produk ${siteName} yang tepat. Mau cari produk apa hari ini?`,
        `Hai! 👋 Selamat datang di ${siteName}!\n\nSaya bisa bantu Anda menemukan produk perawatan tubuh yang cocok. Silakan tanyakan apa saja!`,
        `Halo! 🌺 Ada yang bisa saya bantu?\n\nAnda bisa tanya tentang produk, harga, rekomendasi, atau informasi tentang ${siteName}!`,
      ]
      return { text: greetings[Math.floor(Math.random() * greetings.length)], showSuggestions: true }
    }

    // === RECOMMENDATION BASED ON NEEDS (NEW!) ===
    if (q.match(/(rekomendasi|rekomend|sarankan|cocok|bagus|pas|tepat|suitable|butuh|perlu|cari|mengatasi|mengatasi|solusi|obat|ampuh)/)) {
      for (const need of needPatterns) {
        if (q.match(need.pattern)) {
          let products = findProductsByCategory(need.categories)
          if (need.nameFilter) products = products.filter(p => need.nameFilter.test(p.name))
          if (products.length > 0) {
            const list = formatProductList(products, 4)
            return {
              text: `${need.icon} ${need.desc}\n\nBerikut rekomendasinya:\n\n${list}\n\n💡 Mau tahu detail produk tertentu? Ketik saja namanya!`,
              showSuggestions: false
            }
          }
        }
      }
      // Generic recommendation
      const featured = productData.filter(p => p.featured)
      if (featured.length > 0) {
        return {
          text: `🤔 Tentu, saya bantu carikan!\n\nBerikut produk unggulan kami yang paling diminati:\n\n${formatProductList(featured, 5)}\n\nAtau ceritakan kebutuhan Anda lebih spesifik, misalnya:\n• "Buat bau badan"\n• "Buat kulit kering"\n• "Buat pria/wanita"\n• "Yang harganya terjangkau"`,
          showSuggestions: false
        }
      }
    }

    // === COMPARISON: "beda", "bandingin", "pilih mana" ===
    if (q.match(/(beda|bedanya|bandingin|bandingkan|pilih mana|lebih bagus|lebih baik|mana yang|vs|versus|perbedaan)/)) {
      // Try to find 2 products mentioned
      const found = []
      productData.forEach(p => {
        const words = p.name?.toLowerCase().split(/\s+/).filter(w => w.length > 3) || []
        if (words.some(w => q.includes(w))) found.push(p)
      })

      if (found.length >= 2) {
        const [a, b] = found.slice(0, 2)
        let text = `⚖️ **Perbandingan Produk:**\n\n`
        text += `📦 **${a.name}**\n💰 ${a.price_formatted || formatPrice(a.price)}\n📂 ${a.category_name || '-'}${a.featured ? ' ⭐ Unggulan' : ''}\n\n`
        text += `📦 **${b.name}**\n💰 ${b.price_formatted || formatPrice(b.price)}\n📂 ${b.category_name || '-'}${b.featured ? ' ⭐ Unggulan' : ''}\n\n`
        if (a.category_name === b.category_name) {
          text += `Keduanya berasal dari kategori ${a.category_name}. `
          const pa = parseInt(a.price) || 0, pb = parseInt(b.price) || 0
          if (pa === pb) text += `Harganya sama! Tinggal pilih sesuai preferensi Anda.`
          else text += `Selisih harganya ${formatPrice(Math.abs(pa - pb))}.`
        } else {
          text += `Keduanya dari kategori berbeda. Sesuaikan dengan kebutuhan Anda!`
        }
        text += `\n\nMau tahu lebih detail? Ketik nama produknya!`
        return { text, showSuggestions: true }
      }

      // If can't find 2 specific products, compare within a category
      for (const cat of categoryPatterns) {
        if (q.match(cat.pattern)) {
          const products = findProductsByCategory([cat.key])
          if (products.length >= 2) {
            return {
              text: `⚖️ Berikut perbandingan produk ${products[0]?.category_name || ''} kami:\n\n${formatProductList(products, 6)}\n\n💡 Mau detail salah satunya? Ketik nama produknya!`,
              showSuggestions: false
            }
          }
        }
      }

      return {
        text: `⚖️ Mau bandingkan produk?\n\nSebutkan 2 nama produk yang ingin dibandingkan, atau sebutkan kategorinya!\n\nContoh:\n• "Bandingkan deodorant pink dan purple"\n• "Bedanya PO Powder Silver dan Gold apa?"`,
        showSuggestions: true
      }
    }

    // === SPECIFIC CATEGORY SEARCH ===
    for (const cat of categoryPatterns) {
      if (q.match(cat.pattern)) {
        const keywords = cat.key.split('|')
        const products = findProductsByCategory(keywords)
        if (products.length > 0) {
          const list = formatProductList(products, 6)
          return { text: `${cat.icon} ${cat.desc}\n\n${list}\n\n💡 Ketik nama produk untuk info detail!`, showSuggestions: true }
        }
      }
    }

    // === FEATURED PRODUCTS ===
    if (q.match(/(unggulan|terbaik|favorit|populer|best|rekomendasi|terlaris|best.?seller)/)) {
      const featured = productData.filter(p => p.featured)
      if (featured.length > 0) {
        return {
          text: `⭐ Produk unggulan kami yang paling diminati:\n\n${formatProductList(featured)}\n\nMau tahu lebih detail? Ketik nama produknya!`,
          showSuggestions: false
        }
      }
    }

    // === ALL PRODUCTS ===
    if (q.match(/(semua produk|produk apa|ada apa|apa saja|apa aja|daftar produk|list produk|katalog)/)) {
      if (productData.length > 0) {
        const cats = Object.keys(productsByCategory)
        let text = `📦 Kami punya ${productData.length} produk dalam ${cats.length} kategori:\n\n`
        cats.forEach(cat => {
          const prods = productsByCategory[cat]
          text += `**${cat}** (${prods.length} produk)\n`
          prods.slice(0, 3).forEach(p => { text += `  • ${p.name} - ${p.price_formatted || formatPrice(p.price)}\n` })
          if (prods.length > 3) text += `  • ...dan ${prods.length - 3} lainnya\n`
          text += `\n`
        })
        text += `Ketik nama produk atau kategori untuk info lebih detail!`
        return { text, showSuggestions: true }
      }
    }

    // === CATEGORY LIST ===
    if (q.match(/(kategori|jenis|macam|tipe|varian)/)) {
      if (categoryData.length > 0) {
        const list = categoryData.map(c => `• **${c.name}** (${c.product_count || 0} produk)`).join('\n')
        return { text: `🏷️ Kami memiliki ${categoryData.length} kategori produk:\n\n${list}\n\nMau lihat produk dari kategori mana? Ketik nama kategorinya!`, showSuggestions: false }
      }
    }

    // === PRICE QUERIES ===
    if (q.match(/(harga|price|berapa|biaya|murah|mahal|budget|range)/)) {
      const matched = findProductByName(q)
      if (matched) {
        return {
          text: `💰 **${matched.name}**\n\nHarga: ${matched.price_formatted || formatPrice(matched.price)}${matched.description ? '\n\n' + truncate(matched.description, 150) : ''}\n\nMau pesan? Hubungi kami via WhatsApp!`,
          showSuggestions: true
        }
      }
      if (productData.length > 0) {
        const prices = productData.map(p => parseInt(p.price) || 0).filter(Boolean)
        const cheapest = productData.reduce((a, b) => (parseInt(a.price) || Infinity) < (parseInt(b.price) || Infinity) ? a : b)
        const priciest = productData.reduce((a, b) => (parseInt(a.price) || 0) > (parseInt(b.price) || 0) ? a : b)
        return {
          text: `💰 Range harga produk kami:\n\n${formatPrice(Math.min(...prices))} - ${formatPrice(Math.max(...prices))}\n\n🏷️ Termurah: ${cheapest.name} (${cheapest.price_formatted})\n👑 Termahal: ${priciest.name} (${priciest.price_formatted})\n\nMau tahu harga produk tertentu? Sebutkan namanya!`,
          showSuggestions: true
        }
      }
    }

    // === ABOUT ===
    if (q.match(/(tentang|about|siapa|apa itu|hibiscus|efsya|mbk|m\.b\.k|brand|merek)/)) {
      return {
        text: `🌺 **${siteName}**\n\n${settingsData?.about_content || 'Hibiscus Efsya adalah brand produk perawatan tubuh di bawah naungan M.B.K Indonesia yang telah dipercaya masyarakat.'}\n\n✅ Bersertifikat Halal MUI\n✅ BPOM Approved\n✅ Produksi Indonesia\n📦 ${productData.length} produk tersedia\n🏷️ ${categoryData.length} kategori\n\nKami menyediakan deodorant, bedak tabur, body mist, dan body lotion berkualitas!`,
        showSuggestions: true
      }
    }

    // === HOW TO BUY ===
    if (q.match(/(beli|order|pesan|cara beli|gimana cara|bagaimana cara|dimana|di mana|purchase|buy|cara)/)) {
      return {
        text: `🛒 Cara membeli produk ${siteName}:\n\n1️⃣ Pilih produk di katalog kami\n2️⃣ Klik tombol Shopee/Tokopedia pada produk, atau\n3️⃣ Hubungi kami via WhatsApp untuk pemesanan manual\n4️⃣ Konfirmasi pesanan dan alamat\n5️⃣ Bayar dan produk dikirim ke alamat Anda!\n\n📱 Klik tombol WhatsApp di bawah untuk langsung terhubung!`,
        showSuggestions: true
      }
    }

    // === CONTACT ===
    if (q.match(/(kontak|contact|hubungi|telepon|telpon|hp|nomor|wa|whatsapp|email|alamat)/)) {
      return {
        text: `📞 Hubungi Kami:\n\n📱 WhatsApp: ${settingsData?.contact_whatsapp || '+62 812 3456 7890'}\n📧 Email: ${settingsData?.contact_email || 'info@hibiscusefsya.com'}\n📍 Lokasi: ${settingsData?.contact_address || 'Jakarta, Indonesia'}\n\nAtau klik tombol WhatsApp di bawah untuk langsung chat!`,
        showSuggestions: true
      }
    }

    // === HALAL ===
    if (q.match(/(halal|sertifikat|bpom|aman|safe|certified|terdaftar)/)) {
      return {
        text: `✅ Keamanan Produk ${siteName}:\n\n🕌 **Halal MUI** - Aman digunakan sesuai syariat Islam\n🛡️ **BPOM Approved** - Terdaftar dan teruji di Badan POM\n🏭 **Produksi Indonesia** - Standar kualitas tinggi\n\nSemua produk M.B.K Indonesia dijamin aman dan berkualitas!`,
        showSuggestions: true
      }
    }

    // === THANKS ===
    if (q.match(/(terima kasih|makasih|thanks|thank you|thx|tq|trims)/)) {
      const replies = [
        `Sama-sama! 😊 Senang bisa membantu. Jangan ragu tanya lagi ya kalau butuh info produk ${siteName}!`,
        `Sama-sama! 🌸 Semoga info yang saya berikan bermanfaat. Kalau ada pertanyaan lain, saya selalu siap membantu!`,
        `Dengan senang hati! 😊 Kalau butuh rekomendasi produk atau mau pesan, saya siap bantu kapan saja!`,
      ]
      return { text: replies[Math.floor(Math.random() * replies.length)], showSuggestions: true }
    }

    // === GOODBYE ===
    if (q.match(/(bye|dadah|sampai jumpa|see you|selamat tinggal|pamit)/)) {
      return { text: `Sampai jumpa! 👋\n\nTerima kasih sudah berkunjung. Kalau butuh info produk ${siteName}, saya selalu siap membantu. Semoga harimu menyenangkan! 🌸`, showSuggestions: false }
    }

    // === SEARCH SPECIFIC PRODUCT (FUZZY SCORING) ===
    const matched = findProductByName(q)
    if (matched) {
      return { text: formatProductDetail(matched), showSuggestions: true }
    }

    // === SMART FALLBACK ===
    return {
      text: `Hmm, saya belum sepenuhnya paham pertanyaan Anda. 🤔\n\nCoba tanyakan hal-hal ini:\n• "Rekomendasi produk buat bau badan"\n• "Bandingkan deodorant pink dan purple"\n• "Produk apa saja yang tersedia?"\n• "Harga [nama produk]"\n• "Kategori produk"\n\nAtau ketik nama produk langsung untuk info detail! 👇`,
      showSuggestions: true
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (query) => {
    handleSendMessage(query)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chatbot"
      >
        <div className="chatbot-toggle-icon">
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="5"/>
              <path d="M8 8h.01M16 8h.01"/>
              <path d="M9 11s1 1 3 1 3-1 3-1"/>
              <path d="M12 13v3"/>
              <path d="M8 21h8"/>
              <path d="M10 21v-3"/>
              <path d="M14 21v-3"/>
              <rect x="6" y="3" width="12" height="10" rx="2"/>
              <path d="M4 7h2M18 7h2"/>
              <path d="M9 3V1M15 3V1"/>
            </svg>
          )}
        </div>
        <span className="chatbot-toggle-pulse"></span>
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Glass Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="5"/>
              <path d="M8 8h.01M16 8h.01"/>
              <path d="M9 11s1 1 3 1 3-1 3-1"/>
            </svg>
          </div>
          <div className="chatbot-header-info">
            <h4>Asisten Hibiscus</h4>
            <span className="chatbot-status">
              <span className="status-dot"></span>
              Online
            </span>
          </div>
          <button className="chatbot-close" onClick={toggleChat}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="chatbot-messages">
          {messages.length === 0 && (
            <div className="chatbot-welcome">
              <div className="welcome-icon">🌺</div>
              <h4>Selamat Datang!</h4>
              <p>Tanyakan apa saja tentang produk kami</p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.type}`}>
              {msg.type === 'bot' && (
                <div className="message-avatar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M9 8h.01M15 8h.01"/>
                  </svg>
                </div>
              )}
              <div className="message-content">
                <div className="message-bubble">
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
                {msg.showSuggestions && msg.type === 'bot' && (
                  <div className="message-suggestions">
                    {quickSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        className="suggestion-btn"
                        onClick={() => handleSuggestionClick(suggestion.query)}
                      >
                        {suggestion.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M9 8h.01M15 8h.01"/>
                </svg>
              </div>
              <div className="message-content">
                <div className="message-bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions (always visible) */}
        <div className="chatbot-quick-suggestions">
          {quickSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              className="quick-suggestion-btn"
              onClick={() => handleSuggestionClick(suggestion.query)}
            >
              {suggestion.text}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="chatbot-input-area">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ketik pesan..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
          />
          <button 
            className="chatbot-send-btn"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="chatbot-wa-btn"
            title="Chat WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}

export default ChatBot
