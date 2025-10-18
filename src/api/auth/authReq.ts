export interface registerReq {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface loginReq {
  email: string;
  password: string;
}