export interface User {
  id: string;
  email: string;
  role: string;
  companyId?: string;
  firstName?: string;
  lastName?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  avatar?: string;
  phone?: string;
  position?: string;
  department?: string;
  preferences?: {
    theme?: string;
    language?: string;
    notifications?: boolean;
  };
}

export interface UserCreateRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  companyId?: string;
  profile?: UserProfile;
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  profile?: UserProfile;
}