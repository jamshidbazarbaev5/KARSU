export interface MenuTranslation {
    name: string;
    title: string;
    slug: string;
}

export interface MenuTranslations {
    en: MenuTranslation;
    ru: MenuTranslation;
    uz: MenuTranslation;
    kk: MenuTranslation;
}

export interface PostTranslation {
    title: string;
    description: string;
    slug: string;
}

export interface MenuPost {
    id: number;
    menu: number;
    footer_menu: number | null;
    main_image: string;
    images: string[];
    date_posted: string;
    translations: {
        en: PostTranslation;
        ru: PostTranslation;
        uz: PostTranslation;
        kk: PostTranslation;
    };
}

export interface MenuItem {
    id: number;
    parent: number | null;
    translations: MenuTranslations;
    menu_posts: MenuPost[];
}