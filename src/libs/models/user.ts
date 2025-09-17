export interface User {
  id: string;
  username: string;
  fullname: string;
  phone: string;
  role: string;
  phone_verified: boolean;
  isBlocked:boolean
  created_at: Date;
  updated_at: Date;
}
