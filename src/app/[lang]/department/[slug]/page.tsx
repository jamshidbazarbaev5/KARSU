import DepartmentClient from './DepartmentClient';
import '../../department/main.css';
import { notFound } from 'next/navigation';

type DepartmentType = 'department' | 'agency';

interface DepartmentResponse {
  data: {
    id: number;
    faculty?: number;
    menu?: number;
    translations: {
      [key: string]: {
        name: string;
        slug: string;
        description: string;
      };
    };
  };
  type: DepartmentType;
}

async function fetchAgencyPage(page: number): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api';
  
  try {
    const response = await fetch(`${baseUrl}/menus/agency/?page=${page}`, {
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch agency data');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching agency page ${page}:`, error);
    return [];
  }
}

async function fetchAdminPage(page: number): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api';
  
  try {
    const response = await fetch(`${baseUrl}/menus/admin/?page=${page}`, {
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch admin data');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching admin page ${page}:`, error);
    return [];
  }
}

async function getData(slug: string): Promise<DepartmentResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api';
  
  try {
    const deptResponse = await fetch(`${baseUrl}/menus/department/${slug}`, {
      next: { revalidate: 3600 },
    });
    
    if (deptResponse.ok) {
      return {
        data: await deptResponse.json(),
        type: 'department' as const
      };
    }

    // Fetch all agency pages
    let allAgencies: any[] = [];
    let agencyPage = 1;
    
    while (true) {
      const agencyResults = await fetchAgencyPage(agencyPage);
      if (!agencyResults.length) break;
      
      allAgencies = [...allAgencies, ...agencyResults];
      
      // Check if we've fetched all pages
      const agencyResponse = await fetch(`${baseUrl}/menus/agency/?page=${agencyPage}`);
      const agencyData = await agencyResponse.json();
      if (!agencyData.next) break;
      
      agencyPage++;
    }
    
    // Fetch all admin pages
    let allAdmins: any[] = [];
    let adminPage = 1;
    
    while (true) {
      const adminResults = await fetchAdminPage(adminPage);
      if (!adminResults.length) break;
      
      allAdmins = [...allAdmins, ...adminResults];
      
      // Check if we've fetched all pages
      const adminResponse = await fetch(`${baseUrl}/menus/admin/?page=${adminPage}`);
      const adminData = await adminResponse.json();
      if (!adminData.next) break;
      
      adminPage++;
    }
    
    const agency = allAgencies.find((a: any) => 
      Object.values(a.translations).some((t: any) => t.slug === slug)
    );
    
    if (!agency) {
      throw new Error('Not found');
    }

    const admin = allAdmins.find((a: any) => a.agency === agency.id);

    return {
      data: {
        ...agency,
        admin
      },
      type: 'agency' as const
    };
  } catch (error) {
    throw error;
  }
}

export default async function Page(props: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  try {
    const params = await props.params;
    const { data, type } = await getData(params.slug);
    
    if (!data || !data.translations) {
      notFound();
    }

    const departmentData = {
      id: data.id,
      faculty: type === 'department' ? data.faculty! : data.menu!,
      translations: data.translations,
      type: type 
    };

    return <DepartmentClient departmentData={departmentData} />;
  } catch (error) {
    notFound();
  }
}