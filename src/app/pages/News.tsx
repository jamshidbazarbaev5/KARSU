"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'isomorphic-dompurify';

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

interface NewsProps {
  newsData: {
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
  };
  goalsData: {
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
}

export default function News({ newsData, goalsData }: NewsProps) {
    const [nav1, setNav1] = useState<Slider | null>(null);
    const [nav2, setNav2] = useState<Slider | null>(null);
    const [showAllButtons, setShowAllButtons] = useState(false);
    const slider1 = useRef<Slider | null>(null);
    const slider2 = useRef<Slider | null>(null);

    const { i18n, t } = useTranslation();

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);

    const mainSettings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: nav2 || undefined,
        fade: true,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: false
                }
            }
        ]
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
        centerPadding: '0px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    arrows: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                }
            }
        ]
    };

    const getTranslatedContent = (field: 'title' | 'description') => {
        const content = newsData.translations[i18n.language]?.[field] || newsData.translations['en']?.[field] || '';
        return field === 'description' ? DOMPurify.sanitize(content) : content;
    };

    const sliderImages = newsData.images.map((img, index) => ({
        src: img.image,
        alt: `Slide ${index + 1}`
    }));

    const getGoalName = (goal: typeof goalsData[0]) => {
        return goal.translations[i18n.language]?.name || 
               goal.translations['en']?.name || 
               'Unknown Goal';
    };
    console.log(goalsData)

    return (
        <main className="main">
            <div className="container">
                <div className="main-news-pages">
                    <a href={`/${i18n.language}`}>{t('common.home', )}</a>
                    <a href={`/${i18n.language}/allnews`}>{t('common.news', )}</a>
                    <a href="#">{getTranslatedContent('title')}</a>
                </div>
                <div className="main-news">
                    <div className="main-news-block">
                        <div className="main-news-block-title">
                            <h1>{getTranslatedContent('title')}</h1>
                        </div>
                        
                        {/* Date and Views Section */}
                        <div className="main-news-block-date">
                            <div>
                                {/* SVG Calendar Icon */}
                                <span className="date-day">
                                    {new Date(newsData.date_posted).getDate()}
                                </span>
                                <span className="date-month">
                                    {new Date(newsData.date_posted).toLocaleString(i18n.language, { month: 'long' })}
                                </span>
                                <span className="date-year">
                                    {new Date(newsData.date_posted).getFullYear()}
                                </span>
                            </div>
                            <div className="main-news-block-views">
                                {/* SVG Eye Icon */}
                                <span className="view-number">{newsData.views_count}</span>
                            </div>
                        </div>

                        {/* Move the main image above the slider */}
                        <div className="main-news-block-photo" style={{ position: 'relative', zIndex: 2 }}>
                            <Image 
                                src={newsData.main_image}
                                alt={getTranslatedContent('title')}
                                width={800}
                                height={400}
                                priority
                            />
                        </div>

                        <div 
                            className="main-news-block-text"
                            dangerouslySetInnerHTML={{ __html: getTranslatedContent('description') }}
                        />

                        {/* Image gallery with adjusted z-index */}
                        {newsData.images.length > 0 && (
                            <div className="main-news-block-slider" style={{ position: 'relative', zIndex: 1 }}>
                                <Slider {...mainSettings} ref={slider1} className="main-block-slider-for">
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
                                    <Slider {...thumbnailSettings} ref={slider2} className="thumbnail-slider">
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

                        {/* Goals section
                        <div className="main-news-block-goals">
                            <h3>Related Goals:</h3>
                            <div className="goals-list">
                                {newsData.goals.map((goal) => (
                                    <span key={goal} className="goal-tag">
                                        Goal {goal}
                                    </span>
                                ))}
                            </div>
                        </div> */}

                        <div className="main-news-block-social">
                        <div className="faculty-block-text-social " style={{padding:'10px'}}>
                                <a href="https://www.instagram.com/" style={{margin:'10px'}}><i className="fa-brands fa-square-facebook"></i></a>
                                <a href="https://www.twitter.com/" style={{margin:'10px'}}><i className="fa-brands fa-instagram"></i></a>
                                <a href="https://www.x.com/" style={{margin:'10px'}}><i className="fa-brands fa-x-twitter"></i></a>
                                <a href="https://www.linkedin.com/" style={{margin:'10px'}}><i className="fa-brands fa-linkedin"></i></a>
                            </div>  
                        </div>

                        <div className="main-news-block-buttons">
                            {/* Visible buttons - show first 4 by default */}
                            {goalsData.map((goal) => (
                                <a 
                                    key={goal.id} 
                                    href="#" 
                                    style={{ backgroundColor: goal.color.startsWith('#') ? goal.color : `#${goal.color}` }}
                                >
                                    <span className="buttons-number">{goal.goals}</span>
                                    <p>{getGoalName(goal)}</p>
                                </a>
                            ))}
                            
                            {/* Hidden buttons section */}
                            <div className="hidden-buttons">
                                {goalsData.slice(4).map((goal) => (
                                    <a 
                                        key={goal.id} 
                                        href="#" 
                                        style={{ backgroundColor: goal.color.startsWith('#') ? goal.color : `#${goal.color}` }}
                                    >
                                        <span className="buttons-number">{goal.goals}</span>
                                        <p>{getGoalName(goal)}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <span 
                            className="show-all-text"
                            onClick={() => setShowAllButtons(!showAllButtons)}
                        >
                            {showAllButtons ? 'Show Less' : 'Show All'}
                        </span>
                    </div>

                    <div className="main-news-rubric">
                                <div className="main-news-rubric-logo">
                                    <Image 
                                        src="/content/icon.png"
                                        alt="Logo"
                                        width={50}
                                        height={50}
                                    />
                                    <h1>Axborotlar xizmati</h1>
                                </div>
                                <ul>
                                    <li><Link href={`/${i18n.language}/allnews`}>Yangiliklar</Link></li>
                                  
                                </ul>
                            </div>
                </div>
            </div>
        </main>
    );
}