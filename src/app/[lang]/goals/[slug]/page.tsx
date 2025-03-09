"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Pagination  from '../../../components/Pagination'
import '../../goals/main.css'
import NewsRubric from "@/app/components/NewsRubric";
import Link from "next/link";
import i18n from "@/app/i18n/config";
import { t } from "i18next";

// Add this CSS block after the existing imports
const styles = {
  '.main-block-cards-card': {
    display: 'flex',
    flexDirection: 'column',
    height: '200px', 
    width:'1000px',
    padding: '20px',
    marginBottom: '20px',
  },
  '.main-cards-card-title': {
    flex: '1',
    marginBottom: '15px',
  },
  '.main-cards-card-title h2': {
    margin: '0',
    fontSize: '18px',
    lineHeight: '1.4',
  },
  '.main-cards-card-belongs': {
    marginTop: 'auto'
  },
  '.main-cards-card-bottom': {
    marginTop: '15px',
  }
} as const;

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
        const response = await fetch(`https://debttracker.uz/news/goals/${params.slug}/`);
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
          `https://debttracker.uz/news/goals/${params.slug}/posts/?page=${currentPage}`
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
    return {
      day: date.getDate(),
      month: new Intl.DateTimeFormat('uz', { month: 'long' }).format(date),
      year: date.getFullYear()
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main">
      <div className="container">
        <div className="main-news-pages">
          <a href={`/${i18n.language}`}>{t('common.home')}</a>
          {/* <a href="#">Barqaror rivojlanish Maqsadlari</a> */}
          <a href="#">{goalInfo?.translations[params.lang as keyof typeof goalInfo.translations]?.name || ''}</a>
        </div>
        <div className="main-news">
          <div className="main-news-block">
            <div className="main-news-block-title">
              <div className="main-block-title-up">
                <span>{goalInfo?.goals}</span>
                <h1>{goalInfo?.translations[params.lang as keyof typeof goalInfo.translations]?.name}</h1>
              </div>
              <div className="main-block-title-down">
                <p>Sifatli ta'lim lorem</p>
              </div>
            </div>
            
            <div className="main-news-block-cards">
              {newsData?.results.map((item) => {
                const date = formatDate(item.date_posted);
                return (
                  <div key={item.id} className="main-block-cards-card" style={styles['.main-block-cards-card']}>
                    <div className="main-cards-card-title" style={styles['.main-cards-card-title']}>
                        <Link href={`/${i18n.language}/news/${item.translations[i18n.language as keyof typeof item.translations]?.slug}`} style={{textDecoration:"none"}}>
                      <h2 style={styles['.main-cards-card-title h2']}>{item.translations[params.lang as keyof typeof item.translations]?.title}</h2>
                        </Link>
                    </div>
                    <div className="main-cards-card-belongs" style={styles['.main-cards-card-belongs']}>
                      <p>Tegishli maqsadlar:</p>
                      {item.display_goals.map((goal) => (
                        <a
                          key={goal.id}
                          href="#"
                          className="number"
                          style={{ background: `#${goal.color}` }}
                        >
                          {goal.goals}
                        </a>
                      ))}
                    </div>

                    <div className="main-cards-card-bottom" style={styles['.main-cards-card-bottom']}>
                      <div className="main-cards-card-date">
                        <span className="day">{date.day}</span>
                        <span className="month">{date.month}</span>
                        <span className="year">{date.year}</span>
                      </div>
                      <div className="main-cards-card-btn">
                        <a href={`/${i18n.language}/news/${item.translations[i18n.language as keyof typeof item.translations]?.slug}`}>{t('common.readMore')}</a>
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