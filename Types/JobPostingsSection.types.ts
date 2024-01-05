import { StdContext } from "./Common.types";
import { MatchScore } from "./CandidatesSection.types";
import { BodyState } from "./Common.types";

export type JobPostingListObject = {
  id: string;
  job_title: string;
  company_name: string;
  save_name: string;
  urgency: string;
  created_at: string;
  [key: string]: MatchScore | string | null;
}

export type JobPostingsListState = {
  listItems: JobPostingListObject[];
  filteredListItems: JobPostingListObject[];
  selected: JobPostingListObject;
  search: string;
  loading: boolean;
  refresh: boolean;
  updateListItems: (list: JobPostingListObject[]) => void;
  updateFilteredListItems: (list: JobPostingListObject[]) => void;
  updateSelected: (selected: JobPostingListObject) => void;
  updateSearch: (search: string) => void;
  updateLoading: (tof: boolean) => void;
  toggleRefresh: () => void;
};

export type MatchScoreCriteria = {
  skill_match_importance: number;
  culturual_match_importance: number;
  experience_match_importance: number;
  adaptability_match_importance: number;
  communication_match_importance: number;
  problem_solving_match_importance: number;
  teamwork_match_importance: number;
  leadership_match_importance: number;
  motivation_match_importance: number;
  long_term_commitment_match_importance: number;
};

export type JobPosting = {
  id: string;
  match_score_criteria: MatchScoreCriteria;
  job_title: string;
  company_name: string;
  full_details: string;
  salary: string;
  qualifications: string;
  experience_required: string;
  location: string;
  job_type: string;
  urgency: string;
  created_at: string;
  training: string | null;
  turnover_rate: string | null;
  seniority_level: string;
  specializations: string;
  job_duration: string;
  work_hours: string;
  shifts: string;
  payment_frequency: string;
  currency: string;
  city_location: string;
  address: string;
  remote: string;
  relocation: string;
  technical_skills: string;
  soft_skills: string;
  certifications: string;
  fields_of_study: string;
  education_institution_requirements: string;
  gpa: string;
  previous_titles: string;
  daily_tasks: string;
  team_interaction: string;
  reporting_structure: string;
  travel: string;
  company_size: string;
  growth_opportunities: string;
  company_type: string;
  company_values: string;
  work_life_balance: string;
  perks: string;
  health_benefits: string;
  retirement_benefits: string;
  stock_options: string;
  vacation_time: string;
  save_name: string;
  recruiters: string[];
};

export type JobPostingBodyUnique = {
  mode: string;
  candidateRankingsState: any;
  currentlyCalculating: null;
  selectedCandidateScoreDetailsState: any;
  generationResultsState: any;
  updateMode: (mode: string) => void;
  updateCandidateRankingsState: (field, state: any) => void;
  updateCurrentlyCalculating: (candidateId: string) => void;
  updateSelectedCandidateScoreDetailsState: (field, state: any) => void;
  updateGenerationResultsState: (field, state: any) => void;
}

export type JobPostingBodyState = BodyState & JobPostingBodyUnique;



export type JobPostingsContext = {
  listState: JobPostingsListState;
  selectedListItem: JobPostingListObject;
  bodyState: JobPostingBodyState;
  dispatch: Function;
};

export type JobPostingsInitialState = {
  listState: JobPostingsListState;
  selectedListItem: JobPostingListObject;
  bodyState: JobPostingBodyState;
};
