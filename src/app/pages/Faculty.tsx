import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

interface FacultyProps {
  facultyData: {
    id: number;
    email: string;
    logo: string;
    translations: {
      [key: string]: {
        name: string;
        slug: string;
        description: string;
        history_of_faculty: string;
      };
    };
  };
}

const Faculty = ({ facultyData }: FacultyProps) => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const getTranslatedContent = (field: keyof typeof facultyData.translations[string]) => {
    return facultyData.translations[i18n.language]?.[field] || facultyData.translations['en']?.[field] || '';
  };

  const socialLinks = [
    { icon: "fa-square-facebook", url: "#" },
    { icon: "fa-instagram", url: "#" },
    { icon: "fa-x-twitter", url: "#" },
    { icon: "fa-linkedin", url: "#" },
  ];

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
      <main className="faculty">
        <div className="container">
          <div className="faculty-logo">
            <h1>{getTranslatedContent('name')}</h1>
          </div>

          <div className="faculty-block">
            <div className="faculty-block-pro">
              <div className="faculty-block-pro-img">
                <Image
                  src={facultyData.logo}
                  alt="Faculty logo"
                  width={300}
                  height={400}
                  priority
                />
              </div>

              <div className="faculty-block-pro-title">
                <div className="faculty-block-pro-title-contact">
                  <div className="faculty-email">
                    <p>
                      <i className="fa-solid fa-envelope"></i>
                      Email:
                    </p>
                    <Link href={`mailto:${facultyData.email}`}>
                      {facultyData.email}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-block-text">
              <div className="faculty-block-text-info">
                <h4>{getTranslatedContent('name')}</h4>
                <div dangerouslySetInnerHTML={{ __html: getTranslatedContent('description') }} />
                <h4>History</h4>
                <div dangerouslySetInnerHTML={{ __html: getTranslatedContent('history_of_faculty') }} />
              </div>

              <div className="faculty-block-text-social">
                {socialLinks.map((social, index) => (
                  <Link href={social.url} key={index}>
                    <i className={`fa-brands ${social.icon}`}></i>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Faculty;
