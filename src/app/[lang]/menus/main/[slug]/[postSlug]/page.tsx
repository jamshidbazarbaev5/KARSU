'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MenuPostCard } from '@/app/components/MenuPost/MenuPostCard';
import { MenuPost } from '@/app/types/menu';
import { useTranslation } from 'react-i18next';
import '../../../main.css'

export default function PostPage() {
    const { postSlug, lang } = useParams();
    const [post, setPost] = useState<MenuPost | null>(null);
    const { i18n } = useTranslation();

    useEffect(() => {
        if (lang && typeof lang === 'string') {
            i18n.changeLanguage(lang);
        }
        
        const fetchPost = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://debttracker.uz';
                const response = await fetch(`${baseUrl}/publications/posts/${postSlug}`);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}. ${errorText}`);
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
                setPost(null);
            }
        };

        if (postSlug) {
            fetchPost();
        }
    }, [postSlug, lang, i18n]);

    if (!post) {
        return (
            <div className="news-loading-container">
                <div className="news-loading-spinner"></div>
                <span className="news-loading-text">Loading...</span>
            </div>
        );
    }

    return (
        <main className="main">
            <div className="container">
                <MenuPostCard post={post} isSinglePost={true} />
            </div>
        </main>
    );
}