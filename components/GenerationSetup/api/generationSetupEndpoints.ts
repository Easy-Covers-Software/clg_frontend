import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8000/ai_generator/generation_setup/";

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

//--- Job Posting Upload ---//
const createJobPostingFormDataPayload = (jobPostingData: string) => {
  const formData = new FormData();
  formData.append("posting", jobPostingData);
  return formData;
};
export const uploadJobPosting = async (jobPostingData: string) => {
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
        "X-CSRFToken": Cookies.get("csrftoken"),
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
const createResumeUploadFormDataPayload = (resumeData: string) => {
  const formData = new FormData();
  formData.append("file", resumeData);
  return formData;
};
export const uploadResume = async (resumeData: string) => {
  if (resumeData === "") {
    throw new ResumeUploadError("Error Uploading Resume: Resume data is empty");
  }

  const endpoint = API_BASE_URL + "upload_resume/";
  const formData = createResumeUploadFormDataPayload(resumeData);

  try {
    const response = await axios.post(endpoint, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": Cookies.get("csrftoken"),
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
