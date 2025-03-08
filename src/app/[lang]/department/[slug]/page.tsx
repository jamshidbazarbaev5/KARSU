import DepartmentClient from './DepartmentClient';
import '../../department/main.css';
import { notFound } from 'next/navigation';

async function getDepartmentData(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://debttracker.uz';
  const response = await fetch(`${baseUrl}/menus/department/${slug}`, {
    next: { revalidate: 3600 },
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Department not found');
    }
    throw new Error(`Failed to fetch department data: ${response.status}`);
  }
  
  return response.json();
}

export default async function DepartmentPage(props: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  try {
    const params = await props.params;
    const departmentData = await getDepartmentData(params.slug);
    
    // If no data is returned or no translations are available
    if (!departmentData || !departmentData.translations) {
      notFound();
    }

    return <DepartmentClient departmentData={departmentData} />;
  } catch (error) {
    if (error instanceof Error && error.message === 'Department not found') {
      notFound();
    }
    throw error; // Let Next.js error boundary handle other errors
  }
}