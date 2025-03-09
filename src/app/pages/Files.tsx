'use client'
import { t } from 'i18next';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import i18n from '../i18n/config';
import { useRouter } from 'next/navigation';
import Pagination from '../components/Pagination';

interface DocumentItem {
  id: number;
  menu: number;
  footer_menu: null;
  file: string;
  date_post: string;
  translations: {
    en: {
      title: string;
      description: string;
    };
    ru: {
      title: string | null;
      description: string;
    };
  };
}interface NewsCategory {
  id: number;
  translations: {
    [key: string]: {
      name: string;
      slug: string;
    };
  };
}


const Files = () => {
  const router = useRouter();
  const [documents, setDocuments] = React.useState<DocumentItem[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  React.useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`https://debttracker.uz/menus/document/?page=${currentPage}&page_size=${itemsPerPage}`);
        const data = await response.json();
        setDocuments(data.results);
        setTotalPages(Math.ceil(data.count / itemsPerPage));
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, [currentPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://debttracker.uz/news/category/');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryName = (category: NewsCategory) => {
    return category.translations[i18n.language]?.name || category.translations["en"]?.name || "";
  };


  const handleCategoryClick = (slug: string) => {
    router.push(`/${i18n.language}/allnews/${slug}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
     <div className="navi-file">
      <div className="container">
        <div className="navi-file-title">
          <span className="nav-file-title-span">{t('sections.file')}</span>
        </div>

        <div className="navi-flex">
          <div className="navi-flex-pagination">
            <div className="navi-file-all">
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Тип документа / кем выдан</th>
                    <th>Дата</th>
                    <th>Название документа</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td data-label="№">{doc.id}</td>
                      <td data-label="Тип документа / кем выдан">{doc.translations.ru.title || doc.translations.en.title}</td>
                      <td data-label="Дата">{new Date(doc.date_post).toLocaleDateString()}</td>
                      <td data-label="Название документа" dangerouslySetInnerHTML={{__html:doc.translations.ru.description || doc.translations.en.description}}></td>
                      <td data-label="Скачать">
                        <a href={doc.file} download>
                          <i className="fa-solid fa-download"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          <div className="main-news-rubric">
            <div className="main-news-rubric-logo">
              <img src="/content/icon.png" alt="" />
              <h1>Axborotlar xizmati</h1>
            </div>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(category.translations[i18n.language]?.slug || '');
                    }}
                  >
                    {getCategoryName(category)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default Files;