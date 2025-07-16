"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Pagination from "@/app/components/Pagination";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useParams, useRouter } from "next/navigation";
import { t } from "i18next";
// import i18n from '../i18n/config';

interface NewsTranslation {
  title: string;
  description: string;
  slug: string;
  name: string;
}

interface NewsImage {
  image: string;
}

interface NewsItem {
  id: number;
  name: string;
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

interface NewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsItem[];
}

interface GoalTranslation {
  name: string;
  slug: string;
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

interface CategoryTranslation {
  name: string;
  slug: string;
}

interface Category {
  id: number;
  translations: {
    [key: string]: {
      name: string;
      slug: string;
    };
  };
}

const AllNews = () => {
  const [activePage, setActivePage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(2);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { i18n } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const [displayedNews, setDisplayedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNewsWithTranslations = async () => {
      setLoading(true);
      try {
        const itemsPerPage = 10;
        let translatedNews: NewsItem[] = [];
        let currentPage = activePage;
        let totalItems = 0;
        
        // Get category slug from params
        const categorySlug = params.category 
          ? (Array.isArray(params.category) ? params.category[0] : params.category)
          : null;

        // Keep fetching pages until we have enough translated items or run out of pages
        while (translatedNews.length < itemsPerPage) {
          const url = categorySlug
            ? `https://karsu.uz/api/news/category/${categorySlug}/posts/?page=${currentPage}`
            : `https://karsu.uz/api/news/posts/?page=${currentPage}`;

          const response = await axios.get<NewsResponse>(url);
          
          // Filter items that have translation for current language
          const translatedItems = response.data.results.filter(
            (item) => item.translations && i18n.language in item.translations
          );
          
          translatedNews = [...translatedNews, ...translatedItems];
          
          // Update total count on first fetch
          if (currentPage === activePage) {
            totalItems = response.data.count;
            setTotalPages(Math.ceil(totalItems / itemsPerPage));
          }

          // Break if no more pages or we have enough items
          if (!response.data.next || translatedNews.length >= itemsPerPage) {
            break;
          }
          
          currentPage++;
        }

        // Take only the first itemsPerPage items
        setDisplayedNews(translatedNews.slice(0, itemsPerPage));
        setNews(translatedNews.slice(0, itemsPerPage));
        setActiveCategory(categorySlug || null);
      } catch (error) {
        console.error("Error fetching news:", error);
        setDisplayedNews([]);
        setNews([]);
        setActivePage(1);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsWithTranslations();
  }, [activePage, params.category, i18n.language]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get<Goal[]>(
          `https://karsu.uz/api/news/goals/`
        );
        setGoals(response.data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, [i18n.language]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
            `https://karsu.uz/api/news/category/`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [i18n.language]);

  useEffect(() => {
    // Handle category parameter safely when setting initial active category
    if (params.category) {
      const categorySlug = Array.isArray(params.category)
        ? params.category[0]
        : params.category;
      setActiveCategory(categorySlug);
    }
  }, [params.category]);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  const getTranslation = (item: NewsItem) => {
    if (!item.translations) return null;

    // Only return translation if it exists for current language
    if (i18n.language in item.translations) {
      return item.translations[i18n.language];
    }
    return null;
  };

  // Add this helper function to get goal color
  const getGoalColor = (goalId: number) => {
    const goal = goals.find((g) => g.id === goalId);
    return goal ? `#${goal.color}` : "#808080"; // Default to gray if goal not found
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category || !category.translations) return "Unknown Category";

    // Get translation for current language, fallback to Russian, then first available
    if (i18n.language in category.translations) {
      return category.translations[i18n.language].name;
    }

    if ("ru" in category.translations) {
      return category.translations.ru.name;
    }

    const availableTranslations = Object.values(category.translations);
    return availableTranslations.length > 0
      ? availableTranslations[0].name
      : "Unknown Category";
  };

  const handleCategoryClick = (categorySlug: string | null) => {
    setActiveCategory(categorySlug);
    setActivePage(1);

    // Update the URL based on category
    if (categorySlug) {
      router.push(`/${i18n.language}/allnews/${categorySlug}`);
    } else {
      router.push(`/${i18n.language}/allnews`);
    }
  };

  const getCategorySlug = (category: Category) => {
    // Get translation for current language, fallback to Russian, then first available
    if (i18n.language in category.translations) {
      return category.translations[i18n.language].slug;
    }

    if ("ru" in category.translations) {
      return category.translations.ru.slug;
    }

    const availableTranslations = Object.values(category.translations);
    return availableTranslations.length > 0
      ? availableTranslations[0].slug
      : "";
  };

  // if (loading) {
  //     return (
  //         <div className="news-loading-container">
  //             <div className="news-loading-spinner"></div>
  //             <span className="news-loading-text">Loading...</span>
  //         </div>
  //     );
  // }

  return (
    <>
      <div className="header-logo-div">
        <div className="header-logo-mini">
          <div className="header-logo-uni">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </div>
          <div className="header-logo-uni-name">
            <a href={`/${i18n.language}`} className="header-logo-uni-name-span">
              {t("common.University")}
            </a>
          </div>
        </div>
      </div>
      <div className="main-news-page">
        <div className="main-news-page-small">
          <div className="news-page-title-menu-div">
            <div className="news-page-title">
              <span className="news-page-title-span">{t("common.news")}</span>
            </div>
            <div className="news-page-menu">
                 <button 
                className={`news-page-menu-btn ${activeCategory === null ? 'active' : ''}`} style={activeCategory === null ? { width: 400 } : undefined}
                
                onClick={() => handleCategoryClick(null)}
              >
                {t("common.allNews")}
              </button>
              {categories.map((category) => {
                const categorySlug = category.translations[i18n.language]?.slug;
                return (
                  <button
                    key={category.id}
                    className={`news-page-menu-btn ${activeCategory === categorySlug ? 'active' : ''}`} style={activeCategory === categorySlug ? { width: 400 } : undefined}
                    onClick={() => handleCategoryClick(categorySlug)}
                  >
                    {getCategoryName(category.id)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Featured News */}
          {displayedNews?.length > 0 && getTranslation(displayedNews[0]) && (
            <div className="news-card-main">
              <div className="news-photo-main-div">
                <div className="news-main-category">
                  <span className="news-main-category-span">
                    {getCategoryName(displayedNews[0].category)}
                  </span>
                </div>
                <Image
                  className="news-main-photo"
                  src={displayedNews[0].main_image}
                  alt={getTranslation(displayedNews[0])?.title || ""}
                  width={800}
                  height={400}
                />
              </div>
              <div className="news-main-info">
                <div className="news-main-title">
                  <a
                    style={{
                      textDecoration: "none",
                      color: "#002b6a",
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 750,
                      fontSize: "20px",
                      width: "100%",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxHeight: "2.4em",
                      lineHeight: "1.2em",
                    }}
                    href={`/${i18n.language}/news/${
                      getTranslation(displayedNews[0])?.slug
                    }`}
                    className="news-main-title-span"
                  >
                    {getTranslation(displayedNews[0])?.title || ""}
                  </a>
                </div>
                <div className="news-main-description">
                  <span
                    className="news-main-description-span"
                    dangerouslySetInnerHTML={{
                      __html: getTranslation(displayedNews[0])?.description || "",
                    }}
                  />
                </div>
                <div className="news-main-post-date" style={{ margin: "0px" }}>
                  <span className="news-main-post-time-span">
                    {new Date(displayedNews[0].date_posted).toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="news-main-post-date-span">
                    {new Date(displayedNews[0].date_posted).toISOString().split('T')[0].replace(/-/g, '.')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* News Cards Grid */}
          <div className="news-all-cards-div">
            {displayedNews?.slice(1).map((item) => (
              <div key={item.id} className="news-card">
                <div className="news-photo-div">
                  <div className="news-category">
                    <span className="news-category-span" style={{
                       display: 'inline-block',
                       maxWidth: 150,
                       overflow: 'hidden',
                       textOverflow: 'ellipsis',
                       whiteSpace: 'nowrap'
                     }}>
                      {getCategoryName(item.category)}
                    </span>
                  </div>
                  <Image
                    className="news-photo"
                    src={item.main_image}
                    alt={getTranslation(item)?.title || ""}
                    width={300}
                    height={200}
                  />
                </div>
                <div className="news-info">
                  <div className="news-info-types">
                    <p>Tegishli maqsadlar:</p>
                    <div>
                      {item?.goals?.map((goalId) => {
                        return (
                          <a
                            href="#"
                            key={goalId}
                            className="number"
                            style={{
                              backgroundColor: getGoalColor(goalId),
                              color: "#ffffff",
                            }}
                          >
                            {goals.find((g) => g.id === goalId)?.goals ||
                              "Unknown Goal"}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="news-title">
                    <Link
                      href={`/${i18n.language}/news/${
                        getTranslation(item)?.slug
                      }`}
                      className="news-title-span"
                    >
                      {getTranslation(item)?.title || ""}
                    </Link>
                  </div>
                  <div className="news-post-date">
                    <span className="news-post-time-span">
                      {new Date(item.date_posted).toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="news-post-date-span">
                      {new Date(item.date_posted).toISOString().split('T')[0].replace(/-/g, '.')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No news available message */}
          {!loading && displayedNews.length === 0 && (
            <div className="news-not-found" style={{
              width: '100%',
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              margin: '20px 0'
            }}>
              <p style={{
                fontSize: '18px',
                color: '#666',
                margin: 0
              }}>
                {t('common.noNews')}
              </p>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem 0",
            }}
          >
            <Pagination
              currentPage={activePage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllNews;
