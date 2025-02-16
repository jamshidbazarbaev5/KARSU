'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';

export default function MainSlider() {
  useEffect(() => {
    const swiper = new Swiper('.swiper-container-1', {
      loop: true,
      navigation: {
        nextEl: '.main-slider-btn-right',
        prevEl: '.main-slider-btn-left',
      },
    });
  }, []);

  const slides = [1, 2, 3].map((index) => (
    <div className='swiper-slide' key={index}>
      <div className='main-slider-div'>
        <div className='main-slider-div-black'>
          <div className="main-slider-div-black-flex">
            <div className='header-logo-bg'>
              <div className='header-logo'>
                <div className='header-logo-svg-bg'>
                  <Image src="/icon.png" alt="University logo" width={100} height={100} />
                </div>
                <div className='header-logo-title-bg'>
                  <Link href="/" className='header-logo-title'>
                    КАРАКАЛПАКСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ
                  </Link>
                </div>
              </div>
            </div>
            <div className='main-slider-div-data-big'>
              <div className='main-slider-div-data-small'>
                <div className='main-slider-div-data-span-div'>
                  <span className='main-slider-div-data-span-uni-title'>
                    КАРАКАЛПАКСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ
                  </span>
                  <span className='main-slider-div-data-span-text'>
                    ПРИЕМ ЗАЯВОК НА 2024/2025 УЧЕБНЫЙ ГОД
                  </span>
                </div>
                <div className='main-slider-btn-div'>
                  <Link href="#" className='main-slider-btn'>
                    ПОДРОБНЕЕ
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20" fill="none">
                      <path d="M3 10.4569H16M16 10.4569L12.3889 6.4458M16 10.4569L12.3889 14.4681" stroke="white" strokeWidth="1.2" />
                    </svg>
                  </Link>
                </div>
                <div className='main-slider-arrows-div'>
                  <button className='main-slider-btn-left'>
                    {/* Left arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                      <circle cx="20" cy="20.4929" r="19.25" stroke="white" strokeWidth="1.5" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M18.1629 28.6558C17.7968 29.0219 17.2033 29.0219 16.8371 28.6558L9.33713 21.1558C8.971 20.7897 8.971 20.1962 9.33713 19.83L16.8371 12.33C17.2033 11.9639 17.7968 11.9639 18.1629 12.33C18.529 12.6962 18.529 13.2897 18.1629 13.6558L12.2634 19.5554H30C30.5178 19.5554 30.9375 19.9752 30.9375 20.4929C30.9375 21.0107 30.5178 21.4304 30 21.4304H12.2634L18.1629 27.33C18.529 27.6961 18.529 28.2897 18.1629 28.6558Z" fill="white" />
                    </svg>
                  </button>
                  <button className='main-slider-btn-right'>
                    {/* Right arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                      <circle cx="20" cy="20" r="19.25" transform="matrix(-1 0 0 1 40 0.49292)" stroke="white" strokeWidth="1.5" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M21.8371 28.6558C22.2032 29.0219 22.7967 29.0219 23.1629 28.6558L30.6629 21.1558C31.029 20.7897 31.029 20.1962 30.6629 19.83L23.1629 12.33C22.7967 11.9639 22.2032 11.9639 21.8371 12.33C21.471 12.6962 21.471 13.2897 21.8371 13.6558L27.7366 19.5554H10C9.48224 19.5554 9.0625 19.9752 9.0625 20.4929C9.0625 21.0107 9.48224 21.4304 10 21.4304H27.7366L21.8371 27.33C21.471 27.6961 21.471 28.2897 21.8371 28.6558Z" fill="white" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className='main-slider-div-bg'>
      <div className='swiper-container swiper-container-1'>
        <div className='swiper-wrapper'>
          {slides}
        </div>
      </div>
      <div className="main-slider-back">
        <Image 
          src="/eab7b06f-a168-41a4-9491-9ad8c2df0299.jpg" 
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
