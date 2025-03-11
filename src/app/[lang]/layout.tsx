import { Inter } from "next/font/google";
import { Metadata, Viewport } from 'next';
import I18nProvider from '../i18n/provider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/main.css';
import '../styles/mormalize.css';
import Script from 'next/script';
import { Nunito, Roboto, Cabin, Source_Sans_3, Biryani, Sofia_Sans, Satisfy, Great_Vibes, Archivo } from 'next/font/google';
import '../i18n/config';
import ClientLanguageProvider from '../components/ClientLanguageProvider'
import { NextWebVitalsMetric } from 'next/app';

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

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Enhanced metadata configuration
export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const language = await lang;
  const title = {
    en: 'Karakalpak State University',
    ru: 'Каракалпакский Государственный Университет',
    uz: 'Qoraqalpoq Davlat Universiteti',
    kk: 'Qaraqalpaq Mamleketlik Universiteti'
  };

  const description = {
    en: 'Karakalpak State University offers high-quality education, research opportunities, and diverse academic programs. Join our prestigious institution for excellence in higher education.',
    ru: 'Каракалпакский государственный университет предлагает качественное образование, возможности для исследований и разнообразные академические программы.',
    uz: 'Qoraqalpoq Davlat Universiteti sifatli ta\'lim, tadqiqot imkoniyatlari va xilma-xil akademik dasturlarni taqdim etadi.',
    kk: 'Qaraqalpaq Mamleketlik Universiteti joqari sapali bilim'
  };

  return {
    title: {
      default: title[language as keyof typeof title],
      template: '%s | KarSU'
    },
    description: description[language as keyof typeof description],
    keywords: [
      'Kara-Kalpak State University',
      'higher education Uzbekistan',
      'university Nukus',
      'KarSU',
      'academic programs',
      'research university',
      'international education',
      'bachelor degrees',
      'master degrees',
      'PhD programs',
      'student life',
      'university admissions',
    ],
    authors: [{ name: 'Kara-Kalpak State University' }],
    creator: 'Softium',
    publisher: 'Softium',
    metadataBase: new URL('https://karsu.uz'),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'ru': '/ru',
        'uz': '/uz',
        'kk': '/kk',
      },
    },  
    openGraph: {
      type: 'website',
      locale: language,
      url: 'https://karsu.uz',
      siteName: 'Kara-Kalpak State University',
      images: [
        {
          url: '/images/karsu-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Kara-Kalpak State University Campus',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title[language as keyof typeof title],
      description: description[language as keyof typeof description],
      images: ['/images/karsu-twitter.jpg'],
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
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
  }
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
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
  return (
    <html
      lang={lang}
      className={`
        ${nunito.variable} 
        ${roboto.variable}
        ${cabin.variable}
        ${sourceSans3.variable}
        ${biryani.variable}
        ${sofiaSans.variable}
        ${satisfy.variable}
        ${greatVibes.variable}
        ${archivo.variable}
      `}
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
      <body suppressHydrationWarning={true}>
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