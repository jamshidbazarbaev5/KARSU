'use client';
import Department from '../../../components/Deparment';

interface DepartmentData {
  id: number;
  faculty: number;
  type: 'department' | 'agency';
  translations: {
    [key: string]: {
      name: string;
      slug: string;
      description: string;
    };
  };
}

interface DepartmentClientProps {
  departmentData: DepartmentData;
}

export default function DepartmentClient({ departmentData }: DepartmentClientProps) {
  return <Department departmentData={departmentData} />;
}