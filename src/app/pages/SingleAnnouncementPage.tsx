"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { t } from "i18next";

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
          `https://karsu.uz/api/announcements/${slug}/`
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
    return translations?.[language]?.[field] || null;
  };

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return encodeURIComponent(window.location.href);
    }
    return '';
  };

  const getSocialShareUrls = () => {
    const url = getShareUrl();
    const title = encodeURIComponent(getTranslatedText(
      announcement?.translations,
      i18n.language,
      "title"
    ));
    
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
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
      <div className="main-news-pages">
        <a href={`/${i18n.language}`}>{t("common.home")}</a>
        <a href={`/${i18n.language}/events`}>{t("common.events")}</a>
        {getTranslatedText(announcement?.translations, i18n.language, "title") && (
          <a href="#">
            {getTranslatedText(announcement?.translations, i18n.language, "title")}
          </a>
        )}
      </div>
      <main className="main-2">
        <div className="all-events-page-link-div-2">
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
          <Link href="/" className="all-events-page-link-2">
            {t('common.backToHome')}
          </Link>
        </div>

        {announcement && getTranslatedText(announcement.translations, i18n.language, "title") && (
          <div className="main-event-page-2">
            <div className="main-event-card-2">
              <div className="main-event-title-2">
                <a href="#" className="main-event-title-link-2">
                  {getTranslatedText(announcement.translations, i18n.language, "title")}
                </a>
              </div>
              {getTranslatedText(announcement.translations, i18n.language, "description") && (
                <div className="main-event-info-2">
                  <span
                    className="main-event-info-span-2"
                    dangerouslySetInnerHTML={{
                      __html: getTranslatedText(
                        announcement.translations,
                        i18n.language,
                        "description"
                      )!
                    }}
                  />
                </div>
              )}
              <div className="main-news-block-social">
                <div className="faculty-block-text-social" style={{ padding: "10px" }}>
                  <a 
                    href={getSocialShareUrls().facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "10px" }}
                  >
                    <i className="fa-brands fa-square-facebook"></i>
                  </a>
                  <a 
                    href={`https://t.me/share/url?url=${getShareUrl()}&text=${encodeURIComponent(getTranslatedText(
                      announcement.translations,
                      i18n.language,
                      "title"
                    ))}`}
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
              <div className="main-event-date">
                <span className="main-event-date-span-2">
                  {new Date(announcement.date_post).toLocaleDateString(
                    'en-GB',
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  ).split('/').reverse().join('.')}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
