"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import React from "react";
import { useTranslation } from "react-i18next";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-coverflow";
import axios from "axios";
import "../[lang]/main.css"
interface NewsImage {
  image: string;
}

interface NewsTranslation {
  title: string;
  description: string;
  slug: string;
}

interface NewsItem {
  id: number;
  category: number;
  display_goals: Goal[];
  main_image: string;
  images: NewsImage[];
  views_count: number;
  date_posted: string;
  translations: {
    [key: string]: NewsTranslation;
  };
}

// Update interface for announcements
interface AnnouncementTranslation {
  title: string;
  description: string;
  slug: string;
}

interface Announcement {
  id: number;
  date_post: string;
  translations: {
    [key: string]: AnnouncementTranslation;
  };
}

interface Video {
  id: number;
  video_url: string;
  date_posted: string;
  translations: {
    [key: string]: VideoTranslation;
  };
}
// Add interface for videos
interface VideoTranslation {
  title: string;
}

// Add interface for faculty data
interface FacultyTranslation {
  name: string;
  description: string;
  slug?: string;  // Make optional if not always present
  history_of_faculty?: string;  // Make optional if not always present
  email?: string;  // Make optional if not always present
}

interface Faculty {
  id: number;
  email?: string;  // Make email optional
  logo: string;
  translations: {
    [key: string]: FacultyTranslation;
  };
}


// Add interface for quantities
interface QuantityTranslation {
  title: string;
}

interface Quantity {
  id: number;
  quantity: number;
  translations: {
    [key: string]: QuantityTranslation;
  };
}

// Add interface for services
interface ServiceTranslation {
  name: string;
}

interface Service {
  id: number;
  url: string;
  img: string;
  translations: {
    [key: string]: ServiceTranslation;
  };
}

// Add interfaces for goals and categories
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
    [key: string]: CategoryTranslation;
  };
}

// First, add the interface for partners
interface PartnerTranslation {
  name: string;
}

interface Partner {
  id: number;
  url: string;
  img: string;
  translations: {
    [key: string]: PartnerTranslation;
  };
}

interface MainImage {
  id: number;
  main_img: string;
  is_active: boolean;
}

// Add this helper function at the top level
const decodeHtmlEntities = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

// Update getTranslatedText function to only return content for the requested language
const getTranslatedText = (
  translations: any,
  language: string, 
  field: string
) => {
  // Only check the requested language
  if (translations?.[language]?.[field]?.trim()) {
    return decodeHtmlEntities(translations[language][field]);
  }
  return null; // Return null instead of fallback text
};

// 2. Add image path validation
const getImagePath = (path: string) => {
  return path || "/default-image.jpg"; // Add a default image path
};

// Add this helper function at the top level
const getValidImagePath = (path: string | undefined) => {
  if (!path || path.trim() === "") {
    return "/default-placeholder.png"; // Make sure this default image exists in your public folder
  }

  // If the path is already a full URL, return it as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // If it's a relative path, ensure it starts with '/'
  return path.startsWith("/") ? path : `/${path}`;
};

// Update the FACULTY_DATA constant with the full structure
const FACULTY_DATA: Faculty[] = [
  {
    id: 1,
    logo: "content/image_2024-09-16_14-55-28.png",
    translations: {
      ru: {
        name: "Факультет Узбекской филологии",
        description: "Сегодня изучение иностранных языков стало чрезвычайно важным направлением государственной политики в Республике Узбекистан. Согласно постановлению Президента Ш.М. Мирзиёева «О мерах по поднятию на качественно новый уровень деятельности по популяризации изучения иностранных языков в Республике Узбекистан» от 19 мая 2021 года."
      }
    }
  },
  {
    id: 2,
    logo: "content/image_2024-09-16_14-55-28.png",
    translations: {
      ru: { 
        name: "Факультет Физики",
        description: "Сегодня изучение иностранных языков стало чрезвычайно важным направлением государственной политики в Республике Узбекистан. Согласно постановлению Президента Ш.М. Мирзиёева «О мерах по поднятию на качественно новый уровень деятельности по популяризации изучения иностранных языков в Республике Узбекистан» от 19 мая 2021 года."
      }
    }
  },
  {
    id: 3,
    logo: "content/image_2024-09-16_14-55-28.png",
    translations: {
      ru: {
        name: "Факультет МФ и журналистики",
        description: "Сегодня изучение иностранных языков стало чрезвычайно важным направлением государственной политики в Республике Узбекистан. Согласно постановлению Президента Ш.М. Мирзиёева «О мерах по поднятию на качественно новый уровень деятельности по популяризации изучения иностранных языков в Республике Узбекистан» от 19 мая 2021 года."
      }
    }
  },
  {
    id: 4,
    logo: "content/image_2024-09-16_14-55-28.png",
    translations: {
      ru: {
        name: "Факультет Истории",
        description: "Сегодня изучение иностранных языков стало чрезвычайно важным направлением государственной политики в Республике Узбекистан. Согласно постановлению Президента Ш.М. Мирзиёева «О мерах по поднятию на качественно новый уровень деятельности по популяризации изучения иностранных языков в Республике Узбекистан» от 19 мая 2021 года."
      }
    }
  }
];

// Update filter function to preserve all properties of the original items
const filterByAvailableTranslation = <T extends { translations: { [key: string]: any } }>(
  items: T[],
  language: string
): T[] => {
  return items.filter(item => {
    // Check if translations exist for the requested language
    if (!item.translations?.[language]) {
      return false;
    }
    
    // Check if any value in the translation object is non-empty
    return Object.values(item.translations[language]).some(
      value => typeof value === 'string' && value.trim() !== ''
    );
  });
};

// Add this helper function
const fetchNewsPage = async (page: number) => {
  try {
    const response = await axios.get(`https://karsu.uz/api/news/posts/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching news page ${page}:`, error);
    return null;
  }
};

// Add this helper function at the top level
const fetchAnnouncementsPage = async (page: number) => {
  try {
    const response = await axios.get(`https://karsu.uz/api/announcements/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching announcements page ${page}:`, error);
    return null;
  }
};

// Add this helper function at the top level
const fetchFacultiesPage = async (page: number) => {
  try {
    const response = await axios.get(`https://karsu.uz/api/menus/faculty/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching faculties page ${page}:`, error);
    return null;
  }
};

export default function MainSlider() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>(FACULTY_DATA);
  const [quantities, setQuantities] = useState<Quantity[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mainSwiper, setMainSwiper] = useState<Swiper | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [mainImage, setMainImage] = useState<MainImage | null>(null);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(false);
  
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        let allFaculties: Faculty[] = [];
        let page = 1;
        
        // Keep fetching pages until we run out of pages
        while (true) {
          const facultiesData = await fetchFacultiesPage(page);
          if (!facultiesData || !facultiesData.results.length) break;
          
          allFaculties = [...allFaculties, ...facultiesData.results];
          
          // Break if there are no more pages
          if (!facultiesData.next) break;
          page++;
        }
        
        const filteredFaculties = filterByAvailableTranslation(allFaculties, i18n.language);
        setFaculties(filteredFaculties as Faculty[]);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };
    
    fetchFaculties();
  }, [i18n.language]);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoadingNews(true);
      try {
        let allNews: NewsItem[] = [];
        let page = 1;
        
        // Keep fetching pages until we have 6 valid news items or run out of pages
        while (allNews.length < 6) {
          const newsData = await fetchNewsPage(page);
          if (!newsData || !newsData.results.length) break;
          
          // Filter news items that have translations for current language
          const filteredNews = filterByAvailableTranslation<NewsItem>(newsData.results, i18n.language);
          allNews = [...allNews, ...filteredNews];
          
          // Break if there are no more pages
          if (!newsData.next) break;
          page++;
        }
        
        // Take only the first 6 items
        setNews(allNews.slice(0, 6));
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setIsLoadingNews(false);
      }
    };

    fetchNews();
  }, [i18n.language]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsLoadingAnnouncements(true);
      try {
        let allAnnouncements: Announcement[] = [];
        let page = 1;
        
        // Keep fetching pages until we have 6 valid announcements or run out of pages
        while (allAnnouncements.length < 6) {
          const announcementsData = await fetchAnnouncementsPage(page);
          if (!announcementsData || !announcementsData.results.length) break;
          
          // Filter announcements that have translations for current language
          const filteredAnnouncements = filterByAvailableTranslation<Announcement>(
            announcementsData.results, 
            i18n.language
          );
          allAnnouncements = [...allAnnouncements, ...filteredAnnouncements];
          
          // Break if there are no more pages
          if (!announcementsData.next) break;
          page++;
        }
        
        // Take only the first 6 items
        setAnnouncements(allAnnouncements.slice(0, 6));
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setAnnouncements([]);
      } finally {
        setIsLoadingAnnouncements(false);
      }
    };

    fetchAnnouncements();
  }, [i18n.language]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<Video[]>(
          `https://karsu.uz/api/publications/recent-videos/`
        );
        const allVideos = response.data || [];
        const filteredVideos = filterByAvailableTranslation(allVideos, i18n.language);
        setVideos(filteredVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [i18n.language]);

  useEffect(() => {
    const fetchQuantities = async () => {
      try {
        const response = await axios.get<Quantity[]>(
          `https://karsu.uz/api/publications/quantities/`
        );
        const allQuantities = response.data || [];
        const filteredQuantities = filterByAvailableTranslation(allQuantities, i18n.language);
        setQuantities(filteredQuantities);
      } catch (error) {
        console.error("Error fetching quantities:", error);
      }
    };

    fetchQuantities();
  }, [i18n.language]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<Service[]>(
          `https://karsu.uz/api/references/services/`
        );
        const allServices = response.data || [];
        const filteredServices = filterByAvailableTranslation(allServices, i18n.language);
        setServices(filteredServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [i18n.language]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get<Goal[]>(
          `https://karsu.uz/api/news/goals/`
        );
        const allGoals = response.data || [];
        const filteredGoals = filterByAvailableTranslation(allGoals, i18n.language);
        setGoals(filteredGoals);
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
        const allCategories = response.data || [];
        const filteredCategories = filterByAvailableTranslation(allCategories, i18n.language);
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [i18n.language]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get<Partner[]>(
          `https://karsu.uz/api/references/links`
        );
        const allPartners = response.data || [];
        const filteredPartners = filterByAvailableTranslation(allPartners, i18n.language);
        setPartners(filteredPartners);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, [i18n.language]);

  useEffect(() => {
    let mainSwiper: Swiper | null = null;
    let videoSwiper: Swiper | null = null;
    let facultySwiper: Swiper | null = null;
    let infoSwiper: Swiper | null = null;

    if (document.querySelector(".swiper-container-1")) {
      mainSwiper = new Swiper(".swiper-container-1", {
        loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        speed: 1000,
        navigation: {
          nextEl: ".main-slider-btn-right",
          prevEl: ".main-slider-btn-left",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
      setMainSwiper(mainSwiper);

      mainSwiper.autoplay?.start();
    }

    if (document.querySelector(".swiper-container-video")) {
      videoSwiper = new Swiper(".swiper-container-video", {
        speed: 400,
        spaceBetween: 30,
        initialSlide: 0,
        autoHeight: true,
        direction: "horizontal",
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: true,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-video-next",
          prevEl: ".swiper-video-prev",
        },
        effect: "slide",
        slidesPerView: 2,
        centeredSlides: true,
        grabCursor: true,
        allowTouchMove: true,
      });
    }

    if (document.querySelector(".swiper-container-faculty")) {
      facultySwiper = new Swiper(".swiper-container-faculty", {
        direction: "vertical",
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        mousewheel: true,
        grabCursor: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".faculty-select-btn.swiper-next",
          prevEl: ".faculty-select-btn.swiper-prev",
        },
        on: {
          slideChange: function(this: Swiper) {
            if (infoSwiper) {
              infoSwiper.slideTo(this.realIndex);
            }
          }
        }
      });
    }

    if (document.querySelector(".swiper-container-info")) {
      infoSwiper = new Swiper(".swiper-container-info", {
        direction: "vertical",
        slidesPerView: 1,
        mousewheel: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        }
      });
    }

    const nextButton = document.querySelector('.faculty-select-btn.swiper-next');
    const prevButton = document.querySelector('.faculty-select-btn.swiper-prev');

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (facultySwiper) {
          facultySwiper.slideNext();
        }
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (facultySwiper) {
          facultySwiper.slidePrev();
        }
      });
    }

    const newsMenuContainer = document.querySelector(".news-page-menu");
    if (newsMenuContainer) {
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        (event.currentTarget as HTMLElement).scrollLeft += event.deltaY;
      };

      newsMenuContainer.addEventListener("wheel", handleWheel as unknown as EventListener);

      return () => {
        if (mainSwiper) {
          mainSwiper.autoplay?.stop();
          mainSwiper.destroy();
        }
        if (videoSwiper) videoSwiper.destroy();
        if (facultySwiper) facultySwiper.destroy();
        if (infoSwiper) infoSwiper.destroy();
        
        if (newsMenuContainer) {
          newsMenuContainer.removeEventListener("wheel", handleWheel as unknown as EventListener);
        }
      };
    }
  }, [news]);

  const slides = Array.isArray(news) && news.length > 0 ? news.map((item) => {
    const title = getTranslatedText(item.translations, i18n.language, "title");
    if (!title) return null; // Skip if no translation available

    return (
      <div className="swiper-slide" key={item.id}>
        <div className="main-slider-div">
          <div className="main-slider-div-black">
            <div className="main-slider-div-black-flex">
              <div className="header-logo-bg">
                <div className="header-logo">
                  <div className="header-logo-svg-bg">
                    <Image 
                      src={getValidImagePath("/icon.png")}
                      alt="University logo"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="header-logo-title-bg">
                    <Link href="/" className="header-logo-title">
                     {t('common.University')}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="main-slider-div-data-big">
                <div className="main-slider-div-data-small">
                  <div className="main-slider-div-data-span-div">
                    <span className="main-slider-div-data-span-uni-title">
                      {title.split(' ').slice(0, 3).join('\n')}
                    </span>
                    <span className="main-slider-div-data-span-text">
                      {title.split(' ').slice(3).join(' ')}
                    </span>
                  </div>
                  <div className="main-slider-btn-div">
                    <Link
                      href={`${i18n.language}/news/${getTranslatedText(
                        item.translations,
                        i18n.language,
                        "slug"
                      )}`}
                      className="main-slider-btn"
                    >
                      {t("university.moreDetails")}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M3 10.4569H16M16 10.4569L12.3889 6.4458M16 10.4569L12.3889 14.4681"
                          stroke="white"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </Link>
                  </div>
                  <div className="main-slider-arrows-div">
                    <button 
                      className="main-slider-btn-left"
                      onClick={() => {
                        if (mainSwiper) {
                          mainSwiper.slidePrev();
                        }
                      }}
                    >
                      {/* Left arrow SVG */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="41"
                        viewBox="0 0 40 41"
                        fill="none"
                      >
                        <circle
                          cx="20"
                          cy="20.4929"
                          r="19.25"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.1629 28.6558C17.7968 29.0219 17.2033 29.0219 16.8371 28.6558L9.33713 21.1558C8.971 20.7897 8.971 20.1962 9.33713 19.83L16.8371 12.33C17.2033 11.9639 17.7968 11.9639 18.1629 12.33C18.529 12.6962 18.529 13.2897 18.1629 13.6558L12.2634 19.5554H30C30.5178 19.5554 30.9375 19.9752 30.9375 20.4929C30.9375 21.0107 30.5178 21.4304 30 21.4304H12.2634L18.1629 27.33C18.529 27.6961 18.529 28.2897 18.1629 28.6558Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button 
                      className="main-slider-btn-right"
                      onClick={() => {
                        if (mainSwiper) {
                          mainSwiper.slideNext();
                        }
                      }}
                    >
                      {/* Right arrow SVG */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="41"
                        viewBox="0 0 40 41"
                        fill="none"
                      >
                        <circle
                          cx="20"
                          cy="20"
                          r="19.25"
                          transform="matrix(-1 0 0 1 40 0.49292)"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21.8371 28.6558C22.2032 29.0219 22.7967 29.0219 23.1629 28.6558L30.6629 21.1558C31.029 20.7897 31.029 20.1962 30.6629 19.83L23.1629 12.33C22.7967 11.9639 22.2032 11.9639 21.8371 12.33C21.471 12.6962 21.471 13.2897 21.8371 13.6558L27.7366 19.5554H10C9.48224 19.5554 9.0625 19.9752 9.0625 20.4929C9.0625 21.0107 9.48224 21.4304 10 21.4304H27.7366L21.8371 27.33C21.471 27.6961 21.471 28.2897 21.8371 28.6558Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }).filter(Boolean) : []; // Filter out null values

  useEffect(() => {
    const fetchNewsByCategory = async () => {
      setIsLoadingNews(true);
      try {
        let allNews: NewsItem[] = [];
        let page = 1;
        
        while (allNews.length < 6) {
          const url = activeCategory 
            ? `https://karsu.uz/api/news/category/${activeCategory}/posts/?page=${page}`
            : `https://karsu.uz/api/news/posts/?page=${page}`;
            
          const response = await axios.get(url);
          const newsData = response.data;
          
          if (!newsData || !newsData.results.length) break;
          
          const filteredNews = filterByAvailableTranslation<NewsItem>(newsData.results, i18n.language);
          allNews = [...allNews, ...filteredNews];
          
          if (!newsData.next) break;
          page++;
        }
        
        setNews(allNews.slice(0, 6));
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setIsLoadingNews(false);
      }
    };

    fetchNewsByCategory();
  }, [activeCategory, i18n.language]);

  const handleCategoryClick = (categorySlug: string | null) => {
    setActiveCategory(categorySlug);
  };

  useEffect(() => {
    axios.get('https:karsu.uz/api/publications/images/')
      .then(response => {
        const activeImage = response.data.find((img: MainImage) => img.is_active);
        if (activeImage) {
          setMainImage(activeImage);
        }
      })
      .catch(error => {
        console.error("Error fetching main image:", error);
      });
  }, []);

  return (
    <>
      <div className="main-slider-div-bg">
        <div className="swiper-container swiper-container-1">
          <div className="swiper-wrapper">
            {slides}
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <div className="main-slider-back">
          <Image
            src={getValidImagePath("/MAIN_IMAGE.jpg")}
            alt="Background"
            width={1920}
            height={1080}
          />
        </div>
      </div>

      <div className="main-news-page">
        <div className="main-news-page-small">
          <div className="news-page-title-menu-div">
            <div className="news-page-title">
              <span className="news-page-title-span">{t("sections.news")}</span>
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
                    {getTranslatedText(category.translations, i18n.language, "name")}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="main-news-all-cards-div">
            {news.length > 0 ? (
              news.map((item) => {
                const title = getTranslatedText(item.translations, i18n.language, "title");
                const categoryName = getTranslatedText(
                  categories.find(cat => cat.id === item.category)?.translations || {},
                  i18n.language,
                  "name"
                );
                
                if (!title || !categoryName) return null; // Skip if translations are missing

                return (
                  <div className="news-card" key={item.id}>
                    <div className="news-photo-div">
                      <div className="news-category">
                        <span
                           className="news-category-span"
                           style={{
                             display: 'inline-block',
                             maxWidth: 150,
                             overflow: 'hidden',
                             textOverflow: 'ellipsis',
                             whiteSpace: 'nowrap'
                           }}>
                          {categoryName}
                        </span>
                      </div>
                      <img
                        className="news-photo"
                        src={item.main_image || getValidImagePath("/default-news-image.jpg")}
                        alt={title}
                      />
                    </div>
                    <div className="news-info">
                      <div className="news-info-types">
                        <p>{t("news.relatedGoals")}:</p>
                        <div>
                          {Array.isArray(item.display_goals) && item.display_goals.map((goal) => (
                            <Link 
                              href={`/${i18n.language}/goals/${goal.translations[i18n.language]?.slug || ''}`} 
                              key={goal.id}
                            >
                              <span
                                className="number"
                                style={{
                                  backgroundColor: `#${goal.color || 'gray'}`,
                                  color: goal.color === 'ffffff' ? '#000' : '#fff'
                                }}
                              >
                                {goal.goals}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="news-title">
                        <Link
                          href={`/${i18n.language}/news/${getTranslatedText(
                            item.translations,
                            i18n.language,
                            "slug"
                          )}`}
                          className="news-title-span"
                        >
                          {title}
                        </Link>
                      </div>
                      <div className="news-post-date">
                        <span className="news-post-time-span">
                          {new Date(item.date_posted).toLocaleTimeString(
                            'ru-Ru',
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                        <span className="news-post-date-span">
                          {new Date(item.date_posted).toLocaleDateString(
                            i18n.language,
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          ).replace(/\//g, '.')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }).filter(Boolean)
            ) : (
              <div style={{
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
                  {t("common.noNewsAvailable")}
                </p>
              </div>
            )}
          </div>

          <div className="all-events-page-link-div">
            <Link href={`/${i18n.language}/allnews`} className="all-events-page-link">
              {t("common.allNews")}
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.0309 19.3024C14.336 19.6075 14.8306 19.6075 15.1357 19.3024L21.3857 13.0524C21.6908 12.7473 21.6908 12.2527 21.3857 11.9476L15.1357 5.69761C14.8306 5.3925 14.336 5.3925 14.0309 5.69761C13.7258 6.00271 13.7258 6.49729 14.0309 6.8024L18.9472 11.7188H4.16667C3.7352 11.7188 3.38542 12.0685 3.38542 12.5C3.38542 12.9315 3.7352 13.2813 4.16667 13.2813H18.9472L14.0309 18.1976C13.7258 18.5027 13.7258 18.9973 14.0309 19.3024Z"
                fill="#002B6A"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="main-events-page">
        <div className="main-events-page-small">
          <div className="events-page-title-menu-div">
            <div className="events-page-title">
              <span className="events-page-title-span">
                {t("sections.events")}
              </span>
            </div>
          </div>

          <div className="main-events-all-cards-div">
            {announcements && announcements.length > 0 ? (
              announcements.map((announcement) => (
                <div className="main-event-card" key={announcement.id}>
                  <div className="main-event-top">
                    <div className="main-event-title">
                      <Link
                        href={`/${i18n.language}/event/${getTranslatedText(
                          announcement.translations,
                          i18n.language,
                          "slug"
                        )}`}
                        className="main-event-title-link"
                      >
                        {getTranslatedText(
                          announcement.translations,
                          i18n.language,
                          "title"
                        )}
                      </Link>
                    </div>
                  </div>
                  <div className="main-event-date">
                    <span className="main-event-date-span">
                      {new Date(announcement.date_post).toLocaleDateString(
                        i18n.language,
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      ).replace(/\//g, '.')}
                    </span>
                  </div>
                </div>  
              ))
            ) : (
              <div style={{
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
                  {t("common.noEventsAvailable")}
                </p>
              </div>
            )}
            <div className="all-events-page-link-div2" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              width: announcements?.length === 6 ? '300%' : 'auto'
            }}>
              <Link href={`/${i18n.language}/events`} className="all-events-page-link2" style={{textDecoration:"none",color:"#002b6a",fontSize:"20px",fontWeight:'650',marginRight:"10px"}} >  
                {t("common.allEvents")}
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.0309 19.3024C14.336 19.6075 14.8306 19.6075 15.1357 19.3024L21.3857 13.0524C21.6908 12.7473 21.6908 12.2527 21.3857 11.9476L15.1357 5.69761C14.8306 5.3925 14.336 5.3925 14.0309 5.69761C13.7258 6.00271 13.7258 6.49729 14.0309 6.8024L18.9472 11.7188H4.16667C3.7352 11.7188 3.38542 12.0685 3.38542 12.5C3.38542 12.9315 3.7352 13.2813 4.16667 13.2813H18.9472L14.0309 18.1976C13.7258 18.5027 13.7258 18.9973 14.0309 19.3024Z"
                  fill="#002B6A"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="main-videos-page">
        <div className="main-videos-page-small">
          <div className="videos-page-title-menu-div">
            <div className="videos-page-title">
              <span className="videos-page-title-span">
                {t("sections.videoGallery")}
              </span>
            </div>
          </div>

          <div className="all-videos-gallery">
            {videos.length > 0 ? (
              <div className="all-videos-cards">
                {videos.map((video) => (
                  <div className="video-card" key={video.id}>
                   
                    <iframe
                      width="350"
                      height="200"
                      src={video.video_url}
                      title={getTranslatedText(video.translations, i18n.language, "title") || ""}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                   
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
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
                  {t("common.noVideosAvailable")}
                </p>
              </div>
            )}
          </div>

          <div className="all-events-page-link-div">
            <Link href={`/${i18n.language}/videos`} className="all-events-page-link">
              {t("common.allVideos")}
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.0309 19.3024C14.336 19.6075 14.8306 19.6075 15.1357 19.3024L21.3857 13.0524C21.6908 12.7473 21.6908 12.2527 21.3857 11.9476L15.1357 5.69761C14.8306 5.3925 14.336 5.3925 14.0309 5.69761C13.7258 6.00271 13.7258 6.49729 14.0309 6.8024L18.9472 11.7188H4.16667C3.7352 11.7188 3.38542 12.0685 3.38542 12.5C3.38542 12.9315 3.7352 13.2813 4.16667 13.2813H18.9472L14.0309 18.1976C13.7258 18.5027 13.7258 18.9973 14.0309 19.3024Z"
                fill="#002B6A"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="faculties-page">
        <div className="faculties-page-small">
          <div className="faculties-page-title-menu-div">
            <div className="faculties-page-title">
              <span className="faculties-page-title-span">
                {t("sections.faculties")}
              </span>
            </div>
          </div>
          <div className="main-faculties-page">
            {faculties.length > 0 ? (
              <>
                <div className="faculties-select-page">
                  <div className="all-faculties-page">
                    <div className="swiper-container swiper-container-faculty">
                      <div className="swiper-wrapper">
                        {faculties.map((faculty) => (
                          <div className="swiper-slide" key={faculty.id} data-faculty={faculty.id}>
                            <div className='faculty-card'>
                              <div className='faculty-logo'>
                                <img 
                                  src={faculty.logo} 
                                  alt={faculty.translations[i18n.language]?.name || ''} 
                                />
                              </div>
                              <div className='faculty-title'>
                                <span className='faculty-title-span'>
                                  {faculty.translations[i18n.language]?.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="faculty-select">
                    <button className='faculty-select-btn swiper-next'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" viewBox="0 0 100 30" fill="none">
                        <rect width="100" height="30" rx="5" fill="#002B6A" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M56.7712 13.5837C57.0763 13.2786 57.0763 12.784 56.7712 12.4789L50.5211 6.22894C50.216 5.92383 49.7215 5.92383 49.4164 6.22894L43.1664 12.4789C42.8613 12.784 42.8613 13.2786 43.1664 13.5837C43.4715 13.8888 43.966 13.8888 44.2711 13.5837L49.1875 8.66748V23.448C49.1875 23.8795 49.5373 24.2292 49.9688 24.2292C50.4002 24.2292 50.75 23.8795 50.75 23.448V8.66748L55.6663 13.5837C55.9714 13.8888 56.4661 13.8888 56.7712 13.5837Z" fill="white" />
                      </svg>
                    </button>
                    <button className='faculty-select-btn swiper-prev'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" viewBox="0 0 100 30" fill="none">
                        <rect width="100" height="30" rx="5" fill="#002B6A" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M43.2289 16.6456C42.9238 16.9507 42.9238 17.4453 43.2289 17.7504L49.4789 24.0004C49.784 24.3055 50.2786 24.3055 50.5837 24.0004L56.8337 17.7504C57.1388 17.4453 57.1388 16.9507 56.8337 16.6456C56.5286 16.3405 56.034 16.3405 55.7289 16.6456L50.8125 21.5619V6.78137C50.8125 6.3499 50.4627 6.00012 50.0313 6.00012C49.5998 6.00012 49.25 6.3499 49.25 6.78137V21.5619L44.3337 16.6456C44.0286 16.3405 43.5339 16.3405 43.2289 16.6456Z" fill="white" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="swiper-container swiper-container-info">
                  <div className="swiper-wrapper">
                    {faculties.map((faculty) => (
                      <div className="swiper-slide" key={faculty.id}>
                        <div className='faculty-info' data-faculty={faculty.id}>
                          <div className='faculty-info-title-logo'>
                            <div className='faculty-info-title'>
                              <span className='faculty-info-title-span'>
                                {faculty.translations[i18n.language]?.name}
                              </span>
                            </div>
                            <div className='faculty-info-logo'>
                              <img 
                                src={faculty.logo} 
                                alt={faculty.translations[i18n.language]?.name || ''} 
                                width={90} 
                                height={90} 
                              />
                            </div>
                          </div>
                          <div className='faculty-info-text-btn-div'>
                            <div className='faculty-info-text'>
                              <span className='faculty-info-text-span' dangerouslySetInnerHTML={{
                                __html: (
                                  faculty.translations[i18n.language]?.description || 
                                  faculty.translations[i18n.language]?.history_of_faculty || 
                                  ''
                                ).replace(/<[^>]*>/g, '')
                              }}>
                              </span>
                            </div>
                            <Link href={`/${i18n.language}/faculty/${faculty.translations['ru']?.slug}`} className='faculty-info-details-btn'>
                              {t("buttons.more")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div style={{
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
                  {t("common.noFacultiesAvailable")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="services-page">
        <div className="services-page-small">
          <div className="services-page-title-menu-div">
            <div className="services-page-title">
              <span className="services-page-title-span">
                {t("sections.services")}
              </span>
            </div>
          </div>
          <div className="all-services-cards-page">
            {services.length > 0 ? (
              services.map((service) => (
                <div className="service-card-page" key={service.id}>
                  <Link href={service.url} target="_blank" rel="noopener noreferrer">
                    <div className="service-logo">
                      <Image
                        src={getValidImagePath(service.img)}
                        alt={getTranslatedText(service.translations, i18n.language, "name") || ''}
                        width={135}
                        height={135}
                      />
                    </div>
                    <div className="service-name">
                      <span className="service-name-span" style={{fontSize: '14px'}}>
                        {getTranslatedText(service.translations, i18n.language, "name")}
                      </span>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div style={{
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
                  {t("common.noServicesAvailable")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="numbers-page">
        <div className="numbers-page-small">
          <div className="numbers-page-title-menu-div">
            <div className="numbers-page-title">
              <span className="numbers-page-title-span">
                {t("sections.numbers")}
              </span>
            </div>
          </div>
          <div className="numbers-circle-div">
            {quantities.length > 0 ? (
              <>
                <div className="numbers-rectangle">
                  {Array.isArray(quantities) && quantities.length > 0 ? 
                    quantities.slice(0, 2).map((item) => (
                      <div className="numbers-circle" key={item.id}>
                        <div className="numbers-logo">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M24 4V14.108C24 14.956 24 15.782 24.092 16.462C24.194 17.228 24.446 18.102 25.172 18.828C25.898 19.554 26.772 19.806 27.54 19.908C28.22 20 29.044 20 29.892 20H40V32C40 37.656 40 40.486 38.242 42.242C36.486 44 33.656 44 28 44H20C14.344 44 11.514 44 9.758 42.242C8 40.486 8 37.656 8 32V16C8 10.344 8 7.514 9.758 5.758C11.514 4 14.344 4 20 4H24Z"
                              fill="#002B6A"
                            />
                          </svg>
                        </div>
                        <div className="numbers-name">
                          <span className="numbers-name-span">
                            {getTranslatedText(
                              item.translations,
                              i18n.language,
                              "title"
                            )}
                          </span>
                        </div>
                        <div className="numbers-num">
                          <span className="numbers-num-span">{item.quantity}</span>
                        </div>
                      </div>
                    )) : null
                  }
                </div>

                <div className="numbers-rectangle vertical">
                  {Array.isArray(quantities) && quantities.length > 2 ? 
                    quantities.slice(2, 4).map((item) => (
                      <div className="numbers-circle vertical" key={item.id}>
                        <div className="numbers-logo">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M24 4V14.108C24 14.956 24 15.782 24.092 16.462C24.194 17.228 24.446 18.102 25.172 18.828C25.898 19.554 26.772 19.806 27.54 19.908C28.22 20 29.044 20 29.892 20H40V32C40 37.656 40 40.486 38.242 42.242C36.486 44 33.656 44 28 44H20C14.344 44 11.514 44 9.758 42.242C8 40.486 8 37.656 8 32V16C8 10.344 8 7.514 9.758 5.758C11.514 4 14.344 4 20 4H24Z"
                              fill="#002B6A"
                            />
                          </svg>
                        </div>
                        <div className="numbers-name">
                          <span className="numbers-name-span">
                            {getTranslatedText(
                              item.translations,
                              i18n.language,
                              "title"
                            )}
                          </span>
                        </div>
                        <div className="numbers-num">
                          <span className="numbers-num-span">{item.quantity}</span>
                        </div>
                      </div>
                    )) : null
                  }
                </div>

                <div className="numbers-rectangle gorizontal">
                  {Array.isArray(quantities) && quantities.length > 4 ? 
                    quantities.slice(4, 6).map((item) => (
                      <div className="numbers-circle gorizontal" key={item.id}>
                        <div className="numbers-logo">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M24 4V14.108C24 14.956 24 15.782 24.092 16.462C24.194 17.228 24.446 18.102 25.172 18.828C25.898 19.554 26.772 19.806 27.54 19.908C28.22 20 29.044 20 29.892 20H40V32C40 37.656 40 40.486 38.242 42.242C36.486 44 33.656 44 28 44H20C14.344 44 11.514 44 9.758 42.242C8 40.486 8 37.656 8 32V16C8 10.344 8 7.514 9.758 5.758C11.514 4 14.344 4 20 4H24Z"
                              fill="#002B6A"
                            />
                          </svg>
                        </div>
                        <div className="numbers-name">
                          <span className="numbers-name-span">
                            {getTranslatedText(
                              item.translations,
                              i18n.language,
                              "title"
                            )}
                          </span>
                        </div>
                        <div className="numbers-num">
                          <span className="numbers-num-span">{item.quantity}</span>
                        </div>
                      </div>
                    )) : null
                  }
                </div>

                <div className="circle-line">
                  <div className="circle-video-div">
                    <div className="circle-video-preview">
                      <div className="circle-video-blue"></div>
                      <Image
                        className="circle-video-preview-photo"
                        src={getValidImagePath(
                          "/0xGrCR8gUquinkrMYlrCTLNiT3KO1yqO.jpg"
                        )}
                        alt="Video preview"
                        width={400}
                        height={300}
                      />
                      <a href="#" className="circle-video-play-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="102"
                          height="102"
                          viewBox="0 0 102 102"
                          fill="none"
                        >
                          <circle
                            opacity="0.4"
                            cx="51"
                            cy="51"
                            r="51"
                            fill="#FAFAFA"
                          />
                          <circle
                            opacity="0.4"
                            cx="51"
                            cy="50.9999"
                            r="41"
                            fill="#FAFAFA"
                          />
                          <ellipse
                            opacity="0.6"
                            cx="51"
                            cy="51.0002"
                            rx="29"
                            ry="29"
                            fill="#FAFAFA"
                          />
                          <path
                            d="M66.6135 47.0294C67.3339 47.4125 67.9366 47.9844 68.3568 48.6838C68.7771 49.3833 68.9991 50.1839 68.9991 50.9999C68.9991 51.8158 68.7771 52.6164 68.3568 53.3159C67.9366 54.0153 67.3339 54.5872 66.6135 54.9704L47.3955 65.4209C44.301 67.1054 40.5 64.9154 40.5 61.4519V40.5494C40.5 37.0844 44.301 34.8959 47.3955 36.5774L66.6135 47.0294Z"
                            fill="#002B6A"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{
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
                  {t("common.noStatisticsAvailable")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="partners-page">
        <div className="partners-page-small">
          <div className="partners-page-title-menu-div">
            <div className="partners-page-title">
              <span className="partners-page-title-span">
                {t("sections.partners")}
              </span>
            </div>
          </div>
        </div>
        <div className="all-partners-card-page">
          {partners.length > 0 ? (
            Array.from({ length: Math.ceil(partners.length / 3) }).map((_, rowIndex) => (
              <div className="partners-card" key={rowIndex}>
                {partners.slice(rowIndex * 3, (rowIndex + 1) * 3).map((partner, index) => (
                  <div className={`partner-card ${index === 0 ? 'withphoto' : ''}`} key={partner.id}>
                    <div className={index === 0 ? 'partner-card-bg' : ''}>
                      <div className={`partner-logo ${index === 2 ? 'notabs' : ''}`}>
                        <Link href={partner.url} target="_blank">
                          <Image
                            className="partner-logo-photo"
                            src={getValidImagePath(partner.img)}
                            alt={getTranslatedText(partner.translations, i18n.language, "name") || ""}
                            width={150}
                            height={150}
                          />
                        </Link>
                      </div>
                    </div>
                    {index === 2 && (
                      <div className="partner-name">
                        <span className="partner-name-span">
                          {getTranslatedText(partner.translations, i18n.language, "name")}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div style={{
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
                {t("common.noPartnersAvailable")}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
