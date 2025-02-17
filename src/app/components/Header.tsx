'use client'
import Image from 'next/image'
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();
    
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        const burger_menu = document.querySelector('.header-menu-nav-burger');
        const menu = document.querySelector('.header-main-nav');
        const close_menu = document.querySelector('.menu-btn');
        
        // Burger menu toggle
        burger_menu?.addEventListener('click', () => {
          menu?.classList.add('actived');
        });
        
        close_menu?.addEventListener('click', () => {
          menu?.classList.remove('actived');
        });
    
        // Media query handling
        const mediaQuery = window.matchMedia("(max-width: 1439px)");
        
        const toggleClickListeners = (add: boolean) => {
          const click_items = document.querySelectorAll('.main-title');
          
          click_items.forEach((item) => {
            const navList = item.nextElementSibling;
            const angle = item.querySelector('.non-active');
            
            if (add) {
              (item as HTMLElement).onclick = () => {
                if (navList?.classList.contains('header-main-nav-ul')) {
                  navList.classList.toggle('open');
                }
                angle?.classList.toggle('rotate');
              };
            } else {
                (item as HTMLElement).onclick = null;
            }
          });
        };
        
        const handleScreenChange = (e: MediaQueryListEvent | MediaQueryList) => {
          toggleClickListeners(e.matches);
        };
        
        handleScreenChange(mediaQuery);
        mediaQuery.addEventListener('change', handleScreenChange);
    
        // Cleanup function
        return () => {
          burger_menu?.removeEventListener('click', () => {
            menu?.classList.add('actived');
          });
          
          close_menu?.removeEventListener('click', () => {
            menu?.classList.remove('actived');
          });
          
          mediaQuery.removeEventListener('change', handleScreenChange);
        };
      }, []); // Empty dependency
    return (
        <>
            <div className='header-main'>
                <div className='header-main-center'>
                    <div className='header-main-right'>
                        <ul className='header-main-right-ul'>
                            <li className='header-main-right-li'>
                                <svg className="top-links__svg" viewBox="0 0 48 48"
                                    width="20" height="20">
                                    <path
                                        d="M33.5 16a9.439 9.439 0 0 0-6.5 2.602A9.439 9.439 0 0 0 20.5 16c-5.227 0-9.5 4.273-9.5 9.5V37h6V24.5a3.51 3.51 0 0 1 3.5-3.5 3.51 3.51 0 0 1 3.5 3.5V37h6V24.5a3.51 3.51 0 0 1 3.5-3.5 3.51 3.51 0 0 1 3.5 3.5V37h6V25.5c0-5.227-4.273-9.5-9.5-9.5z"
                                        fill="#ffffff"></path>
                                    <path d="M6 16.21V32" fill="none"
                                        strokeWidth="1" strokeLinecap="butt"
                                        strokeLinejoin="miter" stroke="#616161"
                                        strokeOpacity="1"
                                        strokeMiterlimit="10">
                                    </path>
                                    <path
                                        d="M22 13c1.086.36 2.621 2 3 3-1.754 1.738-2.574 2.867-3 6-.14 1.05-.902 1.688-2 1-3.055-1.914-6-2-8-2-1-1-.535-3.652 0-5l6 1z"
                                        fill="#ffffff"></path>
                                    <path d="M18 17H4l11-7h14z"
                                        fill="#ffffff"></path>
                                    <path
                                        d="M7.5 30c0-2.21-.672-4-1.5-4s-1.5 1.79-1.5 4 .672 4 1.5 4 1.5-1.79 1.5-4z"
                                        fill="#ffffff"></path>
                                </svg>
                                <span>Moodle</span>
                            </li>
                            <li className='header-main-right-li'>
                                <svg className="top-links__svg"
                                    viewBox="0 0 230.17 230.17" width="17"
                                    height="15">
                                    <path
                                        d="M230,49.585c0-0.263,0.181-0.519,0.169-0.779l-70.24,67.68l70.156,65.518c0.041-0.468-0.085-0.94-0.085-1.418V49.585z"
                                        fill="#ffffff"></path>
                                    <path
                                        d="M149.207,126.901l-28.674,27.588c-1.451,1.396-3.325,2.096-5.2,2.096c-1.836,0-3.672-0.67-5.113-2.013l-28.596-26.647
                            L11.01,195.989c1.717,0.617,3.56,1.096,5.49,1.096h197.667c2.866,0,5.554-0.873,7.891-2.175L149.207,126.901z"
                                        fill="#ffffff"></path>
                                    <path
                                        d="M115.251,138.757L222.447,35.496c-2.427-1.443-5.252-2.411-8.28-2.411H16.5c-3.943,0-7.556,1.531-10.37,3.866
                            L115.251,138.757z" fill="#ffffff"></path>
                                    <path
                                        d="M0,52.1v128.484c0,1.475,0.339,2.897,0.707,4.256l69.738-67.156L0,52.1z"
                                        fill="#ffffff"></path>
                                </svg>
                                <span> Корпоративная почта</span>
                            </li>
                            <a href="../rektor/rektor.html"
                                className='header-main-right-li'>
                                <svg className="top-links__svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17px" height="17px"
                                    viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M21.1938 2.80624C22.2687 3.88124 22.2687 5.62415 21.1938 6.69914L20.6982 7.19469C20.5539 7.16345 20.3722 7.11589 20.1651 7.04404C19.6108 6.85172 18.8823 6.48827 18.197 5.803C17.5117 5.11774 17.1483 4.38923 16.956 3.8349C16.8841 3.62781 16.8366 3.44609 16.8053 3.30179L17.3009 2.80624C18.3759 1.73125 20.1188 1.73125 21.1938 2.80624Z"
                                        fill="#ffffff" />
                                    <path
                                        d="M14.5801 13.3128C14.1761 13.7168 13.9741 13.9188 13.7513 14.0926C13.4886 14.2975 13.2043 14.4732 12.9035 14.6166C12.6485 14.7381 12.3775 14.8284 11.8354 15.0091L8.97709 15.9619C8.71035 16.0508 8.41626 15.9814 8.21744 15.7826C8.01862 15.5837 7.9492 15.2897 8.03811 15.0229L8.99089 12.1646C9.17157 11.6225 9.26191 11.3515 9.38344 11.0965C9.52679 10.7957 9.70249 10.5114 9.90743 10.2487C10.0812 10.0259 10.2832 9.82394 10.6872 9.41993L15.6033 4.50385C15.867 5.19804 16.3293 6.05663 17.1363 6.86366C17.9434 7.67069 18.802 8.13296 19.4962 8.39674L14.5801 13.3128Z"
                                        fill="#ffffff" />
                                    <path
                                        d="M20.5355 20.5355C22 19.0711 22 16.714 22 12C22 10.4517 22 9.15774 21.9481 8.0661L15.586 14.4283C15.2347 14.7797 14.9708 15.0437 14.6738 15.2753C14.3252 15.5473 13.948 15.7804 13.5488 15.9706C13.2088 16.1327 12.8546 16.2506 12.3833 16.4076L9.45143 17.3849C8.64568 17.6535 7.75734 17.4438 7.15678 16.8432C6.55621 16.2427 6.34651 15.3543 6.61509 14.5486L7.59235 11.6167C7.74936 11.1454 7.86732 10.7912 8.02935 10.4512C8.21958 10.052 8.45272 9.6748 8.72466 9.32615C8.9563 9.02918 9.22032 8.76528 9.57173 8.41404L15.9339 2.05188C14.8423 2 13.5483 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355Z"
                                        fill="#ffffff" />
                                </svg>
                                <span> Приемная ректора</span>
                            </a>
                        </ul>
                    </div>
                    <div className='header-main-left'>
                        <div className='header-main-left-lang'>
                            <select 
                                name="language" 
                                id="language"
                                onChange={(e) => changeLanguage(e.target.value.toLowerCase())}
                                value={i18n.language?.toUpperCase()}
                            >
                                <option value="UZ">{t('header.languages.uz')}</option>
                                <option value="KK">{t('header.languages.kk')}</option>
                                <option value="RU">{t('header.languages.ru')}</option>
                                <option value="EN">{t('header.languages.en')}</option>
                            </select>
                            <div className="language-icons" aria-hidden="true">
                                <Image src="/uzbek-icon.jpg" alt="" width={20} height={20} />
                                <Image src="/karakalpakstan-icon.png" alt="" width={20} height={20} />
                                <Image src="/russia-icon.jpg" alt="" width={20} height={20} />
                                <Image src="/english-icon.jpg" alt="" width={20} height={20} />
                            </div>
                        </div>
                        <form action="/search" method="GET"
                            className='header-main-left-search'>
                            <input type="checkbox" id="search_call" />
                            <label htmlFor="search_call"
                                className="header-main-left-search-label">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="16px" height="16px"
                                    viewBox="0 0 24 24" fill="none">
                                    <path fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z"
                                        fill="#ffffff" />
                                </svg>
                            </label>
                            <input type="text"
                                className="header-main-left-search-input"
                                id="search" name="query"
                                placeholder="Search..." />
                            <span></span>
                        </form>
                    </div>
                </div>
            </div>
            <div className='header-main-menu-bg'>   
                <div className='header-main-menu'>
                    <div className='header-main-menu-burger'>
                        <div className="header-menu-nav-burger">
                            <svg className="header-menu-svg"
                                xmlns="http://www.w3.org/2000/svg" width="25px"
                                height="25px"
                                viewBox="0 0 24 24" fill="none">
                                <path d="M4 18L20 18" stroke="#ffffff"
                                    strokeWidth="2" strokeLinecap="round" />
                                <path d="M4 12L20 12" stroke="#ffffff"
                                    strokeWidth="2" strokeLinecap="round" />
                                <path d="M4 6L20 6" stroke="#ffffff"
                                    strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                    <div className='header-main-menu-list'>

                        <ul className='header-main-menu-list-ul'>
                            <li className="header-main-menu-list-li" id="uni-hover">
                                <input type="checkbox" id="uni_menu" />
                                <label htmlFor="uni_menu"
                                    className="header-main-menu-list-li">
                                    УНИВЕРСИТЕТ
                                </label>

                                <div className="header-main-hover">
                                    <div className="header-main-hover-block">
                                        <div className="header-hover-block-flex">
                                            <div className="header-block-flex-part">
                                                <div
                                                    className="header-block-flex-uni">
                                                    <span>УНИВЕРСИТЕТ</span>
                                                    <svg width="60" height="60"
                                                        viewBox="0 0 48 40"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M28.2288 5.83275C25.411 4.72242 22.2531 4.72242 19.4353 5.83275L6.16705 11.061C4.03337 11.9017 3.47709 14.2725 4.49818 15.9111V24.1667C4.49818 24.857 5.16404 25.4167 5.98541 25.4167C6.80677 25.4167 7.47263 24.857 7.47263 24.1667V17.7867L19.4355 22.5005C22.2533 23.6108 25.4112 23.6108 28.229 22.5005L41.4972 17.2723C44.3834 16.1351 44.3834 12.1983 41.4972 11.0611L28.2288 5.83275Z"
                                                            fill="#002B6A"></path>
                                                        <mask
                                                            id="path-2-inside-1_2_438"
                                                            fill="white">
                                                            <path
                                                                d="M10.3479 20L19.8321 23.737C22.6498 24.8473 25.8077 24.8473 28.6255 23.737L38.1095 20V28.9452C38.1095 30.6253 37.111 32.1982 35.3625 33.0122C32.4507 34.3675 27.7901 36.2362 24.2287 36.2362C20.6673 36.2362 16.0067 34.3675 13.095 33.0122C11.3463 32.1982 10.3479 30.6253 10.3479 28.9452V20Z">
                                                            </path>
                                                        </mask>
                                                        <path
                                                            d="M10.3479 20L19.8321 23.737C22.6498 24.8473 25.8077 24.8473 28.6255 23.737L38.1095 20V28.9452C38.1095 30.6253 37.111 32.1982 35.3625 33.0122C32.4507 34.3675 27.7901 36.2362 24.2287 36.2362C20.6673 36.2362 16.0067 34.3675 13.095 33.0122C11.3463 32.1982 10.3479 30.6253 10.3479 28.9452V20Z"
                                                            fill="#002B6A"></path>
                                                        <path
                                                            d="M10.3479 20L22.5677 -11.0127L-22.9854 -28.9618V20H10.3479ZM19.8321 23.737L32.0524 -7.27549L32.0519 -7.2757L19.8321 23.737ZM28.6255 23.737L16.4055 -7.2756L16.4053 -7.27552L28.6255 23.737ZM38.1095 20H71.4428V-28.9622L25.8894 -11.0126L38.1095 20ZM35.3625 33.0122L49.4288 63.2322L49.4302 63.2315L35.3625 33.0122ZM13.095 33.0122L-0.972366 63.2317L-0.971596 63.2321L13.095 33.0122ZM-1.87189 51.0127L7.61227 54.7497L32.0519 -7.2757L22.5677 -11.0127L-1.87189 51.0127ZM7.61173 54.7495C18.2826 58.9543 30.175 58.9543 40.8458 54.7495L16.4053 -7.27552C21.4404 -9.25959 27.0171 -9.25962 32.0524 -7.27549L7.61173 54.7495ZM40.8456 54.7496L50.3295 51.0126L25.8894 -11.0126L16.4055 -7.2756L40.8456 54.7496ZM4.77612 20V28.9452H71.4428V20H4.77612ZM4.77612 28.9452C4.77612 16.6936 12.1972 7.02788 21.2947 2.7928L49.4302 63.2315C62.0249 57.3685 71.4428 44.5571 71.4428 28.9452H4.77612ZM21.2961 2.79215C20.9852 2.93687 20.6671 3.07659 20.3692 3.19743C20.0617 3.3221 19.8725 3.38728 19.8099 3.40746C19.7236 3.4353 19.9793 3.34579 20.5332 3.23517C20.8261 3.17669 21.2728 3.0981 21.8545 3.03214C22.4305 2.96683 23.2353 2.90283 24.2287 2.90283V69.5695C31.0911 69.5695 36.9817 67.9172 40.2684 66.8574C43.9925 65.6566 47.2318 64.2548 49.4288 63.2322L21.2961 2.79215ZM24.2287 2.90283C25.2221 2.90283 26.0268 2.96683 26.6028 3.03214C27.1845 3.0981 27.6313 3.17669 27.9241 3.23517C28.4781 3.34579 28.7338 3.4353 28.6475 3.40747C28.5849 3.3873 28.3958 3.32213 28.0883 3.19747C27.7904 3.07664 27.4724 2.93694 27.1615 2.79226L-0.971596 63.2321C1.22547 64.2547 4.46481 65.6566 8.18888 66.8574C11.4757 67.9172 17.3663 69.5695 24.2287 69.5695V2.90283ZM27.1623 2.79262C36.2599 7.0276 43.6812 16.6933 43.6812 28.9452H-22.9854C-22.9854 44.5573 -13.5673 57.3687 -0.972366 63.2317L27.1623 2.79262ZM43.6812 28.9452V20H-22.9854V28.9452H43.6812Z"
                                                            fill="#002B6A"
                                                            mask="url(#path-2-inside-1_2_438)"></path>
                                                    </svg>

                                                </div>

                                                <div
                                                    className="header-block-flex-text">
                                                    <p> В сентябре 1935 года в
                                                        Каракалпакcтане было
                                                        открыто
                                                        первое высшее
                                                        учебное заведение —
                                                        учительский институт. В
                                                        1944
                                                        году он был преобразован
                                                        в
                                                        Каракалпакский
                                                        государственный
                                                        педагогический институт,
                                                        на
                                                        базе которого в сентябре
                                                        1976 года
                                                        образовался Нукусский
                                                        государственный
                                                        университет
                                                        имени Т.Шевченко (ныне —
                                                        Каракалпакский
                                                        государственный
                                                        университет
                                                        имени Бердаха).
                                                        В сентябре 1935 года в
                                                        Каракалпакcтане было
                                                        открыто
                                                        первое высшее
                                                        учебное заведение —
                                                        учительский институт. В
                                                        1944
                                                        году он был преобразован
                                                        в
                                                        Каракалпакский
                                                        государственный
                                                        педагогический институт,
                                                        на
                                                        базе которого в сентябре
                                                        1976 года
                                                        образовался Нукусский
                                                        государственный
                                                        университет
                                                        имени Т.Шевченко (ныне —
                                                        Каракалпакский
                                                        государственный
                                                        университет
                                                        имени Бердаха).
                                                        В сентябре 1935 года в
                                                        Каракалпакcтане было
                                                        открыто
                                                        первое высшее
                                                        учебное заведение —
                                                        учительский институт. В
                                                        1944
                                                        году он был преобразован
                                                        в
                                                        Каракалпакский
                                                        государственный
                                                        педагогический институт,
                                                        на
                                                        базе которого в сентябре
                                                        1976 года
                                                        образовался Нукусский
                                                        государственный
                                                        университет
                                                        имени Т.Шевченко (ныне —
                                                        Каракалпакский
                                                        государственный
                                                        университет
                                                        имени Бердаха).</p>
                                                </div>
                                            </div>
                                            <div className="header-block-flex-list">
                                                <div
                                                    className="header-block-flex-links">
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </li>
                            <li className='header-main-menu-list-li' id="sec_hover">
                                <input type="checkbox" id="sec_menu" />
                                <label htmlFor="sec_menu"
                                    className="header-main-menu-list-li">
                                    ДЕЯТЕЛЬНОСТЬ
                                </label>

                                <div className="header-main-hover">
                                    <div className="header-main-hover-block">
                                        <div className="header-hover-block-flex">
                                            <div className="header-block-flex-part">
                                                <div
                                                    className="header-block-flex-uni">
                                                    <span>ДЕЯТЕЛЬНОСТЬ</span>
                                                    <svg width="48" height="40"
                                                        viewBox="0 0 48 40"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M28.2288 5.83275C25.411 4.72242 22.2531 4.72242 19.4353 5.83275L6.16705 11.061C4.03337 11.9017 3.47709 14.2725 4.49818 15.9111V24.1667C4.49818 24.857 5.16404 25.4167 5.98541 25.4167C6.80677 25.4167 7.47263 24.857 7.47263 24.1667V17.7867L19.4355 22.5005C22.2533 23.6108 25.4112 23.6108 28.229 22.5005L41.4972 17.2723C44.3834 16.1351 44.3834 12.1983 41.4972 11.0611L28.2288 5.83275Z"
                                                            fill="#002B6A" />
                                                        <mask
                                                            id="path-2-inside-1_54_239"
                                                            fill="white">
                                                            <path
                                                                d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z" />
                                                        </mask>
                                                        <path
                                                            d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z"
                                                            fill="#002B6A" />
                                                        <path
                                                            d="M10.3481 20L22.5679 -11.0127L-22.9852 -28.9618V20H10.3481ZM19.8323 23.737L32.0526 -7.27549L32.0521 -7.2757L19.8323 23.737ZM28.6258 23.737L16.4057 -7.2756L16.4055 -7.27552L28.6258 23.737ZM38.1097 20H71.443V-28.9622L25.8897 -11.0126L38.1097 20ZM35.3627 33.0122L49.429 63.2322L49.4304 63.2315L35.3627 33.0122ZM13.0952 33.0122L-0.972122 63.2317L-0.971352 63.2321L13.0952 33.0122ZM-1.87165 51.0127L7.61251 54.7497L32.0521 -7.2757L22.5679 -11.0127L-1.87165 51.0127ZM7.61197 54.7495C18.2828 58.9543 30.1752 58.9543 40.846 54.7495L16.4055 -7.27552C21.4407 -9.25959 27.0173 -9.25962 32.0526 -7.27549L7.61197 54.7495ZM40.8458 54.7496L50.3297 51.0126L25.8897 -11.0126L16.4057 -7.2756L40.8458 54.7496ZM4.77637 20V28.9452H71.443V20H4.77637ZM4.77637 28.9452C4.77637 16.6936 12.1974 7.02788 21.295 2.7928L49.4304 63.2315C62.0251 57.3685 71.443 44.5571 71.443 28.9452H4.77637ZM21.2964 2.79215C20.9854 2.93687 20.6674 3.07659 20.3694 3.19743C20.0619 3.3221 19.8727 3.38728 19.8101 3.40746C19.7238 3.4353 19.9796 3.34579 20.5335 3.23517C20.8263 3.17669 21.2731 3.0981 21.8548 3.03214C22.4308 2.96683 23.2355 2.90283 24.2289 2.90283V69.5695C31.0913 69.5695 36.9819 67.9172 40.2687 66.8574C43.9927 65.6566 47.2321 64.2548 49.429 63.2322L21.2964 2.79215ZM24.2289 2.90283C25.2223 2.90283 26.0271 2.96683 26.6031 3.03214C27.1848 3.0981 27.6315 3.17669 27.9244 3.23517C28.4783 3.34579 28.7341 3.4353 28.6477 3.40747C28.5852 3.3873 28.396 3.32213 28.0886 3.19747C27.7906 3.07664 27.4726 2.93694 27.1618 2.79226L-0.971352 63.2321C1.22571 64.2547 4.46505 65.6566 8.18913 66.8574C11.4759 67.9172 17.3665 69.5695 24.2289 69.5695V2.90283ZM27.1625 2.79262C36.2602 7.0276 43.6815 16.6933 43.6815 28.9452H-22.9852C-22.9852 44.5573 -13.567 57.3687 -0.972122 63.2317L27.1625 2.79262ZM43.6815 28.9452V20H-22.9852V28.9452H43.6815Z"
                                                            fill="#002B6A"
                                                            mask="url(#path-2-inside-1_54_239)" />
                                                    </svg>

                                                </div>

                                                <div
                                                    className="header-block-flex-text">
                                                    <p> Hozirda universitetda 24
                                                        ta bakalavriat va 28 ta
                                                        magistratura
                                                        yo'nalishlari mavjud.
                                                        Talabalarni ta'lim
                                                        bo'yicha kerakli
                                                        kitoblar bo'yicha
                                                        yelektron ARM
                                                        shakllantirilgan.
                                                        Abituriyentlar
                                                        universitetga qabul
                                                        qilish jarayoni bo'yicha
                                                        ma'lumotlarni masofaviy
                                                        tarzda xabardor bo'lishi
                                                        mumkin.</p>
                                                </div>
                                            </div>
                                            <div className="header-block-flex-list">
                                                <div
                                                    className="header-block-flex-links">
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='header-main-menu-list-li' id="th_hover">
                                <input type="checkbox" id="th_menu" />
                                <label htmlFor="th_menu"
                                    className="header-main-menu-list-li">
                                    АБИТУРИЕНТЫ
                                </label>
                                <div className="header-main-hover">
                                    <div className="header-main-hover-block">
                                        <div className="header-hover-block-flex">
                                            <div className="header-block-flex-part">
                                                <div
                                                    className="header-block-flex-uni">
                                                    <span>АБИТУРИЕНТЫ</span>

                                                    <svg width="48" height="40"
                                                        viewBox="0 0 48 40"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M28.2288 5.83275C25.411 4.72242 22.2531 4.72242 19.4353 5.83275L6.16705 11.061C4.03337 11.9017 3.47709 14.2725 4.49818 15.9111V24.1667C4.49818 24.857 5.16404 25.4167 5.98541 25.4167C6.80677 25.4167 7.47263 24.857 7.47263 24.1667V17.7867L19.4355 22.5005C22.2533 23.6108 25.4112 23.6108 28.229 22.5005L41.4972 17.2723C44.3834 16.1351 44.3834 12.1983 41.4972 11.0611L28.2288 5.83275Z"
                                                            fill="#002B6A" />
                                                        <mask
                                                            id="path-2-inside-1_54_239"
                                                            fill="white">
                                                            <path
                                                                d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z" />
                                                        </mask>
                                                        <path
                                                            d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z"
                                                            fill="#002B6A" />
                                                        <path
                                                            d="M10.3481 20L22.5679 -11.0127L-22.9852 -28.9618V20H10.3481ZM19.8323 23.737L32.0526 -7.27549L32.0521 -7.2757L19.8323 23.737ZM28.6258 23.737L16.4057 -7.2756L16.4055 -7.27552L28.6258 23.737ZM38.1097 20H71.443V-28.9622L25.8897 -11.0126L38.1097 20ZM35.3627 33.0122L49.429 63.2322L49.4304 63.2315L35.3627 33.0122ZM13.0952 33.0122L-0.972122 63.2317L-0.971352 63.2321L13.0952 33.0122ZM-1.87165 51.0127L7.61251 54.7497L32.0521 -7.2757L22.5679 -11.0127L-1.87165 51.0127ZM7.61197 54.7495C18.2828 58.9543 30.1752 58.9543 40.846 54.7495L16.4055 -7.27552C21.4407 -9.25959 27.0173 -9.25962 32.0526 -7.27549L7.61197 54.7495ZM40.8458 54.7496L50.3297 51.0126L25.8897 -11.0126L16.4057 -7.2756L40.8458 54.7496ZM4.77637 20V28.9452H71.443V20H4.77637ZM4.77637 28.9452C4.77637 16.6936 12.1974 7.02788 21.295 2.7928L49.4304 63.2315C62.0251 57.3685 71.443 44.5571 71.443 28.9452H4.77637ZM21.2964 2.79215C20.9854 2.93687 20.6674 3.07659 20.3694 3.19743C20.0619 3.3221 19.8727 3.38728 19.8101 3.40746C19.7238 3.4353 19.9796 3.34579 20.5335 3.23517C20.8263 3.17669 21.2731 3.0981 21.8548 3.03214C22.4308 2.96683 23.2355 2.90283 24.2289 2.90283V69.5695C31.0913 69.5695 36.9819 67.9172 40.2687 66.8574C43.9927 65.6566 47.2321 64.2548 49.429 63.2322L21.2964 2.79215ZM24.2289 2.90283C25.2223 2.90283 26.0271 2.96683 26.6031 3.03214C27.1848 3.0981 27.6315 3.17669 27.9244 3.23517C28.4783 3.34579 28.7341 3.4353 28.6477 3.40747C28.5852 3.3873 28.396 3.32213 28.0886 3.19747C27.7906 3.07664 27.4726 2.93694 27.1618 2.79226L-0.971352 63.2321C1.22571 64.2547 4.46505 65.6566 8.18913 66.8574C11.4759 67.9172 17.3665 69.5695 24.2289 69.5695V2.90283ZM27.1625 2.79262C36.2602 7.0276 43.6815 16.6933 43.6815 28.9452H-22.9852C-22.9852 44.5573 -13.567 57.3687 -0.972122 63.2317L27.1625 2.79262ZM43.6815 28.9452V20H-22.9852V28.9452H43.6815Z"
                                                            fill="#002B6A"
                                                            mask="url(#path-2-inside-1_54_239)" />
                                                    </svg>

                                                </div>

                                                <div
                                                    className="header-block-flex-text">
                                                    <p> В сентябре 1935 года в
                                                        Каракалпакcтане было
                                                        открыто
                                                        первое высшее
                                                        учебное заведение —
                                                        учительский институт. В
                                                        1944
                                                        году он был преобразован
                                                        в
                                                        Каракалпакский
                                                        государственный
                                                        педагогический институт,
                                                        на
                                                        базе которого в сентябре
                                                        1976 года
                                                        образовался Нукусский
                                                        государственный
                                                        университет
                                                        имени Т.Шевченко (ныне —
                                                        Каракалпакский
                                                        государственный
                                                        университет
                                                        имени Бердаха).</p>
                                                </div>
                                            </div>
                                            <div className="header-block-flex-list">
                                                <div
                                                    className="header-block-flex-links">
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='header-main-menu-list-li' id="fr_hover">
                                <input type="checkbox" id="fr_menu" />
                                <label htmlFor="fr_menu"
                                    className="header-main-menu-list-li">
                                    СТУДЕНТЫ

                                </label>
                                <div className="header-main-hover">
                                    <div className="header-main-hover-block">
                                        <div className="header-hover-block-flex">
                                            <div className="header-block-flex-part">
                                                <div
                                                    className="header-block-flex-uni">
                                                    <span>СТУДЕНТЫ</span>
                                                    <svg width="48" height="40"
                                                        viewBox="0 0 48 40"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M28.2288 5.83275C25.411 4.72242 22.2531 4.72242 19.4353 5.83275L6.16705 11.061C4.03337 11.9017 3.47709 14.2725 4.49818 15.9111V24.1667C4.49818 24.857 5.16404 25.4167 5.98541 25.4167C6.80677 25.4167 7.47263 24.857 7.47263 24.1667V17.7867L19.4355 22.5005C22.2533 23.6108 25.4112 23.6108 28.229 22.5005L41.4972 17.2723C44.3834 16.1351 44.3834 12.1983 41.4972 11.0611L28.2288 5.83275Z"
                                                            fill="#002B6A" />
                                                        <mask
                                                            id="path-2-inside-1_54_239"
                                                            fill="white">
                                                            <path
                                                                d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z" />
                                                        </mask>
                                                        <path
                                                            d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z"
                                                            fill="#002B6A" />
                                                        <path
                                                            d="M10.3481 20L22.5679 -11.0127L-22.9852 -28.9618V20H10.3481ZM19.8323 23.737L32.0526 -7.27549L32.0521 -7.2757L19.8323 23.737ZM28.6258 23.737L16.4057 -7.2756L16.4055 -7.27552L28.6258 23.737ZM38.1097 20H71.443V-28.9622L25.8897 -11.0126L38.1097 20ZM35.3627 33.0122L49.429 63.2322L49.4304 63.2315L35.3627 33.0122ZM13.0952 33.0122L-0.972122 63.2317L-0.971352 63.2321L13.0952 33.0122ZM-1.87165 51.0127L7.61251 54.7497L32.0521 -7.2757L22.5679 -11.0127L-1.87165 51.0127ZM7.61197 54.7495C18.2828 58.9543 30.1752 58.9543 40.846 54.7495L16.4055 -7.27552C21.4407 -9.25959 27.0173 -9.25962 32.0526 -7.27549L7.61197 54.7495ZM40.8458 54.7496L50.3297 51.0126L25.8897 -11.0126L16.4057 -7.2756L40.8458 54.7496ZM4.77637 20V28.9452H71.443V20H4.77637ZM4.77637 28.9452C4.77637 16.6936 12.1974 7.02788 21.295 2.7928L49.4304 63.2315C62.0251 57.3685 71.443 44.5571 71.443 28.9452H4.77637ZM21.2964 2.79215C20.9854 2.93687 20.6674 3.07659 20.3694 3.19743C20.0619 3.3221 19.8727 3.38728 19.8101 3.40746C19.7238 3.4353 19.9796 3.34579 20.5335 3.23517C20.8263 3.17669 21.2731 3.0981 21.8548 3.03214C22.4308 2.96683 23.2355 2.90283 24.2289 2.90283V69.5695C31.0913 69.5695 36.9819 67.9172 40.2687 66.8574C43.9927 65.6566 47.2321 64.2548 49.429 63.2322L21.2964 2.79215ZM24.2289 2.90283C25.2223 2.90283 26.0271 2.96683 26.6031 3.03214C27.1848 3.0981 27.6315 3.17669 27.9244 3.23517C28.4783 3.34579 28.7341 3.4353 28.6477 3.40747C28.5852 3.3873 28.396 3.32213 28.0886 3.19747C27.7906 3.07664 27.4726 2.93694 27.1618 2.79226L-0.971352 63.2321C1.22571 64.2547 4.46505 65.6566 8.18913 66.8574C11.4759 67.9172 17.3665 69.5695 24.2289 69.5695V2.90283ZM27.1625 2.79262C36.2602 7.0276 43.6815 16.6933 43.6815 28.9452H-22.9852C-22.9852 44.5573 -13.567 57.3687 -0.972122 63.2317L27.1625 2.79262ZM43.6815 28.9452V20H-22.9852V28.9452H43.6815Z"
                                                            fill="#002B6A"
                                                            mask="url(#path-2-inside-1_54_239)" />
                                                    </svg>

                                                </div>

                                                <div
                                                    className="header-block-flex-text">
                                                    <p> В сентябре 1935 года в
                                                        Каракалпакcтане было
                                                        открыто
                                                        первое высшее
                                                        учебное заведение —
                                                        учительский институт. В
                                                        1944
                                                        году он был преобразован
                                                        в
                                                        Каракалпакский
                                                        государственный
                                                        педагогический институт,
                                                        на
                                                        базе которого в сентябре
                                                        1976 года
                                                        образовался Нукусский
                                                        государственный
                                                        университет
                                                        имени Т.Шевченко (ныне —
                                                        Каракалпакский
                                                        государственный
                                                        университет
                                                        имени Бердаха).</p>
                                                </div>
                                            </div>
                                            <div className="header-block-flex-list">
                                                <div
                                                    className="header-block-flex-links">
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='header-main-menu-list-li' id="ff_hover">
                                <input type="checkbox" id="ff_menu" />
                                <label htmlFor="ff_menu"
                                    className="header-main-menu-list-li">
                                    МЕЖДУНАРОДНАЯ ДЕЯТЕЛЬНОСТЬ
                                </label>
                                <div className="header-main-hover">
                                    <div className="header-main-hover-block">
                                        <div className="header-hover-block-flex">
                                            <div className="header-block-flex-part">
                                                <div
                                                    className="header-block-flex-uni">
                                                    <span>МЕЖДУНАРОДНАЯ
                                                        ДЕЯТЕЛЬНОСТЬ</span>
                                                    <svg width="48" height="40"
                                                        viewBox="0 0 48 40"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M28.2288 5.83275C25.411 4.72242 22.2531 4.72242 19.4353 5.83275L6.16705 11.061C4.03337 11.9017 3.47709 14.2725 4.49818 15.9111V24.1667C4.49818 24.857 5.16404 25.4167 5.98541 25.4167C6.80677 25.4167 7.47263 24.857 7.47263 24.1667V17.7867L19.4355 22.5005C22.2533 23.6108 25.4112 23.6108 28.229 22.5005L41.4972 17.2723C44.3834 16.1351 44.3834 12.1983 41.4972 11.0611L28.2288 5.83275Z"
                                                            fill="#002B6A" />
                                                        <mask
                                                            id="path-2-inside-1_54_239"
                                                            fill="white">
                                                            <path
                                                                d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z" />
                                                        </mask>
                                                        <path
                                                            d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z"
                                                            fill="#002B6A" />
                                                        <path
                                                            d="M10.3481 20L22.5679 -11.0127L-22.9852 -28.9618V20H10.3481ZM19.8323 23.737L32.0526 -7.27549L32.0521 -7.2757L19.8323 23.737ZM28.6258 23.737L16.4057 -7.2756L16.4055 -7.27552L28.6258 23.737ZM38.1097 20H71.443V-28.9622L25.8897 -11.0126L38.1097 20ZM35.3627 33.0122L49.429 63.2322L49.4304 63.2315L35.3627 33.0122ZM13.0952 33.0122L-0.972122 63.2317L-0.971352 63.2321L13.0952 33.0122ZM-1.87165 51.0127L7.61251 54.7497L32.0521 -7.2757L22.5679 -11.0127L-1.87165 51.0127ZM7.61197 54.7495C18.2828 58.9543 30.1752 58.9543 40.846 54.7495L16.4055 -7.27552C21.4407 -9.25959 27.0173 -9.25962 32.0526 -7.27549L7.61197 54.7495ZM40.8458 54.7496L50.3297 51.0126L25.8897 -11.0126L16.4057 -7.2756L40.8458 54.7496ZM4.77637 20V28.9452H71.443V20H4.77637ZM4.77637 28.9452C4.77637 16.6936 12.1974 7.02788 21.295 2.7928L49.4304 63.2315C62.0251 57.3685 71.443 44.5571 71.443 28.9452H4.77637ZM21.2964 2.79215C20.9854 2.93687 20.6674 3.07659 20.3694 3.19743C20.0619 3.3221 19.8727 3.38728 19.8101 3.40746C19.7238 3.4353 19.9796 3.34579 20.5335 3.23517C20.8263 3.17669 21.2731 3.0981 21.8548 3.03214C22.4308 2.96683 23.2355 2.90283 24.2289 2.90283V69.5695C31.0913 69.5695 36.9819 67.9172 40.2687 66.8574C43.9927 65.6566 47.2321 64.2548 49.429 63.2322L21.2964 2.79215ZM24.2289 2.90283C25.2223 2.90283 26.0271 2.96683 26.6031 3.03214C27.1848 3.0981 27.6315 3.17669 27.9244 3.23517C28.4783 3.34579 28.7341 3.4353 28.6477 3.40747C28.5852 3.3873 28.396 3.32213 28.0886 3.19747C27.7906 3.07664 27.4726 2.93694 27.1618 2.79226L-0.971352 63.2321C1.22571 64.2547 4.46505 65.6566 8.18913 66.8574C11.4759 67.9172 17.3665 69.5695 24.2289 69.5695V2.90283ZM27.1625 2.79262C36.2602 7.0276 43.6815 16.6933 43.6815 28.9452H-22.9852C-22.9852 44.5573 -13.567 57.3687 -0.972122 63.2317L27.1625 2.79262ZM43.6815 28.9452V20H-22.9852V28.9452H43.6815Z"
                                                            fill="#002B6A"
                                                            mask="url(#path-2-inside-1_54_239)" />
                                                    </svg>

                                                </div>

                                                <div
                                                    className="header-block-flex-text">
                                                    <p> В сентябре 1935 года в
                                                        Каракалпакcтане было
                                                        открыто
                                                        первое высшее
                                                        учебное заведение —
                                                        учительский институт. В
                                                        1944
                                                        году он был преобразован
                                                        в
                                                        Каракалпакский
                                                        государственный
                                                        педагогический институт,
                                                        на
                                                        базе которого в сентябре
                                                        1976 года
                                                        образовался Нукусский
                                                        государственный
                                                        университет
                                                        имени Т.Шевченко (ныне —
                                                        Каракалпакский
                                                        государственный
                                                        университет
                                                        имени Бердаха).</p>
                                                </div>
                                            </div>
                                            <div className="header-block-flex-list">
                                                <div
                                                    className="header-block-flex-links">
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='header-main-menu-list-li' id="six_hover">
                                <input type="checkbox" id="six_menu" />
                                <label htmlFor="six_menu"
                                    className="header-main-menu-list-li">
                                    НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ
                                </label>
                                <div className="header-main-hover">
                                    <div className="header-main-hover-block">
                                        <div className="header-hover-block-flex">
                                            <div className="header-block-flex-part">
                                                <div
                                                    className="header-block-flex-uni">
                                                    <span>НАУЧНАЯ
                                                        ДЕЯТЕЛЬНОСТЬ</span>
                                                    <svg width="48" height="40"
                                                        viewBox="0 0 48 40"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M28.2288 5.83275C25.411 4.72242 22.2531 4.72242 19.4353 5.83275L6.16705 11.061C4.03337 11.9017 3.47709 14.2725 4.49818 15.9111V24.1667C4.49818 24.857 5.16404 25.4167 5.98541 25.4167C6.80677 25.4167 7.47263 24.857 7.47263 24.1667V17.7867L19.4355 22.5005C22.2533 23.6108 25.4112 23.6108 28.229 22.5005L41.4972 17.2723C44.3834 16.1351 44.3834 12.1983 41.4972 11.0611L28.2288 5.83275Z"
                                                            fill="#002B6A" />
                                                        <mask
                                                            id="path-2-inside-1_54_239"
                                                            fill="white">
                                                            <path
                                                                d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z" />
                                                        </mask>
                                                        <path
                                                            d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z"
                                                            fill="#002B6A" />
                                                        <path
                                                            d="M10.3481 20L22.5679 -11.0127L-22.9852 -28.9618V20H10.3481ZM19.8323 23.737L32.0526 -7.27549L32.0521 -7.2757L19.8323 23.737ZM28.6258 23.737L16.4057 -7.2756L16.4055 -7.27552L28.6258 23.737ZM38.1097 20H71.443V-28.9622L25.8897 -11.0126L38.1097 20ZM35.3627 33.0122L49.429 63.2322L49.4304 63.2315L35.3627 33.0122ZM13.0952 33.0122L-0.972122 63.2317L-0.971352 63.2321L13.0952 33.0122ZM-1.87165 51.0127L7.61251 54.7497L32.0521 -7.2757L22.5679 -11.0127L-1.87165 51.0127ZM7.61197 54.7495C18.2828 58.9543 30.1752 58.9543 40.846 54.7495L16.4055 -7.27552C21.4407 -9.25959 27.0173 -9.25962 32.0526 -7.27549L7.61197 54.7495ZM40.8458 54.7496L50.3297 51.0126L25.8897 -11.0126L16.4057 -7.2756L40.8458 54.7496ZM4.77637 20V28.9452H71.443V20H4.77637ZM4.77637 28.9452C4.77637 16.6936 12.1974 7.02788 21.295 2.7928L49.4304 63.2315C62.0251 57.3685 71.443 44.5571 71.443 28.9452H4.77637ZM21.2964 2.79215C20.9854 2.93687 20.6674 3.07659 20.3694 3.19743C20.0619 3.3221 19.8727 3.38728 19.8101 3.40746C19.7238 3.4353 19.9796 3.34579 20.5335 3.23517C20.8263 3.17669 21.2731 3.0981 21.8548 3.03214C22.4308 2.96683 23.2355 2.90283 24.2289 2.90283V69.5695C31.0913 69.5695 36.9819 67.9172 40.2687 66.8574C43.9927 65.6566 47.2321 64.2548 49.429 63.2322L21.2964 2.79215ZM24.2289 2.90283C25.2223 2.90283 26.0271 2.96683 26.6031 3.03214C27.1848 3.0981 27.6315 3.17669 27.9244 3.23517C28.4783 3.34579 28.7341 3.4353 28.6477 3.40747C28.5852 3.3873 28.396 3.32213 28.0886 3.19747C27.7906 3.07664 27.4726 2.93694 27.1618 2.79226L-0.971352 63.2321C1.22571 64.2547 4.46505 65.6566 8.18913 66.8574C11.4759 67.9172 17.3665 69.5695 24.2289 69.5695V2.90283ZM27.1625 2.79262C36.2602 7.0276 43.6815 16.6933 43.6815 28.9452H-22.9852C-22.9852 44.5573 -13.567 57.3687 -0.972122 63.2317L27.1625 2.79262ZM43.6815 28.9452V20H-22.9852V28.9452H43.6815Z"
                                                            fill="#002B6A"
                                                            mask="url(#path-2-inside-1_54_239)" />
                                                    </svg>

                                                </div>

                                                <div
                                                    className="header-block-flex-text">
                                                    <p> В сентябре 1935 года в
                                                        Каракалпакcтане было
                                                        открыто
                                                        первое высшее
                                                        учебное заведение —
                                                        учительский институт. В
                                                        1944
                                                        году он был преобразован
                                                        в
                                                        Каракалпакский
                                                        государственный
                                                        педагогический институт,
                                                        на
                                                        базе которого в сентябре
                                                        1976 года
                                                        образовался Нукусский
                                                        государственный
                                                        университет
                                                        имени Т.Шевченко (ныне —
                                                        Каракалпакский
                                                        государственный
                                                        университет
                                                        имени Бердаха).</p>
                                                </div>
                                            </div>
                                            <div className="header-block-flex-list">
                                                <div
                                                    className="header-block-flex-links">
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='header-main-menu-list-li' id="sv_hover">
                                <input type="checkbox" id="sv_menu" />
                                <label htmlFor="sv_menu"
                                    className="header-main-menu-list-li">
                                    МАРКЕТИНГ
                                </label>
                                <div className="header-main-hover">
                                    <div className="header-main-hover-block">
                                        <div className="header-hover-block-flex">
                                            <div className="header-block-flex-part">
                                                <div
                                                    className="header-block-flex-uni">
                                                    <span>МАРКЕТИНГ</span>
                                                    <svg width="48" height="40"
                                                        viewBox="0 0 48 40"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M28.2288 5.83275C25.411 4.72242 22.2531 4.72242 19.4353 5.83275L6.16705 11.061C4.03337 11.9017 3.47709 14.2725 4.49818 15.9111V24.1667C4.49818 24.857 5.16404 25.4167 5.98541 25.4167C6.80677 25.4167 7.47263 24.857 7.47263 24.1667V17.7867L19.4355 22.5005C22.2533 23.6108 25.4112 23.6108 28.229 22.5005L41.4972 17.2723C44.3834 16.1351 44.3834 12.1983 41.4972 11.0611L28.2288 5.83275Z"
                                                            fill="#002B6A" />
                                                        <mask
                                                            id="path-2-inside-1_54_239"
                                                            fill="white">
                                                            <path
                                                                d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z" />
                                                        </mask>
                                                        <path
                                                            d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z"
                                                            fill="#002B6A" />
                                                        <path
                                                            d="M10.3481 20L22.5679 -11.0127L-22.9852 -28.9618V20H10.3481ZM19.8323 23.737L32.0526 -7.27549L32.0521 -7.2757L19.8323 23.737ZM28.6258 23.737L16.4057 -7.2756L16.4055 -7.27552L28.6258 23.737ZM38.1097 20H71.443V-28.9622L25.8897 -11.0126L38.1097 20ZM35.3627 33.0122L49.429 63.2322L49.4304 63.2315L35.3627 33.0122ZM13.0952 33.0122L-0.972122 63.2317L-0.971352 63.2321L13.0952 33.0122ZM-1.87165 51.0127L7.61251 54.7497L32.0521 -7.2757L22.5679 -11.0127L-1.87165 51.0127ZM7.61197 54.7495C18.2828 58.9543 30.1752 58.9543 40.846 54.7495L16.4055 -7.27552C21.4407 -9.25959 27.0173 -9.25962 32.0526 -7.27549L7.61197 54.7495ZM40.8458 54.7496L50.3297 51.0126L25.8897 -11.0126L16.4057 -7.2756L40.8458 54.7496ZM4.77637 20V28.9452H71.443V20H4.77637ZM4.77637 28.9452C4.77637 16.6936 12.1974 7.02788 21.295 2.7928L49.4304 63.2315C62.0251 57.3685 71.443 44.5571 71.443 28.9452H4.77637ZM21.2964 2.79215C20.9854 2.93687 20.6674 3.07659 20.3694 3.19743C20.0619 3.3221 19.8727 3.38728 19.8101 3.40746C19.7238 3.4353 19.9796 3.34579 20.5335 3.23517C20.8263 3.17669 21.2731 3.0981 21.8548 3.03214C22.4308 2.96683 23.2355 2.90283 24.2289 2.90283V69.5695C31.0913 69.5695 36.9819 67.9172 40.2687 66.8574C43.9927 65.6566 47.2321 64.2548 49.429 63.2322L21.2964 2.79215ZM24.2289 2.90283C25.2223 2.90283 26.0271 2.96683 26.6031 3.03214C27.1848 3.0981 27.6315 3.17669 27.9244 3.23517C28.4783 3.34579 28.7341 3.4353 28.6477 3.40747C28.5852 3.3873 28.396 3.32213 28.0886 3.19747C27.7906 3.07664 27.4726 2.93694 27.1618 2.79226L-0.971352 63.2321C1.22571 64.2547 4.46505 65.6566 8.18913 66.8574C11.4759 67.9172 17.3665 69.5695 24.2289 69.5695V2.90283ZM27.1625 2.79262C36.2602 7.0276 43.6815 16.6933 43.6815 28.9452H-22.9852C-22.9852 44.5573 -13.567 57.3687 -0.972122 63.2317L27.1625 2.79262ZM43.6815 28.9452V20H-22.9852V28.9452H43.6815Z"
                                                            fill="#002B6A"
                                                            mask="url(#path-2-inside-1_54_239)" />
                                                    </svg>

                                                </div>

                                                <div
                                                    className="header-block-flex-text">
                                                    <p> В сентябре 1935 года в
                                                        Каракалпакcтане было
                                                        открыто
                                                        первое высшее
                                                        учебное заведение —
                                                        учительский институт. В
                                                        1944
                                                        году он был преобразован
                                                        в
                                                        Каракалпакский
                                                        государственный
                                                        педагогический институт,
                                                        на
                                                        базе которого в сентябре
                                                        1976 года
                                                        образовался Нукусский
                                                        государственный
                                                        университет
                                                        имени Т.Шевченко (ныне —
                                                        Каракалпакский
                                                        государственный
                                                        университет
                                                        имени Бердаха).</p>
                                                </div>
                                            </div>
                                            <div className="header-block-flex-list">
                                                <div
                                                    className="header-block-flex-links">
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='header-main-menu-list-li' id="eh_hover">
                                <input type="checkbox" id="eh_menu" />
                                <label htmlFor="eh_menu"
                                    className="header-main-menu-list-li">
                                    НОРМАТИВНЫЕ ДОКУМЕНТЫ
                                </label>
                                <div className="header-main-hover">
                                    <div className="header-main-hover-block">
                                        <div className="header-hover-block-flex">
                                            <div className="header-block-flex-part">
                                                <div
                                                    className="header-block-flex-uni">
                                                    <span>НОРМАТИВНЫЕ
                                                        ДОКУМЕНТЫ</span>
                                                    <svg width="48" height="40"
                                                        viewBox="0 0 48 40"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M28.2288 5.83275C25.411 4.72242 22.2531 4.72242 19.4353 5.83275L6.16705 11.061C4.03337 11.9017 3.47709 14.2725 4.49818 15.9111V24.1667C4.49818 24.857 5.16404 25.4167 5.98541 25.4167C6.80677 25.4167 7.47263 24.857 7.47263 24.1667V17.7867L19.4355 22.5005C22.2533 23.6108 25.4112 23.6108 28.229 22.5005L41.4972 17.2723C44.3834 16.1351 44.3834 12.1983 41.4972 11.0611L28.2288 5.83275Z"
                                                            fill="#002B6A" />
                                                        <mask
                                                            id="path-2-inside-1_54_239"
                                                            fill="white">
                                                            <path
                                                                d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z" />
                                                        </mask>
                                                        <path
                                                            d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z"
                                                            fill="#002B6A" />
                                                        <path
                                                            d="M10.3481 20L22.5679 -11.0127L-22.9852 -28.9618V20H10.3481ZM19.8323 23.737L32.0526 -7.27549L32.0521 -7.2757L19.8323 23.737ZM28.6258 23.737L16.4057 -7.2756L16.4055 -7.27552L28.6258 23.737ZM38.1097 20H71.443V-28.9622L25.8897 -11.0126L38.1097 20ZM35.3627 33.0122L49.429 63.2322L49.4304 63.2315L35.3627 33.0122ZM13.0952 33.0122L-0.972122 63.2317L-0.971352 63.2321L13.0952 33.0122ZM-1.87165 51.0127L7.61251 54.7497L32.0521 -7.2757L22.5679 -11.0127L-1.87165 51.0127ZM7.61197 54.7495C18.2828 58.9543 30.1752 58.9543 40.846 54.7495L16.4055 -7.27552C21.4407 -9.25959 27.0173 -9.25962 32.0526 -7.27549L7.61197 54.7495ZM40.8458 54.7496L50.3297 51.0126L25.8897 -11.0126L16.4057 -7.2756L40.8458 54.7496ZM4.77637 20V28.9452H71.443V20H4.77637ZM4.77637 28.9452C4.77637 16.6936 12.1974 7.02788 21.295 2.7928L49.4304 63.2315C62.0251 57.3685 71.443 44.5571 71.443 28.9452H4.77637ZM21.2964 2.79215C20.9854 2.93687 20.6674 3.07659 20.3694 3.19743C20.0619 3.3221 19.8727 3.38728 19.8101 3.40746C19.7238 3.4353 19.9796 3.34579 20.5335 3.23517C20.8263 3.17669 21.2731 3.0981 21.8548 3.03214C22.4308 2.96683 23.2355 2.90283 24.2289 2.90283V69.5695C31.0913 69.5695 36.9819 67.9172 40.2687 66.8574C43.9927 65.6566 47.2321 64.2548 49.429 63.2322L21.2964 2.79215ZM24.2289 2.90283C25.2223 2.90283 26.0271 2.96683 26.6031 3.03214C27.1848 3.0981 27.6315 3.17669 27.9244 3.23517C28.4783 3.34579 28.7341 3.4353 28.6477 3.40747C28.5852 3.3873 28.396 3.32213 28.0886 3.19747C27.7906 3.07664 27.4726 2.93694 27.1618 2.79226L-0.971352 63.2321C1.22571 64.2547 4.46505 65.6566 8.18913 66.8574C11.4759 67.9172 17.3665 69.5695 24.2289 69.5695V2.90283ZM27.1625 2.79262C36.2602 7.0276 43.6815 16.6933 43.6815 28.9452H-22.9852C-22.9852 44.5573 -13.567 57.3687 -0.972122 63.2317L27.1625 2.79262ZM43.6815 28.9452V20H-22.9852V28.9452H43.6815Z"
                                                            fill="#002B6A"
                                                            mask="url(#path-2-inside-1_54_239)" />
                                                    </svg>

                                                </div>

                                                <div
                                                    className="header-block-flex-text">
                                                    <p> В сентябре 1935 года в
                                                        Каракалпакcтане было
                                                        открыто
                                                        первое высшее
                                                        учебное заведение —
                                                        учительский институт. В
                                                        1944
                                                        году он был преобразован
                                                        в
                                                        Каракалпакский
                                                        государственный
                                                        педагогический институт,
                                                        на
                                                        базе которого в сентябре
                                                        1976 года
                                                        образовался Нукусский
                                                        государственный
                                                        университет
                                                        имени Т.Шевченко (ныне —
                                                        Каракалпакский
                                                        государственный
                                                        университет
                                                        имени Бердаха).</p>
                                                </div>
                                            </div>
                                            <div className="header-block-flex-list">
                                                <div
                                                    className="header-block-flex-links">
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='header-main-menu-list-li' id="nn_hover">
                                <input type="checkbox" id="nn_menu" />
                                <label htmlFor="nn_menu"
                                    className="header-main-menu-list-li">
                                    ОПРОСНИК
                                </label>
                                <div className="header-main-hover">
                                    <div className="header-main-hover-block">
                                        <div className="header-hover-block-flex">
                                            <div className="header-block-flex-part">
                                                <div
                                                    className="header-block-flex-uni">
                                                    <span>ОПРОСНИК</span>
                                                    <svg width="48" height="40"
                                                        viewBox="0 0 48 40"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M28.2288 5.83275C25.411 4.72242 22.2531 4.72242 19.4353 5.83275L6.16705 11.061C4.03337 11.9017 3.47709 14.2725 4.49818 15.9111V24.1667C4.49818 24.857 5.16404 25.4167 5.98541 25.4167C6.80677 25.4167 7.47263 24.857 7.47263 24.1667V17.7867L19.4355 22.5005C22.2533 23.6108 25.4112 23.6108 28.229 22.5005L41.4972 17.2723C44.3834 16.1351 44.3834 12.1983 41.4972 11.0611L28.2288 5.83275Z"
                                                            fill="#002B6A" />
                                                        <mask
                                                            id="path-2-inside-1_54_239"
                                                            fill="white">
                                                            <path
                                                                d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z" />
                                                        </mask>
                                                        <path
                                                            d="M10.3481 20L19.8323 23.737C22.6501 24.8473 25.808 24.8473 28.6258 23.737L38.1097 20V28.9452C38.1097 30.6253 37.1113 32.1982 35.3627 33.0122C32.4509 34.3675 27.7903 36.2362 24.2289 36.2362C20.6675 36.2362 16.0069 34.3675 13.0952 33.0122C11.3466 32.1982 10.3481 30.6253 10.3481 28.9452V20Z"
                                                            fill="#002B6A" />
                                                        <path
                                                            d="M10.3481 20L22.5679 -11.0127L-22.9852 -28.9618V20H10.3481ZM19.8323 23.737L32.0526 -7.27549L32.0521 -7.2757L19.8323 23.737ZM28.6258 23.737L16.4057 -7.2756L16.4055 -7.27552L28.6258 23.737ZM38.1097 20H71.443V-28.9622L25.8897 -11.0126L38.1097 20ZM35.3627 33.0122L49.429 63.2322L49.4304 63.2315L35.3627 33.0122ZM13.0952 33.0122L-0.972122 63.2317L-0.971352 63.2321L13.0952 33.0122ZM-1.87165 51.0127L7.61251 54.7497L32.0521 -7.2757L22.5679 -11.0127L-1.87165 51.0127ZM7.61197 54.7495C18.2828 58.9543 30.1752 58.9543 40.846 54.7495L16.4055 -7.27552C21.4407 -9.25959 27.0173 -9.25962 32.0526 -7.27549L7.61197 54.7495ZM40.8458 54.7496L50.3297 51.0126L25.8897 -11.0126L16.4057 -7.2756L40.8458 54.7496ZM4.77637 20V28.9452H71.443V20H4.77637ZM4.77637 28.9452C4.77637 16.6936 12.1974 7.02788 21.295 2.7928L49.4304 63.2315C62.0251 57.3685 71.443 44.5571 71.443 28.9452H4.77637ZM21.2964 2.79215C20.9854 2.93687 20.6674 3.07659 20.3694 3.19743C20.0619 3.3221 19.8727 3.38728 19.8101 3.40746C19.7238 3.4353 19.9796 3.34579 20.5335 3.23517C20.8263 3.17669 21.2731 3.0981 21.8548 3.03214C22.4308 2.96683 23.2355 2.90283 24.2289 2.90283V69.5695C31.0913 69.5695 36.9819 67.9172 40.2687 66.8574C43.9927 65.6566 47.2321 64.2548 49.429 63.2322L21.2964 2.79215ZM24.2289 2.90283C25.2223 2.90283 26.0271 2.96683 26.6031 3.03214C27.1848 3.0981 27.6315 3.17669 27.9244 3.23517C28.4783 3.34579 28.7341 3.4353 28.6477 3.40747C28.5852 3.3873 28.396 3.32213 28.0886 3.19747C27.7906 3.07664 27.4726 2.93694 27.1618 2.79226L-0.971352 63.2321C1.22571 64.2547 4.46505 65.6566 8.18913 66.8574C11.4759 67.9172 17.3665 69.5695 24.2289 69.5695V2.90283ZM27.1625 2.79262C36.2602 7.0276 43.6815 16.6933 43.6815 28.9452H-22.9852C-22.9852 44.5573 -13.567 57.3687 -0.972122 63.2317L27.1625 2.79262ZM43.6815 28.9452V20H-22.9852V28.9452H43.6815Z"
                                                            fill="#002B6A"
                                                            mask="url(#path-2-inside-1_54_239)" />
                                                    </svg>

                                                </div>

                                                <div
                                                    className="header-block-flex-text">
                                                    <p> В сентябре 1935 года в
                                                        Каракалпакcтане было
                                                        открыто
                                                        первое высшее
                                                        учебное заведение —
                                                        учительский институт. В
                                                        1944
                                                        году он был преобразован
                                                        в
                                                        Каракалпакский
                                                        государственный
                                                        педагогический институт,
                                                        на
                                                        базе которого в сентябре
                                                        1976 года
                                                        образовался Нукусский
                                                        государственный
                                                        университет
                                                        имени Т.Шевченко (ныне —
                                                        Каракалпакский
                                                        государственный
                                                        университет
                                                        имени Бердаха).</p>
                                                </div>
                                            </div>
                                            <div className="header-block-flex-list">
                                                <div
                                                    className="header-block-flex-links">
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Админстрация</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">История
                                                        университета</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Правила
                                                        внутренного
                                                        распорядка</a>
                                                    <a href="#"
                                                        className="header-block-flex-link">Устав
                                                        университета</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="header-main-nav">
                    <div className="nav-container">
                        <div className="header-main-nav-row">
                            <div className="header-main-nav-row-1">
                                <Image src="/icon.png" alt='icons'  width={20} height={20} />
                                <a href="#"
                                    className="header-row-title">КАРАКАЛПАКСКИЙ
                                    ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ
                                </a>
                            </div>
                            <div className="header-main-nav-row-2">
                                <p>Просвещение искал я благое</p>
                                <p>Berdakh</p>
                                <span className="quote-span">Call Markaz:
                                    &nbsp;&nbsp;&nbsp;+998 61 223 60 78
                                    &nbsp;&nbsp;&nbsp;+99861-223-59-25</span>
                            </div>
                        </div>
                        <div className="header-main-nav-container">
                            <div className="header-main-nav-column">
                                <div className="header-main-nav-column-1">
                                    <div className="menu-btn">
                                        <button>
                                            <i className="fa-solid fa-x"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="header-main-nav-column-2">
                                    <ul>
                                        <a href="#"
                                            className="main-title">
                                            <span>UNIVERSITET</span>
                                            <span className="non-active"><i
                                                    className="fa-solid fa-angle-right"></i></span>
                                        </a>

                                        <ul className="header-main-nav-ul">
                                            <a href="#">
                                                <li>Ustav</li>
                                            </a>
                                            <a href="#">
                                                <li>Universitet
                                                    missiyasi</li>
                                            </a>
                                            <a href="#">
                                                <li>Meʼyoriy
                                                    hujjatlar</li>
                                            </a>
                                            <a href="#">
                                                <li>Rahbariyat</li>
                                            </a>
                                            <a href="#">
                                                <li>Tashkiliy
                                                    tuzilma</li>
                                            </a>
                                            <a href="#">
                                                <li>Kengashlar</li>
                                            </a>
                                            <a href="#">
                                                <li>Ustav</li>
                                            </a>
                                            <a href="#">
                                                <li>Universitet
                                                    missiyasi</li>
                                            </a>
                                            <a href="#">
                                                <li>Meʼyoriy
                                                    hujjatlar</li>
                                            </a>
                                            <a href="#">
                                                <li>Rahbariyat</li>
                                            </a>
                                            <a href="#">
                                                <li>Tashkiliy
                                                    tuzilma</li>
                                            </a>
                                            <a href="#">
                                                <li>Kengashlar</li>
                                            </a>
                                            <a href="#">
                                                <li>Reytinglar</li>
                                            </a>
                                            <a href="#">
                                                <li>Rekvizitlar</li>
                                            </a>
                                            <a href="#">
                                                <li>Moliyaviy
                                                    hisobotlar</li>
                                            </a>
                                            <a href="#">
                                                <li>Universitet
                                                    raqamlarda</li>
                                            </a>
                                            <a href="#">
                                                <li>Akkreditatsiya</li>
                                            </a>
                                            <a href="#">
                                                <li>Mashhur
                                                    bitiruvchilar</li>
                                            </a>
                                            <a href="#">
                                                <li>Ochiq
                                                    ma'lumotlar</li>
                                            </a>
                                            <a href="#">
                                                <li>Kafedralar</li>
                                            </a>
                                            <a href="#">
                                                <li>Fakultetlar</li>
                                            </a>
                                            <a href="#">
                                                <li>Markaz, departament va
                                                    bo'limlar</li>
                                            </a>
                                            <a href="#">
                                                <li>Kontrakt
                                                    narxlari</li>
                                            </a>
                                            <a href="#">
                                                <li>Kasaba uyushma
                                                    qo'mitasi</li>
                                            </a>
                                        </ul>

                                    </ul>

                                    <ul>
                                        <a href="#" className="main-title">
                                            <span>Ta'lim</span>
                                            <span className="non-active">
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            <ul className="header-main-nav-ul">
                                                <li>
                                                    <a href="#">Kurs katalogi</a>
                                                </li>
                                                <li>
                                                    <a href="#">Resurslar</a>
                                                </li>
                                                <li>
                                                    <a href="#">Bakalavriat</a>
                                                </li>
                                                <li>
                                                    <a href="#">Magistratura</a>
                                                </li>
                                                <li>
                                                    <a href="#">Malaka
                                                        talablari</a>
                                                </li>
                                                <li>
                                                    <a href="#">O'quv rejalar</a>
                                                </li>
                                                <li>
                                                    <a href="#">O'quv
                                                        dasturlari(Sillabuslar)</a>
                                                </li>
                                                <li>
                                                    <a href="#">Masofaviy o'qitish
                                                        tizimi</a>
                                                </li>
                                            </ul>
                                        </a>
                                    </ul>

                                    <ul>
                                        <a href="#"
                                            className="main-title">
                                                <span>ILM-FAN</span>
                                                <i
                                                    className="fa-solid fa-angle-right"></i>
                                            </a>
                                            <ul className="header-main-nav-ul">
                                                <a href="#">
                                                    <li>Seminarlar</li>
                                                </a>
                                                <a href="#">
                                                    <li>Resurslar</li>
                                                </a>
                                                <a href="#">
                                                    <li>Bakalavriat</li>
                                                </a>
                                                <a href="#">
                                                    <li>Magistratura</li>
                                                </a>
                                                <a href="#">
                                                    <li>Malaka
                                                        talablari</li>
                                                </a>
                                                <a href="#">
                                                    <li>O'quv rejalar</li>
                                                </a>
                                                <a href="#">
                                                    <li>O'quv
                                                        dasturlari(Sillabuslar)</li>
                                                </a>
                                                <a href="#">
                                                    <li>Masofaviy o'qitish
                                                        tizimi</li>
                                                </a>
                                            </ul>

                                        </ul>

                                        <ul>
                                            <a href="#"
                                                className="main-title">
                                                <span>Xalqarolashtirish</span>
                                                <i
                                                    className="fa-solid fa-angle-right"></i>
                                            </a>

                                            <ul className="header-main-nav-ul">
                                                <a href="#">
                                                    <li>Xalqaro aloqalar
                                                        departamenti
                                                        xodimlari</li>
                                                </a>
                                                <a href="#">
                                                    <li>Xalqaro hamkorlik
                                                        aloqalari</li>
                                                </a>
                                                <a href="#">
                                                    <li>Xalqaro
                                                        grantlar</li>
                                                </a>
                                                <a href="#">
                                                    <li>Xalqaro ilmiy
                                                        aloqalari</li>
                                                </a>
                                                <a href="#">
                                                    <li>Xalqaro
                                                        konferensiyalar</li>
                                                </a>
                                                <a href="#">
                                                    <li>Xorijda malaka oshirish
                                                        va ta'lim</li>
                                                </a>
                                                <a href="#">
                                                    <li> Xorijlik pedagoglar
                                                        uchun malaka</li>
                                                </a>
                                            </ul>
                                        </ul>

                                        <ul>
                                            <a href="#"
                                                className="main-title"><span>TALABALAR
                                                    HAYOTI</span>
                                                <i
                                                    className="fa-solid fa-angle-right"></i>
                                            </a>
                                            <ul className="header-main-nav-ul">
                                                <a href="#">
                                                    <li>Jamoaviy
                                                        klublar</li>
                                                </a>
                                                <a href="#">
                                                    <li>Sog'liqni saqlashni
                                                        xizmati</li>
                                                </a>
                                                <a href="#">
                                                    <li>Ijtimoiy hayot</li>
                                                </a>
                                                <a href="#">
                                                    <li>Ijtimoiy
                                                        xonalar</li>
                                                </a>
                                                <a href="#">
                                                    <li>Tanlovlar</li>
                                                </a>
                                                <a href="#">
                                                    <li>Ijtimoiy muhofaza
                                                        markazi</li>
                                                </a>
                                                <a href="#">
                                                    <li>Talabalar turar
                                                        joyi</li>
                                                </a>
                                                <a href="#">
                                                    <li>Sport
                                                        inshootlari</li>
                                                </a>
                                                <a href="#">
                                                    <li>Kafeteriyalar</li>
                                                </a>
                                                <a href="#">
                                                    <li>Kitob do'koni</li>
                                                </a>
                                                <a href="#">
                                                    <li>Imkoniyati cheklanganlar
                                                        uchun qulayliklar</li>
                                                </a>
                                                <a href="#">
                                                    <li>Talaba fikri</li>
                                                </a>
                                            </ul>
                                        </ul>

                                        <ul>
                                            <a href="#"
                                                className="main-title">
                                                <span>QABUL-2024</span>
                                                <i
                                                    className="fa-solid fa-angle-right"></i>
                                            </a>
                                            <div className="header-main-nav-ul">
                                                <a href="#">
                                                    <li>Ikkinchi taʼlim
                                                        to'g'risidagi nizom</li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        Qabul 2024
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        2024/2025 o'quv yili
                                                        uchun
                                                        ikkinchi va undan
                                                        keyingi
                                                        oliy
                                                        ma'lumot olish bo'yicha
                                                        qabul
                                                        shartlari
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        Xalqaro abituriyentlarga
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        Mahalliy abiturentlarga
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        Qabul bo'yicha
                                                        bog'lanish
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        Qabul kvotalari
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        Abituriyentlar uchun
                                                        yo'riqnoma
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        O'qishni ko'chirish
                                                        bo'yicha
                                                        ma'lumotlar
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        Bakalavriatga qabul
                                                        uchun
                                                        ro'yhatdan o'tish
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        Javoblar varaqasi bilan
                                                        ishlash
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        Texnikum bitiruvchilari
                                                        qabuli-2024
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        Tez-tez so'raladigan
                                                        savollarga
                                                        javoblar
                                                    </li>
                                                </a>
                                            </div>
                                        </ul>

                                        <ul>
                                            <a href="#"
                                                className="main-title"><span>Axborot
                                                    xizmati</span>
                                                <i
                                                    className="fa-solid fa-angle-right"></i>
                                            </a>
                                            <ul className="header-main-nav-ul">
                                                <a href="#">
                                                    <li>Yangiliklar</li>
                                                </a>
                                                <a href="#">
                                                    <li>Videogalereya</li>
                                                </a>
                                                <a href="#">
                                                    <li>Kutilayotgan
                                                        tadbirlar</li>
                                                </a>
                                                <a href="#">
                                                    <li>Fotogalereya</li>
                                                </a>
                                                <a href="#">
                                                    <li>Kontaktlar</li>
                                                </a>
                                            </ul>
                                        </ul>

                                        <ul>
                                            <a href="#"
                                                className="main-title">
                                                <span>VAKANSIYALAR</span>
                                                <i
                                                    className="fa-solid fa-angle-right"></i>
                                            </a>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className="header-main-nav-footer">
                                <div className="header-nav-footer-info">
                                    <div>
                                        <a href="#">
                                            <i className="fa-solid fa-phone"></i>
                                            <span>+998 61 223-60-47</span>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <i className="fa-solid fa-envelope"></i>
                                            <span>karsu_info@edu.uz</span>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <i
                                                className="fa-solid fa-location-dot"></i>
                                            <span>Nukus</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="header-nav-footer-by">
                                    <p>Sayt ishlab chiquvchisi:</p>
                                    <a href="https://www.softium.uz">Softium</a>
                                </div>
                            </div>
                        </div>
                    </div>
                      
            </div>
        </>
    )
}

export default Header