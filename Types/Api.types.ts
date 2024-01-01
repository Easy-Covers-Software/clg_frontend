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

export type GetJobPostingApiResponse = {
  job_title: string;
  company_name: string;
  match_score: string;
};

export type GetJobDetailsApiResponse = {
  job_title: string;
  company_name: string;
  match_score: string;
};

export type ResumeUploadApiResponse = {
  uploaded_resume_filename: string;
  years_relevant_experience: string;
  awards_and_certifications: string;
  projects_and_publications: string;
  misc: string;
};

export type CoverLetterGenerateApiResponse = {
  cover_letter: string;
  cover_letter_id: string;
};

export type AdjustmentApiResponse = {
  cover_letter: string[];
};

export type SaveCoverLetterApiResponse = {
  id: string;
  user: string;
  job_posting: string;
  resume: string;
  save_name: string;
  cover_letter: string[];
  model: string;
  created_at: string;
};

export type DeleteCoverLetterApiResponse = {
  status: string;
};
