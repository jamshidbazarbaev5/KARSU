'use client'
import Image from "next/image"
import styles from '../styles/faculties.module.css'
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Home } from "lucide-react"
import Link from "next/link"
import NewsRubric from "../components/NewsRubric"

interface FacultyTranslation {
  name: string;
  slug: string;
  description: string;
  history_of_faculty?: string;
}

interface Faculty {
  id: number;
  email: string;
  logo: string;
  translations: {
    [key: string]: FacultyTranslation;
  };
}

export default function FacultiesPage() {
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch('https://karsu.uz/api/menus/faculty/')
        const data = await response.json()
        setFaculties(data)
      } catch (error) {
        console.error('Error fetching faculties:', error)
      }
    }

    fetchFaculties()
  }, [])

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link href={`/${i18n.language}`} className={styles.homeLink}>
          <Home size={16} />
          <span>{t('common.home')}</span>
        </Link>
        <span className={styles.separator}>•</span>
        <span>{t('common.faculties')}</span>
      </nav>

      <h1 className={styles.title}>{t('common.faculties')}</h1>

      <div className={styles.contentWrapper}>
        <div className={styles.facultiesSection}>
          <div className={styles.grid}>
            {faculties.map((faculty) => {
              const translation = faculty.translations[i18n.language] || faculty.translations.ru
              return (
                <Link
                  href={`/${i18n.language}/faculty/${translation.slug}`}
                  key={faculty.id}
                  className={styles.card}
                >
                  <div className={styles.iconWrapper}>
                    <Image
                      src={faculty.logo || "/placeholder.svg"}
                      alt={translation.name}
                      width={80}
                      height={80}
                      className={styles.icon}
                    />
                  </div>
                  <h2 className={styles.facultyName}>{translation.name}</h2>
                  <div className={styles.line}></div>
                </Link>
              )
            })}
          </div>
        </div>
        <div className={styles.newsSection}>
          <NewsRubric />
        </div>
      </div>
    </div>
  )
}