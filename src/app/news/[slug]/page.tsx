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
  const { slug } = useParams();
  const [newsData, setNewsData] = useState<NewsItem | null>(null);
  const [goalsData, setGoalsData] = useState<Goal[]>([]);
  const { i18n } = useTranslation();

  useEffect(() => {
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
  }, [slug, i18n.language]);

  if (!newsData) {
    return <div>Loading...</div>;
  }

  return <NewsDetail newsData={newsData} goalsData={goalsData} />;
}