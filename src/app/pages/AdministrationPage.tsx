'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Administrator {
  id: number;
  position: number;
  phone_number: string;
  email: string;
  main_image: string;
  translations: {
    [key: string]: {
      full_name: string;
      biography: string;
    }
  }
}

interface Position {
  id: number;
  email: string;
  translations: {
    [key: string]: {
      name: string;
    }
  }
}

interface AdministratorProps {
  photo: string;
  title: string;
  name: string;
  phone: string;
  email: string;
  biography: string;
  isMain?: boolean;
}

const AdministratorCard = ({ photo, title, name, phone, email, isMain = false ,biography}: AdministratorProps) => {
  const baseClass = isMain ? 'administration-main' : 'administration-other';
  
  return (
    <div className={baseClass}>
      <div className={`${baseClass}-photo`}>
        <img 
          className={`${baseClass}-photo-img`}
          src={photo} 
          alt={name}
        />
      </div>
      <div className={`${baseClass}-info`}>
        <div className={`${baseClass}-title-div`}>
          <span className={`${baseClass}-title`}>{title}</span>
          <div className={`${baseClass}-line`}></div>
          <div className="administration-main-study">
            <span dangerouslySetInnerHTML={{ __html: biography }} />
          </div>
        </div>
        <div className={`${baseClass}-other-info`}>
          <span className={`${baseClass}-name`}>{name}</span>
          <span className={`${baseClass}-phone`}>
            <span className="bold-span">Телефон</span> {phone}
          </span>
          <span className={`${baseClass}-email`}>
            <span className="bold-span">Email:</span> {email}
          </span>
          <span className={`${baseClass}-email`}>
            <span className="bold-span">Email:</span> {email}
          </span>
        </div>
      </div>
    </div>
  );
};

const AdministrationPage = () => {
  const [administrators, setAdministrators] = useState<Administrator[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const language = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminResponse, positionResponse] = await Promise.all([
          fetch('https://debttracker.uz/menus/admin/'),
          fetch('https://debttracker.uz/menus/position/')
        ]);
        
        const [adminData, positionData] = await Promise.all([
          adminResponse.json(),
          positionResponse.json()
        ]);
        
        setAdministrators(adminData);
        setPositions(positionData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  const getPositionName = (positionId: number) => {
    const position = positions.find(p => p.id === positionId);
    return position?.translations[language]?.name || '';
  };

  return (
    <div className="administration-page">
      <div className="administration-page-small">
        <div className="administration-page-title-div">
          <div className="administration-page-title">
            <span className="administration-page-title-span">АДМИНСТРАЦИЯ</span>
          </div>
        </div>
        <div className="all-administration-group">
          {loading ? (
            <div>Loading...</div>
          ) : (
            administrators.map((admin) => (
              <AdministratorCard 
                key={admin.id}
                photo={admin.main_image}
                title={`${getPositionName(admin.position)}`}
                name={admin.translations[language].full_name}
                phone={admin.phone_number}
                email={admin.email}
                isMain={admin.position === 1}
                biography={admin.translations[language].biography}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdministrationPage;