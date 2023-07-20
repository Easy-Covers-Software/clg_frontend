import React, { createContext, useContext, useReducer, useEffect } from "react";

const GenerationSetupContext = createContext(null);

import axios from "axios";
import Cookie from "js-cookie";

type FileUploadObject = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export type AdditionalDetailsInputs = {
  simpleInput1: string;
  simpleInput2: string;
  simpleInput3: string;
  openEndedInput: string;
};

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

const API_BASE_URL = "https://localhost:8000/ai_generator/generation_setup/";

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

const initialState = {
  jobPostingInput: "",
  uploadedResumeFile: null,
  freeTextPersonalDetails: "",
  additionalDetails: {
    simpleInput1: "",
    simpleInput2: "",
    simpleInput3: "",
    openEndedInput: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_JOB_POSTING_INPUT":
      return { ...state, jobPostingInput: action.payload };
    case "SET_UPLOADED_RESUME_FILE":
      return { ...state, uploadedResumeFile: action.payload };
    case "SET_FREE_TEXT_PERSONAL_DETAILS":
      return { ...state, freeTextPersonalDetails: action.payload };
    case "SET_ADDITIONAL_DETAILS":
      return {
        ...state,
        additionalDetails: {
          ...state.additionalDetails,
          ...action.payload,
        },
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export const GenerationContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

    const endpoint = API_BASE_URL + "upload_job_posting/";
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

    const endpoint = API_BASE_URL + "upload_resume/";
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

  return (
    <GenerationSetupContext.Provider
      value={{
        state,
        dispatch,
        handleFileChange,
        uploadJobPosting,
        uploadResume,
      }}
    >
      {children}
    </GenerationSetupContext.Provider>
  );
};

export const useGenerationSetupContext = () =>
  useContext(GenerationSetupContext);
