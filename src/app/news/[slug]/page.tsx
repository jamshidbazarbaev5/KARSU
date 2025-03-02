"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import NewsDetail from '@/app/pages/News';
import '../main.css'

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
}

export default function NewsPage() {
  const { slug } = useParams();
  const [newsData, setNewsData] = useState<NewsItem | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get<NewsItem>(
          `https://debttracker.uz/${i18n.language}/news/posts/${slug}/`
        );
        setNewsData(response.data);
      } catch (error) {
        console.error('Error fetching news detail:', error);
        // Add error handling here if needed
      }
    };

    if (slug) {
      fetchNewsDetail();
    }
  }, [slug, i18n.language]);

  if (!newsData) {
    return <div>Loading...</div>;
  }

  return <NewsDetail newsData={newsData} />;
}