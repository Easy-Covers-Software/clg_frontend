export type AdditionalDetails = {
  simpleInput1: string;
  simpleInput2: string;
  simpleInput3: string;
  openEndedInput: string;
  updateSimpleInput: (id: string, value: string) => void;
  updateOpenEndedInput: (openEndedInput: string) => void;
};

export type GenerationSetupProps = {
  jobPosting: string;
  resume: File | null;
  freeText: string;
  model: string;
  isUsingPreviousResume: boolean;
  disableGenerateButton: boolean;
  updateJobPosting: (jobPosting: string) => void;
  updateResume: (resume: File) => void;
  updateFreeText: (freeText: string) => void;
  updateModel: (model: string) => void;
  toggleDisableGenerateButton: () => void;
  updateIsUsingPreviousResume: () => void;
};

export type JobDetailsProps = {
  jobTitle: string;
  companyName: string;
  matchScore: number;
  loadingSummary: boolean;
  updateJobTitle: (jobTitle: string) => void;
  updateCompanyName: (companyName: string) => void;
  updateMatchScore: (matchScore: number) => void;
  toggleLoadingSummary: (loadingSummary: boolean) => void;
};

export type CoverLetterData = {
  coverLetterId: string;
  saveName: string;
  coverLetterHtml: string;
  coverLetterParts: string[] | null;
  editedCoverLetter: string;
  editedCoverLetterParts: string[] | null;
  loadingCoverLetter: boolean;
  curCoverLetterHtml: string;
  curCoverLetterParts: string[] | null;
  updateCoverLetterId: (coverLetterId: string) => void;
  updateSaveName: (saveName: string) => void;
  updateCoverLetterHtml: (html: string) => void;
  updateCoverLetterParts: (parts: string[]) => void;
  updateEditedCoverLetterHtml: (editedHtml: string) => void;
  updateEditedCoverLetterParts: (editedParts: string[]) => void;
  toggleLoadingCoverLetter: () => void;
  reset: () => void;
};

export type SimpleAdjustmentProps = {
  disableSimpleAdjustment: boolean;
  toggleDisableSimpleAdjustment: (disableSimpleAdjustment: boolean) => void;
};

export type IntermediateAdjustmentProps = {
  addSkillInput: string;
  insertKeywordInput: string;
  removeRedundancyInput: string;
  intermediateType: string | null;
  disableAddSkill: boolean;
  disableInsertKeyword: boolean;
  disableRemoveRedundancy: boolean;
  disableIntermediateAdjustment: boolean;
  updateAddSkillInput: (addSkillInput: string) => void;
  updateInsertKeywordInput: (insertKeywordInput: string) => void;
  updateRemoveRedundancyInput: (removeRedundancyInput: string) => void;
  updateIntermediateType: (intermediateType: string) => void;
  toggleDisableAddSkill: () => void;
  toggleDisableInsertKeyword: () => void;
  toggleDisableRemoveRedundancy: () => void;
  toggleDisableIntermediateAdjustment: () => void;
};

export type CustomAdjustmentProps = {
  customAdjustment: string;
  disableCustomAdjustment: boolean;
  updateCustomAdjustment: (customAdjustment: string) => void;
  toggleDisableCustomAdjustment: (disableCustomAdjustment: boolean) => void;
};

export type SaveProps = {
  isSavedDropdownOpen: boolean;
  disableSavedButton: boolean;
  toggleIsSavedDropdownOpen: () => void;
  toggleDisableSavedButton: () => void;
};

export type DownloadProps = {
  isDownloadDropdownOpen: boolean;
  disableDownloads: boolean;
  toggleIsDownloadDropdownOpen: () => void;
  toggleDisableDownloads: () => void;
};

export type AdjustmentSection = {
  isAdjustmentsSectionExpanded: boolean;
  toggleIsAdjustmentsSectionExpanded: () => void;
};

export type GenerationState = {
  additionalDetails: AdditionalDetails;
  generationSetupProps: GenerationSetupProps;
  jobDetailsProps: JobDetailsProps;
  coverLetterData: CoverLetterData;
  simpleAdjustmentProps: SimpleAdjustmentProps;
  intermediateAdjustmentProps: IntermediateAdjustmentProps;
  customAdjustmentProps: CustomAdjustmentProps;
  saveProps: SaveProps;
  downloadProps: DownloadProps;
  adjustmentSection: AdjustmentSection;
};
