"use client";
import { MenuPost } from "@/app/types/menu";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { useRouter } from "next/navigation";
import NewsRubric from "../NewsRubric";
import Slider, { Settings } from "react-slick";
import { useRef, useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import './style.css'

interface MenuPostCardProps {
  post: MenuPost;
  isSinglePost: boolean;
  totalPosts?: number;
  isOuterLink?: boolean;
  outerUrl?: string;
  isPerson?: boolean; // Add this prop
}

// Helper function to format date consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
};

export const MenuPostCard = ({ post, isSinglePost, totalPosts = 1, isOuterLink = false, outerUrl, isPerson }: MenuPostCardProps) => {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const slider1 = useRef<Slider | null>(null);
  const slider2 = useRef<Slider | null>(null);
  const hasImages = post.main_image || (post.images && post.images.length > 0);
  const translation =
    post.translations[i18n.language as keyof typeof post.translations] ||
    post.translations.en;

  // Configure DOMPurify to allow iframes from trusted sources
  const purifyConfig = {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src'],
  };

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const mainSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: nav2 || undefined,
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  const thumbnailSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    focusOnSelect: true,
    asNavFor: nav1 || undefined,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  const handleClick = () => {
    if (isOuterLink && outerUrl) {
      window.open(outerUrl, '_blank');
      return;
    }

    if (!isSinglePost) {
      if (isPerson) {
        router.push(`/${i18n.language}/menus/persons/${post.id}`);
      } else {
        router.push(`/${i18n.language}/menus/main/posts/${translation.slug}`);
      }
    }
  };

  const sliderImages = [
    ...(post.main_image ? [{ src: post.main_image, alt: translation.title }] : []),
    ...(post.images && Array.isArray(post.images) 
      ? post.images.map((img: any, index) => ({
          src: typeof img === 'string' ? img : img.image,
          alt: `${translation.title} - ${index + 1}`
        }))
      : [])
  ];

  if (isSinglePost) {
    return (
      <main className="main">
        <div className="container">
          {hasImages ? (
            <div className="main-news">
              <div className="main-news-block">
                <div className="main-news-block-title">
                  <h1>{translation.title}</h1>
                </div>

                <div className="main-news-block-photo">
                  <Image
                    src={post.main_image}
                    alt={translation.title}
                    width={800}
                    height={400}
                    priority
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>

                <div
                  className="main-news-block-text"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(translation.description, purifyConfig),
                  }}
                />

                {/* Additional Images Slider */}
                {!isPerson && sliderImages.length > 0 && (
                  <div
                    className="main-news-block-slider"
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    <Slider
                      {...mainSettings}
                      ref={slider1}
                      className="main-block-slider-for"
                    >
                      {sliderImages.map((image, index) => (
                        <div key={index} className="slide">
                          <div className="slide-image-wrapper">
                            {image.src && (
                              <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 800px) 100vw, 800px"
                                className="slider-image"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </Slider>

                    {sliderImages.length > 1 && (
                      <Slider
                        {...thumbnailSettings}
                        ref={slider2}
                        className="thumbnail-slider"
                      >
                        {sliderImages.map((image, index) => (
                          <div key={index} className="thumbnail">
                            <div className="thumbnail-image-wrapper">
                              {image.src && (
                                <Image
                                  src={image.src}
                                  alt={image.alt}
                                  fill
                                  sizes="(max-width: 150px) 100vw, 150px"
                                  className="thumbnail-image"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </Slider>
                    )}
                  </div>
                )}
              </div>
              <NewsRubric />
            </div>
          ) : (
            <div className="content">
              <div
                className="faculty-block  tinymce-content"
                style={{ width: "1200px", margin: "0 auto" }}
              >
                <div className="faculty-block-title">
                  <h3>{translation.title}</h3>
                </div>

                <div
                  className="paragraph tinymce-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(translation.description, purifyConfig),
                  }}
                />

                {/* Add files section */}
                {post.files && post.files.length > 0 && (
                  <div className="files-section" style={{ marginTop: "20px" }}>
                    <h3>{t("common.files")}</h3>
                    {post.files.map((file, index) => (
                      <div key={index} style={{ marginTop: "10px" }}>
                        <a
                          href={file.file}
                          download
                          className="download-button"
                          style={{
                            display: "inline-block",
                            padding: "10px 20px",
                            backgroundColor: "#007bff",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          {file.file.split("/").pop()}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  if (!hasImages) {
    const shouldBeClickable = !isSinglePost && totalPosts > 1;
    
    if (isPerson && totalPosts > 1) {
      return (
        <div className="menu-post-card clickable" onClick={handleClick}>
          <div className="menu-post-image">
            <Image
              src={post.main_image}
              alt={translation.title}
              width={400}
              height={300}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="menu-post-content">
            <h2 className="truncate-text">{translation.title}</h2>
          </div>
        </div>
      );
    }

    return (
      <div className="content" style={{ width: "100%" }}>
        <div
          className={`faculty-block ${shouldBeClickable ? "clickable" : ""}`}
          onClick={shouldBeClickable ? handleClick : undefined}
          style={{
            width: "100%",
            maxWidth: totalPosts === 1 ? "1200px" : "100%",
            margin: totalPosts === 1 ? "0 auto" : "0",
            cursor: shouldBeClickable ? "pointer" : "default",
            display: totalPosts > 1 ? "grid" : "block",
            gridTemplateColumns: totalPosts > 1 ? "repeat(auto-fill, minmax(300px, 1fr))" : "none"
          }}
        >
          <div
            className="faculty-block-title"
          >
            {isSinglePost ? (
              <h1>{translation.title}</h1>
            ) : (
              <h3>{translation.title}</h3>
            )}
          </div>

          {/* Add files section */}
          {post.files && post.files.length > 0 && (
            <div className="files-section" style={{ marginTop: "20px" }}>
              <h3>{t("common.files")}</h3>
              {post.files.map((file, index) => (
                <div key={index} style={{ marginTop: "10px" }}>
                  <a
                    href={file.file}
                    download
                    className="download-button"
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  >
                    {file.file.split("/").pop()}
                  </a>
                </div>
              ))}
            </div>
          )}

          <div
            className="paragraph"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(translation.description, purifyConfig),
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="menu-post-card clickable" onClick={handleClick}>
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
      </div>
    </div>
  );
};
