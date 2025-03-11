export async function generateMetadata({ params }: { params: { lang: string, slug: string } }) {
    try {
      const response = await fetch(`https://debttracker.uz/news/posts/${params.slug}/`);
      const newsData = await response.json();
      
      // Try to get title in current language, fallback to English, then to default text
      const title = newsData.translations[params.lang]?.title || 
                   newsData.translations["en"]?.title || 
                   "News - Karakalpak State University";
      
      const description = newsData.translations[params.lang]?.description || 
                         newsData.translations["en"]?.description || 
                         "";
      
      return {
        title,
        description,
        openGraph: {
          title,
          description,
          images: [newsData.main_image],
        },
      };
    } catch (error) {
      return {
        title: "News - Karakalpak State University",
      };
    }
  }
  
  export default function NewsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return children;
  }