"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

interface NewsCategory {
  id: number;
  translations: {
    [key: string]: {
      name: string;
      slug: string;
    };
  };
}

export default function NewsRubric() {
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const { i18n } = useTranslation();
  const router = useRouter();

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
  );
}