"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MenuPostCard } from "@/app/components/MenuPost/MenuPostCard";
import { MenuPost } from "@/app/types/menu";
import { useTranslation } from "react-i18next";
import "../../../main.css";
import Image from "next/image";
import { t } from "i18next";
import SocialMediaShare from "@/app/components/SocialMediasShare";

export default function PostPage() {
  const { postSlug, lang } = useParams();
  const [post, setPost] = useState<MenuPost | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && typeof lang === "string") {
      i18n.changeLanguage(lang);
    }

    const fetchPost = async () => {
      try {
        const baseUrl =
            process.env.NEXT_PUBLIC_API_URL || "https://debttracker.uz";
        const response = await fetch(
            `${baseUrl}/publications/posts/${postSlug}`
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
              `Failed to fetch post: ${response.status} ${response.statusText}. ${errorText}`
          );
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
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
      <>
        {" "}
        <div className="header-logo-div">
          <div className="header-logo-mini">
            <div className="header-logo-uni">
              <Image src="/logo.png" alt="logo" width={100} height={100} />
            </div>
            <div className="header-logo-uni-name">
              <a href={`/${i18n.language}`} className="header-logo-uni-name-span">
                {t("common.University")}
              </a>
            </div>
          </div>
        </div>
        <main className="main">
          <div className="container">
            <MenuPostCard post={post} isSinglePost={true} />
            <div className="main-news-block-social">
              <SocialMediaShare />
            </div>
          </div>
        </main>
      </>
  );
}
