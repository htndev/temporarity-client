export interface User {
  id: string;
  email: string;
  fullName: string;
  profilePicture: string | null;
}

export interface Tokens {
  access: string;
  refresh: string;
}
