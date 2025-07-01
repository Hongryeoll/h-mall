export type UserRole = 'user' | 'admin' | 'manager' | string;

export type UserProfile = {
  id: string;
  email: string;
  role: UserRole;
};

export type UserState = {
  user: UserProfile | null;
  loading: boolean;
  role: UserRole | '';
  refresh: () => void | Promise<void>;
};
