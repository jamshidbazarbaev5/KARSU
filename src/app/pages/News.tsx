"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function News() {
    const [nav1, setNav1] = useState<Slider | null>(null);
    const [nav2, setNav2] = useState<Slider | null>(null);
    const [showAllButtons, setShowAllButtons] = useState(false);
    const slider1 = useRef<Slider | null>(null);
    const slider2 = useRef<Slider | null>(null);

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);

    const mainSettings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: nav2 || undefined,
        fade: true,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
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
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    return (
        <main className="main">
            <div className="container">
                <div className="main-news-pages">
                    <Link href="#">Asosiy</Link>
                    <Link href="#">Barqaror rivojlanish Maqsadlari</Link>
                    <Link href="#">Barqaror rivojlanish Maqsadlari</Link>
                    <Link href="#">Asosiy</Link>
                </div>
                <div className="main-news">
                    <div className="main-news-block">
                        <div className="main-news-block-title">
                            <h1>TDIU bilan Rossiyaning MMFI qo'shma ta'lim dasturiga magistratura uchun imtihon bo'lib o'tmoqda</h1>
                        </div>
                        
                        {/* Date and Views Section */}
                        <div className="main-news-block-date">
                            <div>
                                {/* SVG Calendar Icon */}
                                <span className="date-day">22</span>
                                <span className="date-month">Sentabr</span>
                                <span className="date-year">2024</span>
                            </div>
                            <div className="main-news-block-views">
                                {/* SVG Eye Icon */}
                                <span className="view-number">777</span>
                            </div>
                        </div>

                        <div className="main-news-block-photo">
                            <Image 
                                src="/eab7b06f-a168-41a4-9491-9ad8c2df0299.jpg"
                                alt="News Image"
                                width={800}
                                height={400}
                            />
                        </div>

                        <div className="main-news-block-text">
                            Toshkent davlat iqtisodiyot universitetida Rossiyaning MMFI instituti bilan hamkorlikda qo’shma ta’lim dasturi magistratura bosqichi uchun kirish imtihonlarini o’tkazmoqda. Imtihon belgilangan tartibda - yozma va suhbat asosida bo’lib o’tmoqda. Jarayonda Rossiya milliy tadqiqotlar yadro universiteti moliyaviy texnologiyalar va iqtisodiy xavfsizlik xalqaro hamkorlik bo‘limi boshlig‘i, moliyaviy monitoring kafedrasi dotsenti Morozov Nikolay Vladimirovich, MMFI koordinatori, Moliyaviy texnologiyalar va iqtisodiy xavfsizlik instituti xalqaro hamkorlik bo‘limi xodimi Kazakova Yelizaveta Gennadyevna hamda Moliyaviy monitoring kafedrasi dotsenti Lenov Pavel Yuryevichlar qatnashishdi. Sinovdan muvaffaqiyatli o’tganlar qo‘shma ta’lim dasturi doirasida 1+1 tizimida Toshkent davlat iqtisodiyot universitetida va Rossiyadagi MMFI institutida tahsil olish imkonini qo‘lga kiritadilar. Eslatib o‘tamiz, Rossiyaning MMFI instituti “QS World University Rankings-2024” reytingida TOP-500 universitetlar ro‘yxatiga kiritilgan. Aldın xabar bergenimizdey, usı jıldıń 12-sentyabr kúni Ózbekstan Respublikası Prezidentiniń 2024-jıl 1-apreldegi «Dóretiwshilik mektepleriniń jumısın bunnan bılay da jetilistiriw ilajları haqqında»ǵı PQ-147-sanlı qararına tiykar Berdaq atındaǵı Qaraqalpaq mámleketlik universiteti tárepinen paytaxtımızdaǵı Ibrayım Yusupov atındaǵı dóretiwshilik mektebinde «Ajiniyaz shıǵarmaları bilimdanı» atamasında 9-10-11-klass oqıwshıları arasında Qaraqalpaq tili hám ádebiyatı pán olimpiadası ótkerilgen edi.
                        </div>

                        <div className="main-news-block-slider">
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
                        </div>

                        <div className="main-news-block-social">
                            {/* Social media links */}
                        </div>

                        <div className="main-news-block-buttons">
                            {/* Visible buttons */}
                            {/* Hidden buttons section */}
                            <div className={`hidden-buttons ${showAllButtons ? 'show' : ''}`}>
                                {/* Button content */}
                            </div>
                        </div>
                        <button 
                            className="show-all-text"
                            onClick={() => setShowAllButtons(!showAllButtons)}
                        >
                            {showAllButtons ? 'Show Less' : 'Show All'}
                        </button>
                    </div>

                    <div className="main-news-rubric">
                        <div className="main-news-rubric-logo">
                            <Image 
                                src="/mainpage/content/icon.png"
                                alt="Logo"
                                width={50}
                                height={50}
                            />
                            <h1>Axborotlar xizmati</h1>
                        </div>
                        <ul>
                            <li><Link href="#">Yangiliklar</Link></li>
                            <li><Link href="#">Events</Link></li>
                            <li><Link href="#">Lorem</Link></li>
                            <li className="last"><Link href="#">ipsum</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

const sliderImages = [
    { src: "/karsu6.jpeg", alt: "Slide 1" },
    { src: "/karsu2.jpeg", alt: "Slide 2" },
    { src: "/karsuu.jpeg", alt: "Slide 3" },
    // Add other slider images here
];