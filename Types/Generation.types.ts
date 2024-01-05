import { CandidateListItem } from "./CandidatesSection.types";
import { JobPostingListObject } from "./JobPostingsSection.types";
import { BodyState } from "./Common.types";

//=== State ===//
export type GenerationResultsState = {
  id: string;
  content: string[] | null;
  contentHtml: string;
  editedContent: string[] | null;
  editedContentHtml: string;
  saveName: string;
  loading: boolean;
  isSavedDropdownOpen: boolean;
  disableSavedButton: boolean;
  isDownloadDropdownOpen: boolean;
  disableDownloads: boolean;
};

export type Generation = {
  id: string;
  generation_type: string;
  save_name: string;
  content: string[];
  created_at: string;
  updated_at: string;
  recruiter: string;
  candidate: string;
  job_posting: string;
};

export type GenerationResponse = {
  id: string;
  content: string[];
};


type CandidateSelectionState = {
  candidates: CandidateListItem[];
  filteredCandidates: CandidateListItem[];
  selectedCandidate: CandidateListItem | null;
}

type JobPostingSelectionState = {
  jobPostings: JobPostingListObject[];
  filteredJobPostings: JobPostingListObject[];
  selectedJobPosting: JobPostingListObject | null;
}

type EmailGenerationSettings = {
  introductionStyle: string;
  interviewAvailability: string;
  referal: string;
  networkingPurpose: string;
  communicationStyle: string;
}

type CoverLetterGenerationSettings = {
  tone: string;
  experienceLevel: string;
  achievementEmphasis: string;
  teamCollabStyle: string;
}

type AdditionalDetailsState = {
  emailGenerationSettings: EmailGenerationSettings;
  coverLetterGenerationSettings: CoverLetterGenerationSettings;
}

export type GenerationSetupState = {
  mode: string;
  candidateSelectionState: CandidateSelectionState;
  jobPostingSelectionState: JobPostingSelectionState;
  additionalDetailsState: AdditionalDetailsState;
  updateGenerationMode: (mode: string) => void;
  updateCandidateSelectionState: (field: string, state: any) => void;
  updateJobPostingSelectionState: (field: string, state: any) => void;
  updateEmailGenerationSettings: (field: string, state: any) => void;
  updateCoverLetterGenerationSettings: (field: string, state: any) => void;
};

type SimpleAdjustmentsState = {
  disableSimpleAdjustment: boolean;
}

type IntermediateAdjustmentsState = {
  addSkillInput: string;
  insertKeywordInput: string;
  removeRedundancyInput: string;
  intermediateType: string | null;
  disableAddSkill: boolean;
  disableInsertKeyword: boolean;
  disableRemoveRedundancy: boolean;
  disableIntermediateAdjustment: boolean;
}

type CustomAdjustmentsState = {
  customAdjustment: string;
  disableCustomAdjustment: boolean;
}

type GenerationAdjustmentsState = {
  simpleAdjustmentsState: SimpleAdjustmentsState;
  intermediateAdjustmentsState: IntermediateAdjustmentsState;
  customAdjustmentsState: CustomAdjustmentsState;
  isAdjustmentsSectionExpanded: boolean;
}


export type GenerationBodyUnique = {
  generationResultsState: GenerationResultsState;
  generationAdjustmentsState: GenerationAdjustmentsState;
  updateGenerationResultsState: (field: string, state: any) => void;
  updateSimpleAdjustmentsState: (field: string, state: any) => void;
  updateIntermediateAdjustmentsState: (field: string, state: any) => void;
  updateCustomAdjustmentsState: (field: string, state: any) => void;
  toggleIsAdjustmentsSectionExpanded: () => void;  
}

export type GenerationBodyState = BodyState & GenerationBodyUnique;




//=== Context ===//

