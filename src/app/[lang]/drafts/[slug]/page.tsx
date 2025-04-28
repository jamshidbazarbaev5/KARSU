"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import DOMPurify from "dompurify";
import "../drafts.css";

interface DraftTranslation {
  title: string;
  description: string;
  slug: string;
}

interface Draft {
  id: number;
  translations: {
    en?: DraftTranslation;
    ru?: DraftTranslation;
    uz?: DraftTranslation;
    kk?: DraftTranslation;
  };
  translation_links: {
    [key: string]: string;
  };
  draft_files: any[];
}

export default function DraftPage() {
  const { slug, lang } = useParams();
  const { i18n, t } = useTranslation();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Configure DOMPurify to allow iframes from trusted sources
  const purifyConfig = {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src'],
  };
  useEffect(() => {
    const fetchDraft = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api';
        const response = await fetch(`${baseUrl}/publications/drafts/${slug}/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch draft');
        }
        
        const data = await response.json();
        setDraft(data);
      } catch (error) {
        console.error('Error fetching draft:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchDraft();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="news-loading-container">
        <div className="news-loading-spinner"></div>
        <span className="news-loading-text">Loading...</span>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  if (!draft) return <div>{t("common.notFound")}</div>;

  const currentTranslation = draft.translations[lang as keyof typeof draft.translations] 
    || draft.translations.en 
    || Object.values(draft.translations)[0];

  if (!currentTranslation) return <div>{t("common.noTranslation")}</div>;

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
      <main className="menu-content">
        <div className="container">
          <nav className="breadcrumb2" style={{textDecoration:"none",marginLeft:"100px"}}>
            <Link href={`/${i18n.language}`} style={{textDecoration:"none",color:"#333"}}>
              {t("common.home")}
            </Link> •
            
            <span>{currentTranslation.title}</span>
          </nav>
          
          <div className="content" style={{marginLeft:"100px"}}>
            <h1>{currentTranslation.title}</h1>
            <div 
              className="draft-content"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(currentTranslation.description,purifyConfig)
              }}
            />
            {draft.draft_files && draft.draft_files.length > 0 && (
              <div className="draft-files">
                <h3>{t("common.files")}</h3>
                <ul>
                  {draft.draft_files.map((file, index) => {
                    const fileName = file.file.split('/').pop() || 'file';
                    const decodedFileName = decodeURIComponent(fileName);
                    return (
                      <li key={index}>
                        <a href={file.file} target="_blank" rel="noopener noreferrer">
                          {decodedFileName}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}