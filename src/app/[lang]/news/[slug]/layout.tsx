interface Props {
  params: Promise<{ lang: string; slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { 
  params: Promise<{ lang: string; slug: string }> 
}) {
    const resolvedParams = await params;
    try {
      const response = await fetch(`https://karsu.uz/api/news/posts/${resolvedParams.slug}/`);
      const newsData = await response.json();
      
      // Try to get title in current language, fallback to English, then to default text
      const title = newsData.translations[resolvedParams.lang]?.title || 
                   newsData.translations["en"]?.title || 
                   "News - Karakalpak State University";
      
      const description = newsData.translations[resolvedParams.lang]?.description || 
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

export default async function NewsLayout(props: Props) {
  await props.params; // Wait for params to resolve
  return (
    <>
      {props.children}
    </>
  );
}