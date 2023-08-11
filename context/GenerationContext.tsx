import { createContext, useContext, useReducer, useEffect } from "react";
import { GenerationUtils, ReQueryUtils } from "@/Utils/utils";

const {
  fetchJobDetails,
  fetchCoverLetter,
  saveCoverLetter,
  checkAdditionalDetails,
} = GenerationUtils;

const {
  fetchSimpleAdjustment,
  fetchIntermediateAdjustment,
  fetchCustomAdjustment,
  generateCoverLetterParts,
} = ReQueryUtils;

const Context = createContext(null);

const initialState = {
  // user inputs
  jobPosting: "",
  resume: null,
  freeText: "",
  additionalDetails: {
    simpleInput1: "",
    simpleInput2: "",
    simpleInput3: "",
    openEndedInput: "",
  },

  // generation results summary
  jobDetails: {
    job_title: "Job Title",
    company_name: "Company",
    match_score: 0,
  },
  loadingSummary: false,
  loadingMatchScore: false,

  // generation results
  coverLetter: "<div><p>Awaiting Generation...</p></div>",
  coverLetterParts: null,
  loadingCoverLetter: false,
  jobPostingId: "",
  isUsingLastUploadedResume: false,
  disableGenerateButton: true,
  updateCoverLetter: null,
  updateCoverLetterParts: null,
  saveName: "",

  // intermediate adjustments
  addSkillInput: "",
  insertKeywordInput: "",
  removeRedundancyInput: "",
  intermediateType: null,
  disableIntermediateAdjustment: true,
  disableCustomAdjustment: true,

  // custom adjustments
  customAdjustment: "",

  // toggles
  isReQuerySectionExpanded: false,
  isReQueryMobileSectionExpanded: false,
  isSavedDropdownOpen: false,
  isDownloadDropdownOpen: false,

  // mobile
  mobileGenerationMode: "setup",
};

function reducer(state, action) {
  switch (action.type) {
    // User Inputs
    case "SET_JOB_POSTING":
      return { ...state, jobPosting: action.payload };
    case "SET_UPLOADED_RESUME_FILE":
      return { ...state, resume: action.payload };
    case "SET_FREE_TEXT_PERSONAL_DETAILS":
      return { ...state, freeText: action.payload };
    case "SET_ADDITIONAL_DETAILS":
      return {
        ...state,
        additionalDetails: {
          ...state.additionalDetails,
          ...action.payload,
        },
      };

    // Generation Results Summary
    case "SET_LOADING_SUMMARY":
      return { ...state, loadingSummary: action.payload };
    case "SET_LOADING_MATCH_SCORE":
      return { ...state, loadingMatchScore: action.payload };
    case "SET_JOB_DETAILS":
      return {
        ...state,
        jobDetails: {
          ...state.jobDetails,
          ...action.payload,
        },
      };

    // Generation Results
    case "SET_LOADING_COVER_LETTER":
      return { ...state, loadingCoverLetter: action.payload };
    case "SET_COVER_LETTER":
      return { ...state, coverLetter: action.payload };
    case "SET_COVER_LETTER_PARTS":
      return { ...state, coverLetterParts: action.payload };
    case "SET_JOB_POSTING_ID":
      return { ...state, jobPostingId: action.payload };
    case "SET_IS_USING_LAST_UPLOADED_RESUME":
      return { ...state, isUsingLastUploadedResume: action.payload };
    case "SET_DISABLE_GENERATE_BUTTON":
      return { ...state, disableGenerateButton: action.payload };
    case "SET_UPDATE_COVER_LETTER":
      return { ...state, updateCoverLetter: action.payload };
    case "SET_UPDATE_COVER_LETTER_PARTS":
      return { ...state, updateCoverLetterParts: action.payload };
    case "SET_SAVE_NAME":
      return { ...state, saveName: action.payload };

    // Intermediate Adjustments
    case "SET_ADD_SKILL_INPUT":
      return { ...state, addSkillInput: action.payload };
    case "SET_INSERT_KEYWORD_INPUT":
      return { ...state, insertKeywordInput: action.payload };
    case "SET_REMOVE_REDUNDANCY_INPUT":
      return { ...state, removeRedundancyInput: action.payload };
    case "SET_INTERMEDIATE_TYPE":
      return { ...state, intermediateType: action.payload };
    case "SET_DISABLE_INTERMEDIATE_ADJUSTMENT":
      return { ...state, disableIntermediateAdjustment: action.payload };
    case "SET_DISABLE_CUSTOM_ADJUSTMENT":
      return { ...state, disableCustomAdjustment: action.payload };

    // Custom Adjustments
    case "SET_CUSTOM_ADJUSTMENT":
      return { ...state, customAdjustment: action.payload };

    // Toggles
    case "SET_IS_RE_QUERY_SECTION_EXPANDED":
      return { ...state, isReQuerySectionExpanded: action.payload };
    case "SET_IS_RE_QUERY_MOBILE_SECTION_EXPANDED":
      return { ...state, isReQueryMobileSectionExpanded: action.payload };
    case "SET_IS_SAVED_DROPDOWN_OPEN":
      return { ...state, isSavedDropdownOpen: action.payload };
    case "SET_IS_DOWNLOAD_DROPDOWN_OPEN":
      return { ...state, isDownloadDropdownOpen: action.payload };

    case "SET_MOBILE_GENERATION_MODE":
      return { ...state, mobileGenerationMode: action.payload };

    case "RESET_STATE":
      return {
        ...initialState,
        resume: state.resume,
        additionalDetails: state.additionalDetails,
        jobPosting: "",
        coverLetter: "<div><p>Awaiting Generation...</p></div>",
        coverLetterParts: null,
        jobPostingId: "",
        isUsingLastUploadedResume: false,
        updateCoverLetter: null,
        updateCoverLetterParts: null,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function GenerationContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //-- HELPERS --//
  const toggleIsReQuerySectionExpanded = () => {
    dispatch({
      type: "SET_IS_RE_QUERY_SECTION_EXPANDED",
      payload: !state.isReQuerySectionExpanded,
    });
  };

  const toggleIsReQueryMobileSectionExpanded = () => {
    dispatch({
      type: "SET_IS_RE_QUERY_MOBILE_SECTION_EXPANDED",
      payload: !state.isReQueryMobileSectionExpanded,
    });
  };

  const toggleIsSavedDropdownOpen = () => {
    dispatch({
      type: "SET_IS_SAVED_DROPDOWN_OPEN",
      payload: !state.isSavedDropdownOpen,
    });
  };

  const toggleIsDownloadDropdownOpen = () => {
    dispatch({
      type: "SET_IS_DOWNLOAD_DROPDOWN_OPEN",
      payload: !state.isDownloadDropdownOpen,
    });
  };

  const handleFileChange = (e) => {
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    dispatch({ type: "SET_UPLOADED_RESUME_FILE", payload: files[0] });
  };

  // makeIntermediateInputValueType helper
  const determineIntermediateInputValueType = (intermediateTypeState) => {
    if (intermediateTypeState === "add skill") {
      return state.addSkillInput;
    } else if (intermediateTypeState === "insert keyword") {
      return state.insertKeywordInput;
    } else {
      return state.removeRedundancyInput;
    }
  };

  // API Calls
  const getJobDetails = async () => {
    dispatch({ type: "SET_LOADING_SUMMARY", payload: true });
    dispatch({ type: "SET_LOADING_MATCH_SCORE", payload: true });
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });

    const response = await fetchJobDetails(
      state.jobPosting,
      state.resume,
      state.freeText,
      state.isUsingLastUploadedResume
    );

    dispatch({ type: "SET_JOB_DETAILS", payload: response.job_details });
    dispatch({ type: "SET_LOADING_SUMMARY", payload: false });
    dispatch({ type: "SET_LOADING_MATCH_SCORE", payload: false });

    return true;
  };

  const makeSimpleAdjustment = async (
    increaseOrDecrease: string,
    typeOfAdjustment: string
  ) => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });

    let currCoverLetter = state.coverLetter;
    if (state.updateCoverLetter !== null) {
      currCoverLetter = state.updateCoverLetter;
    }

    const response = await fetchSimpleAdjustment(
      currCoverLetter,
      increaseOrDecrease,
      typeOfAdjustment
    );

    try {
      const data = JSON.parse(response.cover_letter);
      const newCoverLetter = Object.values(data);

      const newCoverLetterHtml = generateCoverLetterParts(newCoverLetter);

      dispatch({
        type: "SET_COVER_LETTER",
        payload: newCoverLetterHtml,
      });
      dispatch({
        type: "SET_COVER_LETTER_PARTS",
        payload: newCoverLetter,
      });

      return true;
    } catch (error) {
      console.log("Error: Could not parse response (not valid json)", error);
      return error;
    } finally {
      dispatch({ type: "SET_LOADING_COVER_LETTER", payload: false });
    }
  };

  const makeIntermediateAdjustment = async () => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });

    let currCoverLetter = state.coverLetter;
    if (state.updateCoverLetter !== null) {
      currCoverLetter = state.updateCoverLetter;
    }

    const response = await fetchIntermediateAdjustment(
      currCoverLetter,
      state.intermediateType,
      determineIntermediateInputValueType(state.intermediateType)
    );

    try {
      const data = JSON.parse(response.cover_letter);
      const newCoverLetter = Object.values(data);
      const newCoverLetterHtml = generateCoverLetterParts(newCoverLetter);

      dispatch({
        type: "SET_COVER_LETTER",
        payload: newCoverLetterHtml,
      });
      dispatch({
        type: "SET_COVER_LETTER_PARTS",
        payload: newCoverLetter,
      });
      return true;
    } catch (error) {
      console.log("Error: Could not parse response (not valid json)", error);
      return error;
    } finally {
      dispatch({ type: "SET_LOADING_COVER_LETTER", payload: false });
    }
  };

  const makeCustomAdjustment = async () => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });

    let currCoverLetter = state.coverLetter;
    if (state.updateCoverLetter !== null) {
      currCoverLetter = state.updateCoverLetter;
    }

    const response = await fetchCustomAdjustment(
      currCoverLetter,
      state.customAdjustment
    );

    try {
      const data = JSON.parse(response.cover_letter);
      const newCoverLetter = Object.values(data);
      const newCoverLetterHtml = generateCoverLetterParts(newCoverLetter);
      console.log("newCoverLetterHtml", newCoverLetterHtml);

      dispatch({
        type: "SET_COVER_LETTER",
        payload: newCoverLetterHtml,
      });
      dispatch({
        type: "SET_COVER_LETTER_PARTS",
        payload: newCoverLetter,
      });

      return true;
    } catch (error) {
      console.log("Error: Could not parse response (not valid json)");
      console.log(error);
      return error;
    } finally {
      dispatch({ type: "SET_LOADING_COVER_LETTER", payload: false });
    }
  };

  const generateCoverLetter = async (
    jobPosting: string,
    resume: any,
    freeText: string,
    additionalDetails,
    model
  ) => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });
    const response = await fetchCoverLetter(
      jobPosting,
      resume,
      freeText,
      additionalDetails,
      state.isUsingLastUploadedResume,
      model
    );

    try {
      const data = JSON.parse(response.cover_letter);
      const newCoverLetter = Object.values(data);
      const newCoverLetterHtml = generateCoverLetterParts(newCoverLetter);
      console.log("newCoverLetterHtml", newCoverLetterHtml);

      dispatch({
        type: "SET_COVER_LETTER",
        payload: newCoverLetterHtml,
      });
      dispatch({
        type: "SET_COVER_LETTER_PARTS",
        payload: newCoverLetter,
      });
      dispatch({
        type: "SET_JOB_POSTING_ID",
        payload: response.job_posting_id,
      });
      dispatch({
        type: "SET_MOBILE_GENERATION_MODE",
        payload: "results",
      });

      return true;
    } catch (error) {
      console.log("Error: Could not parse response (not valid json)", error);
      return error;
    } finally {
      dispatch({ type: "SET_LOADING_COVER_LETTER", payload: false });
    }
  };

  const saveCoverLetterResults = async () => {
    const response = await saveCoverLetter(
      state.saveName,
      state.coverLetterParts,
      state.updateCoverLetterParts,
      state.jobPostingId,
      state.jobDetails.match_score
    );

    toggleIsSavedDropdownOpen();
    return response;
  };

  //-- HOOKS --//
  // determine intermediate input type
  useEffect(() => {
    if (state.addSkillInput !== "") {
      dispatch({ type: "SET_INTERMEDIATE_TYPE", payload: "add skill" });
      if (!state.loadingCoverLetter && state.coverLetterParts !== null) {
        dispatch({
          type: "SET_DISABLE_INTERMEDIATE_ADJUSTMENT",
          payload: false,
        });
      }
    } else if (state.insertKeywordInput !== "") {
      dispatch({ type: "SET_INTERMEDIATE_TYPE", payload: "insert keyword" });
      if (!state.loadingCoverLetter && state.coverLetterParts !== null) {
        dispatch({
          type: "SET_DISABLE_INTERMEDIATE_ADJUSTMENT",
          payload: false,
        });
      }
    } else if (state.removeRedundancyInput !== "") {
      dispatch({ type: "SET_INTERMEDIATE_TYPE", payload: "remove" });
      if (!state.loadingCoverLetter && state.coverLetterParts !== null) {
        dispatch({
          type: "SET_DISABLE_INTERMEDIATE_ADJUSTMENT",
          payload: false,
        });
      }
    } else {
      dispatch({ type: "SET_INTERMEDIATE_TYPE", payload: null });
      dispatch({ type: "SET_DISABLE_INTERMEDIATE_ADJUSTMENT", payload: true });
    }
  }, [
    state.addSkillInput,
    state.insertKeywordInput,
    state.removeRedundancyInput,
    state.loadingCoverLetter,
    state.coverLetterParts,
  ]);

  useEffect(() => {
    if (!state.loadingCoverLetter && state.coverLetterParts !== null) {
      if (state.customAdjustment !== "") {
        dispatch({ type: "SET_DISABLE_CUSTOM_ADJUSTMENT", payload: false });
      } else {
        dispatch({ type: "SET_DISABLE_CUSTOM_ADJUSTMENT", payload: true });
      }
    } else {
      dispatch({ type: "SET_DISABLE_CUSTOM_ADJUSTMENT", payload: true });
    }
  }, [
    state.customAdjustment,
    state.loadingCoverLetter,
    state.coverLetterParts,
  ]);

  // Disable Generation Button handling
  useEffect(() => {
    if (state.loadingCoverLetter) {
      dispatch({ type: "SET_DISABLE_GENERATE_BUTTON", payload: true });
    } else if (state.jobPosting === "") {
      dispatch({ type: "SET_DISABLE_GENERATE_BUTTON", payload: true });
    } else if (
      state.resume === null &&
      state.freeText === "" &&
      !checkAdditionalDetails(state.additionalDetails)
    ) {
      if (state.isUsingLastUploadedResume) {
        dispatch({ type: "SET_DISABLE_GENERATE_BUTTON", payload: false });
      } else {
        dispatch({ type: "SET_DISABLE_GENERATE_BUTTON", payload: true });
      }
    } else {
      dispatch({ type: "SET_DISABLE_GENERATE_BUTTON", payload: false });
    }
  }, [
    state.jobPosting,
    state.resume,
    state.freeText,
    state.additionalDetails,
    state.isUsingLastUploadedResume,
    state.loadingCoverLetter,
  ]);

  // update save name when job details are retrieved
  useEffect(() => {
    if (state.jobDetails.company_name !== "Company") {
      const { company_name } = state.jobDetails;
      dispatch({
        type: "SET_SAVE_NAME",
        payload: company_name,
      });
    }
  }, [state.jobDetails.company_name]);

  useEffect(() => {
    const savedJobPosting = localStorage.getItem("jobPostingText");
    if (savedJobPosting !== null && savedJobPosting !== "") {
      dispatch({
        type: "SET_JOB_POSTING",
        payload: savedJobPosting,
      });
    }
  }, []);

  console.log("state.coverLetterParts", state.coverLetterParts);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        toggleIsReQuerySectionExpanded,
        toggleIsReQueryMobileSectionExpanded,
        generateCoverLetter,
        makeSimpleAdjustment,
        makeIntermediateAdjustment,
        makeCustomAdjustment,
        saveCoverLetterResults,
        handleFileChange,
        toggleIsSavedDropdownOpen,
        toggleIsDownloadDropdownOpen,
        getJobDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useGenerationContext = () => useContext(Context);
