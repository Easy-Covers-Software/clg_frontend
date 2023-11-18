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

type PhoneCallListState = {
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

type NewCallForm = {
  candidateName: string;
  phone: string;
  jobPosting: string;
};

type CallCompleteForm = {
  candidateName: string;
  phone: string;
  jobPosting: string;
  email: string;
  linkedin: string;
  portfolio: string;
  location: string;
  resume: File | null;
  feedback: string;
};

type CallModeState = {
  newCallForm: NewCallForm;
  callCompleteForm: CallCompleteForm;
  status: 'new' | 'complete';
};

type NotesHeaderSummaryState = {
  id: string;
  mainTitle: string;
  secondaryTitle: string;
  supplementalInfo: string;
  loading: boolean;
  updateMainTitle: (title: string) => void;
  updateSecondaryTitle: (title: string) => void;
  updateSupplementalInfo: (info: string) => void;
  toggleLoading: () => void;
};

type TranscriptionModeState = {
  selectedTranscription: any | null;
  transcriptionNotes: any | null;
  status: string;
  loading: boolean;
};

export type TranscriptionContextType = {
  phoneCallListState: PhoneCallListState;
  notesHeaderSummaryState: NotesHeaderSummaryState;
  transcriptionModeState: TranscriptionModeState;
  transcriptionsInProcess: any[]; // Define a type for transcriptions in process if known
  currentMode: string;
};

export type {
  PhoneCall,
  PhoneCallListState,
  TranscriptionState,
  TranscriptionInstance,
  CandidateProfile,
  InitateCallResponse,
};
