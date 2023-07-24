const API_BASE = "https://localhost:8000";

export const makeUrl = (endpoint: string): string => {
  //   return process.env.API_BASE + endpoint;
  return API_BASE + endpoint;
};

export const checkResumeUpload = (resume) => {
  if (resume === null) {
    return false;
  } else {
    return true;
  }
};

export const checkAdditionalDetails = (additionalDetails) => {
  for (const [key, inputValue] of Object.entries(additionalDetails)) {
    if (inputValue !== "") {
      return true;
    }
  }
  return false;
};

export const createGeneratePayload = (
  jobPosting,
  resume,
  freeText,
  additionalDetails,
  isUsingLastResume
) => {
  const formData = new FormData();

  formData.append("job_posting", jobPosting);

  if (isUsingLastResume) {
    formData.append("resume", "previous");
  } else if (checkResumeUpload(resume)) {
    console.log("adding resume to form data");
    formData.append("resume", resume);
  }

  formData.append("free_text", freeText);

  if (checkAdditionalDetails(additionalDetails)) {
    console.log("adding additional details to form data");
    formData.append("additional_details", additionalDetails);
  }
  return formData;
};
