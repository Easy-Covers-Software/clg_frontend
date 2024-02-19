import { GenerationResultsState, Generation } from "./Generation.types";
import { User } from "./Auth.types";
import { PhoneCall } from "./TranscriptionSection.types";
import { BodyState } from "./Common.types";
import { StdContext } from "./Common.types";
import { JobPostingListObject } from "./JobPostingsSection.types";
import { UpdateSelectionSummaryPayload } from "./Common.types";


//== Used Elsewhere ==//
export type CandidatePhoneCall = {
  id: string;
};


//=== CONTEXT TYPES ===//
//== list state types ==//
export type Resume = {
  id: string;
  filename: string | null;
  file: string;
  resume_text: string;
  created_at: string;
  candidate: string;
};

export type CandidateListItem = {
  id: string;
  match_scores: MatchScore[]; 
  resume: Resume;
  phone_calls: PhoneCall[]; 
  generations: Generation[];
  name: string;
  phone_number: string;
  email: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  age: string;
  current_title: string;
  current_employer: string;
  education_level: string;
  education_field: string;
  education_institution: string;
  employment_field: string;
  linkedin_profile: string | null;
  portfolio_website: string | null;
  skills: string;
  years_of_experience: string;
  status: string;
  feedback: string;
  save_name: string;
  call_sid: string | null;
  created_at: string;
  updated_at: string;
  job_postings: string[];
};

export type CandidateListState = {
  listItems: CandidateListItem[];
  filteredListItems: CandidateListItem[];
  selected: CandidateListItem;
  search: string;
  loading: boolean;
  refresh: boolean;
  updateListItems: (list: CandidateListItem[]) => void;
  updateFilteredListItems: (list: CandidateListItem[]) => void;
  updateSelected: (selected: CandidateListItem) => void;
  updateSearch: (search: string) => void;
  updateLoading: (tof: boolean) => void;
  toggleRefresh: () => void;
  setFullCandidateProfile: (candidate: CandidateListItem) => void;
};
//== selected list item type ==//

//== body state types ==//
export type MatchScore = {
  id: number;
  total_score: string;
  weighted_score: string;
  skill_match_score: number;
  culturual_match_score: number;
  experience_match_score: number;
  adaptability_match_score: number;
  communication_match_score: number;
  problem_solving_match_score: number;
  teamwork_match_score: number;
  leadership_match_score: number;
  motivation_match_score: number;
  long_term_commitment_match_score: number;
  created_at: string;
  updated_at: string;
  recruiter: User;
  candidate: CandidateListItem;
  job_posting: JobPostingListObject;
};

type CandidateJobPostingsListState = {
  jobPostings: JobPostingListObject[];
  matchScores: MatchScore[];
  refreshJobPostings: boolean;
  selectedJobPosting: JobPostingListObject | null;
};

type SelectedCandidateScoreDetails = {
  selectedCandidateMode: string; // 'overview' or 'phoneCall' or 'generation'
  generationPanelMode: string; // overview, emailSelection, coverLetterSelection
  callPanelMode: string; // overview, followUpSection
  selectedGeneration: Generation;
  selectedCall: PhoneCall | null;
  resumeUrl: string;
  refreshJobPostings: boolean;
  loading: boolean;
};

export type CandidateBodyUnique = {
  mode: string;
  candidateJobPostingsListState: CandidateJobPostingsListState;
  currentlyCalculating: string | null;
  jobStatusState: SelectedCandidateScoreDetails | any;
  generationResultsState: GenerationResultsState;
  updateMode: (mode: string) => void;
  updateSelectedCandidateScoreDetailsState: (field: string, state: any) => void;
  updateGenerationResultsState: (field: string, state: any) => void;
};

export type CandidateContextBodyState = BodyState & CandidateBodyUnique;

//== Full context type ==//
export type CandidateContextState = {
  listState: CandidateListState;
  selectedListItem: CandidateListItem;
  bodyState: CandidateContextBodyState;
}

// Example structures for payloads (modify according to actual data structures)
type SetListStatePayload = { 
  listState: CandidateListState;
}
type UpdateCandidateListStatePayload = {
  [K in keyof CandidateListState]?: CandidateListState[K];
};


type BodyStatePayload = { 
  bodyState: CandidateContextBodyState;
}
type UpdateCandidateJobPostingsListStatePayload = { 
  [K in keyof CandidateJobPostingsListState]?: CandidateJobPostingsListState[K];
}
type CandidateScoreDetailsStatePayload = { 
  [K in keyof SelectedCandidateScoreDetails]?: SelectedCandidateScoreDetails[K];
}
type GenerationResultsStatePayload = { 
  [K in keyof GenerationResultsState]?: GenerationResultsState[K];
}

type CandidatesAction =
  | { type: 'SET_CANDIDATE_LIST_STATE'; payload: SetListStatePayload }
  | { type: 'UPDATE_CANDIDATE_LIST_STATE'; payload: UpdateCandidateListStatePayload }
  | { type: 'SET_SELECTED_CANDIDATE_PROFILE'; payload: CandidateListItem }
  | { type: 'SET_SELECTED_ITEM_BODY_DISPLAY_STATE'; payload: BodyStatePayload }
  | { type: 'UPDATE_CANDIDATE_BODY_DISPLAY_MODE'; payload: string }
  | { type: 'UPDATE_CANDIDATE_SELECTION_SUMMARY_STATE'; payload: UpdateSelectionSummaryPayload }
  | { type: 'UPDATE_CANDIDATE_JOB_POSTINGS_LIST_STATE'; payload: UpdateCandidateJobPostingsListStatePayload }
  | { type: 'UPDATE_CURRENTLY_CALCULATING'; payload: null | string }
  | { type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE'; payload: CandidateScoreDetailsStatePayload }
  | { type: 'UPDATE_GENERATION_RESULTS_STATE'; payload: GenerationResultsStatePayload }
;

export type CandidatesContext = {
  state: CandidateContextState;
  dispatch: React.Dispatch<CandidatesAction>;
}


export type CandidateJobPostingsUniqueFields = {
  match_scores: MatchScore[];
}

export type CandidateJobPostingsWithScore = JobPostingListObject & CandidateJobPostingsUniqueFields;

