"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { MenuPostCard } from "@/app/components/MenuPost/MenuPostCard";
import "../../main.css";
import '@/app/[lang]/faculty/main.css'
import Link from "next/link";
import Image from "next/image";
import AdminInfoBlock from "@/app/components/AdminInfoBlock";

// Define the supported languages
type SupportedLanguages = "en" | "ru" | "uz" | "kk";

// Define the translation structure
interface MenuTranslation {
  title: string;
  description: string;
  slug: string;
}

// Define the translations object structure
interface MenuTranslations {
  en: MenuTranslation;
  ru: MenuTranslation;
  uz: MenuTranslation;
  kk: MenuTranslation;
}

// Define the MenuItem structure
interface MenuItem {
  id: number;
  translations: MenuTranslations;
  menu_posts?: Array<{
    id: number;
    main_image: string;
    images?: Array<{ image: string }>;
    translations: MenuTranslations;
    views_count: number;
    menu: number;
    date_posted: string;
  }>;
}

interface AgencyData {
  id: number;
  main_image: string;
  menu: number;
  translations: {
    [key: string]: {
      name: string;
      description: string;
      slug: string;
    };
  };
}

interface AdminData {
  id: number;
  position: number;
  department: number | null;
  agency: number | null;
  phone_number: string;
  email: string;
  main_image: string;
  menu: number;
  translations: {
    [key: string]: {
      full_name: string;
      biography: string;
    };
  };
}

export default function MenuPage() {
  const { slug, lang } = useParams();
  const { i18n, t } = useTranslation();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [agencyData, setAgencyData] = useState<AgencyData[]>([]);
  const [adminData, setAdminData] = useState<AdminData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if current page is departments section or a single department page
  const isDepartmentsSection = slug === 'bolimlar' || slug === 'otdely' || slug === 'departments' || slug === 'bolimler';
  const isSingleDepartment = agencyData?.length === 1;

  // Add className conditionally to main element
  const mainClassName = (isDepartmentsSection || isSingleDepartment) ? 'faculty' : 'menu-content';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://debttracker.uz';

        if (isDepartmentsSection) {
          // Fetch agency and admin data for departments section
          const [agencyResponse, adminResponse] = await Promise.all([
            fetch(`${baseUrl}/menus/agency/`),
            fetch(`${baseUrl}/menus/admin/`)
          ]);

          if (!agencyResponse.ok || !adminResponse.ok) {
            throw new Error('Failed to fetch data');
          }

          const agencyData = await agencyResponse.json();
          const adminData = await adminResponse.json();

          setAgencyData(agencyData);
          setAdminData(adminData);
        } else {
          // Fetch regular menu data for other sections
          const menuResponse = await fetch(`${baseUrl}/menus/main/${slug}/`);
          if (!menuResponse.ok) {
            throw new Error('Failed to fetch menu data');
          }
          const menuData = await menuResponse.json();
          setMenuItem(menuData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, isDepartmentsSection]);

  // Function to find admin for an agency
  const findAgencyAdmin = (agencyId: number) => {
    return adminData.find(admin => admin.agency === agencyId);
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

  
  if (isDepartmentsSection) {
    return (
      <>
        <div className="header-logo-div">
          <div className="header-logo-mini">
            <div className="header-logo-uni">
              <Image src="/logo.png" alt="logo" width={100} height={100} />
            </div>
            <div className="header-logo-uni-name">
              <a
                href={`/${i18n.language}`}
                className="header-logo-uni-name-span"
              >
                {t("common.University")}
              </a>
            </div>
          </div>
        </div>
        <main className={mainClassName}>
          <div className="container">
            <nav className="breadcrumb">
              <Link href={`/${i18n.language}`}>{t("common.home")}</Link> •
              {/*<Link href={`/${i18n.language}/menus`}>{t("common.menus")}</Link> •*/}
              <span>{t("common.departments")}</span>
            </nav>
            
            {agencyData && agencyData.length > 0 ? (
              <div className="content">
                {agencyData.map((agency) => {
                  const admin = findAgencyAdmin(agency.id);
                  const translation = agency.translations[i18n.language as keyof typeof agency.translations] || agency.translations.en;
                  
                  return (
                    <AdminInfoBlock
                      key={agency.id}
                      adminData={admin}
                      title={translation.name}
                      description={translation.description}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="content">
                <div className="paragraph">
                  <p>{t("Soon there will be important information here. Stay tuned!")}</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </>
    );
  }

  // For regular menu items
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
      <main className={mainClassName}>
        <div className="container">
          <nav className="breadcrumb">
            <Link href={`/${i18n.language}`}>{t("common.home")}</Link> •
            <Link href={`/${i18n.language}/menus`}>{t("common.menus")}</Link> •
            <span>
              {menuItem?.translations[i18n.language as SupportedLanguages]
                ?.title || menuItem?.translations.en?.title || t("common.menus")}
            </span>
          </nav>
          
          <div className="content">
            {!menuItem?.menu_posts || menuItem.menu_posts.length === 0 ? (
              <div className="paragraph">
                <p>{t("Soon there will be important information here. Stay tuned!")}</p>
              </div>
            ) : (
              <div className="cards-container">
                {menuItem.menu_posts.map((post) => {
                  // Transform the images array to match the expected format
                  const transformedPost = {
                    ...post,
                    views_count: post.views_count || 0,
                    menu: post.menu || 0,
                    date_posted: post.date_posted || new Date().toISOString(),
                    images: post.images?.map(img => img.image) || []  // Transform to string[]
                  };
                  
                  return (
                    <MenuPostCard 
                      key={post.id} 
                      post={transformedPost}
                      isSinglePost={false} 
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
