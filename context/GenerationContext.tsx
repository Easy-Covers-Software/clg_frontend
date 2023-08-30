import { createContext, useContext, useReducer, useEffect } from 'react';

import { Helpers } from '@/Utils/utils';
const { removeDivTags, formatCoverLetterForAdjustment, addPTags, addDivTag } =
  Helpers;

import { GenerationSetupProps } from '@/Types/GenerationContext.types';

const initialState = {
  //== Addition Details ==//
  additionalDetails: {
    simpleInput1: '',
    simpleInput2: '',
    simpleInput3: '',
    openEndedInput: '',
    updateSimpleInput: (id: string, value: string): void => {},
    updateOpenEndedInput: (openEndedInput: string): void => {},
  },

  //== Generation Setup ==//
  generationSetupProps: {
    jobPosting: '',
    resume: null,
    freeText: '',
    model: '',
    isUsingPreviousResume: false,
    disableGenerateButton: true,
    updateJobPosting: (jobPosting: string): void => {},
    updateResume: (resume: File): void => {},
    updateFreeText: (freeText: string): void => {},
    updateModel: (model: string): void => {},
    updateIsUsingPreviousResume: (): void => {},
    toggleDisableGenerateButton: (): void => {},
  },

  //== Job Details ==//
  jobDetailsProps: {
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
    updateSaveName: (saveName: string): void => {},
    updateCoverLetterHtml: (html: string): void => {},
    updateCoverLetterParts: (parts: string[]): void => {},
    updateEditedCoverLetterHtml: (editedHtml: string): void => {},
    updateEditedCoverLetterParts: (editedParts: string[]): void => {},
    toggleLoadingCoverLetter: (loadingCoverLetter: boolean): void => {},
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

const Context = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    //== Addition Details ==//
    case 'SET_ADDITIONAL_DETAILS':
      return {
        ...state,
        additionalDetails: {
          ...state.additionalDetails,
          ...action.payload,
        },
      };

    case 'UPDATE_SIMPLE_INPUT1':
      return {
        ...state,
        additionalDetails: {
          ...state.additionalDetails,
          simpleInput1: action.payload,
        },
      };

    case 'UPDATE_SIMPLE_INPUT2':
      return {
        ...state,
        additionalDetails: {
          ...state.additionalDetails,
          simpleInput2: action.payload,
        },
      };

    case 'UPDATE_SIMPLE_INPUT3':
      return {
        ...state,
        additionalDetails: {
          ...state.additionalDetails,
          simpleInput3: action.payload,
        },
      };

    case 'UPDATE_OPEN_ENDED_INPUT':
      return {
        ...state,
        additionalDetails: {
          ...state.additionalDetails,
          openEndedInput: action.payload,
        },
      };

    //== Generation Setup ==//
    case 'SET_GENERATION_SETUP_PROPS':
      return {
        ...state,
        generationSetupProps: {
          ...state.generationSetupProps,
          ...action.payload,
        },
      };

    case 'UPDATE_JOB_POSTING':
      return {
        ...state,
        generationSetupProps: {
          ...state.generationSetupProps,
          jobPosting: action.payload,
        },
      };

    case 'UPDATE_RESUME':
      return {
        ...state,
        generationSetupProps: {
          ...state.generationSetupProps,
          resume: action.payload,
        },
      };

    case 'UPDATE_FREE_TEXT':
      return {
        ...state,
        generationSetupProps: {
          ...state.generationSetupProps,
          freeText: action.payload,
        },
      };

    case 'UPDATE_MODEL':
      return {
        ...state,
        generationSetupProps: {
          ...state.generationSetupProps,
          model: action.payload,
        },
      };

    case 'UPDATE_IS_USING_PREVIOUS_RESUME':
      return {
        ...state,
        generationSetupProps: {
          ...state.generationSetupProps,
          isUsingPreviousResume: action.payload,
        },
      };

    case 'TOGGLE_DISABLE_GENERATE_BUTTON':
      return {
        ...state,
        generationSetupProps: {
          ...state.generationSetupProps,
          disableGenerateButton:
            !state.generationSetupProps.disableGenerateButton,
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
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function GenerationContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //==* State Hooks *==//
  //== Addition Details ==//
  useEffect(() => {
    dispatch({
      type: 'SET_ADDITIONAL_DETAILS',
      payload: {
        updateSimpleInput: (id: string, value: string): void => {
          dispatch({
            type: `UPDATE_SIMPLE_INPUT${id}`,
            payload: value,
          });
        },
        updateOpenEndedInput: (openEndedInput: string): void => {
          dispatch({
            type: 'UPDATE_OPEN_ENDED_INPUT',
            payload: openEndedInput,
          });
        },
      },
    });
  }, []);

  //== Generation Setup ==//
  useEffect(() => {
    dispatch({
      type: 'SET_GENERATION_SETUP_PROPS',
      payload: {
        updateJobPosting: (jobPosting: string): void => {
          dispatch({
            type: 'UPDATE_JOB_POSTING',
            payload: jobPosting,
          });
        },
        updateResume: (resume: File): void => {
          dispatch({
            type: 'UPDATE_RESUME',
            payload: resume,
          });
        },
        updateFreeText: (freeText: string): void => {
          dispatch({
            type: 'UPDATE_FREE_TEXT',
            payload: freeText,
          });
        },
        updateModel: (model: string): void => {
          dispatch({
            type: 'UPDATE_MODEL',
            payload: model,
          });
        },
        toggleDisableGenerateButton: (): void => {
          dispatch({
            type: 'TOGGLE_DISABLE_GENERATE_BUTTON',
          });
        },
        updateIsUsingPreviousResume: (tof: boolean): void => {
          dispatch({
            type: 'UPDATE_IS_USING_PREVIOUS_RESUME',
            payload: tof,
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
  //== Update Html ==//
  useEffect(() => {
    if (state.coverLetterData.coverLetterParts) {
      dispatch({
        type: 'UPDATE_COVER_LETTER_HTML',
        payload: addDivTag(addPTags(state.coverLetterData.coverLetterParts)),
      });
    }
  }, [state.coverLetterData.coverLetterParts]);

  //== Update Save Name ==//
  useEffect(() => {
    dispatch({
      type: 'UPDATE_SAVE_NAME',
      payload: `${state.jobDetailsProps.companyName} - ${state.jobDetailsProps.jobTitle}`,
    });
  }, [state.jobDetailsProps.companyName, state.jobDetailsProps.jobTitle]);

  console.log('gen state', state);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useGenerationContext = () => useContext(Context);
