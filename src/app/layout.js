import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#7F0606',
};

export const metadata = {
  metadataBase: new URL('https://fam-clothmaker.web.app'),
  title: {
    default: "Konveksi Yogyakarta | Jaket Kaos Kemeja - FAM.CLOTHMAKER",
    template: "%s | FAM.CLOTHMAKER"
  },
  applicationName: "FAM.CLOTHMAKER",
  description: "Konveksi pakaian premium di Yogyakarta. Produksi massal jaket, kaos, kemeja dengan garansi & konsultasi gratis. Hubungi kami!",
  keywords: "konveksi pakaian yogyakarta, konveksi jaket, konveksi kaos, konveksi kemeja, produksi massal pakaian, konveksi terpercaya yogyakarta, jasa konveksi, garment yogyakarta, produksi fashion, konveksi berkualitas",
  authors: [{ name: "FAM.CLOTHMAKER Team" }],
  publisher: "FAM.CLOTHMAKER",
  alternates: {
    canonical: 'https://fam-clothmaker.web.app',
  },
  openGraph: {
    title: "Konveksi Yogyakarta | Jaket Kaos Kemeja - FAM.CLOTHMAKER",
    description: "Konveksi pakaian premium di Yogyakarta. Produksi massal jaket, kaos, kemeja dengan garansi & konsultasi gratis.",
    url: 'https://fam-clothmaker.web.app',
    type: "website",
    locale: "id_ID",
    siteName: "FAM.CLOTHMAKER",
  },
  twitter: {
    card: "summary_large_image",
    title: "Konveksi Yogyakarta | Jaket Kaos Kemeja - FAM.CLOTHMAKER",
    description: "Konveksi pakaian premium di Yogyakarta. Produksi massal jaket, kaos, kemeja dengan garansi & konsultasi gratis.",
  },
  icons: {
    icon: '/fav/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="-OP1LbIM2ZkNXrbB_Ef9rRKGv7s8z6-g0Ha46Vvrzq4" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{__html: `
          *,::before,::after{box-sizing:border-box;border:0 solid}
          html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
          body{margin:0;font-family:Arial,Helvetica,sans-serif;line-height:1.5;background:#fff;color:#171717}
          img{display:block;max-width:100%}
          button{cursor:pointer;background:none;font:inherit}
          a{text-decoration:none;}
          .bg-white{background-color:#fff}
          .text-white{color:#fff}
          .hidden{display:none}
          .fixed{position:fixed}
          .relative{position:relative}
          .flex{display:flex}
          .items-center{align-items:center}
          .justify-center{justify-content:center}
          .justify-between{justify-content:space-between}
          .rounded-lg{border-radius:.5rem}
          .shadow-sm{box-shadow:0 1px 2px 0 rgba(0,0,0,.05)}
          .z-50{z-index:50}
          .w-full{width:100%}
          .h-16{height:4rem}
          .px-4{padding-left:1rem;padding-right:1rem}
          .py-2{padding-top:.5rem;padding-bottom:.5rem}
          .py-24{padding-top:6rem;padding-bottom:6rem}
          .text-center{text-align:center}
          .font-bold{font-weight:700}
          .text-4xl{font-size:2.25rem;line-height:2.5rem}
          .mb-6{margin-bottom:1.5rem}
          @media(min-width:768px){.md\\:block{display:block}.md\\:hidden{display:none}.md\\:text-6xl{font-size:3.75rem;line-height:1}}
        `}} />
        
        <link 
          rel="preconnect" 
          href="https://cdnjs.cloudflare.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://firebase.googleapis.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://firebasestorage.googleapis.com" 
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/img/logo.webp" as="image" type="image/webp" />
        
        {/* Preload Font Awesome fonts directly - skip CSS */}
        <link 
          rel="preload" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preload" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        
        <link rel="alternate" hrefLang="id" href="https://fam-clothmaker.web.app" />
        <link rel="alternate" hrefLang="x-default" href="https://fam-clothmaker.web.app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        
        {/* Font Awesome - Load after interactive */}
        <Script 
          id="font-awesome-css"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
                document.head.appendChild(link);
              })();
            `
          }}
        />
      </body>
    </html>
  );
}
