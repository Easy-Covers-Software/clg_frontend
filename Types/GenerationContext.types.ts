export type AdditionalDetailsState = {
  simpleInput1: string;
  simpleInput2: string;
  simpleInput3: string;
  openEndedInput: string;
};

export type GenerationSetupProps = {
  jobPosting: string;
  resume: null | File;
  freeText: string;
  additionalDetails: AdditionalDetailsObj;
  isUsingLastUploadedResume: boolean;
  updateJobPosting: (jobPosting: string) => void;
  updateResume: (resume: File) => void;
  updateFreeText: (freeText: string) => void;
  updateSimpleInput: (id: string, value: string) => void;
  updateOpenEndedInput: (openEndedInput: string) => void;
  updateDisableGenerateButton: (disableGenerateButton: boolean) => void;
};

export type JobDetailsProps = {
  jobPosting: string;
  companyName: string;
  matchScore: number;
  loadingSummary: boolean;
  updateJobTitle: (jobTitle: string) => void;
  updateCompanyName: (companyName: string) => void;
  updateMatchScore: (matchScore: number) => void;
  updateLoadingSummary: (loadingSummary: boolean) => void;
};

export type CoverLetterData = {
  coverLetterHtml: string;
  coverLetterParts: null | string[];
  editedCoverLetterHtml: string;
  editedCoverLetterParts: null | string[];
  updateCoverLetterHtml: (coverLetterHtml: string) => {};
  updateEditedCoverLetterHtml: (editedCoverLetterHtml: string) => {};
  updateEditedCoverLetterParts: (editedCoverLetterParts: string[]) => {};
};

export type CoverLetterProps = {
  coverLetter: null | CoverLetterData;
  isReQuerySectionExpanded: boolean;
  loadingCoverLetter: boolean;
  updateCoverLetterHtml: (coverLetter: string) => void;
  updateEditedCoverLetterHtml: (editedCoverLetter: string) => void;
  updateEditedCoverLetterParts: (editedCoverLetterParts: string[]) => void;
  toggleIsReQuerySectionExpanded: () => void;
  updateJobPostingId: (jobPostingId: string) => void;
};

export type SimpleAdjustmentProps = {
  coverLetter: null | CoverLetterData;
  disableSimpleAdjustment: boolean;
  toggleIsReQuerySectionExpanded: () => void;
};

export type IntermediateAdjustmentProps = {
  coverLetter: null | CoverLetterData;
  addSkillInput: string;
  insertKeywordInput: string;
  removeRedundancyInput: string;
  disableAddSkill: boolean;
  disableInsertKeyword: boolean;
  disableRemoveRedundancy: boolean;
  intermediateType: null;
  disableIntermediateAdjustment: true;
  toggleIsReQuerySectionExpanded: () => void;
};

export type CustomAdjustmentProps = {
  coverLetter: null | CoverLetterData;
  customAdjustmentInput: string;
  disableCustomAdjustment: boolean;
  updateCustomAdjustmentInput: (customAdjustmentInput: string) => void;
  toggleIsReQuerySectionExpanded: () => void;
};

export type SaveProps = {
  coverLetterData: null | CoverLetterData;
  saveName: string;
  saveId: string;
  jobPostingId: string;
};

export type DownloadProps = {};

export type GenerationContextInitialState = {
  additionalDetails: AdditionalDetailsState;
  generationSetupProps: GenerationSetupProps;
  jobDetailsProps: JobDetailsProps;
  coverLetterData: CoverLetterData;
  coverLetterProps: CoverLetterProps;
  simpleAdjustmentProps: SimpleAdjustmentProps;
  intermediateAdjustmentProps: IntermediateAdjustmentProps;
  customAdjustmentProps: CustomAdjustmentProps;
  saveProps: SaveProps;
  downloadProps: DownloadProps;
};
