import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";

const API_BASE_URL = "https://localhost:8000/ai_generator/";

import axios from "axios";
import Cookie from "js-cookie";

const ResultsContext = createContext(null);

const checkResumeUpload = (resume: any) => {
  if (resume === null) {
    return false;
  } else {
    return true;
  }
};

const checkAdditionalDetails = (additionalDetails: any) => {
  for (const [key, inputValue] of Object.entries(additionalDetails)) {
    if (inputValue !== "") {
      return true;
    }
  }
  return false;
};

const createGeneratePayload = (
  jobPosting: string,
  resume: any,
  freeText,
  additionalDetails
) => {
  const formData = new FormData();

  formData.append("job_posting", jobPosting);

  if (checkResumeUpload(resume)) {
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

const INTERMEDIATE_TYPES = ["add_skill", "insert_keyword", "remove_redundancy"];

export const CoverLetterResultsContext = ({ children }) => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [matchScore, setMatchScore] = useState<number>(0);

  const [currentCoverLetter, setCurrentCoverLetter] = useState<string>("");
  const [coverLetterOpener, setCoverLetterOpener] = useState<string>("");
  const [coverLetterP1, setCoverLetterP1] = useState<string>("");
  const [coverLetterP2, setCoverLetterP2] = useState<string>("");
  const [coverLetterP3, setCoverLetterP3] = useState<string>("");
  const [coverLetterThankYou, setCoverLetterThankYou] = useState<string>("");
  const [coverLetterSignature, setCoverLetterSignature] = useState<string>("");

  const [addSkillInput, setAddSkillInput] = useState<string>("");
  const [insertKeywordInput, setInsertKeywordInput] = useState<string>("");
  const [removeRedundancyInput, setRemoveRedundancyInput] =
    useState<string>("");
  const [intermediateTypes, setIntermediateTypes] = useState<any>({
    add_skill: false,
    insert_keyword: false,
    remove_redundancy: false,
  });

  const [selectedIntermediateType, setSelectedIntermediateType] =
    useState<any>(null);

  const [disableIntermediateAdjustment, setDisableIntermediateAdjustment] =
    useState<boolean>(false);

  useEffect(() => {
    if (addSkillInput !== "") {
      setSelectedIntermediateType("add skill");
    } else if (insertKeywordInput !== "") {
      setSelectedIntermediateType("insert keyword");
    } else if (removeRedundancyInput !== "") {
      setSelectedIntermediateType("remove redundancy");
    } else {
      setSelectedIntermediateType(null);
      setDisableIntermediateAdjustment(false);
    }
  }, [addSkillInput, insertKeywordInput, removeRedundancyInput]);

  console.log("selectedIntermediateType", selectedIntermediateType);

  const [customAdjustment, setCustomAdjustment] = useState<string>("");
  console.log("customAdjustment", customAdjustment);

  const [loadingSummary, setLoadingSummary] = useState<boolean>(false);
  const [loadingMatchScore, setLoadingMatchScore] = useState<boolean>(false);
  const [loadingCoverLetter, setLoadingCoverLetter] = useState<boolean>(false);

  const getJobTitle = async (jobPosting: string) => {
    // setLoadingSummary(true);
    const url = API_BASE_URL + "generate/get_job_title/";

    const form = new FormData();
    form.append("job_posting", jobPosting);

    // try {
    //   const response = await axios.post(url, form, {
    //     withCredentials: true,
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "X-CSRFToken": Cookie.get("csrftoken"),
    //     },
    //   });
    //   console.log("Job title response", response);
    //   if (response.statusText === "OK") {
    //     setJobTitle(response.data.job_title);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const getCompanyName = async (jobPosting: string) => {
    const url = API_BASE_URL + "generate/get_company_name/";

    const form = new FormData();
    form.append("job_posting", jobPosting);

    // try {
    //   const response = await axios.post(url, form, {
    //     withCredentials: true,
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "X-CSRFToken": Cookie.get("csrftoken"),
    //     },
    //   });
    //   console.log("Job title response", response);
    //   if (response.statusText === "OK") {
    //     setCompanyName(response.data.company_name);
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoadingSummary(false);
    // }
  };

  const getJobMatchScore = async (jobPosting: string) => {
    // setLoadingMatchScore(true);
    const url = API_BASE_URL + "generate/get_job_match_score/";

    const form = new FormData();
    form.append("job_posting", jobPosting);

    // try {
    //   const response = await axios.post(url, form, {
    //     withCredentials: true,
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "X-CSRFToken": Cookie.get("csrftoken"),
    //     },
    //   });
    //   console.log("Job title response", response);
    //   if (response.statusText === "OK") {
    //     setMatchScore(response.data.job_match_score);
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoadingMatchScore(false);
    // }
  };

  const makeSimpleAdjustment = async (
    increaseOrDecrease: string,
    typeOfAdjustment: string
  ) => {
    setLoadingCoverLetter(true);
    const url = API_BASE_URL + "generate/make_simple_adjustment/";

    const form = new FormData();
    form.append("cover_letter", currentCoverLetter);
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
      console.log("Simple Adjustment", response);
      if (response.statusText === "OK") {
        try {
          const data = JSON.parse(response.data.cover_letter);
          // console.log(data);
          setCoverLetterOpener(data.cover_letter_opener);
          setCoverLetterP1(data.cover_letter_p1);
          setCoverLetterP2(data.cover_letter_p2);
          setCoverLetterP3(data.cover_letter_p3);
          setCoverLetterThankYou(data.cover_letter_thank_you);
          setCoverLetterSignature(data.cover_letter_signature);
        } catch (error) {
          console.log("Error: Could not parse response (not valid json)");
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCoverLetter(false);
    }
  };

  const makeIntermediateAdjustment = async () => {
    setLoadingCoverLetter(true);
    const url = API_BASE_URL + "generate/make_intermediate_adjustment/";

    const form = new FormData();
    form.append("cover_letter", currentCoverLetter);
    form.append("type_of_adjustment", selectedIntermediateType);

    if (selectedIntermediateType === "add skill") {
      form.append("input_value", addSkillInput);
    } else if (selectedIntermediateType === "insert keyword") {
      form.append("input_value", insertKeywordInput);
    } else {
      form.append("input_value", removeRedundancyInput);
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
          console.log(data);
          setCoverLetterOpener(data.cover_letter_opener);
          setCoverLetterP1(data.cover_letter_p1);
          setCoverLetterP2(data.cover_letter_p2);
          setCoverLetterP3(data.cover_letter_p3);
          setCoverLetterThankYou(data.cover_letter_thank_you);
          setCoverLetterSignature(data.cover_letter_signature);
        } catch (error) {
          console.log("Error: Could not parse response (not valid json)");
          console.log(error);
        }
      }
    } catch (error) {
      console.log("error occured during intermediate adjustment");
      console.log(error);
    } finally {
      setLoadingCoverLetter(false);
    }
  };

  const makeCustomAdjustment = async () => {
    setLoadingCoverLetter(true);
    const url = API_BASE_URL + "generate/make_custom_adjustment/";

    const form = new FormData();
    form.append("cover_letter", currentCoverLetter);
    form.append("input_value", customAdjustment);

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
          setCoverLetterOpener(data.cover_letter_opener);
          setCoverLetterP1(data.cover_letter_p1);
          setCoverLetterP2(data.cover_letter_p2);
          setCoverLetterP3(data.cover_letter_p3);
          setCoverLetterThankYou(data.cover_letter_thank_you);
          setCoverLetterSignature(data.cover_letter_signature);
        } catch (error) {
          console.log("Error: Could not parse response (not valid json)");
          console.log(error);
        }
      }
    } catch (error) {
      console.log("error occured during intermediate adjustment");
      console.log(error);
    } finally {
      setLoadingCoverLetter(false);
    }
  };

  const generateCoverLetter = async (
    jobPosting: string,
    resume: any,
    freeText: string,
    additionalDetails
  ) => {
    setLoadingCoverLetter(true);
    const data = createGeneratePayload(
      jobPosting,
      resume,
      freeText,
      additionalDetails
    );
    const url = API_BASE_URL + "generate/cover_letter/";

    try {
      const response = await axios.post(url, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });

      if (response.statusText === "OK") {
        try {
          const data = JSON.parse(response.data.cover_letter);
          // console.log(data);
          setCoverLetterOpener(data.cover_letter_opener);
          setCoverLetterP1(data.cover_letter_p1);
          setCoverLetterP2(data.cover_letter_p2);
          setCoverLetterP3(data.cover_letter_p3);
          setCoverLetterThankYou(data.cover_letter_thank_you);
          setCoverLetterSignature(data.cover_letter_signature);
        } catch (error) {
          console.log("Error: Could not parse response (not valid json)");
          console.log(error);
        }
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCoverLetter(false);
    }
  };

  return (
    <ResultsContext.Provider
      value={{
        jobTitle,
        companyName,
        matchScore,
        currentCoverLetter,
        setCurrentCoverLetter,
        coverLetterOpener,
        coverLetterP1,
        coverLetterP2,
        coverLetterP3,
        coverLetterThankYou,
        coverLetterSignature,
        loadingSummary,
        loadingMatchScore,
        loadingCoverLetter,
        addSkillInput,
        insertKeywordInput,
        removeRedundancyInput,
        customAdjustment,
        setAddSkillInput,
        setInsertKeywordInput,
        setRemoveRedundancyInput,
        getJobTitle,
        getCompanyName,
        generateCoverLetter,
        getJobMatchScore,
        makeSimpleAdjustment,
        makeIntermediateAdjustment,
        setCustomAdjustment,
        makeCustomAdjustment,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export const useCoverLetterResultsContext = () => useContext(ResultsContext);
