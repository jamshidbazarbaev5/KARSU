import { useTranslation } from "react-i18next";
import DOMPurify from 'dompurify';

interface AdminData {
  main_image?: string;
  phone_number?: string;
  email?: string;
  translations: {
    [key: string]: {
      biography?: string;
      full_name?: string;
    };
  };
}

interface AdminInfoBlockProps {
  adminData?: AdminData;
  email?: string;
  title?: string;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
}

const AdminInfoBlock = ({
  adminData,
  email,
  title,
  description,
  children
}: AdminInfoBlockProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Check if admin data has complete translations
  const hasCompleteTranslations = adminData?.translations?.[currentLang]?.full_name?.trim() !== '' &&
    adminData?.translations?.[currentLang]?.biography?.trim() !== '';

  return (
    <div className="faculty-block">
      {adminData && hasCompleteTranslations && (
        <div className="faculty-block-pro">
          <div className="faculty-block-pro-img">
            <img src={adminData.main_image} alt={adminData.translations?.[currentLang]?.full_name} />
          </div>
          <div className="faculty-block-pro-title">
            <div className="faculty-block-pro-title-info">
              <h2 
                className="faculty-course" 
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(adminData.translations?.[currentLang]?.biography || '') 
                }} 
              />
              <p className="faculty-name">
                {adminData.translations?.[currentLang]?.full_name || 
                 adminData.translations?.['en']?.full_name || 
                 t("Not specified")}
              </p>
            </div>
            <div className="faculty-block-pro-title-contact">
              {adminData.phone_number && (
                <div className="faculty-number">
                  <p>
                    <i className="fa-solid fa-phone" />
                    {t("Phone")}:
                  </p>
                  <a href={`tel:${adminData.phone_number}`}>
                    {adminData.phone_number}
                  </a>
                </div>
              )}
              {(adminData.email || email) && (
                <div className="faculty-email">
                  <p>
                    <i className="fa-solid fa-envelope" />
                    {t("Email")}:
                  </p>
                  <a href={`mailto:${adminData.email || email}`}>
                    {adminData.email || email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="faculty-block-text">
        {children}
        
        {(title || description) && (
          <div className="faculty-block-text-info">
            {title && <h4>{title}</h4>}
            {typeof description === 'string' ? (
              <div 
                className="faculty-block-text-description"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(description) 
                }}
              />
            ) : (
              <div className="faculty-block-text-description">
                {description}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInfoBlock;