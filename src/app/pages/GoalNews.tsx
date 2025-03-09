"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Pagination  from '../components/Pagination'

interface Translation {
  title: string;
  description: string;
  slug: string;
}

interface NewsItem {
  id: number;
  category: number;
  goals: number[];
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
  const itemsPerPage = 5; // Adjust as needed

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
          <a href="#">Asosiy</a>
          <a href="#">Barqaror rivojlanish Maqsadlari</a>
          <a href="#">Barqaror rivojlanish Maqsadlari</a>
          <a href="#">Asosiy</a>
        </div>
        <div className="main-news">
          <div className="main-news-block">
            <div className="main-news-block-title">
              <div className="main-block-title-up">
                <span>4</span>
                <h1>Sifatli Ta'lim</h1>
              </div>
              <div className="main-block-title-down">
                <p>Sifatli ta'lim lorem</p>
              </div>
            </div>
            
            <div className="main-news-block-cards">
              {newsData?.results.map((item) => {
                const date = formatDate(item.date_posted);
                return (
                  <div key={item.id} className="main-block-cards-card">
                    <div className="main-cards-card-title">
                      <h2>{item.translations.uz.title}</h2>
                    </div>
                    <div className="main-cards-card-belongs">
                      <p>Tegishli maqsadlar:</p>
                      {item.goals.map((goal) => (
                        <a
                          key={goal}
                          href="#"
                          className="number"
                          style={{ background: `#${Math.floor(Math.random()*16777215).toString(16)}` }}
                        >
                          {goal}
                        </a>
                      ))}
                    </div>

                    <div className="main-cards-card-bottom">
                      <div className="main-cards-card-date">
                        <span className="day">{date.day}</span>
                        <span className="month">{date.month}</span>
                        <span className="year">{date.year}</span>
                      </div>
                      <div className="main-cards-card-btn">
                        <a href="#">Batafsil</a>
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

          <div className="main-news-rubric">
            <div className="main-news-rubric-logo">
              <img src="../mainpage/content/icon.png" alt="" />
              <h1>Axborotlar xizmati</h1>
            </div>
            <ul>
              <li><a href="#">Yangiliklar</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Lorem</a></li>
              <li className="last"><a href="#">ipsum</a></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GoalNews;