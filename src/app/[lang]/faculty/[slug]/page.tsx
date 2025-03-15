import FacultyClient from './FacultyClient';
import '../main.css';

interface FacultyTranslation {
  name: string;
  slug: string;
  description: string;
  history_of_faculty: string;
}

interface FacultyData {
  id: number;
  email: string;
  logo: string;
  translations: { [key: string]: FacultyTranslation };
}

async function getDepartments(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api';
  const response = await fetch(`${baseUrl}/menus/department/`, {
    next: { revalidate: 3600 },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

async function getFacultyData(slug: string): Promise<FacultyData> {
  try {
    const [facultyResponse, departmentsResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api'}/menus/faculty/${slug}`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://karsu.uz/api'}/menus/department/`)
    ]);

    const facultyData = await facultyResponse.json();
    const departments = await departmentsResponse.json();

    console.log('API Response - Faculty:', facultyData);
    console.log('API Response - Departments:', departments);

    // Filter departments for this faculty
    const facultyDepartments = departments.filter((dept: any) => dept.faculty === facultyData.id);
    
    return {
      ...facultyData,
      departments: facultyDepartments
    };
  } catch (error) {
    console.error('Error fetching faculty data:', error);
    throw error;
  }
}

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function FacultyPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const facultyData = await getFacultyData(params.slug);
  return <FacultyClient facultyData={facultyData} />;
}
