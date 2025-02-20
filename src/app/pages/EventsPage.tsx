'use client';

import { useState } from 'react';

interface EventCardProps {
  title: string;
  info: string;
  date: string;
  link: string;
}

const EventCard = ({ title, info, date, link }: EventCardProps) => {
  return (
    <div className="main-event-card">
      <div className="main-event-top">
        <div className="main-event-title">
          <a href={link} className="main-event-title-link">
            {title}
          </a>
        </div>
        <div className="main-event-info">
          <span className="main-event-info-span">
            {info}
          </span>
        
        </div>
      </div>
      <div className="main-event-date">
        <span className="main-event-date-span">
          {date}
        </span>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    // for (let i = 1; i <= totalPages; i++) {
    //   if (
    //     i === 1 ||
    //     i === totalPages ||
    //     (i >= currentPage - 1 && i <= currentPage + 1)
    //   ) {
    //     pages.push(
    //       <span
    //         key={i}
    //         className={`news-page-numbers-span ${currentPage === i ? 'actived' : ''}`}
    //         onClick={() => onPageChange(i)}
    //       >
    //         {i}
    //       </span>
    //     );
    //   } else if (i === currentPage - 2 || i === currentPage + 2) {
    //     pages.push(
    //       <span key={i} className="news-page-dots-span">...</span>
    //     );
    //   }
    // }
    // return pages;
  };

  return (
    <div className="news-page-numbers">
      <div 
        className="news-page-numbers-left"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.9691 5.69757C10.664 5.39248 10.1694 5.39248 9.86427 5.69757L3.61427 11.9476C3.30916 12.2527 3.30916 12.7473 3.61427 13.0524L9.86427 19.3024C10.1694 19.6075 10.664 19.6075 10.9691 19.3024C11.2742 18.9973 11.2742 18.5027 10.9691 18.1976L6.05281 13.2812L20.8333 13.2812C21.2648 13.2812 21.6146 12.9315 21.6146 12.5C21.6146 12.0685 21.2648 11.7187 20.8333 11.7187L6.05281 11.7187L10.9691 6.80242C11.2742 6.49733 11.2742 6.00266 10.9691 5.69757Z" fill="#002B6A"/>
        </svg>
      </div>
      {/* <div className="news-page-numbers-num">
        {renderPageNumbers()}
      </div> */}
      <div 
        className="news-page-numbers-right"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M14.0309 19.3024C14.336 19.6075 14.8306 19.6075 15.1357 19.3024L21.3857 13.0524C21.6908 12.7473 21.6908 12.2527 21.3857 11.9476L15.1357 5.69761C14.8306 5.3925 14.336 5.3925 14.0309 5.69761C13.7258 6.00271 13.7258 6.49729 14.0309 6.8024L18.9472 11.7188H4.16667C3.7352 11.7188 3.38542 12.0685 3.38542 12.5C3.38542 12.9315 3.7352 13.2813 4.16667 13.2813H18.9472L14.0309 18.1976C13.7258 18.5027 13.7258 18.9973 14.0309 19.3024Z" fill="#002B6A"/>
        </svg>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock data - replace with your actual data
  const events = Array(6).fill({
    title: "ВНИМАНИЕ!!! ВНИМАНИЕ!!! СРОЧНО!!!!",
    info: "Каракалпакский государственный университет проводит набор абитуриентов для обучения в Уфимском университете науки и технологий на бюджетной основе...",
    date: "29.07.2024",
    link: "#"
  });

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
            {events.map((event, index) => (
              <EventCard
                key={index}
                {...event}
              />
            ))}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={20}
        onPageChange={setCurrentPage}
      />
    </main>
  );
};

export default EventsPage;