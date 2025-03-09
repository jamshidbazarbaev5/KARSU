'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'isomorphic-dompurify';
import NewsRubric from '../components/NewsRubric';

interface VideoItem {
  id: number;
  videoUrl: string;
  translations: {
    [key: string]: {
      title: string;
      description?: string;
    };
  };
  date_posted: string;
}

const VideoCard = ({ videoUrl, translations, date_posted }: VideoItem) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const title = translations[currentLang]?.title || translations['en']?.title || '';
  const dateObj = new Date(date_posted);

  return (
    <div className="main-video-block-card">
      <div className="main-block-card-video">
        <iframe
          width="350"
          height="200"
          className="swiper-slide iframe"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="main-block-card-info">
        <div className="main-block-card-info-title">
          <h6>{title}</h6>
        </div>
        <div className="main-block-card-info-date">
          <span className="day">{dateObj.getDate()}</span>
          <span className="month">{dateObj.toLocaleString('default', { month: 'long' })}</span>
          <span className="month">{dateObj.getFullYear()}</span>
        </div>
      </div>
    </div>
  );
};

const VideoGalleryPage = () => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const totalPages = 20;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://debttracker.uz/publications/videos/');
        const data = await response.json();
        setVideos(data.map((video: any) => ({
          id: video.id,
          videoUrl: video.video_url,
          translations: video.translations,
          date_posted: video.date_posted
        })));
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [i18n.language]); // Refetch when language changes

  const getTranslatedContent = (field: 'title' | 'description') => {
    const currentVideo = videos[0];
    if (!currentVideo) return '';
    
    return field === 'description' 
      ? DOMPurify.sanitize(currentVideo.translations[i18n.language]?.[field] || currentVideo.translations['en']?.[field] || '')
      : currentVideo.translations[i18n.language]?.[field] || currentVideo.translations['en']?.[field] || '';
  };
  
  return (
    <main className="main">
      <div className="container">
        <div className="main-news-pages">
                    <a href={`/${i18n.language}`}>{t('common.home', )}</a>
                    <a href={`/${i18n.language}/videos`}>{t('common.videos', )}</a>
                    {/* <a href="#">{getTranslatedContent('title')}</a> */}
        </div>
        
        <div className="main-video">
          <div className="main-video-small">
            <div className="main-video-title">
              <span className="main-video-title-span">Video galereya</span>
            </div>
            
            <div className="main-video-block">
              {videos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>

            <div className="news-page-numbers">
              <div 
                className="news-page-numbers-left"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.9691 5.69757C10.664 5.39248 10.1694 5.39248 9.86427 5.69757L3.61427 11.9476C3.30916 12.2527 3.30916 12.7473 3.61427 13.0524L9.86427 19.3024C10.1694 19.6075 10.664 19.6075 10.9691 19.3024C11.2742 18.9973 11.2742 18.5027 10.9691 18.1976L6.05281 13.2812L20.8333 13.2812C21.2648 13.2812 21.6146 12.9315 21.6146 12.5C21.6146 12.0685 21.2648 11.7187 20.8333 11.7187L6.05281 11.7187L10.9691 6.80242C11.2742 6.49733 11.2742 6.00266 10.9691 5.69757Z" fill="#002B6A"/>
                </svg>
              </div>
              
            
              
              <div 
                className="news-page-numbers-right"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.0309 19.3024C14.336 19.6075 14.8306 19.6075 15.1357 19.3024L21.3857 13.0524C21.6908 12.7473 21.6908 12.2527 21.3857 11.9476L15.1357 5.69761C14.8306 5.3925 14.336 5.3925 14.0309 5.69761C13.7258 6.00271 13.7258 6.49729 14.0309 6.8024L18.9472 11.7188H4.16667C3.7352 11.7188 3.38542 12.0685 3.38542 12.5C3.38542 12.9315 3.7352 13.2813 4.16667 13.2813H18.9472L14.0309 18.1976C13.7258 18.5027 13.7258 18.9973 14.0309 19.3024Z" fill="#002B6A"/>
                </svg>
              </div>
            </div>
          </div>

          <NewsRubric/>
        </div>
      </div>
    </main>
  );
};

export default VideoGalleryPage;