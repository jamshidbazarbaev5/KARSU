"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/components/Pagination";
import "./drafts.css";

interface DraftItem {
  id: number;
  translations: {
    [key: string]: {
      title: string;
      description: string;
      slug: string;
    };
  };
  translation_links: {
    [key: string]: string;
  };
  draft_files: any[];
}

interface DraftsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DraftItem[];
}

export default function DraftsPage() {
  const { lang } = useParams();
  const { i18n, t } = useTranslation();
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDrafts = async (page: number) => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api';
        const response = await fetch(`${baseUrl}/publications/drafts/?page=${page}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch drafts');
        }
        
        const data: DraftsResponse = await response.json();
        setDrafts(data.results);
        setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 items per page
      } catch (error) {
        console.error('Error fetching drafts:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="news-loading-container">
        <div className="news-loading-spinner"></div>
        <span className="news-loading-text">Loading...</span>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

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
            <span>{t("common.drafts")}</span>
          </nav>
          
          <div className="content">
            <h1>{t("common.drafts")}</h1>
            <div className="drafts-list">
              {drafts.length === 0 ? (
                <p>{t("common.noDrafts")}</p>
              ) : (
                drafts.map((draft) => {
                  const currentTranslation = 
                    draft.translations[lang as keyof typeof draft.translations] ||
                    draft.translations.en ||
                    Object.values(draft.translations)[0];

                  if (!currentTranslation) return null;

                  return (
                    <div key={draft.id} className="draft-item">
                      <h2>
                        <Link href={`/${i18n.language}/drafts/${currentTranslation.slug}`}>
                          {currentTranslation.title}
                        </Link>
                      </h2>
                      <div 
                        className="draft-preview"
                        dangerouslySetInnerHTML={{ 
                          __html: currentTranslation.description.substring(0, 200) + '...'
                        }}
                      />
                    </div>
                  );
                })
              )}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}