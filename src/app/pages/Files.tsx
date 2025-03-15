'use client'
import Link from "next/link"
import styles from '../styles/page.module.css'
import { Home } from "lucide-react"
import DocumentTable from './DocumentTable'
import Sidebar from "../components/Sidebar"
import { useTranslation } from "react-i18next"

export default function NormativeDocumentsPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.breadcrumbs}>
          <Link href="/" className={styles.homeLink}>
            <Home size={16} />
            <span>{t('common.home')} /</span>
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.currentPage}>{t('common.normativeDocuments')}</span>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>{t('common.normativeDocuments')}</h1>
        <div className={styles.content}>
          <DocumentTable />
          <Sidebar />
        </div>
      </main>
    </div>
  )
}