"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Pagination  from '../../../components/Pagination'
import '../../goals/main.css'
import NewsRubric from "@/app/components/NewsRubric";
import Link from "next/link";
import i18n from "@/app/i18n/config";
import { t } from "i18next";

interface Translation {
  title: string;
  description: string;
  slug: string;
}

interface Goal {
  id: number;
  translations: {
    uz: {
      name: string;
      slug: string;
    };
    ru: {
      name: string;
      slug: string;
    };
    en: {
      name: string;
      slug: string;
    };
    kk: {
      name: string;
      slug: string;
    };
  };
  goals: number;
  color: string;
}

interface NewsItem {
  id: number;
  category: number;
  display_goals: Goal[];
  main_image: string;
  images: string[];
  views_count: number;
  date_posted: string;
  translations: {
    en: Translation;
    uz: Translation;
    kk: Translation;
    ru: Translation;
  };
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsItem[];
}

const GoalNews = () => {
  const params = useParams();
  const [newsData, setNewsData] = useState<ApiResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [goalInfo, setGoalInfo] = useState<Goal | null>(null);
  const itemsPerPage = 5; // Adjust as needed

  useEffect(() => {
    const fetchGoalInfo = async () => {
      try {
        const response = await fetch(`https://karsu.uz/api/news/goals/${params.slug}/`);
        const data = await response.json();
        setGoalInfo(data);
      } catch (error) {
        console.error("Error fetching goal info:", error);
      }
    };

    if (params.slug) {
      fetchGoalInfo();
    }
  }, [params.slug]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://karsu.uz/api/news/goals/${params.slug}/posts/?page=${currentPage}`
        );
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchNews();
    }
  }, [params.slug, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main">
      <div className="container">
        <div className="main-news-pages">
          <a href={`/${i18n.language}`}>{t('common.home')}</a>
          {goalInfo?.translations[params.lang as keyof typeof goalInfo.translations]?.name && (
            <a href="#">{goalInfo.translations[params.lang as keyof typeof goalInfo.translations].name}</a>
          )}
        </div>
        <div className="main-news">
          <div className="main-news-block">
            {goalInfo?.translations[params.lang as keyof typeof goalInfo.translations]?.name && (
              <div className="main-news-block-title" style={{ background: `#${goalInfo?.color}` }}>
                <div className="main-block-title-up">
                  <span>{goalInfo?.goals}</span>
                  <h1>{goalInfo.translations[params.lang as keyof typeof goalInfo.translations].name}</h1>
                </div>
                <div className="main-block-title-down">
                  <p>{goalInfo.translations[params.lang as keyof typeof goalInfo.translations].name}</p>
                </div>
              </div>
            )}
            
            <div className="main-news-block-cards">
              {newsData && newsData.results && newsData.results
                .filter(item => item.translations[params.lang as keyof typeof item.translations])
                .map((item) => {
                  const translation = item.translations[params.lang as keyof typeof item.translations];
                  
                  return (
                    <div key={item.id} className="main-block-cards-card">
                      <div className="main-cards-card-title">
                        <h2>{translation.title}</h2>
                      </div>
                      <div className="main-cards-card-belongs">
                        <p>{t('common.relatedGoals')}:</p>
                        {item.display_goals
                          .filter(goal => goal.translations[params.lang as keyof typeof goal.translations])
                          .map((goal) => {
                            const goalTranslation = goal.translations[params.lang as keyof typeof goal.translations];
                            
                            return (
                              <a
                                key={goal.id}
                                href="#"
                                className="number"
                                style={{ background: `#${goal.color}` }}
                              >
                                {goal.goals}
                              </a>
                            );
                          })}
                      </div>

                      <div className="main-cards-card-bottom">
                        <div className="main-cards-card-date">
                          <span>{formatDate(item.date_posted)}</span>
                        </div>
                        <div className="main-cards-card-btn">
                          <a href={`/${i18n.language}/news/${translation.slug}`}>{t('common.readMore')}</a>
                        </div>
                      </div>
                      <div className="card-line"></div>
                    </div>
                  );
                })}
            </div>

            {newsData && (
            
                <Pagination 
                  currentPage={currentPage}
                  totalPages={Math.ceil(newsData.count / itemsPerPage)}
                  onPageChange={handlePageChange}
                />
               
            )}
          </div>

          <NewsRubric/>
        </div>
      </div>
    </main>
  );
};

export default GoalNews;