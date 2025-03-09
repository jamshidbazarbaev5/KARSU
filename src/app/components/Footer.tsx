'use client'
import { useEffect, useState } from 'react'

interface MenuTranslation {
    name: string;
    slug: string;
}

interface MenuTranslations {
    en: MenuTranslation;
    ru: MenuTranslation;
    uz: MenuTranslation;
    kk: MenuTranslation;
}

interface MenuItem {
    id: number;
    parent: number | null;
    translations: MenuTranslations;
    footer_menu_posts: any[];
}

const Footer = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('https://debttracker.uz/menus/footer/');
                const data = await response.json();
                setMenuItems(data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    const getParentMenuItems = () => menuItems.filter(item => item.parent === null);
    const getChildMenuItems = (parentId: number) => menuItems.filter(item => item.parent === parentId);

    return (
        <div className='footer'>
            <div className="container">
                <div className='footer-social-div'>
                    <div className='footer-social-div-small'>
                        <div className='footer-logo-title'>
                            <div className='footer-logo'>
                                <img src="/logo.png" alt="University Logo" />
                            </div>
                            <div className='footer-title'>
                                <a href="../mainpage/index.html" className='footer-title-span'>
                                    Каракалпакский государственный университет
                                </a>
                                <span className='footer-title-mini-span'>
                                    имени Бердаха
                                </span>
                            </div>
                        </div>
                        <a href="#" className='footer-connect-btn'>
                            Связь с университетом
                        </a>
                        <div className='footer-social'>
                            <a href="https://www.instagram.com/karakalpak_state_university_" className='footer-social-btn' target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                                    <path d="M21.4097 13.1826C16.7084 13.1826 12.9143 16.9767 12.9143 21.678C12.9143 26.3792 16.7084 30.1734 21.4097 30.1734C26.111 30.1734 29.9051 26.3792 29.9051 21.678C29.9051 16.9767 26.111 13.1826 21.4097 13.1826ZM21.4097 27.1994C18.3694 27.1994 15.8883 24.7183 15.8883 21.678C15.8883 18.6377 18.3694 16.1566 21.4097 16.1566C24.45 16.1566 26.9311 18.6377 26.9311 21.678C26.9311 24.7183 24.45 27.1994 21.4097 27.1994ZM30.2531 10.8547C29.1554 10.8547 28.269 11.7411 28.269 12.8388C28.269 13.9364 29.1554 14.8228 30.2531 14.8228C31.3507 14.8228 32.2371 13.9406 32.2371 12.8388C32.2374 12.5781 32.1863 12.32 32.0868 12.0791C31.9872 11.8383 31.841 11.6194 31.6567 11.4351C31.4724 11.2508 31.2536 11.1047 31.0127 11.0051C30.7718 10.9055 30.5137 10.8544 30.2531 10.8547ZM37.9698 21.678C37.9698 19.3916 37.9905 17.1258 37.8621 14.8435C37.7337 12.1926 37.1289 9.83991 35.1904 7.90142C33.2478 5.95878 30.8992 5.35818 28.2483 5.22978C25.9619 5.10137 23.6961 5.12208 21.4139 5.12208C19.1274 5.12208 16.8617 5.10137 14.5794 5.22978C11.9285 5.35818 9.57578 5.96292 7.63729 7.90142C5.69465 9.84405 5.09405 12.1926 4.96565 14.8435C4.83724 17.13 4.85795 19.3957 4.85795 21.678C4.85795 23.9603 4.83724 26.2301 4.96565 28.5124C5.09405 31.1633 5.69879 33.5161 7.63729 35.4545C9.57993 37.3972 11.9285 37.9978 14.5794 38.1262C16.8658 38.2546 19.1316 38.2339 21.4139 38.2339C23.7003 38.2339 25.966 38.2546 28.2483 38.1262C30.8992 37.9978 33.2519 37.393 35.1904 35.4545C37.1331 33.5119 37.7337 31.1633 37.8621 28.5124C37.9946 26.2301 37.9698 23.9644 37.9698 21.678ZM34.3247 31.445C34.0224 32.1989 33.6578 32.7622 33.0738 33.3421C32.4898 33.9261 31.9306 34.2906 31.1767 34.593C28.998 35.4587 23.8245 35.264 21.4097 35.264C18.9949 35.264 13.8173 35.4587 11.6385 34.5971C10.8847 34.2948 10.3214 33.9303 9.74147 33.3462C9.15743 32.7622 8.79293 32.203 8.49056 31.4492C7.62901 29.2663 7.82368 24.0928 7.82368 21.678C7.82368 19.2631 7.62901 14.0855 8.49056 11.9068C8.79293 11.153 9.15743 10.5896 9.74147 10.0097C10.3255 9.42985 10.8847 9.0612 11.6385 8.75883C13.8173 7.89728 18.9949 8.09195 21.4097 8.09195C23.8245 8.09195 29.0021 7.89728 31.1809 8.75883C31.9347 9.0612 32.4981 9.4257 33.078 10.0097C33.662 10.5938 34.0265 11.153 34.3289 11.9068C35.1904 14.0855 34.9957 19.2631 34.9957 21.678C34.9957 24.0928 35.1904 29.2663 34.3247 31.445Z" fill="white" />
                                </svg>
                            </a>
                            <a href="https://t.me/www_karsu_uz" className='footer-social-btn' target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="43" viewBox="0 0 44 43" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M35.8451 7.85656C36.2819 7.67228 36.7599 7.60872 37.2294 7.6725C37.699 7.73628 38.1429 7.92507 38.5149 8.21921C38.887 8.51334 39.1736 8.90209 39.345 9.34497C39.5164 9.78785 39.5662 10.2687 39.4893 10.7374L35.4811 35.1113C35.0923 37.4624 32.5191 38.8107 30.3683 37.6396C28.5692 36.6598 25.8971 35.1503 23.4935 33.5752C22.2918 32.7868 18.6105 30.262 19.063 28.4655C19.4518 26.9294 25.6373 21.157 29.1718 17.7252C30.5592 16.3769 29.9265 15.5991 28.2882 16.8393C24.2199 19.9186 17.688 24.6013 15.5284 25.9195C13.6232 27.0818 12.63 27.2802 11.4424 27.0818C9.27571 26.7203 7.26631 26.1604 5.62626 25.4783C3.41008 24.557 3.51789 21.5025 5.62449 20.6131L35.8451 7.85656Z" fill="white" />
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/karsu.official" className='footer-social-btn' target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                                    <path d="M39.4654 21.6778C39.4654 11.9223 31.5479 4.00488 21.7925 4.00488C12.0371 4.00488 4.11963 11.9223 4.11963 21.6778C4.11963 30.2314 10.1991 37.3536 18.2579 38.9972V26.9796H14.7234V21.6778H18.2579V17.2595C18.2579 13.8487 21.0326 11.074 24.4434 11.074H28.8617V16.3759H25.3271C24.3551 16.3759 23.5598 17.1712 23.5598 18.1432V21.6778H28.8617V26.9796H23.5598V39.2623C32.4846 38.3786 39.4654 30.85 39.4654 21.6778Z" fill="white" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-link-map-div">
                    <div className="footer-infos-div">
                        <div className="footer-map-div">
                            <iframe 
                                className="footer-map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d411.22312405810226!2d59.6267102075755!3d42.451954654624885!2m3!1f332.06249999999994!2f5.169257079602841!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x41dd9a73302110c9%3A0x91129d2b50e670e!2z0JrQsNGA0LDQutCw0LvQv9Cw0LrRgdC60LjQuSDQs9C-0YHRg9C00LDRgNGB0YLQstC10L3QvdGL0Lkg0YPQvdC40LLQtdGA0YHQuNGC0LXRgiDQuNC80LXQvdC4INCR0LXRgNC00LDRhdCw!5e1!3m2!1sru!2s!4v1726301215349!5m2!1sru!2s"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <div className="footer-info-links">
                            {getParentMenuItems().map((parentItem) => (
                                <div key={parentItem.id} className="footer-info-university">
                                    <div className="footer-info-university-title">
                                        <span className="footer-info-university-title-span">
                                            {parentItem.translations.ru.name}
                                        </span>
                                    </div>
                                    <div className="footer-info-university-links">
                                        {getChildMenuItems(parentItem.id).map((childItem) => (
                                            <a 
                                                key={childItem.id}
                                                href={`/${childItem.translations.ru.slug}`} 
                                                className="footer-info-university-link"
                                            >
                                                {childItem.translations.ru.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="footer-inc-copyright-big">
                    <div className="footer-inc-copyright">
                        <span className="footer-copyright">Все права защищены.</span>
                        <span className="footer-inc">Разработчик сайта: <a href="https://www.softium.uz" className="inc-bold">Softuim</a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer