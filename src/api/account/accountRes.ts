export interface accountProfileRes {
  fullname: string;
  email: string;
  isVerify: boolean | null;
  avatar: string;
  roles: string[];
  numberCartItem: number;
}