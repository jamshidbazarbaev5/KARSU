import { Metadata } from 'next'
import AllNewsPage from "../../../pages/AllNews";
import '@/app/[lang]/allnews/main.css'
export const metadata: Metadata = {
  title: 'News Category',
}

export default async function CategoryNews() {
  return <AllNewsPage />
}