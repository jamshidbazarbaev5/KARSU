export interface Translation {
    name?: string;
    title?: string;
    slug?: string;
  }
  
  export interface NewsItem {
    id: number;
    category: number;
    main_image: string;
    goals?: number[];
    date_posted: string;
    translations: {
      [key: string]: Translation;
    };
  }
  
  export interface Category {
    id: number;
    translations: {
      [key: string]: Translation;
    };
  }
  
  export interface Goal {
    id: number;
    color: string;
  }