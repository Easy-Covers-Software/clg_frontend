//== Saved Cover Letters List ==//
type SavedCoverLetterListProps = {
  savedCoverLetters: any[];
  selectedCoverLetter: any;
  search: string;
  filterValue: string;
  update: boolean;
  loading: boolean;
  updateSavedCoverLetters: (savedCoverLetters: any[]) => void;
  updateSelectedCoverLetter: (selectedCoverLetter: any) => void;
  updateSearch: (search: string) => void;
  updateFilterValue: (filterValue: string) => void;
  resetSelected: () => void;
};

//== Job Details ==//
type JobDetailsProps = {
  jobPostingId: string;
  jobTitle: string;
  companyName: string;
  matchScore: number;
  loadingSummary: boolean;
  updateJobTitle: (jobTitle: string) => void;
  updateCompanyName: (companyName: string) => void;
  updateMatchScore: (matchScore: number) => void;
  toggleLoadingSummary: () => void;
};

//== Cover Letter Data ==//
type CoverLetterDataProps = {
  coverLetterId: string;
  saveName: string;
  coverLetterHtml: string;
  coverLetterParts: string[] | null;
  editedCoverLetter: string;
  editedCoverLetterParts: string[] | null;
  loadingCoverLetter: boolean;
  updateCoverLetterId: (coverLetterId: string) => void;
  updateJobPostingId: (jobPostingId: string) => void;
  updateSaveName: (saveName: string) => void;
  updateCoverLetterHtml: (html: string) => void;
  updateCoverLetterParts: (parts: string[]) => void;
  updateEditedCoverLetterHtml: (editedHtml: string) => void;
  updateEditedCoverLetterParts: (editedParts: string[]) => void;
  toggleLoadingCoverLetter: () => void;
  reset: () => void;
};

//== Simple Adjustments ==//
type SimpleAdjustmentProps = {
  disableSimpleAdjustment: boolean;
  toggleDisableSimpleAdjustment: (disableSimpleAdjustment: boolean) => void;
};

//== Intermediate Adjustments ==//
type IntermediateAdjustmentProps = {
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

//== Custom Adjustments ==//
type CustomAdjustmentProps = {
  customAdjustment: string;
  disableCustomAdjustment: boolean;
  updateCustomAdjustment: (customAdjustment: string) => void;
  toggleDisableCustomAdjustment: (disableCustomAdjustment: boolean) => void;
};

//== Save ==//
type SaveProps = {
  isSavedDropdownOpen: boolean;
  disableSavedButton: boolean;
  toggleIsSavedDropdownOpen: () => void;
  toggleDisableSavedButton: () => void;
};

//== Download ==//
type DownloadProps = {
  isDownloadDropdownOpen: boolean;
  disableDownloads: boolean;
  toggleIsDownloadDropdownOpen: () => void;
  toggleDisableDownloads: () => void;
};

//== Adjustments Section ==//
type AdjustmentSectionProps = {
  isAdjustmentsSectionExpanded: boolean;
  toggleIsAdjustmentsSectionExpanded: () => void;
};

//== Master State Type ==//
type SavedCoverLettersState = {
  savedCoverLetterListProps: SavedCoverLetterListProps;
  jobDetailsProps: JobDetailsProps;
  coverLetterData: CoverLetterDataProps;
  simpleAdjustmentProps: SimpleAdjustmentProps;
  intermediateAdjustmentProps: IntermediateAdjustmentProps;
  customAdjustmentProps: CustomAdjustmentProps;
  saveProps: SaveProps;
  downloadProps: DownloadProps;
  adjustmentSection: AdjustmentSectionProps;
};

export type {
  SavedCoverLetterListProps,
  JobDetailsProps,
  CoverLetterDataProps,
  SimpleAdjustmentProps,
  IntermediateAdjustmentProps,
  CustomAdjustmentProps,
  SaveProps,
  DownloadProps,
  AdjustmentSectionProps,
  SavedCoverLettersState,
};
