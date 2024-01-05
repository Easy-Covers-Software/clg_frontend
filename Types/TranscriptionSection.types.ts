import { User } from "./Auth.types";
import { CandidatePhoneCall } from "./CandidatesSection.types";
import { JobPosting } from "./JobPostingsSection.types";

type TranscriptionNote = {
  [key: string]: string;
};

type Transcription = {
  id: string;
  text: string;
  notes: TranscriptionNote;
  created_at: string;
  modified_at: string;
};

export type PhoneCall = {
  id: string;
  recruiter: User;
  candidate: CandidatePhoneCall;
  transcription: Transcription | null;
  job_posting: JobPosting;
  call_type: string;
  transcription_status: string;
  transcription_status_step: string;
  save_name: string;
  twilio_call_sid: string;
  call_duration: string;
  call_recording_duration: string;
  recruiter_number: string;
  candidate_number: string;
  candidate_city: string | null;
  candidate_state: string | null;
  candidate_country: string | null;
  candidate_zip_code: string | null;
  created_at: string;
};
