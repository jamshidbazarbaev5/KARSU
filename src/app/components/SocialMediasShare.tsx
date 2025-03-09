import { useTranslation } from "react-i18next";

interface SocialMediaShareProps {
  url?: string;
  title?: string;
  className?: string;
  iconStyle?: React.CSSProperties;
}

export default function SocialMediaShare({ 
  url, 
  title, 
  className = "faculty-block-text-social",
  iconStyle = { margin: "10px" }
}: SocialMediaShareProps) {
  const { i18n } = useTranslation();

  const getShareUrl = () => {
    if (url) {
      return encodeURIComponent(url);
    }
    if (typeof window !== 'undefined') {
      return encodeURIComponent(window.location.href);
    }
    return '';
  };

  const getSocialShareUrls = () => {
    const shareUrl = getShareUrl();
    const shareTitle = encodeURIComponent(title || '');
    
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      telegram: `https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    };
  };

  const socialUrls = getSocialShareUrls();

  return (
    <div className={className} style={{ padding: "10px" }}>
      <a 
        href={socialUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle}
      >
        <i className="fa-brands fa-square-facebook"></i>
      </a>
      <a 
        href={socialUrls.telegram}
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle}
      >
        <i className="fa-brands fa-telegram"></i>
      </a>
      <a 
        href={socialUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle}
      >
        <i className="fa-brands fa-x-twitter"></i>
      </a>
      <a 
        href={socialUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle}
      >
        <i className="fa-brands fa-linkedin"></i>
      </a>
    </div>
  );
}