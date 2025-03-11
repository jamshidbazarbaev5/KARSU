"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useTranslation } from "react-i18next";
import NewsDetail from "@/app/pages/News";
import "../main.css";
import { Metadata } from 'next';
import Head from 'next/head';

interface NewsItem {
  id: number;
  category: number;
  goals: number[];
  main_image: string;
  images: { image: string }[];
  views_count: number;
  date_posted: string;
  translations: {
    [key: string]: {
      title: string;
      description: string;
      slug: string;
    };
  };
  display_goals: Goal[];
}

interface Goal {
  id: number;
  translations: {
    [key: string]: {
      name: string;
      slug: string;
    };
  };
  goals: number;
  color: string;
}

export default function NewsPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  const [newsData, setNewsData] = useState<NewsItem | null>(null);
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to the correct language path if language prefix is missing
    if (!params.lang) {
      const defaultLang = "en"; // or whatever your default language is
      router.replace(`/${defaultLang}/news/${params.slug}`);
    }

    const lang = params.lang as string;
    
    // Update language if it differs from current
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const newsResponse = await axios.get<NewsItem>(`https://debttracker.uz/news/posts/${slug}/`);
        
        // Check if we should redirect to the correct slug for current language
        const currentLang = i18n.language;
        const correctSlug = newsResponse.data.translations[currentLang]?.slug || 
                          newsResponse.data.translations["en"]?.slug;
        
        if (correctSlug && correctSlug !== slug) {
          router.replace(`/${currentLang}/news/${correctSlug}`, { scroll: false });
          return;
        }
        
        setNewsData(newsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug, params.lang, i18n, router]);

  if (loading) {
    return (
        <div className="news-loading-container">
            <div className="news-loading-spinner"></div>
            <span className="news-loading-text">Loading...</span>
        </div>
    );
  }

  if (!newsData) {
    return <div>Loading...</div>;
  }

  return <NewsDetail newsData={newsData} />;
}
