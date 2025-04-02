'use client'
import styles from '../styles/document-table.module.css'
import { Download } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"

interface DocumentItem {
  id: number;
  menu: number;
  footer_menu: null;
  file: string;
  date_post: string;
  translations: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
}

export default function DocumentTable() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('https://karsu.uz/api/menus/document/');
        setDocuments(response.data.results);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const getLocalizedDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.numberColumn}>№</th>
            <th className={styles.typeColumn}>
              {t('common.documentType')}
            </th>
            <th className={styles.dateColumn}>
              {t('common.date')}
            </th>
            <th className={styles.nameColumn}>
              {t('common.documentName')}
            </th>
            <th className={styles.downloadColumn}></th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={doc.id}>
              <td className={styles.numberCell}>{index + 1}</td>
              <td className={styles.typeCell}>
                {doc.translations[i18n.language]?.title || doc.translations.ru?.title}
              </td>
              <td className={styles.dateCell}>
                {getLocalizedDate(doc.date_post)}
              </td>
              <td className={styles.nameCell} dangerouslySetInnerHTML={{__html:doc.translations[i18n.language]?.description || doc.translations.ru?.description}}/>

              <td className={styles.downloadCell}>
                <a 
                  href={doc.file} 
                  download 
                  className={styles.downloadButton}
                  title={t('common.downloadDocument')}
                >
                  <Download size={18} color="#4a90e2" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}