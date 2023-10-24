import { createContext, useContext, useReducer, useEffect } from 'react';
import { Helpers, CoverLetterApiMethods } from '@/Utils/utils';

const { removeDivTags, addPTags, formatCoverLetterForAdjustment } = Helpers;
const { getJobPosting } = CoverLetterApiMethods;

import { SavedCoverLettersState } from '@/Types/SavedContext.types';
import {
  APIResponse,
  GetJobPostingApiResponse,
} from '@/Types/ApiResponse.types';

const initialState: SavedCoverLettersState = {
  //== Saved Cover Letters List ==//
  savedCoverLetterListProps: {
    savedItems: [],
    filteredItems: [],
    selected: null,
    search: '',
    filterValue: '',
    update: false,
    loading: false,
    updateSavedItems: (savedItems: any[]): void => {},
    updateSelected: (selected: any): void => {},
    updateSearch: (search: string): void => {},
    updateFilteredItems: (filteredItems: any[]): void => {},
    resetSelected: (): void => {},
  },

  //== Job Details ==//
  jobDetailsProps: {
    id: '',
    mainTitle: 'Job Title',
    secondaryTitle: 'Company',
    supplementalInfo: 0,
    loading: false,
    updateMainTitle: (title: string): void => {},
    updateSecondaryTitle: (title: string): void => {},
    updateSupplementalInfo: (info: number): void => {},
    toggleLoading: (): void => {},
  },

  //== Cover Letter Data ==//
  coverLetterData: {
    coverLetterId: '',
    saveName: '',
    coverLetterHtml: '',
    coverLetterParts: null,
    editedCoverLetter: '',
    editedCoverLetterParts: null,
    loadingCoverLetter: false,
    updateCoverLetterId: (coverLetterId: string): void => {},
    updateJobPostingId: (jobPostingId: string): void => {},
    updateSaveName: (saveName: string): void => {},
    updateCoverLetterHtml: (html: string): void => {},
    updateCoverLetterParts: (parts: string[]): void => {},
    updateEditedCoverLetterHtml: (editedHtml: string): void => {},
    updateEditedCoverLetterParts: (editedParts: string[]): void => {},
    toggleLoadingCoverLetter: (): void => {},
    reset: (): void => {},
  },

  //== Simple Adjustments ==//
  simpleAdjustmentProps: {
    disableSimpleAdjustment: true,
    toggleDisableSimpleAdjustment: (
      disableSimpleAdjustment: boolean
    ): void => {},
  },

  //== Intermediate Adjustments ==//
  intermediateAdjustmentProps: {
    addSkillInput: '',
    insertKeywordInput: '',
    removeRedundancyInput: '',
    intermediateType: null,
    disableAddSkill: false,
    disableInsertKeyword: false,
    disableRemoveRedundancy: false,
    disableIntermediateAdjustment: true,
    updateAddSkillInput: (addSkillInput: string): void => {},
    updateInsertKeywordInput: (insertKeywordInput: string): void => {},
    updateRemoveRedundancyInput: (removeRedundancyInput: string): void => {},
    updateIntermediateType: (intermediateType: string): void => {},
    toggleDisableAddSkill: (): void => {},
    toggleDisableInsertKeyword: (): void => {},
    toggleDisableRemoveRedundancy: (): void => {},
    toggleDisableIntermediateAdjustment: (): void => {},
  },

  //== Custom Adjustments ==//
  customAdjustmentProps: {
    customAdjustment: '',
    disableCustomAdjustment: true,
    updateCustomAdjustment: (customAdjustment: string): void => {},
    toggleDisableCustomAdjustment: (
      disableCustomAdjustment: boolean
    ): void => {},
  },

  //== Save ==//
  saveProps: {
    isSavedDropdownOpen: false,
    disableSavedButton: true,
    toggleIsSavedDropdownOpen: (): void => {},
    toggleDisableSavedButton: (): void => {},
  },

  //== Download ==//
  downloadProps: {
    isDownloadDropdownOpen: false,
    disableDownloads: true,
    toggleIsDownloadDropdownOpen: (): void => {},
    toggleDisableDownloads: (): void => {},
  },

  //== Adjustments Section ==//
  adjustmentSection: {
    isAdjustmentsSectionExpanded: false,
    toggleIsAdjustmentsSectionExpanded: (): void => {},
  },
};

function reducer(state, action) {
  switch (action.type) {
    //== Saved Cover Letters List ==//
    case 'SET_SAVED_COVER_LETTERS_LIST_PROPS':
      return {
        ...state,
        savedCoverLetterListProps: {
          ...state.savedCoverLetterListProps,
          ...action.payload,
        },
      };

    case 'UPDATE_SELECTED_COVER_LETTER':
      return {
        ...state,
        savedCoverLetterListProps: {
          ...state.savedCoverLetterListProps,
          selected: action.payload,
        },
      };

    case 'UPDATE_SAVED_COVER_LETTERS':
      return {
        ...state,
        savedCoverLetterListProps: {
          ...state.savedCoverLetterListProps,
          savedItems: action.payload,
        },
      };

    case 'UPDATE_SEARCH':
      return {
        ...state,
        savedCoverLetterListProps: {
          ...state.savedCoverLetterListProps,
          search: action.payload,
        },
      };

    case 'UPDATE_FILTERED_ITEMS':
      return {
        ...state,
        savedCoverLetterListProps: {
          ...state.savedCoverLetterListProps,
          filteredItems: action.payload,
        },
      };

    case 'TOGGLE_LOADING_SAVED_COVER_LETTERS':
      return {
        ...state,
        savedCoverLetterListProps: {
          ...state.savedCoverLetterListProps,
          loading: !state.savedCoverLetterListProps.loading,
        },
      };

    //== Job Details ==//
    case 'SET_JOB_DETAILS_PROPS':
      return {
        ...state,
        jobDetailsProps: {
          ...state.jobDetailsProps,
          ...action.payload,
        },
      };

    case 'UPDATE_JOB_POSTING_ID':
      return {
        ...state,
        jobDetailsProps: {
          ...state.jobDetailsProps,
          jobPostingId: action.payload,
        },
      };

    case 'UPDATE_JOB_TITLE':
      return {
        ...state,
        jobDetailsProps: {
          ...state.jobDetailsProps,
          jobTitle: action.payload,
        },
      };

    case 'UPDATE_COMPANY_NAME':
      return {
        ...state,
        jobDetailsProps: {
          ...state.jobDetailsProps,
          companyName: action.payload,
        },
      };

    case 'UPDATE_MATCH_SCORE':
      return {
        ...state,
        jobDetailsProps: {
          ...state.jobDetailsProps,
          matchScore: action.payload,
        },
      };

    case 'TOGGLE_LOADING_SUMMARY':
      return {
        ...state,
        jobDetailsProps: {
          ...state.jobDetailsProps,
          loadingSummary: !state.jobDetailsProps.loadingSummary,
        },
      };

    //== Cover Letter Data ==//
    case 'SET_COVER_LETTER_DATA':
      return {
        ...state,
        coverLetterData: {
          ...state.coverLetterData,
          ...action.payload,
        },
      };

    case 'UPDATE_COVER_LETTER_ID':
      return {
        ...state,
        coverLetterData: {
          ...state.coverLetterData,
          coverLetterId: action.payload,
        },
      };

    case 'UPDATE_SAVE_NAME':
      return {
        ...state,
        coverLetterData: {
          ...state.coverLetterData,
          saveName: action.payload,
        },
      };

    case 'UPDATE_COVER_LETTER_HTML':
      return {
        ...state,
        coverLetterData: {
          ...state.coverLetterData,
          coverLetterHtml: action.payload,
        },
      };

    case 'UPDATE_COVER_LETTER_PARTS':
      return {
        ...state,
        coverLetterData: {
          ...state.coverLetterData,
          coverLetterParts: action.payload,
        },
      };

    case 'UPDATE_EDITED_COVER_LETTER_HTML':
      return {
        ...state,
        coverLetterData: {
          ...state.coverLetterData,
          editedCoverLetter: action.payload,
        },
      };

    case 'UPDATE_EDITED_COVER_LETTER_PARTS':
      return {
        ...state,
        coverLetterData: {
          ...state.coverLetterData,
          editedCoverLetterParts: action.payload,
        },
      };

    case 'TOGGLE_LOADING_COVER_LETTER':
      return {
        ...state,
        coverLetterData: {
          ...state.coverLetterData,
          loadingCoverLetter: !state.coverLetterData.loadingCoverLetter,
        },
      };

    case 'DETERMINE_COVER_LETTER_HTML':
      return {
        ...state,
        coverLetterData: {
          ...state.coverLetterData,
          curCoverLetterHtml: formatCoverLetterForAdjustment(
            removeDivTags(action.payload)
          ),
        },
      };

    case 'DETERMINE_COVER_LETTER_PARTS':
      return {
        ...state,
        coverLetterData: {
          ...state.coverLetterData,
          curCoverLetterParts: action.payload,
        },
      };

    case 'RESET_COVER_LETTER_DATA':
      return {
        ...state,
        coverLetterData: {
          ...state.coverLetterData,
          coverLetterHtml: '',
          coverLetterParts: null,
          editedCoverLetter: '',
          editedCoverLetterParts: null,
          loadingCoverLetter: false,
          curCoverLetterHtml: '',
          curCoverLetterParts: null,
        },
      };

    //== Simple Adjustments ==//
    case 'SET_SIMPLE_ADJUSTMENT_PROPS':
      return {
        ...state,
        simpleAdjustmentProps: {
          ...state.simpleAdjustmentProps,
          ...action.payload,
        },
      };

    case 'TOGGLE_DISABLE_SIMPLE_ADJUSTMENT':
      return {
        ...state,
        simpleAdjustmentProps: {
          ...state.simpleAdjustmentProps,
          disableSimpleAdjustment:
            !state.simpleAdjustmentProps.disableSimpleAdjustment,
        },
      };

    //== Intermediate Adjustments ==//
    case 'SET_INTERMEDIATE_ADJUSTMENT_PROPS':
      return {
        ...state,
        intermediateAdjustmentProps: {
          ...state.intermediateAdjustmentProps,
          ...action.payload,
        },
      };

    case 'UPDATE_ADD_SKILL_INPUT':
      return {
        ...state,
        intermediateAdjustmentProps: {
          ...state.intermediateAdjustmentProps,
          addSkillInput: action.payload,
        },
      };

    case 'UPDATE_INSERT_KEYWORD_INPUT':
      return {
        ...state,
        intermediateAdjustmentProps: {
          ...state.intermediateAdjustmentProps,
          insertKeywordInput: action.payload,
        },
      };

    case 'UPDATE_REMOVE_REDUNDANCY_INPUT':
      return {
        ...state,
        intermediateAdjustmentProps: {
          ...state.intermediateAdjustmentProps,
          removeRedundancyInput: action.payload,
        },
      };

    case 'UPDATE_INTERMEDIATE_TYPE':
      return {
        ...state,
        intermediateAdjustmentProps: {
          ...state.intermediateAdjustmentProps,
          intermediateType: action.payload,
        },
      };

    case 'TOGGLE_DISABLE_ADD_SKILL':
      return {
        ...state,
        intermediateAdjustmentProps: {
          ...state.intermediateAdjustmentProps,
          disableAddSkill: !state.intermediateAdjustmentProps.disableAddSkill,
        },
      };

    case 'TOGGLE_DISABLE_INSERT_KEYWORD':
      return {
        ...state,
        intermediateAdjustmentProps: {
          ...state.intermediateAdjustmentProps,
          disableInsertKeyword:
            !state.intermediateAdjustmentProps.disableInsertKeyword,
        },
      };

    case 'TOGGLE_DISABLE_REMOVE_REDUNDANCY':
      return {
        ...state,
        intermediateAdjustmentProps: {
          ...state.intermediateAdjustmentProps,
          disableRemoveRedundancy:
            !state.intermediateAdjustmentProps.disableRemoveRedundancy,
        },
      };

    case 'TOGGLE_DISABLE_INTERMEDIATE_ADJUSTMENT':
      return {
        ...state,
        intermediateAdjustmentProps: {
          ...state.intermediateAdjustmentProps,
          disableIntermediateAdjustment:
            !state.intermediateAdjustmentProps.disableIntermediateAdjustment,
        },
      };

    //== Custom Adjustments ==//
    case 'SET_CUSTOM_ADJUSTMENT_PROPS':
      return {
        ...state,
        customAdjustmentProps: {
          ...state.customAdjustmentProps,
          ...action.payload,
        },
      };

    case 'UPDATE_CUSTOM_ADJUSTMENT':
      return {
        ...state,
        customAdjustmentProps: {
          ...state.customAdjustmentProps,
          customAdjustment: action.payload,
        },
      };

    case 'TOGGLE_DISABLE_CUSTOM_ADJUSTMENT':
      return {
        ...state,
        customAdjustmentProps: {
          ...state.customAdjustmentProps,
          disableCustomAdjustment:
            !state.customAdjustmentProps.disableCustomAdjustment,
        },
      };

    //== Save ==//
    case 'SET_SAVE_PROPS':
      return {
        ...state,
        saveProps: {
          ...state.saveProps,
          ...action.payload,
        },
      };

    case 'TOGGLE_IS_SAVED_DROPDOWN_OPEN':
      return {
        ...state,
        saveProps: {
          ...state.saveProps,
          isSavedDropdownOpen: !state.saveProps.isSavedDropdownOpen,
        },
      };

    case 'TOGGLE_DISABLE_SAVED_BUTTON':
      return {
        ...state,
        saveProps: {
          ...state.saveProps,
          disableSavedButton: !state.saveProps.disableSavedButton,
        },
      };

    //== Download ==//
    case 'SET_DOWNLOAD_PROPS':
      return {
        ...state,
        downloadProps: {
          ...state.downloadProps,
          ...action.payload,
        },
      };

    case 'TOGGLE_IS_DOWNLOAD_DROPDOWN_OPEN':
      return {
        ...state,
        downloadProps: {
          ...state.downloadProps,
          isDownloadDropdownOpen: !state.downloadProps.isDownloadDropdownOpen,
        },
      };

    case 'TOGGLE_DISABLE_DOWNLOADS':
      return {
        ...state,
        downloadProps: {
          ...state.downloadProps,
          disableDownloads: !state.downloadProps.disableDownloads,
        },
      };

    //== Adjustments Section Open ==//
    case 'SET_ADJUSTMENTS_SECTION':
      return {
        ...state,
        adjustmentSection: {
          ...state.adjustmentSection,
          ...action.payload,
        },
      };

    case 'TOGGLE_IS_ADJUSTMENTS_SECTION_EXPANDED':
      return {
        ...state,
        adjustmentSection: {
          ...state.adjustmentSection,
          isAdjustmentsSectionExpanded:
            !state.adjustmentSection.isAdjustmentsSectionExpanded,
        },
      };

    default:
      return state;
  }
}

export default function SavedCoverLettersContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //== Saved Cover Letters List ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SAVED_COVER_LETTERS_LIST_PROPS',
      payload: {
        updateSavedItems: (savedItems: any): void => {
          dispatch({
            type: 'UPDATE_SAVED_COVER_LETTERS',
            payload: savedItems,
          });
        },
        updateSelected: (selected: any): void => {
          dispatch({
            type: 'UPDATE_SELECTED_COVER_LETTER',
            payload: selected,
          });
        },
        updateSearch: (search: string): void => {
          dispatch({
            type: 'UPDATE_SEARCH',
            payload: search,
          });
        },
        updateFilteredItems: (filteredItems: any[]): void => {
          dispatch({
            type: 'UPDATE_FILTERED_ITEMS',
            payload: filteredItems,
          });
        },
        toggleLoadingSavedCoverLetters: (): void => {
          dispatch({
            type: 'TOGGLE_LOADING_SAVED_COVER_LETTERS',
          });
        },
      },
    });
  }, []);

  //== Job Details ==//
  useEffect(() => {
    dispatch({
      type: 'SET_JOB_DETAILS_PROPS',
      payload: {
        updateJobTitle: (jobTitle: string): void => {
          dispatch({
            type: 'UPDATE_JOB_TITLE',
            payload: jobTitle,
          });
        },
        updateCompanyName: (companyName: string): void => {
          dispatch({
            type: 'UPDATE_COMPANY_NAME',
            payload: companyName,
          });
        },
        updateMatchScore: (matchScore: number): void => {
          dispatch({
            type: 'UPDATE_MATCH_SCORE',
            payload: matchScore,
          });
        },
        toggleLoadingSummary: (): void => {
          dispatch({
            type: 'TOGGLE_LOADING_SUMMARY',
          });
        },
      },
    });
  }, []);

  //== Cover Letter Data ==//
  useEffect(() => {
    dispatch({
      type: 'SET_COVER_LETTER_DATA',
      payload: {
        updateCoverLetterId: (coverLetterId: string): void => {
          dispatch({
            type: 'UPDATE_COVER_LETTER_ID',
            payload: coverLetterId,
          });
        },
        updateSaveName: (saveName: string): void => {
          dispatch({
            type: 'UPDATE_SAVE_NAME',
            payload: saveName,
          });
        },
        updateCoverLetterHtml: (html: string): void => {
          dispatch({
            type: 'UPDATE_COVER_LETTER_HTML',
            payload: html,
          });
        },
        updateCoverLetterParts: (parts: string[]): void => {
          dispatch({
            type: 'UPDATE_COVER_LETTER_PARTS',
            payload: parts,
          });
        },
        updateEditedCoverLetterHtml: (editedHtml: string): void => {
          dispatch({
            type: 'UPDATE_EDITED_COVER_LETTER_HTML',
            payload: editedHtml,
          });
        },
        updateEditedCoverLetterParts: (editedParts: string[]): void => {
          dispatch({
            type: 'UPDATE_EDITED_COVER_LETTER_PARTS',
            payload: editedParts,
          });
        },
        toggleLoadingCoverLetter: (): void => {
          dispatch({
            type: 'TOGGLE_LOADING_COVER_LETTER',
          });
        },
      },
    });
  }, []);

  //== Simple Adjustments ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SIMPLE_ADJUSTMENT_PROPS',
      payload: {
        toggleDisableSimpleAdjustment: (): void => {
          dispatch({
            type: 'TOGGLE_DISABLE_SIMPLE_ADJUSTMENT',
          });
        },
      },
    });
  }, []);

  //== Intermediate Adjustments ==//
  useEffect(() => {
    dispatch({
      type: 'SET_INTERMEDIATE_ADJUSTMENT_PROPS',
      payload: {
        updateAddSkillInput: (addSkillInput: string): void => {
          dispatch({
            type: 'UPDATE_ADD_SKILL_INPUT',
            payload: addSkillInput,
          });
        },
        updateInsertKeywordInput: (insertKeywordInput: string): void => {
          dispatch({
            type: 'UPDATE_INSERT_KEYWORD_INPUT',
            payload: insertKeywordInput,
          });
        },
        updateRemoveRedundancyInput: (removeRedundancyInput: string): void => {
          dispatch({
            type: 'UPDATE_REMOVE_REDUNDANCY_INPUT',
            payload: removeRedundancyInput,
          });
        },
        updateIntermediateType: (intermediateType: string): void => {
          dispatch({
            type: 'UPDATE_INTERMEDIATE_TYPE',
            payload: intermediateType,
          });
        },
        toggleDisableAddSkill: (): void => {
          dispatch({
            type: 'TOGGLE_DISABLE_ADD_SKILL',
          });
        },
        toggleDisableInsertKeyword: (): void => {
          dispatch({
            type: 'TOGGLE_DISABLE_INSERT_KEYWORD',
          });
        },
        toggleDisableRemoveRedundancy: (): void => {
          dispatch({
            type: 'TOGGLE_DISABLE_REMOVE_REDUNDANCY',
          });
        },
        toggleDisableIntermediateAdjustment: (): void => {
          dispatch({
            type: 'TOGGLE_DISABLE_INTERMEDIATE_ADJUSTMENT',
          });
        },
      },
    });
  }, []);

  //== Custom Adjustments ==//
  useEffect(() => {
    dispatch({
      type: 'SET_CUSTOM_ADJUSTMENT_PROPS',
      payload: {
        updateCustomAdjustment: (customAdjustment: string): void => {
          dispatch({
            type: 'UPDATE_CUSTOM_ADJUSTMENT',
            payload: customAdjustment,
          });
        },
        toggleDisableCustomAdjustment: (): void => {
          dispatch({
            type: 'TOGGLE_DISABLE_CUSTOM_ADJUSTMENT',
          });
        },
      },
    });
  }, []);

  //== Save ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SAVE_PROPS',
      payload: {
        toggleIsSavedDropdownOpen: (): void => {
          dispatch({
            type: 'TOGGLE_IS_SAVED_DROPDOWN_OPEN',
          });
        },
        toggleDisableSavedButton: (): void => {
          dispatch({
            type: 'TOGGLE_DISABLE_SAVED_BUTTON',
          });
        },
      },
    });
  }, []);

  //== Download ==//
  useEffect(() => {
    dispatch({
      type: 'SET_DOWNLOAD_PROPS',
      payload: {
        toggleIsDownloadDropdownOpen: (): void => {
          dispatch({
            type: 'TOGGLE_IS_DOWNLOAD_DROPDOWN_OPEN',
          });
        },
        toggleDisableDownloads: (): void => {
          dispatch({
            type: 'TOGGLE_DISABLE_DOWNLOADS',
          });
        },
      },
    });
  }, []);

  //== Adjustments Section ==//
  useEffect(() => {
    dispatch({
      type: 'SET_ADJUSTMENTS_SECTION',
      payload: {
        toggleIsAdjustmentsSectionExpanded: (): void => {
          dispatch({
            type: 'TOGGLE_IS_ADJUSTMENTS_SECTION_EXPANDED',
          });
        },
      },
    });
  }, []);

  //==* Helper Hooks *==//
  //== Selected Cover Letter ==//
  useEffect(() => {
    if (state.savedCoverLetterListProps.selected !== null) {
      dispatch({
        type: 'UPDATE_COVER_LETTER_ID',
        payload: state.savedCoverLetterListProps.selected,
      });
      dispatch({
        type: 'UPDATE_COVER_LETTER_PARTS',
        payload: state.savedCoverLetterListProps.selected.cover_letter,
      });
      dispatch({
        type: 'UPDATE_JOB_POSTING_ID',
        payload: state.savedCoverLetterListProps.selected.job_posting,
      });
    }
  }, [state.savedCoverLetterListProps.selected]);

  //== Cover Letter HTML ==//
  useEffect(() => {
    if (state.savedCoverLetterListProps.selected !== null) {
      dispatch({
        type: 'UPDATE_COVER_LETTER_HTML',
        payload: addPTags(state.coverLetterData.coverLetterParts),
      });
    }
  }, [state.coverLetterData.coverLetterParts]);

  //== Save Name ==//
  useEffect(() => {
    dispatch({
      type: 'UPDATE_SAVE_NAME',
      payload: `${state.jobDetailsProps.companyName} - ${state.jobDetailsProps.jobTitle}`,
    });
  }, [state.jobDetailsProps.companyName, state.jobDetailsProps.jobTitle]);

  //== Get Job Details ==//
  // get selected cover letter stored details
  useEffect(() => {
    const updateJobPosting = async () => {
      if (state.jobDetailsProps.jobPostingId !== '') {
        const response: APIResponse<GetJobPostingApiResponse> =
          await getJobPosting(state.jobDetailsProps.jobPostingId);

        if (response.data) {
          dispatch({
            type: 'UPDATE_JOB_TITLE',
            payload: response.data.job_title,
          });
          dispatch({
            type: 'UPDATE_COMPANY_NAME',
            payload: response.data.company_name,
          });
          dispatch({
            type: 'UPDATE_MATCH_SCORE',
            payload: response.data.match_score,
          });
        }
      }
    };
    updateJobPosting();
  }, [state.jobDetailsProps.jobPostingId]);

  console.log('saved context state', state);

  return (
    <SavedContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}
const SavedContext = createContext({
  state: initialState,
  dispatch: reducer,
});

export const useSavedCoverLettersContext = () => useContext(SavedContext);
