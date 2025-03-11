'use client'

import { useTranslation } from "react-i18next";
import Head from "next/head";
import AdminInfoBlock from "./AdminInfoBlock";
import React from "react";
import Link from "next/link";

interface AdminData {
  id: number;
  position: number;
  department: number;
  phone_number: string;
  email: string;
  main_image: string;
  translations: {
    [key: string]: {
      full_name: string;
      biography: string;
    };
  };
}

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
  const [adminData, setAdminData] = React.useState<AdminData | null>(null);

  React.useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://debttracker.uz';
        const response = await fetch(`${baseUrl}/menus/admin/`);
        const data = await response.json();
        // Find admin for this department
        const departmentAdmin = data.find((admin: AdminData) => admin.department === departmentData.id);
        setAdminData(departmentAdmin || null);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, [departmentData.id]);

  const getTranslatedContent = (field: TranslationField) => {
    const currentLang = i18n.language || 'en';
    return departmentData.translations[currentLang]?.[field] || departmentData.translations['en'][field];
  };

  const title = getTranslatedContent('name');

  return (
      <>

        <div className="department-container">
          <nav className="breadcrumb">
            <Link href="/">{t("common.home")}</Link> •
            <Link href="">{t("common.otdely")}</Link> •
            <span>{getTranslatedContent("name")}</span>
          </nav>
          <Head>
            <title>{title}</title>
            <meta name="description" content="Department page"/>
          </Head>

          <header className="department-header">
            <h1>{title}</h1>
          </header>

          {/* <div className="department-title-center">
        <h2>{title}</h2>
      </div> */}

          <main className="department-content">
            {adminData && (
                <div className="department-admin-info">
                  <AdminInfoBlock adminData={adminData}/>
                </div>
            )}

            <div dangerouslySetInnerHTML={{__html: getTranslatedContent('description')}}/>
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

            .department-admin-info {
              margin-bottom: 40px;
              padding: 20px;
              background-color: #f5f5f5;
              border-radius: 8px;
            }
          `}</style>
        </div>
      </>


  );
};

export default Department;