import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import DOMPurify from 'dompurify';
import { useState, useEffect } from "react";
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

const Faculty: React.FC<FacultyProps> = ({ facultyData }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [adminData, setAdminData] = useState<any>(null);
  const currentLang = i18n.language;

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://debttracker.uz';
        const response = await fetch(`${baseUrl}/menus/admin/`);
        const data = await response.json();
        const matchingAdmin = data.find((admin: any) => admin.faculty === facultyData.id);
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
        <div className="faculty-logo">
          <h1>{getTranslatedContent("name")}</h1>
        </div>
        <div className="faculty-block">
          <div className="faculty-block-pro">
            <div className="faculty-block-pro-img">
              <img src={adminData?.main_image} alt={getTranslatedContent("name")} />
            </div>
            <div className="faculty-block-pro-title">
              <div className="faculty-block-pro-title-info">
                <h2 className="faculty-course" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(adminData?.translations?.[currentLang]?.biography || '') }} />
                <p className="faculty-name">
                  {adminData?.translations?.[currentLang]?.full_name || 
                   adminData?.translations?.['en']?.full_name || 
                   t("Not specified")}
                </p>
              </div>
              <div className="faculty-block-pro-title-contact">
                <div className="faculty-number">
                  <p>
                    <i className="fa-solid fa-phone"></i>
                    {t("Phone")}:
                  </p>
                  <a href={`tel:${adminData?.phone_number}`}>
                    {adminData?.phone_number || t("Not specified")}
                  </a>
                </div>
                <div className="faculty-email">
                  <p>
                    <i className="fa-solid fa-envelope"></i>
                    {t("Email")}:
                  </p>
                  <a href={`mailto:${adminData?.email || facultyData.email}`}>
                    {adminData?.email || facultyData.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="faculty-block-text">
            {facultyDepartments && facultyDepartments.length > 0 && (
              <div className="faculty-block-text-links">
                <h4>{t("Faculty Departments")} ({facultyDepartments.length}):</h4>
                <ul>
                  {facultyDepartments.map((dept) => {
                    console.log('Rendering department:', dept.id, dept.translations[currentLang]?.name);
                    return (
                      <li key={dept.id}>
                        <Link href={`/${i18n.language}/department/${dept.translations[currentLang]?.slug || dept.translations['en']?.slug}`}>
                          <span dangerouslySetInnerHTML={{ 
                            __html: DOMPurify.sanitize(dept.translations[currentLang]?.name || dept.translations['en']?.name || '') 
                          }} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <div className="faculty-block-text-info">
              <h4>{t("Faculty History")}</h4>
              <div 
                className="faculty-block-text-description"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(facultyContent.description) 
                }}
              />
            </div>
            <div className="faculty-block-text-social">
              <a href="#"><i className="fa-brands fa-square-facebook"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="#"><i className="fa-brands fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Faculty;
