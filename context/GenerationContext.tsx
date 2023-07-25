import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import jsPDF from "jspdf";
import { checkAdditionalDetails } from "./utils";

import { makeUrl, createGeneratePayload } from "./utils";

//--- Error Classes ---//
class JobPostingUploadError extends Error {
  constructor(message) {
    super(message);
    this.name = "JobPostingUploadError";
    this.cause = message;
  }
}

class ResumeUploadError extends Error {
  constructor(message) {
    super(message);
    this.name = "ResumeUploadError";
    this.cause = message;
  }
}
const API_BASE_URL_GEN =
  "https://localhost:8000/ai_generator/generation_setup/";

const API_BASE_URL = "https://localhost:8000/ai_generator/";

const Context = createContext(null);

const initialState = {
  jobTitle: "",
  companyName: "",
  matchScore: 0,
  currentCoverLetter: "",
  currentCoverLetterJson: "",
  coverLetterOpener: "Awaiting generation of cover letter...",
  coverLetterP1: "",
  coverLetterP2: "",
  coverLetterP3: "",
  coverLetterThankYou: "",
  coverLetterSignature: "",
  coverLetterWriter: "",
  addSkillInput: "",
  insertKeywordInput: "",
  removeRedundancyInput: "",
  intermediateType: null,
  disableIntermediateAdjustment: false,
  customAdjustment: "",
  loadingSummary: false,
  loadingMatchScore: false,
  loadingCoverLetter: false,
  isReQuerySectionExpanded: false,
  saveLoading: false,
  jobPostingId: "",
  isUsingLastUploadedResume: false,
  jobPosting: "",
  resume: null,
  freeText: "",
  additionalDetails: {
    simpleInput1: "",
    simpleInput2: "",
    simpleInput3: "",
    openEndedInput: "",
  },
  disableGenerateButton: true,
  isSavedDropdownOpen: false,
  isDownloadDropdownOpen: false,
  saveName: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_JOB_TITLE":
      return { ...state, jobTitle: action.payload };
    case "SET_COMPANY_NAME":
      return { ...state, companyName: action.payload };
    case "SET_MATCH_SCORE":
      return { ...state, matchScore: action.payload };
    case "SET_CURRENT_COVER_LETTER":
      return { ...state, currentCoverLetter: action.payload };
    case "SET_COVER_LETTER_OPENER":
      return { ...state, coverLetterOpener: action.payload };
    case "SET_COVER_LETTER_P1":
      return { ...state, coverLetterP1: action.payload };
    case "SET_COVER_LETTER_P2":
      return { ...state, coverLetterP2: action.payload };
    case "SET_COVER_LETTER_P3":
      return { ...state, coverLetterP3: action.payload };
    case "SET_COVER_LETTER_THANK_YOU":
      return { ...state, coverLetterThankYou: action.payload };
    case "SET_COVER_LETTER_SIGNATURE":
      return { ...state, coverLetterSignature: action.payload };
    case "SET_ADD_SKILL_INPUT":
      return { ...state, addSkillInput: action.payload };
    case "SET_INSERT_KEYWORD_INPUT":
      return { ...state, insertKeywordInput: action.payload };
    case "SET_REMOVE_REDUNDANCY_INPUT":
      return { ...state, removeRedundancyInput: action.payload };
    case "SET_INTERMEDIATE_TYPE":
      return { ...state, selectedIntermediateType: action.payload };
    case "SET_DISABLE_INTERMEDIATE_ADJUSTMENT":
      return { ...state, disableIntermediateAdjustment: action.payload };
    case "SET_CUSTOM_ADJUSTMENT":
      return { ...state, customAdjustment: action.payload };
    case "SET_LOADING_SUMMARY":
      return { ...state, loadingSummary: action.payload };
    case "SET_LOADING_MATCH_SCORE":
      return { ...state, loadingMatchScore: action.payload };
    case "SET_LOADING_COVER_LETTER":
      return { ...state, loadingCoverLetter: action.payload };
    case "SET_IS_RE_QUERY_SECTION_EXPANDED":
      return { ...state, isReQuerySectionExpanded: action.payload };
    case "SET_SAVE_LOADING":
      return { ...state, saveLoading: action.payload };
    case "SET_JOB_POSTING_ID":
      return { ...state, jobPostingId: action.payload };
    case "SET_COVER_LETTER_WRITER":
      return { ...state, coverLetterWriter: action.payload };
    case "SET_CURRENT_COVER_LETTER_JSON":
      return { ...state, currentCoverLetterJson: action.payload };
    case "SET_IS_USING_LAST_UPLOADED_RESUME":
      return { ...state, isUsingLastUploadedResume: action.payload };
    case "SET_JOB_POSTING_INPUT":
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
    case "SET_DISABLE_GENERATE_BUTTON":
      return { ...state, disableGenerateButton: action.payload };
    case "SET_IS_SAVED_DROPDOWN_OPEN":
      return { ...state, isSavedDropdownOpen: action.payload };
    case "SET_IS_DOWNLOAD_DROPDOWN_OPEN":
      return { ...state, isDownloadDropdownOpen: action.payload };
    case "SET_SAVE_NAME":
      return { ...state, saveName: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

const createJobPostingFormDataPayload = (jobPostingData: string) => {
  const formData = new FormData();
  formData.append("job_posting", jobPostingData);
  return formData;
};

const createResumeUploadFormDataPayload = (resumeData: string) => {
  const formData = new FormData();
  formData.append("file", resumeData);
  return formData;
};

export function GenerationContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.addSkillInput !== "") {
      dispatch({ type: "SET_INTERMEDIATE_TYPE", payload: "add skill" });
    } else if (state.insertKeywordInput !== "") {
      dispatch({ type: "SET_INTERMEDIATE_TYPE", payload: "insert keyword" });
    } else if (state.removeRedundancyInput !== "") {
      dispatch({ type: "SET_INTERMEDIATE_TYPE", payload: "remove redundancy" });
    } else {
      dispatch({ type: "SET_INTERMEDIATE_TYPE", payload: null });
      dispatch({ type: "SET_DISABLE_INTERMEDIATE_ADJUSTMENT", payload: false });
    }
  }, [
    state.addSkillInput,
    state.insertKeywordInput,
    state.removeRedundancyInput,
  ]);

  const handleFileChange = (e) => {
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    dispatch({ type: "SET_UPLOADED_RESUME_FILE", payload: files[0] });
  };

  //--- Job Posting Upload ---//
  const uploadJobPosting = async (jobPostingData: string) => {
    if (jobPostingData === "") {
      throw new JobPostingUploadError(
        "Error Uploading Job Posting: Job posting data is empty"
      );
    }

    const endpoint = API_BASE_URL_GEN + "upload_job_posting/";
    const formData = createJobPostingFormDataPayload(jobPostingData);
    try {
      const response = await axios.post(endpoint, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });

      // Check if the response status code is 200 (OK) or 201 (Created), which usually indicate a successful API request
      if (response.status === 200 || response.status === 201) {
        console.log("Job Posting Uploaded Successfully");
        return true;
      } else {
        // If the status code is not 200 or 201, throw an error
        throw new JobPostingUploadError(
          `Received status code ${response.status}`
        );
      }

      // if response is a 200 or 201 return true else return false and throw Error based on response
    } catch (error) {
      // Wrap the original error in a JobPostingUploadError to provide more context
      console.error(
        "Error Setting up url or data for request body Uploading Job Posting:",
        error
      );
      throw new JobPostingUploadError(error.message);
    }
  };

  //--- Resume Upload ---//
  const uploadResume = async (resumeData: string) => {
    if (resumeData === "") {
      throw new ResumeUploadError(
        "Error Uploading Resume: Resume data is empty"
      );
    }

    const endpoint = API_BASE_URL_GEN + "upload_resume/";
    const formData = createResumeUploadFormDataPayload(resumeData);

    try {
      const response = await axios.post(endpoint, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });

      // Check if the response status code is 200 (OK) or 201 (Created), which usually indicate a successful API request
      if (response.status === 200 || response.status === 201) {
        console.log("Resume Uploaded Successfully");
        return true;
      } else {
        throw new ResumeUploadError(`Received status code ${response.status}`);
      }

      // if response is a 200 or 201 return true else return false and throw Error based on response
    } catch (error) {
      console.log(
        "Error Setting up url or data for request body Uploading Resume:",
        error
      );
      throw new ResumeUploadError(error.message);
    }
  };

  useEffect(() => {
    if (state.jobPosting === "") {
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
  ]);

  const toggleIsReQuerySectionExpanded = () => {
    dispatch({
      type: "SET_IS_RE_QUERY_SECTION_EXPANDED",
      payload: !state.isReQuerySectionExpanded,
    });
  };

  const getJobTitle = async (jobPosting: string) => {
    dispatch({ type: "SET_LOADING_SUMMARY", payload: true });
    dispatch({ type: "SET_LOADING_MATCH_SCORE", payload: true });
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });

    const url = API_BASE_URL + "generate/get_job_title/";

    const form = new FormData();
    form.append("job_posting", jobPosting);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });

      if (response.statusText === "OK") {
        dispatch({ type: "SET_JOB_TITLE", payload: response.data.job_title });
      }
    } catch (error) {
      console.log("error getting job title");
      console.log(error);
    }
  };

  const getCompanyName = async (jobPosting: string) => {
    const url = API_BASE_URL + "generate/get_company_name/";

    const form = new FormData();
    form.append("job_posting", jobPosting);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      console.log("Job title response", response);
      if (response.statusText === "OK") {
        dispatch({
          type: "SET_COMPANY_NAME",
          payload: response.data.company_name,
        });
        dispatch({
          type: "SET_SAVE_NAME",
          payload: response.data.company_name,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING_SUMMARY", payload: false });
    }
  };

  const getJobMatchScore = async (jobPosting: string) => {
    const url = API_BASE_URL + "generate/get_job_match_score/";

    const form = new FormData();
    form.append("job_posting", jobPosting);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      console.log("Job title response", response);
      if (response.statusText === "OK") {
        dispatch({
          type: "SET_MATCH_SCORE",
          payload: response.data.job_match_score,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING_MATCH_SCORE", payload: false });
    }
  };

  const makeSimpleAdjustment = async (
    increaseOrDecrease: string,
    typeOfAdjustment: string
  ) => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });
    // setLoadingCoverLetter(true);
    const url = API_BASE_URL + "generate/make_simple_adjustment/";

    console.log("current cover letter", state.currentCoverLetter);
    console.log("increase or decrease", increaseOrDecrease);
    console.log("type of adjustment", typeOfAdjustment);

    const form = new FormData();
    form.append("cover_letter", state.currentCoverLetter);
    form.append("increase_or_decrease", increaseOrDecrease);
    form.append("type_of_adjustment", typeOfAdjustment);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      if (response.statusText === "OK") {
        try {
          const data = JSON.parse(response.data.cover_letter);
          dispatch({
            type: "SET_COVER_LETTER_OPENER",
            payload: data.cover_letter_opener,
          });
          dispatch({
            type: "SET_COVER_LETTER_P1",
            payload: data.cover_letter_p1,
          });
          dispatch({
            type: "SET_COVER_LETTER_P2",
            payload: data.cover_letter_p2,
          });
          dispatch({
            type: "SET_COVER_LETTER_P3",
            payload: data.cover_letter_p3,
          });
          dispatch({
            type: "SET_COVER_LETTER_THANK_YOU",
            payload: data.cover_letter_thank_you,
          });
          dispatch({
            type: "SET_COVER_LETTER_SIGNATURE",
            payload: data.cover_letter_signature,
          });
          dispatch({
            type: "SET_COVER_LETTER_WRITER",
            payload: data.cover_letter_writer,
          });
        } catch (error) {
          console.log("Error: Could not parse response (not valid json)");
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING_COVER_LETTER", payload: false });
    }
  };

  const makeIntermediateAdjustment = async () => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });

    const url = API_BASE_URL + "generate/make_intermediate_adjustment/";

    const form = new FormData();
    form.append("cover_letter", state.currentCoverLetter);
    form.append("type_of_adjustment", state.selectedIntermediateType);

    if (state.selectedIntermediateType === "add skill") {
      form.append("input_value", state.addSkillInput);
    } else if (state.selectedIntermediateType === "insert keyword") {
      form.append("input_value", state.insertKeywordInput);
    } else {
      form.append("input_value", state.removeRedundancyInput);
    }

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      if (response.statusText === "OK") {
        console.log("Intermediate Adjustment", response);
        try {
          const data = JSON.parse(response.data.cover_letter);
          dispatch({
            type: "SET_COVER_LETTER_OPENER",
            payload: data.cover_letter_opener,
          });
          dispatch({
            type: "SET_COVER_LETTER_P1",
            payload: data.cover_letter_p1,
          });
          dispatch({
            type: "SET_COVER_LETTER_P2",
            payload: data.cover_letter_p2,
          });
          dispatch({
            type: "SET_COVER_LETTER_P3",
            payload: data.cover_letter_p3,
          });
          dispatch({
            type: "SET_COVER_LETTER_THANK_YOU",
            payload: data.cover_letter_thank_you,
          });
          dispatch({
            type: "SET_COVER_LETTER_SIGNATURE",
            payload: data.cover_letter_signature,
          });
        } catch (error) {
          console.log("Error: Could not parse response (not valid json)");
          console.log(error);
        }
      }
    } catch (error) {
      console.log("error occured during intermediate adjustment");
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING_COVER_LETTER", payload: false });
    }
  };

  const makeCustomAdjustment = async () => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });
    const url = API_BASE_URL + "generate/make_custom_adjustment/";

    const form = new FormData();
    form.append("cover_letter", state.currentCoverLetter);
    form.append("input_value", state.customAdjustment);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      if (response.statusText === "OK") {
        console.log("Intermediate Adjustment", response);
        try {
          const data = JSON.parse(response.data.cover_letter);
          console.log(data);
          dispatch({
            type: "SET_COVER_LETTER_OPENER",
            payload: data.cover_letter_opener,
          });
          dispatch({
            type: "SET_COVER_LETTER_P1",
            payload: data.cover_letter_p1,
          });
          dispatch({
            type: "SET_COVER_LETTER_P2",
            payload: data.cover_letter_p2,
          });
          dispatch({
            type: "SET_COVER_LETTER_P3",
            payload: data.cover_letter_p3,
          });
          dispatch({
            type: "SET_COVER_LETTER_THANK_YOU",
            payload: data.cover_letter_thank_you,
          });
          dispatch({
            type: "SET_COVER_LETTER_SIGNATURE",
            payload: data.cover_letter_signature,
          });
        } catch (error) {
          console.log("Error: Could not parse response (not valid json)");
          console.log(error);
        }
      }
    } catch (error) {
      console.log("error occured during intermediate adjustment");
      console.log(error);
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
    const data = createGeneratePayload(
      jobPosting,
      resume,
      freeText,
      additionalDetails,
      state.isUsingLastUploadedResume
    );
    const url = `${API_BASE_URL}generate/cover_letter_gpt${model}/`;

    try {
      const response = await axios.post(url, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });

      console.log("response gen", response);

      if (response.statusText === "OK") {
        try {
          const data = JSON.parse(response.data.cover_letter);
          // console.log(data);
          dispatch({
            type: "SET_COVER_LETTER_OPENER",
            payload: data.cover_letter_opener,
          });
          dispatch({
            type: "SET_COVER_LETTER_P1",
            payload: data.cover_letter_p1,
          });
          dispatch({
            type: "SET_COVER_LETTER_P2",
            payload: data.cover_letter_p2,
          });
          dispatch({
            type: "SET_COVER_LETTER_P3",
            payload: data.cover_letter_p3,
          });
          dispatch({
            type: "SET_COVER_LETTER_THANK_YOU",
            payload: data.cover_letter_thank_you,
          });
          dispatch({
            type: "SET_COVER_LETTER_SIGNATURE",
            payload: data.cover_letter_signature,
          });
          dispatch({
            type: "SET_COVER_LETTER_WRITER",
            payload: data.cover_letter_writer,
          });

          dispatch({
            type: "SET_JOB_POSTING_ID",
            payload: response.data.job_posting_id,
          });

          return "success";
        } catch (error) {
          console.log("Error: Could not parse response (not valid json)");
          console.log(error);
          return "error";
        }
      }
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING_COVER_LETTER", payload: false });
    }
  };

  const saveCoverLetterResults = async () => {
    dispatch({ type: "SET_SAVE_LOADING", payload: true });
    const url = "https://localhost:8000/ai_generator/generate/";

    console.log("Match scoreeeee", state.matchScore);

    console.log("form data", state);
    const form = new FormData();
    form.append("save_name", state.saveName);
    form.append("cover_letter_opener", state.coverLetterOpener);
    form.append("cover_letter_p1", state.coverLetterP1);
    form.append("cover_letter_p2", state.coverLetterP2);
    form.append("cover_letter_p3", state.coverLetterP3);
    form.append("cover_letter_thank_you", state.coverLetterThankYou);
    form.append("cover_letter_signature", state.coverLetterSignature);
    form.append("cover_letter_writer", state.coverLetterWriter);
    form.append("match_score", state.matchScore);
    form.append("job_posting", state.jobPostingId);
    form.append("resume", state.resume);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      if (response.statusText === "OK") {
        console.log("Cover letter results saved successfully");

        return "success";
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_SAVE_LOADING", payload: false });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "px", "a4", true);

    // Header Information
    doc.setFont("Times New Roman");
    doc.setFontSize(12);

    const parts = [
      { name: "opener", text: state.coverLetterOpener },
      { name: "p1", text: state.coverLetterP1 },
      { name: "p2", text: state.coverLetterP2 },
      { name: "p3", text: state.coverLetterP3 },
      { name: "thank you", text: state.coverLetterThankYou },
    ];

    const closingParts = [
      { name: "signature", text: state.coverLetterSignature },
      { name: "coverLetterWriter", text: state.coverLetterWriter },
    ];

    let totalChars = 0;
    parts.forEach((part) => {
      part.chars = part.text.length;
      totalChars += part.chars;
    });

    const minSpace = 20; // Minimum space between parts
    let y = 50 + minSpace; // Start the first part at 60 and add minimum space
    parts.forEach((part) => {
      part.y = y;
      const percentage = part.chars / totalChars;
      y += Math.round(percentage * (250 - minSpace * (parts.length - 1))); // Deduct the minimum spaces from the total available space
      y += minSpace; // Add minimum space after each part
    });

    // Calculate position of closing parts based on the last paragraph
    let closingY = parts[parts.length - 1].y + minSpace; // Add minimum space
    closingParts.forEach((part, index) => {
      part.y = (closingY + index * minSpace) * 1.08; // Each closing part is positioned at minimum space below the previous one
    });

    closingParts.forEach((part, index) => {
      if (index === 0) {
        // The first part in closingParts is "signature"
        // Do nothing, keep the calculated position
      } else if (index === 1) {
        // The second part in closingParts is "coverLetterWriter"
        part.y = closingParts[index - 1].y + 12; // Set its position 12 units below "signature"
      }
    });

    [...parts, ...closingParts].forEach((part) => {
      doc.text(part.text, 50, part.y, { maxWidth: 350 });
    });

    doc.save("cover-letter.pdf");
  };

  const generateDOCX = async () => {
    const url =
      "https://localhost:8000/ai_generator/generate/download_as_docx/";

    const form = new FormData();
    form.append("html", state.currentCoverLetter);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
        responseType: "blob",
      });

      if (response.statusText === "OK") {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.docx"); //or any other extension
        document.body.appendChild(link);
        link.click();
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
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

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        toggleIsReQuerySectionExpanded,
        getJobTitle,
        getCompanyName,
        generateCoverLetter,
        getJobMatchScore,
        makeSimpleAdjustment,
        makeIntermediateAdjustment,
        makeCustomAdjustment,
        saveCoverLetterResults,
        generatePDF,
        generateDOCX,
        handleFileChange,
        uploadJobPosting,
        uploadResume,
        toggleIsSavedDropdownOpen,
        toggleIsDownloadDropdownOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useGenerationContext = () => useContext(Context);
