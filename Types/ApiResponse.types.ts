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

export type FetchUserApiResponse = {
  email: string;
  resume: string;
  gpt3_generations_available: string;
  gpt4_generations_available: string;
  adjustments_available: string;
};

// export type FetchUserError = {
//   detail: string;
// };

// export type FetchUserApiResponse = {
//   data: null | FetchUserSuccss;
//   error: null | FetchUserError;
// };

export type GetJobDetailsApiResponse = {
  job_title: string;
  company_name: string;
  match_score: string;
};

export type CoverLetterGenerateResponse = {
  cover_letter: string;
  job_posting_id: string;
};

export type AdjustmentApiResponse = {
  cover_letter: string;
};
