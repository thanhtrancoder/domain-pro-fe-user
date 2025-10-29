export interface registerReq {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface loginReq {
  email: string;
  password: string;
}

export interface updateAccountReq {
  fullname: string | null;
  oldPassword: string | null;
  newPassword: string | null;
  confirmPassword: string | null;
}

export interface forgotPasswordReq {
  email: string;
}

export interface resetPasswordReq {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}
  