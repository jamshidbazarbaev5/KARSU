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
  import DOMPurify from "dompurify";
  import styles from '@/app/styles/agency.module.css'
  import Sidebar from "@/app/components/Sidebare2";

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
    menu_persons?: MenuPerson[];
    menu_outer_link?: {
      id: number;
      url: string;
      img: string | null;
      translations: Record<string, any>;
      menu: number;
      is_outer: boolean;
    };
  }

  interface MenuPerson {
    id: number;
    translations: {
      [key: string]: {
        full_name: string;
        description: string;
      };
    };
    main_image: string;
    menu: number;
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

  interface ParentMenu {
    id: number;
    translations: {
      [key: string]: {
        title: string;
        slug: string;
      }
    };
  }

  // Add this helper function at the top of the file
  const getAvailableTranslation = (translations: any, currentLang: string) => {
    // Try current language first
    if (translations[currentLang]) {
      return translations[currentLang];
    }

    // Try English as first fallback
    if (translations.en) {
      return translations.en;
    }

    if (translations.ru) {
      return translations.ru;
    }

    const availableTranslation = Object.values(translations)[0];
    return availableTranslation || null;
  };

  // Add this helper function near the top of the file
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  // Add this helper function
  const fetchAgencyPage = async (page: number) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api';
      const response = await fetch(`${baseUrl}/menus/agency/?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch agency data');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching agency page ${page}:`, error);
      return null;
    }
  };

  // Add this helper function
  const fetchAdminPage = async (page: number) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api';
      const response = await fetch(`${baseUrl}/menus/admin/?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch admin data');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching admin page ${page}:`, error);
      return null;
    }
  };

  export default function MenuPage() {
    const { slug, lang } = useParams();
    const { i18n, t } = useTranslation();
    const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
    const [agencyData, setAgencyData] = useState<AgencyData[]>([]);
    const [adminData, setAdminData] = useState<AdminData[]>([]);
    const [parentMenu, setParentMenu] = useState<ParentMenu | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDesktop, setIsDesktop] = useState(true);

    const isDepartmentsSection = slug === 'bolimlar' || slug === 'otdely' || slug === 'departments' || slug === 'bolimler';
    const isSingleDepartment = agencyData?.length === 1;

    const mainClassName = (isDepartmentsSection || isSingleDepartment) ? 'faculty' : 'menu-content';

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api';

          if (isDepartmentsSection) {
            // Fetch all agency pages
            let allAgencyData: AgencyData[] = [];
            let agencyPage = 1;
            
            while (true) {
              const agencyPageData = await fetchAgencyPage(agencyPage);
              if (!agencyPageData || !agencyPageData.results.length) break;
              
              allAgencyData = [...allAgencyData, ...agencyPageData.results];
              
              if (!agencyPageData.next) break;
              agencyPage++;
            }
            
            // Fetch all admin pages
            let allAdminData: AdminData[] = [];
            let adminPage = 1;
            
            while (true) {
              const adminPageData = await fetchAdminPage(adminPage);
              if (!adminPageData || !adminPageData.results.length) break;
              
              allAdminData = [...allAdminData, ...adminPageData.results];
              
              if (!adminPageData.next) break;
              adminPage++;
            }

            setAgencyData(allAgencyData);
            setAdminData(allAdminData);
          } else {
            const menuResponse = await fetch(`${baseUrl}/menus/main/${slug}/`);
            if (!menuResponse.ok) {
              throw new Error('Failed to fetch menu data');
            }
            const menuData = await menuResponse.json();
            
            // Check if this is an external link and redirect
            if (menuData.menu_outer_link?.is_outer) {
              window.location.href = menuData.menu_outer_link.url;
              return;
            }
            
            setMenuItem(menuData);

            // Fetch parent menu if this is a post
            if (slug?.toString().includes('posts/')) {
              const parentMenuId = menuData.menu;
              if (parentMenuId) {
                const parentResponse = await fetch(`${baseUrl}/menus/main/${parentMenuId}/`);
                if (parentResponse.ok) {
                  const parentData = await parentResponse.json();
                  setParentMenu(parentData);
                }
              }
            }
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

    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1024); // 1024px is a common desktop breakpoint
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        <div style={{ display: 'flex' }}>
          <main className={styles.container}>
            <h1 className={styles.title}>{t("common.departments")}</h1>
            <div className={styles.grid}>
              {agencyData
                .filter(agency => {
                  const translation = agency.translations[i18n.language];
                  return translation && translation.name && translation.name.trim() !== '';
                })
                .map((agency) => {
                  const translation = agency.translations[i18n.language];
                  
                  return (
                    <Link 
                      href={`/${i18n.language}/department/${translation.slug}`} 
                      key={agency.id}
                      className={styles.card}
                    >
                      <div className={styles.cardContent}>
                        <p className={styles.cardTitle}>{translation.name}</p>
                        <div className={styles.hoverLine}></div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </main>
          {isDesktop && <Sidebar />}
        </div>
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
            <nav className="breadcrumb2" style={{textDecoration:"none",marginLeft:"100px"}}>
              <Link href={`/${i18n.language}`} style={{textDecoration:"none","color":"#333"}}>
                {t("common.home")}
              </Link> •
              {parentMenu ? (
                <>
                  <Link 
                    href={`/${i18n.language}/menus/main/${parentMenu.translations[i18n.language]?.slug}`} 
                    style={{textDecoration:"none"}}
                  >
                    {parentMenu.translations[i18n.language]?.title}
                  </Link> •
                  <span>{menuItem?.translations[i18n.language as SupportedLanguages]?.title}</span>
                </>
              ) : (
                // Only show menuItem title if there's no parent menu
                <span>{menuItem?.translations[i18n.language as SupportedLanguages]?.title}</span>
              )}
            </nav>
            
            <div className="content">
              {(!menuItem?.menu_posts?.length && !menuItem?.menu_persons?.length) || 
                (!menuItem?.menu_posts?.some(post => 
                  post.translations[i18n.language as SupportedLanguages]?.title
                ) && !menuItem?.menu_persons?.some(person =>
                  person.translations[i18n.language]?.full_name
                )) ? (
                <div className="paragraph" style={{marginBottom: '20px', fontSize: '30px', fontWeight: 'bold', margin:"0 auto ", textAlign: "center", maxWidth: "800px", padding: "20px"}}>
                  <p>{t("common.soon")}</p>
                </div>
              ) : (
                <div className={(menuItem.menu_posts?.length || 0) + (menuItem.menu_persons?.length || 0) > 1 ? "cards-container" : ""}>
                  {menuItem.menu_posts?.filter(post => post.translations[i18n.language as SupportedLanguages]?.title)
                    .map((post) => {
                      const transformedPost = {
                        ...post,
                        views_count: post.views_count || 0,
                        menu: post.menu || 0,
                        date_posted: formatDate(post.date_posted || new Date().toISOString()),
                        images: post.images?.map(img => img.image) || [],
                        length: menuItem?.menu_posts?.length || 0
                      };
                      
                      return (
                        <MenuPostCard 
                          key={post.id} 
                          post={{
                            ...transformedPost,
                            menu: slug as string // Add this line to pass the menu slug
                          }}
                          isSinglePost={menuItem?.menu_posts?.length === 1}
                          totalPosts={menuItem?.menu_posts?.length || 0}
                        />
                      );
                    })}
                  {menuItem.menu_persons?.filter(person => person.translations[i18n.language]?.full_name)
                    .map((person) => {
                      const transformedPerson = {
                        id: person.id,
                        main_image: person.main_image,
                        translations: {
                          en: {
                            title: person.translations.en?.full_name || '',
                            description: person.translations.en?.description || '',
                            slug: `person-${person.id}`
                          },
                          ru: {
                            title: person.translations.ru?.full_name || '',
                            description: person.translations.ru?.description || '',
                            slug: `person-${person.id}`
                          },
                          uz: {
                            title: person.translations.uz?.full_name || '',
                            description: person.translations.uz?.description || '',
                            slug: `person-${person.id}`
                          },
                          kk: {
                            title: person.translations.kk?.full_name || '',
                            description: person.translations.kk?.description || '',
                            slug: `person-${person.id}`
                          }
                        },
                        menu: person.menu,
                        date_posted: new Date().toISOString(),
                        views_count: 0,
                        images: []
                      };
                      
                      return (
                        <MenuPostCard 
                          key={person.id} 
                          post={transformedPerson}
                          isSinglePost={menuItem.menu_persons?.length === 1}
                          totalPosts={menuItem.menu_persons?.length || 0}
                          isPerson={true}
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
