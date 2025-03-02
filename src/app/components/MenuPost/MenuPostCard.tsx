'use client'
import { MenuPost } from '@/app/types/menu';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';

interface MenuPostCardProps {
    post: MenuPost;
    isSinglePost: boolean;
}

export const MenuPostCard = ({ post, isSinglePost }: MenuPostCardProps) => {
    const { i18n } = useTranslation();
    const baseSlug = post.translations.en.slug;
    const translation = post.translations[i18n.language as keyof typeof post.translations] || post.translations.en;

    if (isSinglePost) {
        return (
            <main className="main">
                <div className="container">
                    <div className="main-news-pages">
                        <Link href="/">Asosiy</Link>
                        <Link href="/menus">Menus</Link>
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
                        <div className="main-news-rubric">
                                <div className="main-news-rubric-logo">
                                    <Image 
                                        src="/mainpage/content/icon.png"
                                        alt="Logo"
                                        width={50}
                                        height={50}
                                    />
                                    <h1>Axborotlar xizmati</h1>
                                </div>
                                <ul>
                                    <li><Link href="#">Yangiliklar</Link></li>
                                    <li><Link href="#">Events</Link></li>
                                    <li><Link href="#">Lorem</Link></li>
                                    <li className="last"><Link href="#">ipsum</Link></li>
                                </ul>
                            </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <div className="menu-post-card">
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
                <h2>{translation.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: translation.description }} />
                <div className="menu-post-date">
                    {new Date(post.date_posted).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};