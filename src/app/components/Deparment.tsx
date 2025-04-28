'use client'

import { useTranslation } from "react-i18next";
import Head from "next/head";
import AdminInfoBlock from "./AdminInfoBlock";
import React from "react";
import Link from "next/link";
import { ChevronDown, Mail, Phone } from "lucide-react";
import './page.css'
interface AdminData {
  id: number;
  position: number;
  department?: number;
  agency?: number;
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

interface TeacherData {
  id: number;
  translations: {
    [key: string]: {
      full_name: string;
      position: string;
      description: string;
    };
  };
  main_image: string;
  phone_number: string;
  email: string;
  faculty_department: number;
}

interface DepartmentProps {
  departmentData: {
    id: number;
    faculty: number;
    type: 'department' | 'agency';
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

// Add this helper function
const fetchAdminPage = async (page: number) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api';
    const response = await fetch(`${baseUrl}/menus/admin/?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching admin data page ${page}:`, error);
    return null;
  }
};

// Add this helper function
const fetchTeachers = async (departmentSlug: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api';
    let allTeachers: any = [];
    let page = 1;

    while (true) {
      const response = await fetch(`${baseUrl}/menus/department/${departmentSlug}/teachers?page=${page}`);
      const data = await response.json();

      if (!data.results || data.results.length === 0) break;
      
      allTeachers = [...allTeachers, ...data.results];

      // Break if there are no more pages
      if (!data.next) break;
      page++;
    }

    return allTeachers;
  } catch (error) {
    console.error('Error fetching teachers data:', error);
    return [];
  }
};

const Department: React.FC<DepartmentProps> = ({ departmentData }) => {
  const { t, i18n } = useTranslation();
  const [adminData, setAdminData] = React.useState<AdminData | null>(null);
  const [teachers, setTeachers] = React.useState<TeacherData[]>([]);
  const [isOpen, setIsOpen] = React.useState<{[key: number]: boolean}>({});

  const getBreadcrumbPath = () => {
    const slug = departmentData.translations[i18n.language]?.slug || '';
    const isKafedra = slug.toLowerCase().includes('kafedra');
    
    return {
      path: isKafedra ? 'faculties' : 'menus/main/otdely',
      text: isKafedra ? t("common.faculties") : t("common.departments")
    };
  };

  React.useEffect(() => {
    const fetchAdminData = async () => {
      try {
        let allAdminData: AdminData[] = [];
        let page = 1;
        
        // Keep fetching pages until we run out of pages
        while (true) {
          const adminPageData = await fetchAdminPage(page);
          if (!adminPageData || !adminPageData.results.length) break;
          
          allAdminData = [...allAdminData, ...adminPageData.results];
          
          // Break if there are no more pages
          if (!adminPageData.next) break;
          page++;
        }
        
        const relevantAdmin = allAdminData.find((admin: AdminData) => {
          // Check if admin is for the correct department/agency
          const isRelevant = departmentData.type === 'department' 
            ? admin.department === departmentData.id
            : admin.agency === departmentData.id;

          // Check if ALL required translation fields exist and are non-empty
          const hasCompleteTranslation = admin.translations[i18n.language] && 
            admin.translations[i18n.language].full_name?.trim() !== '' &&
            admin.translations[i18n.language].biography?.trim() !== '';

          return isRelevant && hasCompleteTranslation;
        });
        
        setAdminData(relevantAdmin || null);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    const fetchTeachersData = async () => {
      try {
        const teachersData = await fetchTeachers(departmentData.translations[i18n.language]?.slug || '');
        const departmentTeachers = teachersData.filter(
          (teacher: TeacherData) => {
            // Only include teachers with translations in current language
            return teacher.faculty_department === departmentData.id && 
                   teacher.translations[i18n.language] &&
                   teacher.translations[i18n.language].full_name?.trim() !== '' &&
                   teacher.translations[i18n.language].position?.trim() !== '' &&
                   teacher.translations[i18n.language].description?.trim() !== '';
          }
        );
        
        setTeachers(departmentTeachers);
        
        // Initialize isOpen state for each teacher
        const openState: {[key: number]: boolean} = {};
        departmentTeachers.forEach((teacher: TeacherData) => {
          openState[teacher.id] = false;
        });
        setIsOpen(openState);
      } catch (error) {
        console.error('Error fetching teachers data:', error);
      }
    };

    fetchAdminData();
    fetchTeachersData();
  }, [departmentData.id, departmentData.type, i18n.language]);

  // Check if ALL required translation fields exist and are non-empty for department
  const hasCompleteTranslation = departmentData.translations[i18n.language] &&
    departmentData.translations[i18n.language].name?.trim() !== '' &&
    departmentData.translations[i18n.language].slug?.trim() !== '' &&
    departmentData.translations[i18n.language].description?.trim() !== '';

  if (!hasCompleteTranslation) {
    return null; // Don't render anything if translation is incomplete
  }

  const getTranslatedContent = (field: TranslationField) => {
    return departmentData.translations[i18n.language][field] || '';
  };

  const title = getTranslatedContent('name');

  return (
    <>
      <div className="department-container">
        <nav className="breadcrumb">
          <Link href={`/${i18n.language}`}>{t("common.home")}</Link> •
          <Link href={`/${i18n.language}/${getBreadcrumbPath().path}`}>
            {getBreadcrumbPath().text}
          </Link> •
          <span>{title}</span>
        </nav>
        
        <Head>
          <title>{title}</title>
          <meta name="description" content={`${title} page`}/>
        </Head>

        <header className="department-header">
          <h1>{title}</h1>
        </header>

        <main className="department-content">
          {adminData && adminData.translations[i18n.language] && (
            <div className="department-admin-info">
              <AdminInfoBlock adminData={adminData}/>
            </div>
          )}

          <div 
            className="department-description"
            dangerouslySetInnerHTML={{__html: getTranslatedContent('description')}}
          />
          
          {departmentData.type === 'department' && teachers.length > 0 && (
            <div className="department-teachers">
              <h2 className="teachers-title" style={{margin:'0 auto',display:"flex", alignItems:"center",justifyContent:"center"}}>{t("common.teachers")}</h2>
              {teachers.map((teacher) => (
                <div key={teacher.id} className="profile-container">
                  <div className="profile-card">
                    <img 
                      src={teacher.main_image} 
                      alt={teacher.translations[i18n.language]?.full_name || ''} 
                      className="profile-image" 
                    />
                    <div className="profile-content">
                      <h1 className="profile-name">
                        {teacher.translations[i18n.language]?.full_name || ''}
                      </h1>
                      <h2 className="profile-title">
                        {teacher.translations[i18n.language]?.position || ''}
                      </h2>
                      
                      <div 
                        onClick={() => setIsOpen({...isOpen, [teacher.id]: !isOpen[teacher.id]})} 
                        className="description-header"
                      >
                        <ChevronDown className={`arrow ${isOpen[teacher.id] ? 'open' : ''}`} size={20} />
                        <h3>{t("common.description")}</h3>
                      </div>
                      
                      <div className={`description-content ${isOpen[teacher.id] ? 'open' : ''}`}>
                        <div 
                          className="description-text"
                          dangerouslySetInnerHTML={{
                            __html: teacher.translations[i18n.language]?.description || ''
                          }}
                        />
                      </div>

                      <div className="contact-info">
                        {teacher.email && (
                          <a href={`mailto:${teacher.email}`} className="contact-item">
                            <Mail size={18} />
                            {teacher.email}
                          </a>
                        )}
                        {teacher.phone_number && (
                          <a href={`tel:${teacher.phone_number}`} className="contact-item">
                            <Phone size={18} />
                            {teacher.phone_number}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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

          /* Add TinyMCE specific styles */
          .department-description :global([style]) {
            all: revert;
            font-family: inherit;
          }

          .department-description :global(p[style*="text-align"]) {
            text-align: unset !important;
          }

          .department-description :global(p[dir]) {
            direction: unset !important;
          }

          .department-description :global(p[style*="padding"]),
          .department-description :global(p[style*="margin"]) {
            padding: unset !important;
            margin: unset !important;
          }

          .department-description :global(p) {
            margin-bottom: 1em;
            line-height: 1.6;
          }

          .department-teachers {
            margin-top: 40px;
          }
          
          .teachers-title {
            color: #003366;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            text-transform: uppercase;
          }
        `}</style>
      </div>
    </>
  );
};

export default Department;