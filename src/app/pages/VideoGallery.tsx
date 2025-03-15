'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'isomorphic-dompurify';
import NewsRubric from '../components/NewsRubric';
import Pagination from '../components/Pagination';

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
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`https://karsu.uz/api/publications/videos/?page=${currentPage}`);
        const data = await response.json();
        setVideos(data.results.map((video: any) => ({
          id: video.id,
          videoUrl: video.video_url,
          translations: video.translations,
          date_posted: video.date_posted
        })));
        // Calculate total pages based on count
        setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 items per page
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [currentPage, i18n.language]); // Refetch when page or language changes

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

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

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          <NewsRubric/>
        </div>
      </div>
    </main>
  );
};

export default VideoGalleryPage;