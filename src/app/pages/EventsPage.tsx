'use client';

import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';

interface Event {
  id: number;
  date_post: string;
  translations: {
    [key: string]: {
      title: string;
      description: string;
      slug: string;
    }
  }
}

const EventCard = ({ title, description, date, slug }: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) => {
  return (
    <div className="main-event-card">
      <div className="main-event-top">
        <div className="main-event-title">
          <a href={`/${i18n.language}/event/${slug}`} className="main-event-title-link">
            {title}
          </a>
        </div>
        <div className="main-event-info">
          <span className="main-event-info-span" 
            dangerouslySetInnerHTML={{ __html: description }} 
          />
        </div>
      </div>
      <div className="main-event-date">
        <span className="main-event-date-span">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};


const EventsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const { i18n } = useTranslation();
  const itemsPerPage = 6;

  useEffect(() => {
    // Reset to first page when language changes
    setCurrentPage(1);
  }, [i18n.language]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://debttracker.uz/announcements/?page=${currentPage}`);
        const data = await response.json();
        setEvents(data.results);
        setTotalPages(Math.ceil(data.count / itemsPerPage));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage, i18n.language, itemsPerPage]);

  return (
    <main className="main">
      <div className="main-events-page">
        <div className="main-events-page-small">
          <div className="events-page-title-menu-div">
            <div className="events-page-title">
              <span className="events-page-title-span">СОБЫТИЯ</span>
            </div>
          </div>

          <div className="main-events-all-cards-div">
            {loading ? (
              <div className="loading-spinner-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading...</p>
              </div>
            ) : (
              events.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.translations[i18n.language].title}
                  description={event.translations[i18n.language].description}
                  date={event.date_post}
                  slug={event.translations[i18n.language].slug}
                />
              ))
            )}
          </div>

          {!loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default EventsPage;