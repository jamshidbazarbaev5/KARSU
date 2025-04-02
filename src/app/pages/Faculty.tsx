import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import DOMPurify from 'dompurify';
import { useState, useEffect } from "react";
import AdminInfoBlock from "../components/AdminInfoBlock";
// Add this type to specify valid field names
type TranslationField = 'name' | 'slug' | 'description' | 'history_of_faculty';

interface FacultyProps {
  facultyData: {
    id: number;
    email: string;
    logo: string;
    phone?: string;
    dean?: {
      name: string;
      title: string;
    };
    departments?: Array<{
      id: number;
      faculty: number;
      translations: {
        [key: string]: {
          name: string;
          slug: string;
          description: string;
        };
      };
    }>;
    translations: {
      [key: string]: {
        name: string;
        slug: string;
        description: string;
        history_of_faculty: string;
      };
    };
  };
}

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

const Faculty: React.FC<FacultyProps> = ({ facultyData }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [adminData, setAdminData] = useState<any>(null);
  const currentLang = i18n.language;

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        let allAdminData: any[] = [];
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
        
        const matchingAdmin = allAdminData.find((admin: any) => admin.faculty === facultyData.id);
        if (matchingAdmin) {
          setAdminData(matchingAdmin);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    if (facultyData.id) {
      fetchAdminData();
    }
  }, [facultyData.id]);

  const getTranslatedContent = (field: TranslationField) => {
    return facultyData.translations[currentLang]?.[field] || 
           facultyData.translations['en']?.[field] || '';
  };

  const facultyContent = facultyData.translations[currentLang] || facultyData.translations['en'];

  // Add debugging logs
  console.log('Current Faculty ID:', facultyData.id);
  console.log('All Departments:', facultyData.departments);
  
  // Make sure we're filtering correctly
  const facultyDepartments = facultyData.departments?.filter(dept => {
    console.log(`Checking department ${dept.id}: faculty=${dept.faculty}, matches=${dept.faculty === facultyData.id}`);
    return dept.faculty === facultyData.id;
  });
  
  console.log('Filtered Departments:', facultyDepartments);

  return (
    <main className="faculty">
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">{t("common.home")}</Link> •
          <Link href={`/${i18n.language}/faculties`}>{t("common.faculties")}</Link> •
          <span>{getTranslatedContent("name")}</span>
        </nav>

        {getTranslatedContent("name") && (
          <div className="faculty-logo">
            <h1>{getTranslatedContent("name")}</h1>
          </div>
        )}
        
        {adminData ? (
          <AdminInfoBlock
            adminData={adminData}
            email={facultyData.email}
            description={null}
          >
            {/* Departments list first */}
            {facultyDepartments && facultyDepartments.length > 0 && (
              <div className="faculty-block-text-links">
                <ul>
                  {facultyDepartments.map((dept) => {
                    const deptName = dept.translations[currentLang]?.name || dept.translations['en']?.name;
                    const deptSlug = dept.translations[currentLang]?.slug || dept.translations['en']?.slug;
                    
                    return deptName && deptSlug ? (
                      <li key={dept.id}>
                        <Link href={`/${i18n.language}/department/${deptSlug}`}>
                          <span dangerouslySetInnerHTML={{ 
                            __html: DOMPurify.sanitize(deptName) 
                          }} />
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}

            {/* Description and History sections */}
            <div className="content">
              {facultyContent?.description && (
                <div 
                  className="paragraph"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(facultyContent.description) 
                  }}
                />
              )}
              
              {facultyContent?.history_of_faculty && (
                <div 
                  className="paragraph"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(facultyContent.history_of_faculty) 
                  }}
                />
              )}
            </div>
          </AdminInfoBlock>
        ) : (
          <div className="content">
            {facultyDepartments && facultyDepartments.length > 0 && (
              <>
                {/* <h2>{t("common.facultyDepartment")}</h2> */}
                <ol className="department-list">
                  {facultyDepartments.map((dept) => {
                    const deptName = dept.translations[currentLang]?.name || dept.translations['en']?.name;
                    const deptSlug = dept.translations[currentLang]?.slug || dept.translations['en']?.slug;
                    
                    return deptName && deptSlug ? (
                      <li key={dept.id}>
                        <Link href={`/${i18n.language}/department/${deptSlug}`}>
                          <span dangerouslySetInnerHTML={{ 
                            __html: DOMPurify.sanitize(deptName) 
                          }} />
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ol>
              </>
            )}
            
            {facultyContent?.description && (
              <div 
                className="paragraph"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(facultyContent.description) 
                }}
              />
            )}
            
            {facultyContent?.history_of_faculty && (
              <div 
                className="paragraph"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(facultyContent.history_of_faculty) 
                }}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Faculty;
