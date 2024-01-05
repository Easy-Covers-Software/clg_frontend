import { User } from "./Auth.types";

export type APIResponse<T> = {
  data: T;
  error: string | null;
};

export type ForgotPasswordSuccessApiResponse = {
  detail: string;
};

export type AuthResponse = {
  message: string;
};


export type FetchUserResponse = {
  user: User;
};

export type GenerationResponse = {
  id: string;
  content: string[];
};