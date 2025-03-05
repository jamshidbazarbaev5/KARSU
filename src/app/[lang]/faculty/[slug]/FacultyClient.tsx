'use client';
import Faculty from '../../../pages/Faculty';

interface FacultyData {
  id: number;
  email: string;
  logo: string;
  translations: {
    [key: string]: {
      name: string;
      slug: string;
      description: string;
      history_of_faculty: string;
    };
  };
}

interface FacultyClientProps {
  facultyData: FacultyData;
}

export default function FacultyClient({ facultyData }: FacultyClientProps) {
  return <Faculty facultyData={facultyData} />;
}