type PhoneCall = {
  id: string;
  user: string;
  save_name: string;
  twilio_call_sid: string;
  call_duration: string;
  call_recording_duration: string;
  recruiter_number: string;
  candidate_number: string;
  candidate_city: string;
  candidate_state: string;
  candidate_country: string;
  candidate_zip_code: string;
};

type PhoneCallState = {
  savedItems: PhoneCall[];
  filteredItems: PhoneCall[];
  selected: PhoneCall | null;
  search: string;
  loading: boolean;
};

type GptNotes = {
  [key: string]: string;
};

type TranscriptionInstance = {
  id: string;
  created_at: string;
  modified_at: string;
  text: string;
  gpt_notes: GptNotes;
};

type TranscriptionState = {
  transcription: TranscriptionInstance | null;
  loading: boolean;
};

type CandidateProfile = {
  id: string;
  name: string;
  phone_number: string;
  email: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip_code: string | null;
  linkedin_profile: string | null;
  portfolio_website: string | null;
  skills: string | null;
  years_of_experience: number | null;
  status: string | null;
  feedback: string | null;
  created_at: string;
  updated_at: string;
};

type InitateCallResponse = {
  call_status: string;
  candidate_profile: CandidateProfile;
};

export type {
  PhoneCall,
  PhoneCallState,
  TranscriptionState,
  TranscriptionInstance,
  CandidateProfile,
  InitateCallResponse,
};
