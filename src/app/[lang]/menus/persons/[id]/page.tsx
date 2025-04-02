"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { MenuPostCard } from "@/app/components/MenuPost/MenuPostCard";
import "../../../main.css";

interface PersonData {
  id: number;
  translations: {
    [key: string]: {
      full_name: string;
      description: string;
    };
  };
  main_image: string;
  menu: number;
}

export default function PersonPage() {
  const { id, lang } = useParams();
  const [person, setPerson] = useState<PersonData | null>(null);
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  useEffect(() => {
    if (lang && typeof lang === "string") {
      i18n.changeLanguage(lang);
    }

    const fetchPerson = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://karsu.uz/api";
        const response = await fetch(`${baseUrl}/publications/persons/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch person data`);
        }
        const data = await response.json();
        setPerson(data);
      } catch (error) {
        console.error("Error fetching person data:", error);
        setPerson(null);
      }
    };

    if (id) {
      fetchPerson();
    }
  }, [id, lang, i18n]);

  if (!person) {
    return (
      <div className="news-loading-container">
        <div className="news-loading-spinner"></div>
        <span className="news-loading-text">Loading...</span>
      </div>
    );
  }

  // Transform person data to match MenuPost structure
  const transformedPerson = {
    id: person.id,
    main_image: person.main_image,
    translations: {
      en: {
        title: person.translations.en?.full_name || "",
        description: person.translations.en?.description || "",
        slug: `person-${person.id}`,
      },
      ru: {
        title: person.translations.ru?.full_name || "",
        description: person.translations.ru?.description || "",
        slug: `person-${person.id}`,
      },
      uz: {
        title: person.translations.uz?.full_name || "",
        description: person.translations.uz?.description || "",
        slug: `person-${person.id}`,
      },
      kk: {
        title: person.translations.kk?.full_name || "",
        description: person.translations.kk?.description || "",
        slug: `person-${person.id}`,
      },
    },
    menu: person.menu,
    date_posted: new Date().toISOString(),
    views_count: 0,
    images: [],
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
      <MenuPostCard post={transformedPerson} isSinglePost={true} isPerson={true} />
    </>
  );
}