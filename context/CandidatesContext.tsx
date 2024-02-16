import { createContext, useContext, useReducer, useEffect } from 'react';
import { addPTags, addDivTag } from '@/Utils/utils';

import { fetchCandidateProfiles } from '@/api/CandidateProfileMethods';

import {
  CandidatesContext,
  CandidateContextState,
} from '@/Types/CandidatesSection.types';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const initialState: any = {
  listState: {
    listItems: [],
    filteredListItems: [],
    selected: null,
    search: '',
    loading: false,
    refresh: false,
    updateListItems: (list: any): void => {},
    updateFilteredListItems: (list: any): void => {},
    updateSelected: (selected: any): void => {},
    updateSearch: (search: string): void => {},
    updateLoading: (loading: boolean): void => {},
    toggleRefresh: (): void => {},
    setFullCandidateProfile: (candidate: any): void => {},
  },
  selectedListItem: null,
  bodyState: {
    // -2. current body mode
    mode: 'overview', // overview, resume, calls, feedback, update, jobStatus

    // -1. Full Candidate Profile
    fullCandidateProfile: null,

    // 0. Selection Summary State
    selectionSummaryState: {
      id: '',
      mainTitle: 'Job Title',
      secondaryTitle: 'Company Name',
      supplementaryInfo: '',
      loading: false,
    },

    // TODO: implement the following for structure:
    // 1. When a candidate is selected, the first page displays candidate's details are displayed in the body
    candidateState: {
      candidateDetailsMode: 'Professional Details', // 'Professional Details', 'Work Preferences'
      professionalDetailsState: {
        selectedExperience: null,
        selectedEducation: null,
      },
      workPreferencesState: {
        selectedDropdownPreference: '',
        seekingWork: '',
        salaryNeeds: '',
        dateAvailable: '',
        onSiteAvailability: {
          onSite: false,
          hybrid: false,
          remote: false,
        },
        roleType: {
          fullTime: false,
          partTime: false,
          contract: false,
          internship: false,
        },
        companySize: {
          startup: false,
          small: false,
          medium: false,
          large: false,
        },
        dropdownPrefs: [
          { relocation: '' },
          { sponsorship: '' },
          { backgroundCheck: '' },
          { culture: '' },
          { workLifeBal: '' },
          { ideal: '' },
        ],
      },
      currentJobsState: {
        jobs: [],
        selectedJob: null,
        refreshJobs: true,
      },
    },

    // 2. When the resume tab selected, need all available resumes to be listed and select the most recent and display it as default
    resumeState: {
      resumes: [],
      selectedResume: null,
      refreshResumes: true,
    },

    // 3. When the calls tab selected, need all available calls to be listed with none auto-selected
    callsState: {
      calls: [],
      selectedCall: null,
      refreshCalls: true,
    },

    // 4. When the feedback tab selected, need all available feedback to be listed with none auto-selected
    feedbackState: {
      feedback: [],
      selectedFeedback: null,
      refreshFeedback: true,
    },

    // TODO:
    // 5. When the update tab selected, present the current candidate details in the form components to allow for updating
    updateState: {
      form1: {},
      form2: {},
      form3: {},
      form4: {},
    },

    // 6. When the personal details dialog button is selected, pass personal detailsState to the dialog
    personalDetailsState: {
      selectedPersonalDetail: null,
    },

    // 7. When a job in the current jobs list is selected, the mode changes to jobStatus and displays the jobStatus overview component
    jobStatusState2: {
      mode: 'overview', // overview, resume, calls, feedback, generations, update, settings
      currentStatus: {
        status: '',
        source: '',
        hiringSteps: null,
      },
      resumeState: null,
      callsState: {
        calls: [],
        selectedCall: null,
      },
      feedbackState: {
        feedback: [],
        selectedFeedback: null,
      },
      currentlyCalculating: null,
      scoreDetails: {},
      generationResultsState: {
        id: '',
        content: null,
        contentHtml: '',
        editedContent: null,
        editedContentHtml: '',
        saveName: '',
        loading: false,
        isSavedDropdownOpen: false,
        disableSavedButton: true,
        isDownloadDropdownOpen: false,
        disableDownloads: true,
      },
    },

    //**** OLD ****//
    // 1.
    // professionalDetailsState: {
    //   selectedExperience: null,
    //   selectedEducation: null,
    // },
    // 1.
    // candidateDetailsMode: 'Professional', // Professional, Preferences

    // 1.
    workPreferencesState: {
      selectedDropdownPreference: '',
    },

    // 1.
    candidateJobPostingsListState: {
      jobPostings: [],
      selectedJobPosting: null,
      refreshJobPostings: true,
      matchScores: [], // NOTE: might not need
    },

    // 7.
    currentlyCalculating: null,

    // 7.
    jobStatusState: {
      mode: 'overview', // 7.
      selectedCandidateMode: 'overview', // REMOVE
      generationPanelMode: 'overview', // REMOVE
      callPanelMode: 'overview', // REMOVE
      selectedGeneration: null, // replace relative variable
      selectedCall: null, // replace relative variable
      loading: false, // REMOVE
      resumeUrl: '', // 2.
      refreshJobPostings: true,

      // new
      scoreMode: 'weighted', // total, weighted
    },

    // generationResultsState
    generationResultsState: {
      id: '',
      content: null,
      contentHtml: '',
      editedContent: null,
      editedContentHtml: '',
      saveName: '',
      loading: false,
      isSavedDropdownOpen: false,
      disableSavedButton: true,
      isDownloadDropdownOpen: false,
      disableDownloads: true,
    },

    updateMode: (mode: string): void => {},
    updateSelectionSummaryState: (field, state: any): void => {},
    //**** NEW ****//
    updateCandidateState: (field, state: any): void => {},
    updateProfessionalDetailsState: (field, state: any): void => {},
    updateWorkPreferencesState: (field, state: any): void => {},
    updateCurrentJobsState: (field, state: any): void => {},
    updateResumeState: (field, state: any): void => {},
    updateCallsState: (field, state: any): void => {},
    updateFeedbackState: (field, state: any): void => {},
    updateUpdateState: (field, state: any): void => {},
    updatePersonalDetailsState: (field, state: any): void => {},
    updateJobStatusState: (field, state: any): void => {},
    updateGenerationResultsState: (field, state: any): void => {},

    //**** OLD ****//
    updateCandidatePanelMode: (mode: string): void => {},
    // updateWorkPreferencesState: (field, state: any): void => {},
    updateCandidateJobPostingsListState: (field, state: any): void => {},
    updateCurrentlyCalculating: (candidateId: any): void => {},
    // updateJobStatusState: (field, state: any): void => {},
    // updateGenerationResultsState: (field, state: any): void => {},
    setFullCandidateProfile: (field, state: any): void => {},
  },
};

const CandidatesContext = createContext<CandidatesContext>({
  state: initialState,
  dispatch: () => null,
});

const candidatesReducer = (state: any, action: any) => {
  switch (action.type) {
    //=== 1. List State ===//
    case 'SET_CANDIDATE_LIST_STATE':
      return {
        ...state,
        listState: action.payload,
      };
    case 'UPDATE_CANDIDATE_LIST_STATE':
      return {
        ...state,
        listState: {
          ...state.listState,
          ...action.payload,
        },
      };

    //=== 2. Set Selected Candidate ===//
    case 'SET_SELECTED_CANDIDATE_PROFILE':
      return {
        ...state,
        selectedListItem: action.payload,
      };

    //=== 3. Selected Item Body Display State ===//
    case 'SET_SELECTED_ITEM_BODY_DISPLAY_STATE':
      return {
        ...state,
        bodyState: action.payload,
      };
    case 'UPDATE_CANDIDATE_BODY_DISPLAY_MODE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          mode: action.payload,
        },
      };
    case 'UPDATE_FULL_CANDIDATE_PROFILE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          fullCandidateProfile: action.payload,
        },
      };
    case 'UPDATE_CANDIDATE_SELECTION_SUMMARY_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          selectionSummaryState: {
            ...state.bodyState.selectionSummaryState,
            ...action.payload,
          },
        },
      };
    //**** NEW ****//
    case 'UPDATE_CANDIDATE_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          candidateState: {
            ...state.bodyState.candidateState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_PROFESSIONAL_DETAILS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          candidateState: {
            ...state.bodyState.candidateState,
            professionalDetailsState: {
              ...state.bodyState.candidateState.professionalDetailsState,
              ...action.payload,
            },
          },
        },
      };
    case 'UPDATE_WORK_PREFERENCES_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          candidateState: {
            ...state.bodyState.candidateState,
            workPreferencesState: {
              ...state.bodyState.candidateState.workPreferencesState,
              ...action.payload,
            },
          },
        },
      };
    case 'UPDATE_CURRENT_JOBS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          candidateState: {
            ...state.bodyState.candidateState,
            currentJobsState: {
              ...state.bodyState.candidateState.currentJobsState,
              ...action.payload,
            },
          },
        },
      };
    case 'UPDATE_RESUME_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          resumeState: {
            ...state.bodyState.resumeState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_CALLS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          callsState: {
            ...state.bodyState.callsState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_FEEDBACK_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          feedbackState: {
            ...state.bodyState.feedbackState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_UPDATE_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          updateState: {
            ...state.bodyState.updateState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_PERSONAL_DETAILS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          personalDetailsState: {
            ...state.bodyState.personalDetailsState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_JOB_STATUS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          jobStatusState: {
            ...state.bodyState.jobStatusState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_GENERATION_RESULTS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          jobStatusState: {
            ...state.bodyState.jobStatusState,
            generationResultsState: {
              ...state.bodyState.jobStatusState.generationResultsState,
              ...action.payload,
            },
          },
        },
      };

    //**** OLD ****//
    case 'UPDATE_WORK_PREFERENCES_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          workPreferencesState: {
            ...state.bodyState.workPreferencesState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_CANDIDATE_JOB_POSTINGS_LIST_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          candidateJobPostingsListState: {
            ...state.bodyState.candidateJobPostingsListState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_CURRENTLY_CALCULATING':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          currentlyCalculating: action.payload,
        },
      };
    case 'UPDATE_JOB_STATUS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          jobStatusState: {
            ...state.bodyState.jobStatusState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_GENERATION_RESULTS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          generationResultsState: {
            ...state.bodyState.generationResultsState,
            ...action.payload,
          },
        },
      };

    default:
      return state;
  }
};

export const CandidatesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(candidatesReducer, initialState);

  const getCandidateProfiles = async (): Promise<void> => {
    try {
      const response = await fetchCandidateProfiles();
      if (response) {
        dispatch({
          type: 'UPDATE_CANDIDATE_LIST_STATE',
          payload: {
            listItems: response.data,
            filteredListItems: response.data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCandidateProfiles();
  }, []);

  //=== Selection Summary State ===//
  useEffect(() => {
    if (state.selectedListItem) {
      dispatch({
        type: 'UPDATE_CANDIDATE_SELECTION_SUMMARY_STATE',
        payload: {
          mainTitle: state.selectedListItem.name,
          secondaryTitle: `${state.selectedListItem.current_job_title} @${state.selectedListItem.current_employer}`,
          supplementaryInfo: state.selectedListItem.updated_at,
        },
      });
    }
  }, [state.selectedListItem]);

  //== Resume Path ==//
  useEffect(() => {
    const updateResumeUrl = async () => {
      const filePath = state.selectedListItem.resume.file;
      const fullPath = `${DOMAIN}/${filePath}`;

      dispatch({
        type: 'UPDATE_RESUME_URL',
        payload: fullPath,
      });

      dispatch({
        type: 'UPDATE_JOB_STATUS_STATE',
        payload: { resumeUrl: fullPath },
      });
    };

    // set selected eduction to first if exists
    if (state.selectedListItem && state.selectedListItem.education_history) {
      dispatch({
        type: 'UPDATE_PROFESSIONAL_DETAILS_STATE',
        payload: {
          selectedEducation: state.selectedListItem.education_history[0],
        },
      });
    }

    // set selected experience to first if exists
    if (state.selectedListItem && state.selectedListItem.employment_history) {
      dispatch({
        type: 'UPDATE_PROFESSIONAL_DETAILS_STATE',
        payload: {
          selectedExperience: state.selectedListItem.employment_history[0],
        },
      });
    }

    if (state.selectedListItem?.resume?.file) {
      updateResumeUrl();
    }
  }, [state.selectedListItem]);

  useEffect(() => {
    if (!state.bodyState.jobStatusState?.selectedGeneration) {
      return;
    }

    dispatch({
      type: 'UPDATE_GENERATION_RESULTS_STATE',
      payload: {
        id: state.bodyState.jobStatusState.selectedGeneration?.id,
        content: state.bodyState.jobStatusState.selectedGeneration?.content,
        contentHtml: addDivTag(
          addPTags(state.bodyState.jobStatusState.selectedGeneration?.content)
        ),
      },
    });
  }, [state.bodyState.jobStatusState.selectedGeneration]);

  //== List State ==//
  useEffect(() => {
    dispatch({
      type: 'SET_CANDIDATE_LIST_STATE',
      payload: {
        listItems: [],
        filteredListItems: [],
        selected: null,
        search: '',
        loading: false,
        refresh: false,
        updateListItems: (list: any): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_LIST_STATE',
            payload: { listItems: list },
          });
        },
        updateFilteredListItems: (list: any): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_LIST_STATE',
            payload: { filteredListItems: list },
          });
        },
        updateSelected: (id: string): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_LIST_STATE',
            payload: { selected: id },
          });
        },
        updateSearch: (search: string): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_LIST_STATE',
            payload: { search: search },
          });
        },
        updateLoading: (loading: any): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_LIST_STATE',
            payload: { loading: loading },
          });
        },
        toggleRefresh: (): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_LIST_STATE',
            payload: { refresh: !state.listState.refresh },
          });
        },
        setFullCandidateProfile: (candidate: any): void => {
          dispatch({
            type: 'SET_SELECTED_CANDIDATE_PROFILE',
            payload: candidate,
          });
        },
      },
    });
  }, []);

  //== Body State ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SELECTED_ITEM_BODY_DISPLAY_STATE',
      payload: {
        mode: initialState.bodyState.mode,
        selectionSummaryState: initialState.bodyState.selectionSummaryState,
        candidateState: initialState.bodyState.candidateState,
        resumeState: initialState.bodyState.resumeState,
        callsState: initialState.bodyState.callsState,
        feedbackState: initialState.bodyState.feedbackState,
        updateState: initialState.bodyState.updateState,
        personalDetailsState: initialState.bodyState.personalDetailsState,
        jobStatusState: initialState.bodyState.jobStatusState,
        updateMode: (mode: string): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_BODY_DISPLAY_MODE',
            payload: mode,
          });
        },
        updateSelectionSummaryState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_SELECTION_SUMMARY_STATE',
            payload: { [field]: state },
          });
        },
        updateCandidateState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_STATE',
            payload: { [field]: state },
          });
        },
        updateProfessionalDetailsState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_PROFESSIONAL_DETAILS_STATE',
            payload: { [field]: state },
          });
        },
        updateWorkPreferencesState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_WORK_PREFERENCES_STATE',
            payload: { [field]: state },
          });
        },
        updateCurrentJobsState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_CURRENT_JOBS_STATE',
            payload: { [field]: state },
          });
        },
        updateResumeState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_RESUME_STATE',
            payload: { [field]: state },
          });
        },
        updateCallsState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_CALLS_STATE',
            payload: { [field]: state },
          });
        },
        updateFeedbackState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_FEEDBACK_STATE',
            payload: { [field]: state },
          });
        },
        updateUpdateState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_UPDATE_STATE',
            payload: { [field]: state },
          });
        },
        updatePersonalDetailsState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_PERSONAL_DETAILS_STATE',
            payload: { [field]: state },
          });
        },
        updateJobStatusState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_JOB_STATUS_STATE',
            payload: { [field]: state },
          });
        },
        updateGenerationResultsState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_GENERATION_RESULTS_STATE',
            payload: { [field]: state },
          });
        },
      },
    });
  }, []);

  console.log('cand state', state);

  return (
    <CandidatesContext.Provider value={{ state, dispatch }}>
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidatesContext = () => useContext(CandidatesContext);
