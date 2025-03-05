'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { MenuItem } from '@/app/types/menu';
import { MenuPostList } from '@/app/components/MenuPost/MenuPostList';
import '../../main.css'

export default function MenuPage() {
    const { slug, lang } = useParams();
    const { i18n } = useTranslation();
    const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Set the language based on the URL parameter
        if (lang && typeof lang === 'string') {
            i18n.changeLanguage(lang);
        }

        const fetchMenuData = async () => {
            try {
                const response = await fetch(`https://debttracker.uz/menus/main/${slug}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch menu data');
                }
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!menuItem) {
        return <div>Menu not found</div>;
    }

    const translation = menuItem.translations[i18n.language as keyof typeof menuItem.translations] || menuItem.translations.en;

    return (
        <div className="menu-page">
            {/* <h1>{translation.title}</h1> */}
            <MenuPostList posts={menuItem.menu_posts} />
        </div>
    );
}