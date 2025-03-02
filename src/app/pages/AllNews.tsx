'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Pagination from '@/app/components/Pagination';

interface NewsTranslation {
  title: string;
  description: string;
  slug: string;
}

interface NewsImage {
  image: string;
}

interface NewsItem {
  id: number;
  category: number;
  goals: number[];
  main_image: string;
  images: NewsImage[];
  views_count: number;
  date_posted: string;
  translations: {
    ru: NewsTranslation;
    en: NewsTranslation;
    uz: NewsTranslation;
    kk: NewsTranslation;
  };
}

interface NewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsItem[];
}

const AllNews = () => {
    const [activePage, setActivePage] = useState(1);
    const [activeCategory, setActiveCategory] = useState('Все Новости');
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState('ru');
    const [totalPages, setTotalPages] = useState(2);

    const categories = [
        'Все Новости', 'Научные', 'Сообщество', 'Посещения',
        'События', 'Новости спорта', 'Поздравления'
    ];


    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://debttracker.uz/${language}/news/posts/?page=${activePage}`);
                const data: NewsResponse = await response.json();
                setNews(data.results);
                setTotalPages(Math.max(2, Math.ceil(data.count / 6)));
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [language, activePage]);

    const handlePageChange = (page: number) => {
        setActivePage(page);
        window.scrollTo(0, 0); // Scroll to top when page changes
    };

    const getTranslation = (item: NewsItem) => item.translations[language as keyof typeof item.translations];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='main-news-page'>
            <div className='main-news-page-small'>
                <div className='news-page-title-menu-div'>
                    <div className='news-page-title'>
                        <span className='news-page-title-span'>НОВОСТИ</span>
                    </div>
                    <div className='news-page-menu'>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`news-page-menu-btn ${activeCategory === category ? 'actived' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Featured News */}
                {news.length > 0 && (
                    <div className='news-card-main'>
                        <div className='news-photo-main-div'>
                            <div className='news-main-category'>
                                <span className='news-main-category-span'>
                                    {news[0].category === 1 ? 'Научный' : 'Событие'}
                                </span>
                            </div>
                            <Image
                                className='news-main-photo'
                                src={news[0].main_image}
                                alt={getTranslation(news[0]).title}
                                width={800}
                                height={400}
                            />
                        </div>
                        <div className='news-main-info'>
                            <div className='news-main-title'>
                                <span className='news-main-title-span'>
                                    {getTranslation(news[0]).title}
                                </span>
                            </div>
                            <div className='news-main-description'>
                                <span className='news-main-description-span'>
                                    {getTranslation(news[0]).description}
                                </span>
                            </div>
                            <div className='news-main-post-date'>
                                <span className='news-main-post-time-span'>
                                    {new Date(news[0].date_posted).toLocaleTimeString('ru-RU', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                                <span className='news-main-post-date-span'>
                                    {new Date(news[0].date_posted).toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* News Cards Grid */}
                <div className='news-all-cards-div'>
                    {news.slice(1).map((item) => (
                        <div key={item.id} className='news-card'>
                            <div className='news-photo-div'>
                                <div className='news-category'>
                                    <span className='news-category-span'>
                                        {item.category === 1 ? 'Научный' : 'Событие'}
                                    </span>
                                </div>
                                <Image
                                    className='news-photo'
                                    src={item.main_image}
                                    alt={getTranslation(item).title}
                                    width={300}
                                    height={200}
                                />
                            </div>
                            <div className='news-info'>
                                <div className="news-info-types">
                                    <p>Tegishli maqsadlar:</p>
                                    <div>
                                        {item.goals.map((goal) => (
                                            <Link key={goal} href="#">
                                                <span 
                                                    className="number"
                                                    style={{
                                                        background: goal === 1 ? 'rgb(197, 25, 45)' : 'rgb(19, 73, 107)'
                                                    }}
                                                >
                                                    {goal}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className='news-title'>
                                    <Link href={`/news/${getTranslation(item).slug}`} className='news-title-span'>
                                        {getTranslation(item).title}
                                    </Link>
                                </div>
                                <div className='news-post-date'>
                                    <span className='news-post-time-span'>
                                        {new Date(item.date_posted).toLocaleTimeString('ru-RU', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                    <span className='news-post-date-span'>
                                        {new Date(item.date_posted).toLocaleDateString('ru-RU', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Pagination component at the bottom */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                    <Pagination 
                        currentPage={activePage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllNews;