import { createContext, useContext, useReducer, useEffect } from 'react';
import jsPDF from 'jspdf';

import axios from 'axios';
import Cookie from 'js-cookie';

import { Helpers } from '@/Utils/utils';

const { removeDivTags, addPTags, formatCoverLetterForAdjustment } = Helpers;

const SavedContext = createContext(null);

const initialState = {
  //== Saved Cover Letters List ==//
  savedCoverLetterListProps: {
    savedCoverLetters: [],
    selectedCoverLetter: null,
    search: '',
    filterValue: '',
    update: false,
    loading: false,
    updateSavedCoverLetters: (savedCoverLetters: any[]): void => {},
    updateSelectedCoverLetter: (selectedCoverLetter: any): void => {},
    updateSearch: (search: string): void => {},
    updateFilterValue: (filterValue: string): void => {},
    resetSelected: (): void => {},
  },

  //== Job Details ==//
  jobDetailsProps: {
    jobPostingId: '',
    jobTitle: 'Job Title',
    companyName: 'Company',
    matchScore: 0,
    loadingSummary: false,

    updateJobTitle: (jobTitle: string): void => {},
    updateCompanyName: (companyName: string): void => {},
    updateMatchScore: (matchScore: number): void => {},
    toggleLoadingSummary: (): void => {},
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
          selectedCoverLetter: action.payload,
        },
      };

    case 'UPDATE_SAVED_COVER_LETTERS':
      return {
        ...state,
        savedCoverLetterListProps: {
          ...state.savedCoverLetterListProps,
          savedCoverLetters: action.payload,
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

    case 'UPDATE_FILTER_VALUE':
      return {
        ...state,
        savedCoverLetterListProps: {
          ...state.savedCoverLetterListProps,
          filterValue: action.payload,
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

export default function SavedCoverLettersContext(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //== Saved Cover Letters List ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SAVED_COVER_LETTERS_LIST_PROPS',
      payload: {
        updateSavedCoverLetters: (savedCoverLetters: any): void => {
          dispatch({
            type: 'UPDATE_SAVED_COVER_LETTERS',
            payload: savedCoverLetters,
          });
        },
        updateSelectedCoverLetter: (selectedCoverLetter: any): void => {
          dispatch({
            type: 'UPDATE_SELECTED_COVER_LETTER',
            payload: selectedCoverLetter,
          });
        },
        updateSearch: (search: string): void => {
          dispatch({
            type: 'UPDATE_SEARCH',
            payload: search,
          });
        },
        updateFilterValue: (filterValue: string): void => {
          dispatch({
            type: 'UPDATE_FILTER_VALUE',
            payload: filterValue,
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
    if (state.savedCoverLetterListProps.selectedCoverLetter !== null) {
      dispatch({
        type: 'UPDATE_COVER_LETTER_ID',
        payload: state.savedCoverLetterListProps.selectedCoverLetter.id,
      });
      dispatch({
        type: 'UPDATE_COVER_LETTER_PARTS',
        payload:
          state.savedCoverLetterListProps.selectedCoverLetter.cover_letter,
      });
      dispatch({
        type: 'UPDATE_JOB_POSTING_ID',
        payload:
          state.savedCoverLetterListProps.selectedCoverLetter.job_posting,
      });
    }
  }, [state.savedCoverLetterListProps.selectedCoverLetter]);

  useEffect(() => {
    if (state.savedCoverLetterListProps.selectedCoverLetter !== null) {
      dispatch({
        type: 'UPDATE_COVER_LETTER_HTML',
        payload: addPTags(state.coverLetterData.coverLetterParts),
      });
    }
  }, [state.coverLetterData.coverLetterParts]);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_SAVE_NAME',
      payload: `${state.jobDetailsProps.companyName} - ${state.jobDetailsProps.jobTitle}`,
    });
  }, [state.jobDetailsProps.companyName, state.jobDetailsProps.jobTitle]);

  //== Get Job Details ==//
  // get selected cover letter stored details
  useEffect(() => {
    const getJobPosting = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/job-posting/new/${state.jobDetailsProps.jobPostingId}/`;

      try {
        const response = await axios.get(url, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookie.get('csrftoken'),
          },
        });
        if (response.statusText === 'OK') {
          dispatch({
            type: 'SET_SELECTED_COVER_LETTER_JOB_POSTING',
            payload: response.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getJobPosting();
  }, [state.selectedCoverLetter]);

  console.log('saved context state', state);

  return (
    <SavedContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </SavedContext.Provider>
  );
}

export const useSavedCoverLettersContext = () => useContext(SavedContext);
