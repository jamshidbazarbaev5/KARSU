"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { MenuPostCard } from "@/app/components/MenuPost/MenuPostCard";
import Link from "next/link";
import Image from "next/image";
import '@/app/[lang]/footer/main.css'
import SocialMediaShare from "@/app/components/SocialMediasShare";
import { MenuPost } from "@/app/types/menu";
// Define the supported languages
type SupportedLanguages = "en" | "ru" | "uz" | "kk";

// Define the translation structure
interface MenuTranslation {
  title: string;
  description: string;
  slug: string;
  name: string;
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
  footer_menu_posts: Array<{
    id: number;
    main_image: string;
    images?: Array<{ image: string }>;
    translations: MenuTranslations;
    views_count?: number;
    footer_menu: number;
    date_posted: string;
  }>;
}

export default function FooterMenuPage() {
  const { slug, lang } = useParams();
  const { i18n, t } = useTranslation();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lang && typeof lang === "string") {
      i18n.changeLanguage(lang);
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://debttracker.uz';
        // First, fetch all footer menu items
        const menuResponse = await fetch(`${baseUrl}/menus/footer/`);
        if (!menuResponse.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const menuData = await menuResponse.json();
        
        // Find the specific menu item that matches the slug
        const currentMenuItem = menuData.find((item: any) => 
          Object.values(item.translations).some((trans: any) => trans.slug === slug)
        );

        if (currentMenuItem) {
          setMenuItem(currentMenuItem);
        } else {
          throw new Error('Menu item not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, lang, i18n]);

  if (loading) {
    return (
      <div className="news-loading-container">
        <div className="news-loading-spinner"></div>
        <span className="news-loading-text">Loading...</span>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  const isSinglePost = menuItem?.footer_menu_posts?.length === 1;
  const mainClassName = isSinglePost ? 'main' : 'menu-content';

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
          {!isSinglePost && (
            <nav className="breadcrumb" style={{marginLeft:"100px"}}>
              <Link href={`/${i18n.language}`}>{t("common.home")}</Link> •
              <Link href={`/${i18n.language}`}>{t("common.menus")}</Link> •
              <span>
                {menuItem?.translations[i18n.language as SupportedLanguages]?.name}
              </span>
            </nav>
          )}
          
          <div className={isSinglePost ? undefined : "content"}>
            {!menuItem?.footer_menu_posts || menuItem.footer_menu_posts.length === 0 ? (
              <div className="paragraph" style={{
                marginBottom: '20px',
                fontSize: '30px',
                fontWeight: 'bold',
                margin: "0 auto",
                textAlign: "center",
                maxWidth: "800px",
                padding: "20px"
              }}>
                <p>{t("common.soon")}</p>
              </div>
            ) : (
              <>
                {isSinglePost ? (
                  // Single post view
                  <MenuPostCard 
                    post={menuItem.footer_menu_posts[0]  as any}
                    isSinglePost={true}
                  />
                ) : (
                  // Multiple posts view
                  <div className="cards-container">
                    {menuItem.footer_menu_posts.map((post) => {
                      const transformedPost = {
                        ...post,
                        views_count: post.views_count || 0,
                        menu: post.footer_menu || 0,
                        date_posted: post.date_posted || new Date().toISOString(),
                        images: post.images?.map(img => img.image) || []
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
              </>
            )}
          </div>
        </div>
        {/* <SocialMediaShare/> */}
      </main>
    </>
  );
}