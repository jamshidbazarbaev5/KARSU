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

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Calculate maximum possible page based on count
        const itemsPerPage = 10; // Since we're displaying 6 items per page
        const maxPage = Math.ceil(151 / itemsPerPage); // 151 is the total count from your API response

        // If current page is beyond max page, adjust it
        if (activePage > maxPage) {
          setActivePage(maxPage);
          return; // Exit early to avoid making invalid API call
        }

        const categorySlug = Array.isArray(params.category)
          ? params.category[0]
          : params.category;

        const url = categorySlug
          ? `https://karsu.uz/api/news/category/${categorySlug}/posts/?page=${activePage}`
          : `https://karsu.uz/api/news/posts/?page=${activePage}`;

        const response = await axios.get<NewsResponse>(url);
        setNews(response.data.results);
        
        // Calculate total pages and ensure current page is valid
        const calculatedTotalPages = Math.ceil(response.data.count / itemsPerPage);
        setTotalPages(calculatedTotalPages);

        setActiveCategory(categorySlug || null);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
        // Reset to page 1 on error
        setActivePage(1);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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

    if (i18n.language in item.translations) {
      return item.translations[i18n.language];
    }

    // Fallback to Russian if current language is not available
    if ("ru" in item.translations) {
      return item.translations.ru;
    }

    // If no translation is available, return the first available translation
    const availableTranslations = Object.values(item.translations);
    return availableTranslations.length > 0 ? availableTranslations[0] : null;
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
                className={`news-page-menu-btn ${
                  activeCategory === null ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(null)}
              >
                {t("common.allNews")}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`news-page-menu-btn ${
                    activeCategory === getCategorySlug(category) ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(getCategorySlug(category))}
                >
                  {getCategoryName(category.id)}
                </button>
              ))}
            </div>
          </div>

          {/* Main Featured News */}
          {news?.length > 0 && (
            <div className="news-card-main">
              <div className="news-photo-main-div">
                <div className="news-main-category">
                  <span className="news-main-category-span">
                    {getCategoryName(news[0].category)}
                  </span>
                </div>
                <Image
                  className="news-main-photo"
                  src={news[0].main_image}
                  alt={getTranslation(news[0])?.title || ""}
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
                      news[0].translations[i18n.language]?.slug
                    }`}
                    className="news-main-title-span"
                  >
                    {getTranslation(news[0])?.title || ""}
                  </a>
                </div>
                <div className="news-main-description">
                  <span
                    className="news-main-description-span"
                    dangerouslySetInnerHTML={{
                      __html: getTranslation(news[0])?.description || "",
                    }}
                  />
                </div>
                <div className="news-main-post-date" style={{ margin: "0px" }}>
                  <span className="news-main-post-time-span">
                    {new Date(news[0].date_posted).toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="news-main-post-date-span">
                    {new Date(news[0].date_posted).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* News Cards Grid */}
          <div className="news-all-cards-div">
            {news?.slice(1).map((item) => (
              <div key={item.id} className="news-card">
                <div className="news-photo-div">
                  <div className="news-category">
                    <span className="news-category-span">
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
                        item.translations[i18n.language]?.slug
                      }`}
                      className="news-title-span"
                    >
                      {item.translations[i18n.language]?.title || ""}
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
                      {new Date(item.date_posted).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
