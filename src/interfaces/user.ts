export interface User {
  id: string | null;
  age: number;
  role: string;
  diamond: number;
  name:string;
  email: string;
  gem: number;
  photoUrl: string;
  isActive: true;
  language: {
    id: string;
    name: string;
    code: string;
    flag: string;
    isDefault: true;
  };
  firstName: string;
  lastName: string;
  regionId: string;
  regionName: string;
  isMale: true;
  createdAt?: string;
}
