"use client";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
// import { analytics } from "../lib/firebase"; // Deferred for performance

export default function Home() {
  // Active section tracking for mobile bottom nav
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.getAttribute('data-target'));
          const duration = 2000; // 2 seconds
          const increment = finalValue / (duration / 16); // 60fps
          let current = 0;
          
          const counter = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
              current = finalValue;
              clearInterval(counter);
            }
            target.querySelector('div').textContent = Math.floor(current).toLocaleString() + '+';
          }, 16);
          
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    const counterItems = document.querySelectorAll('.counter-item');
    counterItems.forEach(item => observer.observe(item));

    // Client navigation functionality
    const prevBtn = document.getElementById('prevClient');
    const nextBtn = document.getElementById('nextClient');
    const clientGrid = document.getElementById('clientGrid');
    
    let currentIndex = 0;
    const clientsPerView = 6;
    const totalClients = 12; // Assuming we have more clients
    
    const updateClientView = () => {
      // This would be implemented with actual client data
      // For now, it's a placeholder for the navigation functionality
    };
    
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - clientsPerView);
        updateClientView();
      });
      
      nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(totalClients - clientsPerView, currentIndex + clientsPerView);
        updateClientView();
      });
    }

    return () => {
      observer.disconnect();
      if (prevBtn) prevBtn.removeEventListener('click', () => {});
      if (nextBtn) nextBtn.removeEventListener('click', () => {});
    };
  }, []);

  // Track active section for bottom nav
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'gallery', 'contact'];
    let currentActive = 'home';
    
    const observerOptions = {
      threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), // 0, 0.05, 0.1, ... 1
      rootMargin: '0px 0px -50% 0px' // Bottom half of viewport
    };

    const observer = new IntersectionObserver((entries) => {
      // Find entry with highest intersection ratio
      let highestRatio = 0;
      let highestId = currentActive;
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          highestId = entry.target.id;
        }
      });
      
      // Only update if we have a significantly visible section
      if (highestRatio > 0.05) {
        currentActive = highestId;
        setActiveSection(highestId);
      }
    }, observerOptions);

    // Observe all sections
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Gallery products - static list (no random shuffle to avoid hydration mismatch)
  const productsData = useMemo(() => [
    { src: "/img/products/jaket_berbagai_macam.webp", alt: "Jaket berbagai macam model dan style dari FAM.CLOTHMAKER" },
    { src: "/img/products/jaket_jeans.webp", alt: "Jaket denim jeans berkualitas premium dari konveksi Yogyakarta" },
    { src: "/img/products/jaket_kulit.webp", alt: "Jaket kulit sintetis dengan desain modern dan berkualitas" },
    { src: "/img/products/jaket_olahraga.webp", alt: "Jaket olahraga untuk aktivitas outdoor dan fitness" },
    { src: "/img/products/jaket_tebal.webp", alt: "Jaket tebal untuk musim dingin dengan bahan hangat" },
    { src: "/img/products/jaket_tracking.webp", alt: "Jaket tracking dengan desain fungsional dan stylish" },
    { src: "/img/products/kaos_aneka_warna.webp", alt: "Kaos dengan berbagai pilihan warna menarik" },
    { src: "/img/products/kaos_custom_sablon.webp", alt: "Kaos custom dengan sablon sesuai desain Anda" },
    { src: "/img/products/kaos_garis_abu.webp", alt: "Kaos bergaris dengan warna abu-abu yang elegan" },
    { src: "/img/products/kaos_garis.webp", alt: "Kaos bergaris dengan desain klasik dan timeless" },
    { src: "/img/products/kaos_kantong.webp", alt: "Kaos dengan kantong untuk kebutuhan praktis" },
    { src: "/img/products/kaos_lari.webp", alt: "Kaos lari dengan bahan breathable untuk olahraga" },
    { src: "/img/products/kaos_polo_garis.webp", alt: "Kaos polo bergaris dengan kerah klasik" },
    { src: "/img/products/kaos_polo.webp", alt: "Kaos polo dengan desain formal dan casual" },
    { src: "/img/products/kaos_polos.webp", alt: "Kaos polos dengan berbagai warna dan ukuran" },
    { src: "/img/products/kaos_sablon.webp", alt: "Kaos dengan sablon berkualitas tinggi dan tahan lama" },
    { src: "/img/products/kaos_vneck.webp", alt: "Kaos V-neck dengan desain modern dan stylish" },
    { src: "/img/products/kaos.webp", alt: "Kaos berkualitas premium dari konveksi FAM.CLOTHMAKER" },
    { src: "/img/products/kemeja_biru.webp", alt: "Kemeja biru dengan desain profesional untuk kantor" },
    { src: "/img/products/kemeja_dasi.webp", alt: "Kemeja formal dengan aksesoris dasi untuk acara resmi" },
    { src: "/img/products/kemeja_flannel_merah.webp", alt: "Kemeja flannel merah dengan bahan hangat dan nyaman" },
    { src: "/img/products/kemeja_flannel.webp", alt: "Kemeja flannel dengan desain casual dan trendy" },
    { src: "/img/products/kemeja_kantor.webp", alt: "Kemeja kantor formal dengan kualitas premium" },
    { src: "/img/products/kemeja_kotak.webp", alt: "Kemeja kotak-kotak dengan pattern klasik" },
    { src: "/img/products/kemeja_panjang.webp", alt: "Kemeja lengan panjang untuk kebutuhan formal" },
    { src: "/img/products/kemeja_santai.webp", alt: "Kemeja santai dengan desain casual dan nyaman" },
    { src: "/img/products/topi_abuabu.webp", alt: "Topi abu-abu dengan desain modern dan stylish" },
    { src: "/img/products/topi_bucket.webp", alt: "Topi bucket dengan desain casual dan trendy" },
    { src: "/img/products/topi_golf.webp", alt: "Topi golf dengan desain sporty dan fungsional" },
    { src: "/img/products/topi_hitam.webp", alt: "Topi hitam klasik dengan desain timeless" },
    { src: "/img/products/topi_jerami.webp", alt: "Topi jerami untuk aktivitas outdoor dan pantai" },
    { src: "/img/products/topi_koboi.webp", alt: "Topi koboi dengan gaya western yang unik" },
    { src: "/img/products/topi_kupluk_kuning.webp", alt: "Topi kupluk kuning dengan desain colorful" },
    { src: "/img/products/topi_kupluk.webp", alt: "Topi kupluk untuk cuaca dingin dan hangat" },
    { src: "/img/products/topi_patch.webp", alt: "Topi dengan patch custom sesuai kebutuhan" },
    { src: "/img/products/topi_sablon.webp", alt: "Topi dengan sablon berkualitas tinggi dan tahan lama" },
    { src: "/img/products/topi_warna.webp", alt: "Topi dengan berbagai pilihan warna menarik" },
    { src: "/img/products/topi.webp", alt: "Topi berkualitas premium dari FAM.CLOTHMAKER" },
    { src: "/img/products/pakaian_lari.webp", alt: "Pakaian lari dengan bahan breathable untuk olahraga" },
  ], []);

  // Shuffle products on client-side only (after mount)
  const [galleryProducts, setGalleryProducts] = useState(productsData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Shuffle array randomly on client-side only
    const shuffled = [...productsData];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setGalleryProducts(shuffled);
  }, [productsData]);

  const [galleryCurrentSlide, setGalleryCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isAnimating, setIsAnimating] = useState(false);

  // Testimonials data
  const testimonials = useMemo(() => [
    {
      initials: "AP",
      name: "Andi Prasetyo",
      role: "Owner Distro Jogja",
      gradient: "from-[#7F0606] to-[#5A0404]",
      text: "Kualitas jahitan rapi banget, bahan juga sesuai pesanan. Tim FAM sangat responsif dan membantu dari awal sampai akhir. Sudah order 3x dan selalu puas!",
      order: "500 pcs Kaos Polo"
    },
    {
      initials: "SR",
      name: "Siti Rahayu",
      role: "HRD PT. Maju Bersama",
      gradient: "from-green-500 to-green-600",
      text: "Seragam kantor kami dikerjakan dengan sangat profesional. Pengiriman tepat waktu dan packaging rapi. Recommended untuk konveksi kemeja formal!",
      order: "200 pcs Kemeja Kantor"
    },
    {
      initials: "BW",
      name: "Budi Wijaya",
      role: "Ketua Komunitas MTB Jogja",
      gradient: "from-purple-500 to-purple-600",
      text: "Jaket komunitas kami hasilnya keren banget! Desain custom diakomodir dengan baik. Harga juga kompetitif untuk kualitas sebagus ini.",
      order: "150 pcs Jaket Bomber"
    },
    {
      initials: "DM",
      name: "Diana Maharani",
      role: "Event Organizer",
      gradient: "from-pink-500 to-pink-600",
      text: "Sering pesan merchandise untuk event, dan FAM selalu bisa diandalkan. Proses cepat, kualitas bagus, dan tim yang sangat helpful.",
      order: "1000 pcs Kaos Event"
    },
    {
      initials: "RH",
      name: "Rizky Hidayat",
      role: "Owner Brand Streetwear",
      gradient: "from-blue-500 to-blue-600",
      text: "Sudah 2 tahun jadi partner produksi brand saya. Konsistensi kualitas terjaga, dan mereka selalu update soal tren bahan terbaru.",
      order: "Rutin bulanan"
    },
    {
      initials: "NF",
      name: "Nadia Fitri",
      role: "Panitia OSIS SMA",
      gradient: "from-orange-500 to-orange-600",
      text: "Kaos angkatan kami jadi yang terbaik! Budget pelajar tapi kualitas tetap oke. Proses konsultasinya juga sabar banget.",
      order: "300 pcs Kaos Angkatan"
    }
  ], []);

  // Testimonial carousel state
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [testimonialAnimating, setTestimonialAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const testimonialsPerSlide = isMobile ? 1 : 3;
  const totalTestimonialSlides = isMobile ? testimonials.length : Math.ceil(testimonials.length / 3);
  
  const nextTestimonial = () => {
    if (testimonialAnimating) return;
    setTestimonialAnimating(true);
    setTestimonialSlide((prev) => (prev + 1) % totalTestimonialSlides);
    setTimeout(() => setTestimonialAnimating(false), 400);
  };

  const prevTestimonial = () => {
    if (testimonialAnimating) return;
    setTestimonialAnimating(true);
    setTestimonialSlide((prev) => (prev - 1 + totalTestimonialSlides) % totalTestimonialSlides);
    setTimeout(() => setTestimonialAnimating(false), 400);
  };

  const getVisibleTestimonials = (slideIndex) => {
    if (isMobile) {
      return [testimonials[slideIndex]];
    }
    const start = slideIndex * 3;
    return testimonials.slice(start, start + 3);
  };

  // Drag handlers for testimonial carousel
  const handleDragStart = (e) => {
    if (testimonialAnimating) return;
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50;
    if (dragOffset > threshold) {
      prevTestimonial();
    } else if (dragOffset < -threshold) {
      nextTestimonial();
    }
    setDragOffset(0);
  };
  const itemsPerSlide = 8; // Show 8 items per slide (2 rows x 4 columns on desktop)
  const totalSlides = Math.ceil(galleryProducts.length / itemsPerSlide);

  const nextGallerySlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPrevSlide(galleryCurrentSlide);
    setSlideDirection('right');
    setGalleryCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevGallerySlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPrevSlide(galleryCurrentSlide);
    setSlideDirection('left');
    setGalleryCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index) => {
    if (index === galleryCurrentSlide || isAnimating) return;
    setIsAnimating(true);
    setPrevSlide(galleryCurrentSlide);
    setSlideDirection(index > galleryCurrentSlide ? 'right' : 'left');
    setGalleryCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getVisibleProducts = (slideIndex = galleryCurrentSlide) => {
    const start = slideIndex * itemsPerSlide;
    const end = start + itemsPerSlide;
    return galleryProducts.slice(start, end);
  };

  const organizationSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "FAM.CLOTHMAKER",
    "image": "/img/logo.webp",
    "description": "Konveksi pakaian berkualitas premium di Yogyakarta. Produksi massal jaket, kaos, kemeja dengan tenaga professional, garansi produk, dan konsultasi gratis.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Karanganyar MG3/1229 RT63/RW17 Brontokusuman",
      "addressLocality": "Mergangsan",
      "addressRegion": "Yogyakarta",
      "postalCode": "55153",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-7.8007",
      "longitude": "110.3705"
    },
    "url": "https://fam-clothmaker.web.app",
    "hasMap": "https://maps.app.goo.gl/uTe3q1RU9v91epz48",
    "telephone": "+62-895-1623-0066",
    "email": "famclothmaker@gmail.com",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "16:00"
      }
    ],
    "sameAs": []
  }), []);

  const serviceSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Konveksi Pakaian",
    "provider": {
      "@type": "LocalBusiness",
      "name": "FAM.CLOTHMAKER"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Layanan Konveksi Pakaian",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Konveksi Jaket",
            "description": "Produksi massal jaket berkualitas premium"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Konveksi Kaos",
            "description": "Produksi massal kaos dengan bahan berkualitas tinggi"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Konveksi Kemeja",
            "description": "Produksi massal kemeja formal dan casual"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fashion Item",
            "description": "Produksi aksesori fashion dan item trendy"
          }
        }
      ]
    }
  }), []);

  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Apa saja layanan konveksi yang disediakan FAM.CLOTHMAKER?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FAM.CLOTHMAKER menyediakan layanan konveksi untuk jaket, kaos, kemeja, dan fashion item lainnya dengan produksi massal berkualitas premium di Yogyakarta."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah ada garansi untuk produk konveksi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya, kami memberikan garansi produk apabila tidak sesuai dengan pesanan. Kami berkomitmen pada kualitas produk dan kepuasan pelanggan."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah konsultasi gratis tersedia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya, kami menyediakan konsultasi gratis untuk membantu Anda memilih bahan, desain, dan jumlah produksi yang tepat sesuai kebutuhan."
        }
      }
    ]
  }), []);

  const websiteSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FAM.CLOTHMAKER",
    "alternateName": "FAM Clothmaker Yogyakarta",
    "url": "https://fam-clothmaker.web.app",
    "description": "Konveksi pakaian premium di Yogyakarta. Produksi massal jaket, kaos, kemeja dengan garansi & konsultasi gratis.",
    "inLanguage": "id-ID"
  }), []);

  useEffect(() => {
    // Inject Schema.org JSON-LD
    const injectSchema = (schema, id) => {
      if (document.getElementById(id)) return;
      
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    injectSchema(websiteSchema, 'website-schema');
    injectSchema(organizationSchema, 'organization-schema');
    injectSchema(serviceSchema, 'service-schema');
    injectSchema(faqSchema, 'faq-schema');

    return () => {
      // Cleanup
      ['website-schema', 'organization-schema', 'service-schema', 'faq-schema'].forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, [websiteSchema, organizationSchema, serviceSchema, faqSchema]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image 
                src="/img/logo.webp" 
                alt="FAM.CLOTHMAKER Logo" 
                width={50} 
                height={50} 
                className="rounded-lg mr-4"
                priority
                quality={75}
                sizes="50px"
              />
              <div className="text-2xl font-bold text-[#7F0606]">FAM.CLOTHMAKER</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-gray-900 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">Beranda</a>
                <a href="#about" className="text-gray-700 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">Tentang</a>
                <a href="#services" className="text-gray-700 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">Layanan</a>
                <a href="#gallery" className="text-gray-700 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">Galeri</a>
                <a href="#contact" className="text-gray-700 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">Kontak</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="relative bg-gradient-to-r from-red-800 to-red-900 text-white" style={{background: 'linear-gradient(to right, #7F0606, #5A0404)'}}>
          <div className="absolute inset-0 bg-black opacity-20 pointer-events-none"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                FAM.CLOTHMAKER
              </h1>
              <p className="text-xl sm:text-2xl mb-4 text-red-100">
                Konveksi Pakaian Berkualitas Premium di Yogyakarta
              </p>
              <p className="text-lg sm:text-xl mb-8 text-red-50 max-w-3xl mx-auto">
                Spesialis produksi massal jaket, kaos, kemeja, dan fashion item berkualitas dengan jaminan kualitas dan kepuasan pelanggan
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
                <a href="#contact" className="btn-primary">
                  Konsultasi Gratis
                </a>
                <a href="#services" className="btn-secondary">
                  Layanan Kami
                </a>
              </div>
            </div>
          </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tentang FAM.CLOTHMAKER</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Mitra terpercaya untuk konveksi pakaian berkualitas di Yogyakarta
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Cerita Kami</h3>
              <p className="text-gray-600 mb-3 leading-relaxed">
                Berlokasi di jantung budaya Yogyakarta, FAM.CLOTHMAKER telah memantapkan diri sebagai konveksi terdepan dalam produksi massal fashion item berkualitas tinggi. Kami memahami bahwa setiap pakaian merepresentasikan brand Anda, itulah mengapa kami menjaga standar tertinggi di setiap aspek proses produksi.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Komitmen kami tercermin dalam garansi produk dan dedikasi kami pada kepuasan pelanggan. Kami terus membangun kemitraan jangka panjang dengan klien melalui kualitas yang konsisten, pengiriman yang dapat diandalkan, dan layanan yang konsisten.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-lg" style={{backgroundColor: '#FEF2F2'}}>
                  <div className="text-3xl font-bold mb-2" style={{color: '#7F0606'}}>100%</div>
                  <div className="text-sm text-gray-600">Garansi Kualitas</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{backgroundColor: '#FEF2F2'}}>
                  <div className="text-3xl font-bold mb-2" style={{color: '#7F0606'}}>24/7</div>
                  <div className="text-sm text-gray-600">Layanan Pelanggan</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl p-8 h-96 flex items-center justify-center" style={{background: 'linear-gradient(to right, #FEF2F2, #FECACA)'}}>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#7F0606'}}>
                    <i className="fas fa-building text-white text-5xl"></i>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Berbasis di Yogyakarta</h4>
                  <p className="text-gray-600">Dengan bangga melayani dari pusat kota budaya Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="py-20 bg-[#7F0606] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="counter-item" data-target="50000">
                <div className="text-5xl font-bold mb-4">0+</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Produk Terjual</h3>
              <p>Ribuan produk berkualitas telah dipercaya pelanggan</p>
            </div>
            
            <div className="text-center">
              <div className="counter-item" data-target="1200">
                <div className="text-5xl font-bold mb-4">0+</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Konsumen</h3>
              <p>Klien yang puas dengan layanan dan kualitas kami</p>
            </div>
            
            <div className="text-center">
              <div className="counter-item" data-target="15">
                <div className="text-5xl font-bold mb-4">0+</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Region</h3>
              <p>Wilayah di Indonesia yang telah kami layani</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Layanan Konveksi Pakaian Kami</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
              Fokus kami dalam produksi massal fashion premium dengan bahan berkualitas yang dipilih dengan sangat teliti
            </p>
            <p className="text-base text-gray-500 max-w-3xl mx-auto">
              Sebagai konveksi pakaian terpercaya di Yogyakarta, kami melayani produksi massal jaket, kaos, kemeja, dan berbagai fashion item dengan kualitas premium dan harga kompetitif
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Jackets */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #7F0606, #5A0404)'}}>
                <div className="text-center text-white">
                  <i className="fas fa-vest text-6xl mb-4"></i>
                  <h3 className="text-xl font-semibold">Jaket</h3>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Layanan Konveksi Jaket Premium</h4>
                <p className="text-gray-600 mb-4">Jaket berkualitas premium untuk segala musim. Mulai dari casual hingga formal, kami membuat jaket yang menggabungkan gaya, kenyamanan, dan daya tahan. Produksi massal jaket dengan harga kompetitif.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Jaket Bomber</li>
                  <li>• Jaket Denim</li>
                  <li>• Jaket Angin</li>
                  <li>• Blazer Formal</li>
                </ul>
              </div>
            </div>

            {/* T-Shirts */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-green-500 to-green-600 h-48 flex items-center justify-center">
                <div className="text-center text-white">
                  <i className="fas fa-tshirt text-6xl mb-4"></i>
                  <h3 className="text-xl font-semibold">Kaos</h3>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Jasa Konveksi Kaos Berkualitas</h4>
                <p className="text-gray-600 mb-4">Kaos yang nyaman dan serbaguna dari campuran katun premium. Cocok untuk pakaian casual, merchandise promosi, dan seragam tim. Produksi massal kaos dengan sablon custom dan berbagai ukuran.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Kaos Polos</li>
                  <li>• Kaos Polo</li>
                  <li>• Kaos Lengan Panjang</li>
                  <li>• Sablon Custom</li>
                </ul>
              </div>
            </div>

            {/* Shirts */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 h-48 flex items-center justify-center">
                <div className="text-center text-white">
                  <i className="fas fa-user-tie text-6xl mb-4"></i>
                  <h3 className="text-xl font-semibold">Kemeja</h3>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Konveksi Kemeja Premium dan Berkualitas</h4>
                <p className="text-gray-600 mb-4">Kemeja formal dan casual yang dibuat dengan perhatian detail. Dijamin pas dan menggunakan bahan premium. Produksi massal kemeja untuk kebutuhan korporat maupun personal dengan kualitas terbaik.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Kemeja Formal</li>
                  <li>• Kemeja Casual</li>
                  <li>• Kemeja Hawaii</li>
                  <li>• Seragam Kerja</li>
                </ul>
              </div>
            </div>

            {/* Fashion Items */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 h-48 flex items-center justify-center">
                <div className="text-center text-white">
                  <i className="fas fa-glasses text-6xl mb-4"></i>
                  <h3 className="text-xl font-semibold">Fashion Item</h3>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Produksi Fashion Item & Aksesori</h4>
                <p className="text-gray-600 mb-4">Aksesori fashion trendy dan pakaian yang melengkapi lini produk utama kami. Produksi custom fashion item sesuai kebutuhan dengan desain yang fleksibel dan kreatif.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Topi</li>
                  <li>• Aksesori</li>
                  <li>• Desain Custom</li>
                  <li>• Item Musiman</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="rounded-2xl p-8 max-w-5xl mx-auto" style={{backgroundColor: '#FEF2F2'}}>
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Kenapa Memilih Kami?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#7F0606'}}>
                    <i className="fas fa-user-tie text-white text-xl"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Professional</h4>
                  <p className="text-sm text-gray-600">Proses pengerjaan dilakukan oleh tenaga professional</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#7F0606'}}>
                    <i className="fas fa-shield-alt text-white text-xl"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Risk-Free Guarantee</h4>
                  <p className="text-sm text-gray-600">Terdapat garansi apabila produk tidak sesuai pesanan</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#7F0606'}}>
                    <i className="fas fa-comments text-white text-xl"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Expert Guidance</h4>
                  <p className="text-sm text-gray-600">Gratis konsultasi pada saat akan membuat pesanan</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#7F0606'}}>
                    <i className="fas fa-star text-white text-xl"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Premium Quality Focus</h4>
                  <p className="text-sm text-gray-600">Bahan yang dipilih merupakan bahan berkualitas tinggi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Apa Kata Pelanggan Kami</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Testimoni dari klien yang telah mempercayakan kebutuhan konveksi mereka kepada FAM.CLOTHMAKER
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Testimonials Slider */}
            <div className="relative">
              {/* Mobile Floating Navigation Buttons - on top of card */}
              <button
                onClick={prevTestimonial}
                className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 active:scale-95 bg-white/90 backdrop-blur-sm border border-gray-200"
                style={{color: '#7F0606'}}
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <button
                onClick={nextTestimonial}
                className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 active:scale-95 bg-white/90 backdrop-blur-sm border border-gray-200"
                style={{color: '#7F0606'}}
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              {/* Desktop Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
                style={{backgroundColor: '#7F0606', color: 'white'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#5A0404';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#7F0606';
                }}
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <button
                onClick={nextTestimonial}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
                style={{backgroundColor: '#7F0606', color: 'white'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#5A0404';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#7F0606';
                }}
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              <div 
                className="overflow-hidden md:mx-16 cursor-grab active:cursor-grabbing select-none"
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                <div 
                  className="flex"
                  style={{ 
                    transform: `translateX(calc(-${testimonialSlide * 100}% + ${isDragging ? dragOffset : 0}px))`,
                    transition: isDragging ? 'none' : 'transform 0.5s ease-out'
                  }}
                >
                  {/* Mobile: Individual testimonials */}
                  {isMobile ? (
                    testimonials.map((testimonial, index) => (
                      <div 
                        key={index}
                        className="w-full flex-shrink-0 px-2"
                      >
                        <div className="bg-gray-50 rounded-2xl p-5 relative shadow-md mx-6">
                          <div className="absolute top-4 right-4 text-[#7F0606]/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                            </svg>
                          </div>
                          <div className="flex items-center mb-4">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                              {testimonial.initials}
                            </div>
                            <div className="ml-3">
                              <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                              <p className="text-xs text-gray-500">{testimonial.role}</p>
                            </div>
                          </div>
                          <div className="flex mb-3">
                            {[1,2,3,4,5].map((star) => (
                              <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-600 leading-relaxed text-sm mb-3">
                            &quot;{testimonial.text}&quot;
                          </p>
                          <p className="text-xs text-gray-400">Pesanan: {testimonial.order}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                  /* Desktop: 3 per slide */
                  Array.from({ length: totalTestimonialSlides }).map((_, slideIndex) => (
                    <div 
                      key={slideIndex}
                      className="w-full flex-shrink-0"
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {getVisibleTestimonials(slideIndex).map((testimonial, index) => (
                          <div 
                            key={index}
                            className="bg-gray-50 rounded-2xl p-6 relative hover:shadow-lg transition-shadow"
                          >
                            <div className="absolute top-4 right-4 text-[#7F0606]/20">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                              </svg>
                            </div>
                            <div className="flex items-center mb-4">
                              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                                {testimonial.initials}
                              </div>
                              <div className="ml-3">
                                <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                                <p className="text-xs text-gray-500">{testimonial.role}</p>
                              </div>
                            </div>
                            <div className="flex mb-3">
                              {[1,2,3,4,5].map((star) => (
                                <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm mb-3">
                              &quot;{testimonial.text}&quot;
                            </p>
                            <p className="text-xs text-gray-400">Pesanan: {testimonial.order}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: totalTestimonialSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!testimonialAnimating) {
                      setTestimonialAnimating(true);
                      setTestimonialSlide(index);
                      setTimeout(() => setTestimonialAnimating(false), 400);
                    }
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    testimonialSlide === index 
                      ? 'bg-[#7F0606] w-8' 
                      : 'bg-gray-300 hover:bg-gray-400 w-2.5'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Mobile swipe hint */}
            <p className="text-center text-xs text-gray-400 mt-4 md:hidden">
              Geser untuk melihat testimoni lainnya
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Galeri Karya Kami</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Lihat contoh karya dan detail di setiap produk yang kami buat
            </p>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevGallerySlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
              style={{backgroundColor: '#7F0606', color: 'white'}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5A0404';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#7F0606';
              }}
              aria-label="Previous gallery slide"
            >
              <i className="fas fa-chevron-left text-lg"></i>
            </button>

            <button
              onClick={nextGallerySlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
              style={{backgroundColor: '#7F0606', color: 'white'}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5A0404';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#7F0606';
              }}
              aria-label="Next gallery slide"
            >
              <i className="fas fa-chevron-right text-lg"></i>
            </button>

            {/* Gallery Grid with smooth slide transition */}
            <div className="relative overflow-hidden min-h-[400px] md:min-h-[500px]">
              {/* Previous slide (exiting) */}
              {isAnimating && (
                <div 
                  className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  style={{
                    animation: slideDirection === 'right' 
                      ? 'slideOutLeft 0.6s ease-in-out forwards' 
                      : 'slideOutRight 0.6s ease-in-out forwards',
                    zIndex: 1
                  }}
                >
                  {getVisibleProducts(prevSlide).map((product, index) => (
                    <div 
                      key={`prev-${product.src}-${prevSlide}-${index}`}
                      className="relative aspect-square rounded-lg overflow-hidden shadow-md"
                    >
                      <Image 
                        src={product.src} 
                        alt={product.alt}
                        fill 
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover"
                        loading="lazy"
                        quality={75}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Current slide (entering) */}
              <div 
                className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                style={{
                  animation: isAnimating 
                    ? (slideDirection === 'right' 
                        ? 'slideInRight 0.6s ease-in-out' 
                        : 'slideInLeft 0.6s ease-in-out')
                    : 'none',
                  zIndex: 2
                }}
              >
                {getVisibleProducts().map((product, index) => (
                  <div 
                    key={`${product.src}-${galleryCurrentSlide}-${index}`}
                    className="relative aspect-square rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl"
                  >
                    <Image 
                      src={product.src} 
                      alt={product.alt}
                      fill 
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300"
                      loading={index < 4 ? "eager" : "lazy"}
                      quality={75}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center items-center gap-1 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative p-3 min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span 
                    className={`rounded-full transition-all duration-300 ${
                      galleryCurrentSlide === index 
                        ? 'bg-[#7F0606] w-8 h-2' 
                        : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Mau lihat lebih banyak karya kami? Segera hubungi kami untuk melihat portofolio lengkap dan diskusikan kebutuhan Anda dengan kami.
            </p>
            <a href="#contact" className="inline-flex items-center text-white px-8 py-3 rounded-lg font-semibold transition-colors" style={{backgroundColor: '#7F0606'}} onMouseOver={(e) => e.target.style.backgroundColor = '#5A0404'} onMouseOut={(e) => e.target.style.backgroundColor = '#7F0606'}>
              Lihat Portofolio Lengkap
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Konsultasi Gratis Konveksi Yogyakarta</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Butuh produksi massal jaket, kaos, atau kemeja? Konsultasi gratis untuk kebutuhan konveksi Anda! Kami siap membantu dari desain hingga produksi.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-8">Informasi Kontak</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#7F0606'}}>
                    <i className="fas fa-map-marker-alt text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Lokasi</h4>
                    <a 
                      href="https://maps.app.goo.gl/uTe3q1RU9v91epz48"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      <div>
                        <p>Karanganyar MG3/1229 RT63/RW17</p>
                        <p>Brontokusuman, Kec. Mergangsan</p>
                        <p>Kota Yogyakarta, DIY 55153</p>
                      </div>
                      <i className="fas fa-external-link-alt text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </a>
                    <p className="text-sm text-gray-400 mt-1">Melayani klien nasional dan internasional</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#7F0606'}}>
                    <i className="fas fa-envelope text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email</h4>
                    <a 
                      href="mailto:famclothmaker@gmail.com"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      famclothmaker@gmail.com
                    </a>
                    <p className="text-sm text-gray-400">Kami akan merespons dalam 1x24 jam</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#7F0606'}}>
                    <i className="fab fa-whatsapp text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Telepon / WhatsApp</h4>
                    <a 
                      href="https://wa.me/6289516230066" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2"
                    >
                      +62 895-1623-0066
                      <i className="fas fa-external-link-alt text-xs"></i>
                    </a>
                    <p className="text-sm text-gray-400">Tersedia selama jam kerja</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#7F0606'}}>
                    <i className="fas fa-clock text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Jam Operasional</h4>
                    <p className="text-gray-300">Senin - Jumat: 08:00 - 18:00 WIB</p>
                    <p className="text-gray-300">Sabtu: 08:00 - 16:00 WIB</p>
                    <p className="text-sm text-gray-400">Tutup hari Minggu dan hari libur nasional</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-lg" style={{backgroundColor: '#7F0606'}}>
                <h4 className="text-xl font-semibold mb-3">Konsultasi Gratis</h4>
                <p className="text-red-100 mb-4">
                  Belum yakin dengan kebutuhan Anda? Kami siap membantu Anda memilih bahan, desain, dan jumlah produksi yang tepat sesuai kebutuhan.
                </p>
                <ul className="text-sm text-red-100 space-y-1">
                  <li>• Panduan pemilihan bahan</li>
                  <li>• Konsultasi desain</li>
                  <li>• Estimasi harga</li>
                  <li>• Perencanaan timeline produksi</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-semibold mb-8">Kirim Pesan kepada Kami</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1"
                      placeholder="Nama lengkap Anda"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Perusahaan
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1"
                      placeholder="Nama perusahaan Anda"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1"
                      placeholder="email@anda.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1"
                      placeholder="+62 XXX-XXXX-XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    Layanan yang Diminati
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-1"
                  >
                    <option value="">Pilih layanan</option>
                    <option value="jackets">Jaket</option>
                    <option value="tshirts">Kaos</option>
                    <option value="shirts">Kemeja</option>
                    <option value="fashion">Fashion Item</option>
                    <option value="consultation">Konsultasi Umum</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">
                    Estimasi Jumlah
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1"
                    placeholder="contoh: 100-500 pcs"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1"
                    placeholder="Ceritakan tentang kebutuhan proyek, timeline, dan kebutuhan spesifik Anda..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center" style={{backgroundColor: '#7F0606'}} onMouseOver={(e) => e.target.style.backgroundColor = '#5A0404'} onMouseOut={(e) => e.target.style.backgroundColor = '#7F0606'}
                >
                  Kirim Pesan
                  <i className="fas fa-paper-plane ml-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-4 left-4 right-4 bg-white md:hidden z-40 rounded-2xl shadow-2xl border border-gray-100">
        <div className="grid grid-cols-5 h-16">
          <a 
            href="#home" 
            className={`flex flex-col items-center justify-center transition-colors ${
              activeSection === 'home' ? 'text-[#7F0606]' : 'text-gray-500'
            }`}
          >
            <i className={`fas fa-home text-xl mb-1 ${activeSection === 'home' ? 'scale-110' : ''} transition-transform`}></i>
            <span className="text-xs font-medium">Home</span>
          </a>
          
          <a 
            href="#about" 
            className={`flex flex-col items-center justify-center transition-colors ${
              activeSection === 'about' ? 'text-[#7F0606]' : 'text-gray-500'
            }`}
          >
            <i className={`fas fa-info-circle text-xl mb-1 ${activeSection === 'about' ? 'scale-110' : ''} transition-transform`}></i>
            <span className="text-xs font-medium">Tentang</span>
          </a>
          
          <a 
            href="#services" 
            className={`flex flex-col items-center justify-center transition-colors ${
              activeSection === 'services' ? 'text-[#7F0606]' : 'text-gray-500'
            }`}
          >
            <i className={`fas fa-tshirt text-xl mb-1 ${activeSection === 'services' ? 'scale-110' : ''} transition-transform`}></i>
            <span className="text-xs font-medium">Layanan</span>
          </a>
          
          <a 
            href="#gallery" 
            className={`flex flex-col items-center justify-center transition-colors ${
              activeSection === 'gallery' ? 'text-[#7F0606]' : 'text-gray-500'
            }`}
          >
            <i className={`fas fa-images text-xl mb-1 ${activeSection === 'gallery' ? 'scale-110' : ''} transition-transform`}></i>
            <span className="text-xs font-medium">Galeri</span>
          </a>
          
          <a 
            href="#contact" 
            className={`flex flex-col items-center justify-center transition-colors ${
              activeSection === 'contact' ? 'text-[#7F0606]' : 'text-gray-500'
            }`}
          >
            <i className={`fas fa-envelope text-xl mb-1 ${activeSection === 'contact' ? 'scale-110' : ''} transition-transform`}></i>
            <span className="text-xs font-medium">Kontak</span>
          </a>
        </div>
      </nav>

      {/* Floating WhatsApp Button - Adjusted for mobile bottom nav */}
      <a
        href="https://wa.me/6289516230066"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat WhatsApp"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <i className="fab fa-whatsapp text-white text-2xl md:text-3xl group-hover:scale-110 transition-transform" style={{ lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '1em', height: '1em' }}></i>
      </a>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">FAM.CLOTHMAKER</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Mitra terpercaya untuk konveksi pakaian berkualitas di Yogyakarta. 
              Kami mengutamakan kualitas dan kepuasan pelanggan.
            </p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#home" className="text-gray-400 hover:text-white transition-colors">Beranda</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">Tentang</a>
              <a href="#services" className="text-gray-400 hover:text-white transition-colors">Layanan</a>
              <a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Galeri</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Kontak</a>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-300 text-sm">
                © 2025 FAM.CLOTHMAKER. All rights reserved. | Yogyakarta, Indonesia
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
