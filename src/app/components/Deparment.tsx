'use client'

import { useTranslation } from "react-i18next";
import Head from "next/head";

interface DepartmentProps {
  departmentData: {
    id: number;
    faculty: number;
    translations: {
      [key: string]: {
        name: string;
        slug: string;
        description: string;
      };
    };
  };
}

// Add this type to specify valid field names
type TranslationField = 'name' | 'slug' | 'description';

const Department: React.FC<DepartmentProps> = ({ departmentData }) => {
  const { t, i18n } = useTranslation();

  const getTranslatedContent = (field: TranslationField) => {
    const currentLang = i18n.language || 'en';
    return departmentData.translations[currentLang]?.[field] || departmentData.translations['en'][field];
  };

  const title = getTranslatedContent('name');

  return (
    <div className="department-container">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Department page" />
      </Head>

      <header className="department-header">
        <h1>{title}</h1>
      </header>

      {/* <div className="department-title-center">
        <h2>{title}</h2>
      </div> */}

      <main className="department-content">
        <div dangerouslySetInnerHTML={{ __html: getTranslatedContent('description') }} />
      </main>

      <style jsx>{`
        .department-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        .department-header {
          margin-bottom: 30px;
        }
        
        .department-header h1 {
          color: #003366;
          font-size: 24px;
          font-weight: bold;
          margin: 0;
          padding-bottom: 10px;
          border-bottom: 1px solid #ddd;
          text-transform: uppercase;
        }
        
        .department-title-center {
          text-align: center;
          margin: 40px 0;
        }
        
        .department-title-center h2 {
          font-size: 18px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .department-content {
          line-height: 1.6;
          color: #333;
        }
        
        .department-content p {
          margin-bottom: 20px;
          text-align: justify;
        }
      `}</style>
    </div>
  );
};

export default Department;