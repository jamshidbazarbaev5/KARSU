'use client'
import { t } from 'i18next';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import i18n from '../i18n/config';
import { useRouter } from 'next/navigation';

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
  React.useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('https://debttracker.uz/menus/document/');
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);
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
                      <td data-label="Название документа">{doc.translations.ru.description || doc.translations.en.description}</td>
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

            <div className="news-page-numbers">
              <button className="news-page-numbers-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.9691 5.69757C10.664 5.39248 10.1694 5.39248 9.86427 5.69757L3.61427 11.9476C3.30916 12.2527 3.30916 12.7473 3.61427 13.0524L9.86427 19.3024C10.1694 19.6075 10.664 19.6075 10.9691 19.3024C11.2742 18.9973 11.2742 18.5027 10.9691 18.1976L6.05281 13.2812L20.8333 13.2812C21.2648 13.2812 21.6146 12.9315 21.6146 12.5C21.6146 12.0685 21.2648 11.7187 20.8333 11.7187L6.05281 11.7187L10.9691 6.80242C11.2742 6.49733 11.2742 6.00266 10.9691 5.69757Z" fill="#002B6A"/>
                </svg>
              </button>
              <div className="news-page-numbers-num">
               
                <span className="news-page-dots-span">...</span>
                {[18, 19, 20].map((num) => (
                  <span key={num} className="news-page-numbers-span">
                    {num}
                  </span>
                ))}
              </div>
              <button className="news-page-numbers-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.0309 19.3024C14.336 19.6075 14.8306 19.6075 15.1357 19.3024L21.3857 13.0524C21.6908 12.7473 21.6908 12.2527 21.3857 11.9476L15.1357 5.69761C14.8306 5.3925 14.336 5.3925 14.0309 5.69761C13.7258 6.00271 13.7258 6.49729 14.0309 6.8024L18.9472 11.7188H4.16667C3.7352 11.7188 3.38542 12.0685 3.38542 12.5C3.38542 12.9315 3.7352 13.2813 4.16667 13.2813H18.9472L14.0309 18.1976C13.7258 18.5027 13.7258 18.9973 14.0309 19.3024Z" fill="#002B6A"/>
                </svg>
              </button>
            </div>
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