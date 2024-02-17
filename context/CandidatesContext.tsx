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

    // 0. Selection Summary State
    selectionSummaryState: {
      id: '',
      mainTitle: 'Job Title',
      secondaryTitle: 'Company Name',
      supplementaryInfo: '',
      loading: false,
    },

    // TODO: add resumeState, callsState, feedbackState, candUpdateState, personalDetailsState into candidateState
    // 1. When a candidate is selected, the first page displays candidate's details are displayed in the body
    candidateState: {
      candidateDetailsMode: 'Professional Details', // 'Professional Details', 'Work Preferences'
      selectedCandidate: null,
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
      resumeState: {
        resumes: [], // update the list with the resumeState
        selectedResume: null,
        refreshResumes: true,
      },
      callsState: {
        calls: [],
        selectedCall: null,
        refreshCalls: true,
      },
      feedbackState: {
        feedback: [],
        selectedFeedback: null,
        refreshFeedback: true,
      },
      personalDetailsState: {
        selectedPersonalDetail: null,
      },
    },

    // TODO:
    // 5. When the update tab selected, present the current candidate details in the form components to allow for updating
    candUpdateState: {
      form1: {},
      form2: {},
      form3: {},
      form4: {},
    },

    // 7. When a job in the current jobs list is selected, the mode changes to jobStatus and displays the jobStatus overview component
    jobStatusState: {
      mode: 'overview', // overview, resume, calls, feedback, generations, update, settings
      selectedJob: null,
      currentStatus: {
        status: '',
        source: '',
        hiringSteps: null,
      },
      resumeState: {
        resumes: [],
        selectedResume: null,
      },
      callsState: {
        calls: [],
        selectedCall: null,
      },
      feedbackState: {
        feedback: [],
        selectedFeedback: null,
      },
      generationsState: {
        generations: [],
        selectedGeneration: null,
      },
      currentlyCalculating: '',
      scoreDetails: {},
      scoreMode: 'weighted',
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
          candidateState: {
            ...state.bodyState.candidateState,
            resumeState: {
              ...state.bodyState.candidateState.resumeState,
              ...action.payload,
            },
          },
        },
      };
    case 'UPDATE_CALLS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          candidateState: {
            ...state.bodyState.candidateState,
            callsState: {
              ...state.bodyState.candidateState.callsState,
              ...action.payload,
            },
          },
        },
      };
    case 'UPDATE_FEEDBACK_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          candidateState: {
            ...state.bodyState.candidateState,
            feedbackState: {
              ...state.bodyState.candidateState.feedbackState,
              ...action.payload,
            },
          },
        },
      };
    case 'UPDATE_UPDATE_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          candUpdateState: {
            ...state.bodyState.candUpdateState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_PERSONAL_DETAILS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          candidateState: {
            ...state.bodyState.candidateState,
            personalDetailsState: {
              ...state.bodyState.candidateState.personalDetailsState,
              ...action.payload,
            },
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
    if (state.bodyState.candidateState.selectedCandidate) {
      dispatch({
        type: 'UPDATE_CANDIDATE_SELECTION_SUMMARY_STATE',
        payload: {
          mainTitle: state.bodyState.candidateState.selectedCandidate.name,
          secondaryTitle: `${state.bodyState.candidateState.selectedCandidate.current_job_title} @${state.bodyState.candidateState.selectedCandidate.current_employer}`,
          supplementaryInfo:
            state.bodyState.candidateState.selectedCandidate.updated_at,
        },
      });
    }
  }, [state.bodyState.candidateState.selectedCandidate]);

  //== Resume Path ==//
  useEffect(() => {
    const updateResumeUrl = async () => {
      const filePath =
        state.bodyState.candidateState.selectedCandidate.resume.file;
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
    if (
      state.bodyState.candidateState.selectedCandidate &&
      state.bodyState.candidateState.selectedCandidate.education_history
    ) {
      dispatch({
        type: 'UPDATE_PROFESSIONAL_DETAILS_STATE',
        payload: {
          selectedEducation:
            state.bodyState.candidateState.selectedCandidate
              .education_history[0],
        },
      });
    }

    // set selected experience to first if exists
    if (
      state.bodyState.candidateState.selectedCandidate &&
      state.bodyState.candidateState.selectedCandidate.employment_history
    ) {
      dispatch({
        type: 'UPDATE_PROFESSIONAL_DETAILS_STATE',
        payload: {
          selectedExperience:
            state.bodyState.candidateState.selectedCandidate
              .employment_history[0],
        },
      });
    }

    if (state.bodyState.candidateState.selectedCandidate?.resume?.file) {
      updateResumeUrl();
    }
  }, [state.bodyState.candidateState.selectedCandidate]);

  // gen results
  // useEffect(() => {
  //   if (!state.bodyState.jobStatusState?.generationResultsState) {
  //     return;
  //   }

  //   dispatch({
  //     type: 'UPDATE_GENERATION_RESULTS_STATE',
  //     payload: {
  //       id: state.bodyState.jobStatusState.selectedGeneration?.id,
  //       content: state.bodyState.jobStatusState.selectedGeneration?.content,
  //       contentHtml: addDivTag(
  //         addPTags(state.bodyState.jobStatusState.selectedGeneration?.content)
  //       ),
  //     },
  //   });
  // }, [state.bodyState.jobStatusState.selectedGeneration]);

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
            type: 'UPDATE_CANDIDATE_STATE',
            payload: { selectedCandidate: candidate },
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
        callsState: initialState.bodyState.callsState,
        feedbackState: initialState.bodyState.feedbackState,
        candUpdateState: initialState.bodyState.candUpdateState,
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

  // update selected candidate
  useEffect(() => {
    if (state.listState.selected) {
      // 1. update the body state with the selected candidate
      dispatch({
        type: 'UPDATE_CANDIDATE_STATE',
        payload: { selectedCandidate: state.listState.selected },
      });

      // 2. update the resumeState with the list of resumes associated with the selected candidate
      dispatch({
        type: 'UPDATE_RESUME_STATE',
        payload: { resumes: state.listState.selected.resumes },
      });

      // 3. update the callsState with the list of calls associated with the selected candidate
      dispatch({
        type: 'UPDATE_CALLS_STATE',
        payload: { calls: state.listState.selected.phone_calls },
      });

      // 4. update the feedbackState with the list of feedback associated with the selected candidate
      // dispatch({
      //   type: 'UPDATE_FEEDBACK_STATE',
      //   payload: { feedback: state.listState.selected.feedback },
      // });
    }
  }, [state.listState.selected]);

  // update job status state when the selected job status changes
  // also want to update all the sub-component states with the selected job posting so the correct resume/calls are displays in the sub-components.
  useEffect(() => {
    if (state.bodyState.candidateState.currentJobsState?.selectedJob) {
      dispatch({
        type: 'UPDATE_JOB_STATUS_STATE',
        payload: {
          selectedJob:
            state.bodyState.candidateState.currentJobsState.selectedJob,
        },
      });
    }
  }, [
    state.bodyState.candidateState.currentJobsState.selectedJob?.match_score,
  ]);

  console.log('cand state', state);

  return (
    <CandidatesContext.Provider value={{ state, dispatch }}>
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidatesContext = () => useContext(CandidatesContext);
