'use client'
import { MenuPost } from '@/app/types/menu';
import { MenuPostCard } from './MenuPostCard';
import Link from 'next/link';
import Image from 'next/image';

interface MenuPostListProps {
    posts: MenuPost[];
}

export const MenuPostList = ({ posts }: MenuPostListProps) => {
    // If there are no posts, show the empty message
    if (posts.length === 0) {
        return (

            <>
             <div className="header-logo-div">
        <div className="header-logo-mini">
          <div className="header-logo-uni">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </div>
          <div className="header-logo-uni-name">
            <Link href="/" className="header-logo-uni-name-span">
              КАРАКАЛПАКСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ
            </Link>
          </div>
        </div>
      </div>
      <div className="menu-post-list empty-message" style={{
                textAlign: 'center',
                fontSize: '28px',
                fontWeight: 'bold',
                padding: '2rem'
            }}>
                <p>Скоро здесь появится важная информация. Следите за обновлениями!</p>
            </div>
            </>
           
        );
    }

    // If there's only one post, use the single post layout
    const isSinglePost = posts.length === 1;
    
    return (
        <div className={isSinglePost ? "main-news" : "menu-post-list"}>
            {posts.map(post => (
                <MenuPostCard 
                    key={post.id} 
                    post={post} 
                    isSinglePost={isSinglePost}
                />
            ))}
        </div>
    );
};