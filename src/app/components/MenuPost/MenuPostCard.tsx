'use client'
import { MenuPost } from '@/app/types/menu';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { useRouter } from 'next/navigation';
import NewsRubric from '../NewsRubric';
import Slider, { Settings } from "react-slick";
import { useRef, useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface MenuPostCardProps {
    post: MenuPost;
    isSinglePost: boolean;
}

export const MenuPostCard = ({ post, isSinglePost }: MenuPostCardProps) => {
    const { i18n, t } = useTranslation();
    const router = useRouter();
    const [nav1, setNav1] = useState<Slider | null>(null);
    const [nav2, setNav2] = useState<Slider | null>(null);
    const slider1 = useRef<Slider | null>(null);
    const slider2 = useRef<Slider | null>(null);
    const translation = post.translations[i18n.language as keyof typeof post.translations] || post.translations.en;

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

    const handleClick = () => {
        if (!isSinglePost) {
            router.push(`/${i18n.language}/menus/main/posts/${translation.slug}`);
        }
    };

    const sliderImages = post.images ? [
        { src: post.main_image, alt: translation.title },
        ...post.images.map((imgUrl, index) => ({
            src: imgUrl,
            alt: `${translation.title} - ${index + 1}`
        }))
    ] : [];

    if (isSinglePost) {
        return (
            <main className="main">
                <div className="container">
                    <div className="main-news-pages">
                        <Link href={`/${i18n.language}`}>{t('common.home')}</Link>
                        <Link href={`/${i18n.language}/menus`}>{t('common.menus')}</Link>
                        <span>{translation.title}</span>
                    </div>
                    <div className="main-news">
                        <div className="main-news-block">
                            <div className="main-news-block-title">
                                <h1>{translation.title}</h1>
                            </div>
                            
                            <div className="main-news-block-date">
                                <div>
                                    <span className="date-day">
                                        {new Date(post.date_posted).getDate()}
                                    </span>
                                    <span className="date-month">
                                        {new Date(post.date_posted).toLocaleString(i18n.language, { month: 'long' })}
                                    </span>
                                    <span className="date-year">
                                        {new Date(post.date_posted).getFullYear()}
                                    </span>
                                </div>
                            </div>

                            {/* Main Image */}
                            <div className="main-news-block-photo">
                                <Image 
                                    src={post.main_image}
                                    alt={translation.title}
                                    width={800}
                                    height={400}
                                    priority
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>

                            {/* Description Text */}
                            <div 
                                className="main-news-block-text"
                                dangerouslySetInnerHTML={{ 
                                    __html: DOMPurify.sanitize(translation.description)
                                }}
                            />

                            {/* Additional Images Slider */}
                            {post.images && post.images.length > 0 && (
                                <div className="main-news-block-slider" style={{ position: "relative", zIndex: 1 }}>
                                   
                                    <Slider {...mainSettings} ref={slider1} className="main-block-slider-for">
                                        {post.images.map((imgUrl, index) => (
                                            <div key={index} className="slide">
                                                <div className="slide-image-wrapper">
                                                    <Image
                                                        src={imgUrl}
                                                        alt={`${translation.title} - ${index + 1}`}
                                                        fill
                                                        sizes="(max-width: 800px) 100vw, 800px"
                                                        className="slider-image"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>

                                    {post.images.length > 1 && (
                                        <Slider {...thumbnailSettings} ref={slider2} className="thumbnail-slider">
                                            {post.images.map((imgUrl, index) => (
                                                <div key={index} className="thumbnail">
                                                    <div className="thumbnail-image-wrapper">
                                                        <Image
                                                            src={imgUrl}
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
                        </div>
                        <NewsRubric/>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <div 
            className={`menu-post-card ${!isSinglePost ? 'clickable' : ''}`} 
            onClick={handleClick}
        >
            <div className="menu-post-image">
                <Image 
                    src={post.main_image} 
                    alt={translation.title}
                    width={400}
                    height={300}
                    objectFit="cover"
                />
            </div>
            <div className="menu-post-content">
                <h2 className="truncate-text">{translation.title}</h2>
                {isSinglePost ? (
                    <div className="post-description" 
                         dangerouslySetInnerHTML={{ 
                             __html: DOMPurify.sanitize(translation.description) 
                         }} 
                    />
                ) : (
                    <div className="menu-post-date">
                        {new Date(post.date_posted).toLocaleDateString()}
                    </div>
                )}
            </div>
        </div>
    );
};