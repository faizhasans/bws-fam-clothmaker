import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Konveksi Yogyakarta | Jaket Kaos Kemeja - FAM.CLOTHMAKER",
  description: "Konveksi pakaian premium di Yogyakarta. Produksi massal jaket, kaos, kemeja dengan garansi & konsultasi gratis. Hubungi kami!",
  keywords: "konveksi pakaian yogyakarta, konveksi jaket, konveksi kaos, konveksi kemeja, produksi massal pakaian, konveksi terpercaya yogyakarta, jasa konveksi, garment yogyakarta, produksi fashion, konveksi berkualitas",
  authors: [{ name: "FAM.CLOTHMAKER Team" }],
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
        
        <link 
          rel="preconnect" 
          href="https://cdnjs.cloudflare.com" 
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/img/logo.webp" as="image" type="image/webp" />
        
        {/* Font Awesome */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        
        <link rel="alternate" hrefLang="id" href="https://fam-clothmaker.web.app" />
        <link rel="alternate" hrefLang="x-default" href="https://fam-clothmaker.web.app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
