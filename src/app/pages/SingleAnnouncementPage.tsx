"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Image from "next/image";

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

export default function SingleAnnouncementPage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get(
          `https://debttracker.uz/announcements/${slug}/`
        );
        setAnnouncement(response.data);
      } catch (error) {
        console.error("Error fetching announcement:", error);
      }
    };

    if (slug) {
      fetchAnnouncement();
    }
  }, [slug, i18n.language]);

  const getTranslatedText = (
    translations: any,
    language: string,
    field: string
  ) => {
    return translations?.[language]?.[field] || "No translation available";
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
              КАРАКАЛПАКСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ
            </a>
          </div>
        </div>
      </div>
      <main className="main">
        <div className="all-events-page-link-div">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1629 6.83708C12.7968 6.47097 12.2033 6.47097 11.8371 6.83708L4.33713 14.3371C3.971 14.7032 3.971 15.2967 4.33713 15.6629L11.8371 23.1629C12.2033 23.529 12.7968 23.529 13.1629 23.1629C13.529 22.7967 13.529 22.2032 13.1629 21.8371L7.26338 15.9375L25 15.9375C25.5178 15.9375 25.9375 15.5177 25.9375 15C25.9375 14.4822 25.5178 14.0625 25 14.0625L7.26338 14.0625L13.1629 8.16291C13.529 7.7968 13.529 7.2032 13.1629 6.83708Z"
              fill="#002B6A"
            />
          </svg>
          <Link href="/" className="all-events-page-link">
            Back to Home
          </Link>
        </div>

        {announcement && (
          <div className="main-event-page">
            <div className="main-event-card">
              <div className="main-event-title">
                <h1 className="main-event-title-link">
                  {getTranslatedText(
                    announcement.translations,
                    i18n.language,
                    "title"
                  )}
                </h1>
              </div>
              <div className="main-event-info">
                <div
                  className="main-event-info-span"
                  dangerouslySetInnerHTML={{
                    __html: getTranslatedText(
                      announcement.translations,
                      i18n.language,
                      "description"
                    ),
                  }}
                />
              </div>
              <div className="main-event-date">
                <span className="main-event-date-span">
                  {new Date(announcement.date_post).toLocaleDateString(
                    i18n.language,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
