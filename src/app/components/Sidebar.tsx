'use client'
import styles from "../styles/sidebar.module.css"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { usePathname } from "next/navigation"
import Link from "next/link"
import i18n from "../i18n/config"

interface MenuItem {
  id: number;
  parent: number | null;
  translations: {
    [key: string]: {
      name: string;
      slug: string;
    };
  };
}

export default function Sidebar() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('https://karsu.uz/api/menus/main/');
        const universityMenuItems = response.data.filter((item: MenuItem) => item.parent === 4);
        setMenuItems(universityMenuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className={styles.sidebar}>
      <div className={styles.universityHeader}>
        <div className={styles.universityIcon}>У</div>
        <h2 className={styles.universityTitle} style={{fontFamily:'Nunito Sans, sans-serif'}}>УНИВЕРСИТЕТ</h2>
      </div>
      <ul className={styles.sidebarList}>
        {menuItems.map((item) => {
          const isActive = pathname.includes(item.translations[i18n.language]?.slug || '');
          const slug = item.translations[i18n.language]?.slug;
          
          // Determine the correct href based on slug
          let href = `/${i18n.language}/menus/main/${slug}`;
          if (slug === 'rukovodstvo' || slug === 'leadership' || 
              slug === 'rahbariyat' || slug === 'adminstraciya') {
            href = `/${i18n.language}/administration/`;
          } else if (slug === 'normativ-hujjetler' || slug === 'dokumenty' || 
                     slug === 'documents' || slug === 'meyoriy-hujjatlar') {
            href = `/${i18n.language}/file/`;
          }

          return (
            <Link 
              href={href}
              key={item.id}
              className={`${styles.sidebarItem} ${isActive ? styles.active : ""}`}
            >
              <ChevronRight size={16} className={styles.itemIcon} />
              <span style={{fontFamily:'Nunito Sans, sans-serif'}}>{item.translations[i18n.language]?.name}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  )
}