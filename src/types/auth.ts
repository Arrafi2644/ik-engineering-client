export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  agreeToTerms: boolean;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthResponse {
  success: boolean;
  error?: AuthError;
  message?: string;
}
