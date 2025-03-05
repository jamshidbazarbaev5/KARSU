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

async function getFacultyData(slug: string): Promise<FacultyData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://debttracker.uz';
    const url = `${baseUrl}/menus/faculty/${slug}`;
    console.log('Fetching faculty data from:', url);

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      email: data.email,
      logo: data.logo,
      translations: data.translations,
    };
  } catch (error) {
    console.error('Detailed error fetching faculty data:', {
      error,
      slug,
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
    });
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
