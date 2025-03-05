    import { Inter } from "next/font/google";
import { Metadata } from 'next';
import I18nProvider from '../i18n/provider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/main.css';
import '../styles/mormalize.css';
import Script from 'next/script';
import { Nunito, Roboto, Cabin, Source_Sans_3, Biryani, Sofia_Sans, Satisfy, Great_Vibes } from 'next/font/google';
import '../i18n/config';
import ClientLanguageProvider from '../components/ClientLanguageProvider'

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
})

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

const cabin = Cabin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cabin',
})

// const robotoSlab = RobotoSlab({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-roboto-slab',
// })

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
})

const biryani = Biryani({
  weight: ['200', '300', '400', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-biryani',
})

const sofiaSans = Sofia_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sofia-sans',
})

const satisfy = Satisfy({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-satisfy',
})

const greatVibes = Great_Vibes({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes',
})

const inter = Inter({ subsets: ["latin"] });

// Validate language parameter
export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const language = await lang;
  return {
    title: `Your Site - ${language.toUpperCase()}`,
    alternates: {
      languages: {
        'en': '/en',
        'ru': '/ru',
        'uz': '/uz',
        'kk': '/kk',
      },
    },
  }
}

// Add type validation for supported languages
export async function generateStaticParams() {
  return [
    { lang: 'uz' },
    { lang: 'ru' },
    { lang: 'en' },
    { lang: 'kk' },
  ]
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const language = await lang;
  
  return (
    <html
      lang={language}
    //   className={`
    //     ${nunito.variable} 
    //     ${roboto.variable}
    //     ${cabin.variable}
    //     ${sourceSans3.variable}
    //     ${biryani.variable}
    //     ${sofiaSans.variable}
    //     ${satisfy.variable}
    //     ${greatVibes.variable}
    //   `}
    >
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" 
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css" 
          integrity="sha512-wR4oNhLBHf7smjy0K4oqzdWumd+r5/+6QO/vDda76MW5iug4PT7v86FoEkySIJft3XA0Ae6axhIvHrqwm793Nw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css" 
          integrity="sha512-6lLUdeQ5uheMFbWm3CP271l14RsX1xtx+J5x2yeIDkkiBpeVTNhTqijME7GgRKKi6hCqovwCoBTlRBEC20M8Mg==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body>
        <I18nProvider>
          <ClientLanguageProvider>
            <Header />
            {children}
            <Footer />
          </ClientLanguageProvider>
        </I18nProvider>

        <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}