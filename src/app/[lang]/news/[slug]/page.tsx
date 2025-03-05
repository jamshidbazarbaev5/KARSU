"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  const [goalsData, setGoalsData] = useState<Goal[]>([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    // Redirect to the correct language path if language prefix is missing
    if (!params.lang) {
      const defaultLang = 'en'; // or whatever your default language is
      router.replace(`/${defaultLang}/news/${params.slug}`);
    }

    // Set the language based on the URL parameter
    const lang = params.lang as string;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }

    const fetchData = async () => {
      try {
        const [newsResponse, goalsResponse] = await Promise.all([
          axios.get<NewsItem>(`https://debttracker.uz/news/posts/${slug}/`),
          axios.get<Goal[]>('https://debttracker.uz/news/goals/')
        ]);
        
        // Filter goalsData to only include goals that are in newsData.goals
        const filteredGoals = goalsResponse.data.filter(goal => 
          newsResponse.data.goals.includes(goal.id)
        );
        
        setNewsData(newsResponse.data);
        setGoalsData(filteredGoals);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug, params.lang, i18n, router]);

  if (!newsData) {
    return <div>Loading...</div>;
  }

  return <NewsDetail newsData={newsData} goalsData={goalsData} />;
}