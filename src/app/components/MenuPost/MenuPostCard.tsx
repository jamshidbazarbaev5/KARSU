'use client'
import { MenuPost } from '@/app/types/menu';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { useRouter } from 'next/navigation';
import NewsRubric from '../NewsRubric';

interface MenuPostCardProps {
    post: MenuPost;
    isSinglePost: boolean;
}

export const MenuPostCard = ({ post, isSinglePost }: MenuPostCardProps) => {
    const { i18n, t } = useTranslation();
    const router = useRouter();
    const baseSlug = post.translations.en.slug;
    const translation = post.translations[i18n.language as keyof typeof post.translations] || post.translations.en;

    const handleClick = () => {
        if (!isSinglePost) {
            router.push(`/${i18n.language}/menus/main/posts/${translation.slug}`);
        }
    };

    if (isSinglePost) {
        return (
            <main className="main">
                <div className="container">
                    <div className="main-news-pages">
                        <Link href={`/${i18n.language}`}>{t('common.home')}</Link>
                        <Link href={`/${i18n.language}/menus`}>{t('common.menus')}</Link>
                        <span>{translation.title}</span>
                    </div>
                    <div className="main-news">
                        <div className="main-news-block">
                            <div className="main-news-block-title">
                                <h1>{translation.title}</h1>
                            </div>
                            
                            <div className="main-news-block-date">
                                <div>
                                    <span className="date-day">
                                        {new Date(post.date_posted).getDate()}
                                    </span>
                                    <span className="date-month">
                                        {new Date(post.date_posted).toLocaleString(i18n.language, { month: 'long' })}
                                    </span>
                                    <span className="date-year">
                                        {new Date(post.date_posted).getFullYear()}
                                    </span>
                                </div>
                                {/* <div className="main-news-block-views">
                                    <span className="view-number">{post.views_count}</span>
                                </div> */}
                            </div>

                            <div className="main-news-block-photo">
                                <Image 
                                    src={post.main_image}
                                    alt={translation.title}
                                    width={800}
                                    height={400}
                                    priority
                                />
                            </div>

                            <div 
                                className="main-news-block-text"
                                dangerouslySetInnerHTML={{ 
                                    __html: DOMPurify.sanitize(translation.description)
                                }}
                            />
                        </div>
                        <NewsRubric/>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <div 
            className={`menu-post-card ${!isSinglePost ? 'clickable' : ''}`} 
            onClick={handleClick}
        >
            <div className="menu-post-image">
                <Image 
                    src={post.main_image} 
                    alt={translation.title}
                    width={400}
                    height={300}
                    objectFit="cover"
                />
            </div>
            <div className="menu-post-content">
                <h2 className="truncate-text">{translation.title}</h2>
                {isSinglePost ? (
                    <div className="post-description" 
                         dangerouslySetInnerHTML={{ 
                             __html: DOMPurify.sanitize(translation.description) 
                         }} 
                    />
                ) : (
                    <div className="menu-post-date">
                        {new Date(post.date_posted).toLocaleDateString()}
                    </div>
                )}
            </div>
        </div>
    );
};