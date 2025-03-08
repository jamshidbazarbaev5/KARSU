'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { MenuPostCard } from '@/app/components/MenuPost/MenuPostCard';
import '../../main.css'
import Link from 'next/link';

// Define the supported languages
type SupportedLanguages = 'en' | 'ru' | 'uz' | 'kk';

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
        translations: MenuTranslations;
    }>;
}

export default function MenuPage() {
    const { slug, lang } = useParams();
    const { i18n, t } = useTranslation();
    const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (lang && typeof lang === 'string') {
            i18n.changeLanguage(lang);
        }
        const fetchMenuData = async () => {
            try {
                const response = await fetch(`https://debttracker.uz/menus/main/${slug}/`);
                if (!response.ok) throw new Error('Failed to fetch menu data');
                const data = await response.json();
                setMenuItem(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchMenuData();
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
    if (!menuItem) return <div>Menu not found</div>;

    // Transform all posts
    const transformedPosts = menuItem.menu_posts?.map(post => ({
        id: post.id,
        main_image: post.main_image,
        translations: post.translations,
        date_posted: new Date().toISOString(),
        views_count: 0,
        menu: menuItem.id,
        images: []
    })) || [];

    if (menuItem.menu_posts?.length === 0) {
        return <p style={{textAlign: 'center', fontSize: '28px', fontWeight: 'bold', padding: '2rem', marginTop: '2rem', marginBottom: '2rem'}}>Скоро здесь появится важная информация. Следите за обновлениями!</p>
    }

    // If there's only one post, show it in the single post layout
    if (transformedPosts.length === 1) {
        return (
            <MenuPostCard 
                post={transformedPosts[0]}
                isSinglePost={true}
            />
        );
    }

    // If there are multiple posts, show them in a grid layout
    return (
        <main className="main">
            <div className="container">
                <div className="main-news-pages">
                    <Link href={`/${i18n.language}`}>{t('common.home')}</Link>
                    <Link href={`/${i18n.language}/menus`}>{t('common.menus')}</Link>
                    <span>{menuItem.translations[i18n.language as SupportedLanguages]?.title || menuItem.translations.en.title}</span>
                </div>
                <div className="cards-container">
                    {transformedPosts.map(post => (
                        <MenuPostCard 
                            key={post.id}
                            post={post}
                            isSinglePost={false}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}