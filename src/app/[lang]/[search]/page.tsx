'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import {  Category, Goal } from '../types/types'
import '../[search]/main.css'

interface DisplayGoal {
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

interface NewsItem {
  id: number;
  display_goals: DisplayGoal[];
  category: number;
  main_image: string;
  translations: {
    [key: string]: {
      title: string;
      slug: string;
    };
  };
  date_posted: string;
}

export default function SearchResults() {
  const { t, i18n } = useTranslation();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
    console.log(goals)
  useEffect(() => {
    const fetchCategoriesAndGoals = async () => {
      try {
        const [categoriesResponse, goalsResponse] = await Promise.all([
          axios.get('https://debttracker.uz/news/category/'),
          axios.get('https://debttracker.uz/news/goals/')
        ]);
        setCategories(categoriesResponse.data);
        setGoals(goalsResponse.data);
      } catch (error) {
        console.error('Error fetching categories and goals:', error);
      }
    };

    fetchCategoriesAndGoals();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://debttracker.uz/news/posts/?title=${query}`);
        setSearchResults(response.data.results || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className='main-news-page'>
      <div className='main-news-page-small'>
        <div className='news-page-title-menu-div'>
          <div className='news-page-title'>
            <span className='news-page-title-span'>
              {t('search.results')} {query && `"${query}"`}
            </span>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className='news-all-cards-div'>
            {searchResults.length > 0 ? (
              searchResults.map((news) => (
                <div className='news-card' key={news.id}>
                  <div className='news-photo-div'>
                    <div className='news-category'>
                      <span className='news-category-span'>
                        {categories.find(cat => cat.id === news.category)?.translations[i18n.language]?.name || news.category}
                      </span>
                    </div>
                    <Image
                      className='news-photo'
                      src={news.main_image}
                      alt={news.translations[i18n.language]?.title || ''}
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className='news-info'>
                    {news.display_goals && news.display_goals.length > 0 && (
                      <div className="news-info-types">
                        <p>{t('news.relatedGoals')}:</p>
                        <div>
                          {news.display_goals.map((goal: DisplayGoal) => {
                            const backgroundColor = goal.color?.startsWith('#') 
                              ? goal.color 
                              : `#${goal.color}`;
                            return (
                              <a 
                                href="#" 
                                key={goal.id}
                              >
                                <span
                                  className="number"
                                  style={{
                                    backgroundColor: backgroundColor,
                                    color: goal.color === 'ffffff' ? '#000' : '#fff'
                                  }}
                                >
                                  {goal.goals}
                                </span>
                                {/* <span className="goal-name">
                                  {goal.translations[i18n.language]?.name}
                                </span> */}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div className='news-title'>
                      <Link
                        href={`/${i18n.language}/news/${news.translations[i18n.language]?.slug}`}
                        className='news-title-span'
                      >
                        {news.translations[i18n.language]?.title}
                      </Link>
                    </div>
                    <div className='news-post-date'>
                      <span className='news-post-time-span'>
                        {new Date(news.date_posted).toLocaleTimeString(i18n.language, {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span className='news-post-date-span'>
                        {new Date(news.date_posted).toLocaleDateString(i18n.language, {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>{t('search.noResults')}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}