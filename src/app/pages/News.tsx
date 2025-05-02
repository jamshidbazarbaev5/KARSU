"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import DOMPurify from "isomorphic-dompurify";
import { useParams, useRouter } from "next/navigation";
import NewsRubric from "@/app/components/NewsRubric";

interface GoalType {
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

interface Category {
  id: number;
  translations: {
    [key: string]: {
      name: string;
      slug: string;
    };
  };
}

interface NewsProps {
  newsData: {
    id: number;
    category: number;
    display_goals: {
      id: number;
      translations: {
        [key: string]: {
          name: string;
          slug: string;
        };
      };
      goals: number;
      color: string;
    }[];
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
  };
}

interface NewsCategory {
  id: number;
  translations: {
    [key: string]: {
      name: string;
      slug: string;
    };
  };
}

export default function News({ newsData }: NewsProps) {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [showAllButtons, setShowAllButtons] = useState(false);
  const slider1 = useRef<Slider | null>(null);
  const slider2 = useRef<Slider | null>(null);

  const { i18n, t } = useTranslation();

  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const router = useRouter();
  const params = useParams();
  const currentCategory = params?.category as string;

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://karsu.uz/api/news/category/");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Remove or modify the language change effect to prevent redirect
  useEffect(() => {
    const currentLang = i18n.language;

    // Only update URL if content exists in current language
    if (newsData.translations[currentLang]) {
      const currentSlug = newsData.translations[currentLang].slug;
      const currentPath = window.location.pathname;

      if (currentPath.includes("/news/")) {
        const newPath = `/${currentLang}/news/${currentSlug}`;
        if (currentPath !== newPath) {
          router.replace(newPath, { scroll: false });
        }
      }
    }
    // Remove the redirect logic for missing translations
  }, [i18n.language, newsData.translations, router]);

  const mainSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: nav2 || undefined,
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  const thumbnailSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    focusOnSelect: true,
    asNavFor: nav1 || undefined,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  // Keep the isContentAvailableInCurrentLanguage helper
  const isContentAvailableInCurrentLanguage = () => {
    const currentLang = i18n.language;
    return Boolean(newsData.translations[currentLang]);
  };

  // Update getTranslatedContent to handle missing translations
  const getTranslatedContent = (field: "title" | "description") => {
    const currentLang = i18n.language;
    return newsData.translations[currentLang]?.[field] || "";
  };

  const sliderImages = newsData.images.map((img, index) => ({
    src: img.image,
    alt: `Slide ${index + 1}`,
  }));

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return encodeURIComponent(window.location.href);
    }
    return "";
  };

  const getSocialShareUrls = () => {
    const url = getShareUrl();
    const title = encodeURIComponent(getTranslatedContent("title"));

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
  };

  const getCategorySlug = (category: NewsCategory) => {
    return (
      category.translations[i18n.language]?.slug ||
      category.translations["en"]?.slug ||
      ""
    );
  };

  const getCategoryName = (category: NewsCategory) => {
    return (
      category.translations[i18n.language]?.name ||
      category.translations["en"]?.name ||
      ""
    );
  };

  const handleCategoryClick = (slug: string) => {
    router.push(`/${i18n.language}/allnews/${slug}`);
  };

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

      <main className="main">
        <div className="container">
          {isContentAvailableInCurrentLanguage() ? (
            <>
              <div className="main-news-pages">
                <a href={`/${i18n.language}`}>{t("common.home")}</a>
                <a href={`/${i18n.language}/allnews`}>{t("common.news")}</a>
                <a
                  href="#"
                  style={{
                    maxWidth: "800px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "inline-block",
                  }}
                >
                  {getTranslatedContent("title")}
                </a>
              </div>
              <div className="main-news">
                <div className="main-news-block">
                  <div className="main-news-block-title">
                    <h1>{getTranslatedContent("title")}</h1>
                  </div>

                  <div className="main-news-block-date">
                    <div>
                      <span className="date">
                        {new Date(newsData.date_posted)
                          .toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replace(/\//g, ".")}
                      </span>
                    </div>
                    <div className="main-news-block-views">
                      <span className="view-number">{newsData.views_count}</span>
                    </div>
                  </div>

                  <div
                    className="main-news-block-photo"
                    style={{ position: "relative", zIndex: 2 }}
                  >
                    <Image
                      src={newsData.main_image}
                      alt={getTranslatedContent("title")}
                      width={800}
                      height={400}
                      priority
                    />
                  </div>

                  <div
                    className="main-news-block-text tinymce-content"
                    dangerouslySetInnerHTML={{
                      __html: getTranslatedContent("description"),
                    }}
                  />

                  {newsData.images.length > 0 && (
                    <div
                      className="main-news-block-slider"
                      style={{ position: "relative", zIndex: 1 }}
                    >
                      <Slider
                        {...mainSettings}
                        ref={slider1}
                        className="main-block-slider-for"
                      >
                        {sliderImages.map((img, index) => (
                          <div key={index} className="slide">
                            <div className="slide-image-wrapper">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 800px) 100vw, 800px"
                                priority={index === 0}
                                className="slider-image"
                              />
                            </div>
                          </div>
                        ))}
                      </Slider>

                      {sliderImages.length > 1 && (
                        <Slider
                          {...thumbnailSettings}
                          ref={slider2}
                          className="thumbnail-slider"
                        >
                          {sliderImages.map((img, index) => (
                            <div key={index} className="thumbnail">
                              <div className="thumbnail-image-wrapper">
                                <Image
                                  src={img.src}
                                  alt={`Thumbnail ${index + 1}`}
                                  fill
                                  sizes="(max-width: 150px) 100vw, 150px"
                                  className="thumbnail-image"
                                />
                              </div>
                            </div>
                          ))}
                        </Slider>
                      )}
                    </div>
                  )}

                  <div className="main-news-block-social">
                    <div
                      className="faculty-block-text-social"
                      style={{ padding: "10px" }}
                    >
                      <a
                        href={getSocialShareUrls().facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ margin: "10px" }}
                      >
                        <i className="fa-brands fa-square-facebook"></i>
                      </a>
                      <a
                        href={`https://t.me/share/url?url=${getShareUrl()}&text=${encodeURIComponent(
                          getTranslatedContent("title")
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ margin: "10px" }}
                      >
                        <i className="fa-brands fa-telegram"></i>
                      </a>
                      <a
                        href={getSocialShareUrls().twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ margin: "10px" }}
                      >
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                      <a
                        href={getSocialShareUrls().linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ margin: "10px" }}
                      >
                        <i className="fa-brands fa-linkedin"></i>
                      </a>
                    </div>
                  </div>

                  <div className="main-news-block-buttons">
                    {newsData.display_goals.map((goal) => {
                      const formatColor = (color: string) => {
                        color = color.replace("#", "");

                        if (color.length <= 3) {
                          color = color
                            .split("")
                            .map((char) => char + char)
                            .join("");
                        }

                        return "#" + color.padStart(6, "0");
                      };

                      return (
                        <a
                          key={goal.id}
                          href={`/${i18n.language}/goals/${
                            goal.translations[i18n.language]?.slug ||
                            goal.translations["en"]?.slug ||
                            ""
                          }`}
                          style={{
                            backgroundColor: formatColor(goal.color),
                          }}
                        >
                          <span className="buttons-number">{goal.goals}</span>
                          <p>
                            {goal.translations[i18n.language]?.name ||
                              goal.translations["en"]?.name ||
                              "Unknown Goal"}
                          </p>
                        </a>
                      );
                    })}

                    {newsData.display_goals.length > 4 && (
                      <>
                        <div
                          className={`hidden-buttons ${
                            showAllButtons ? "show" : ""
                          }`}
                        >
                          {newsData.display_goals.slice(4).map((goal) => (
                            <a
                              key={goal.id}
                              href={`/${i18n.language}/goals/${
                                goal.translations[i18n.language]?.slug ||
                                goal.translations["en"]?.slug ||
                                ""
                              }`}
                              style={{
                                backgroundColor: goal.color.startsWith("#")
                                  ? goal.color
                                  : `#${goal.color.padStart(6, "0")}`,
                              }}
                            >
                              <span className="buttons-number">
                                {goal.goals}
                              </span>
                              <p>
                                {goal.translations[i18n.language]?.name ||
                                  goal.translations["en"]?.name ||
                                  "Unknown Goal"}
                              </p>
                            </a>
                          ))}
                        </div>
                        <span
                          className="show-all-text"
                          onClick={() => setShowAllButtons(!showAllButtons)}
                        >
                          {showAllButtons ? "Show Less" : "Show All"}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <NewsRubric />
              </div>
            </>
          ) : (
            <>
              
              <div
                className="no-content-message"
                style={{
                  textAlign: "center",
                  padding: "50px 0",
                  fontSize: "1.2rem",
                }}
              >
                {t("common.noNews")}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
