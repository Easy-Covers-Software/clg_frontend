import React, { createContext, useContext, useState } from "react";

const API_BASE_URL = "https://localhost:8000/ai_generator/";

import axios from "axios";
import Cookie from "js-cookie";

const ResultsContext = createContext(null);

const createGeneratePayload = (jobPosting: string, resume: any) => {
  const formData = new FormData();
  formData.append("job_posting", jobPosting);
  formData.append("resume", resume);
  return formData;
};

export const CoverLetterResultsContext = ({ children }) => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [matchScore, setMatchScore] = useState<number>(0);
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [loadingSummary, setLoadingSummary] = useState<boolean>(false);
  const [loadingMatchScore, setLoadingMatchScore] = useState<boolean>(false);
  const [loadingCoverLetter, setLoadingCoverLetter] = useState<boolean>(false);

  const getJobTitle = async (jobPosting: string) => {
    setLoadingSummary(true);
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
      console.log("Job title response", response);
      if (response.statusText === "OK") {
        setJobTitle(response.data.job_title);
      }
    } catch (error) {
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
        setCompanyName(response.data.company_name);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSummary(false);
    }
  };

  const getJobMatchScore = async (jobPosting: string) => {
    setLoadingMatchScore(true);
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
        setMatchScore(response.data.job_match_score);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMatchScore(false);
    }
  };

  const makeSimpleAdjustment = async (
    increaseOrDecrease: string,
    typeOfAdjustment: string
  ) => {
    setLoadingCoverLetter(true);
    const url = API_BASE_URL + "generate/make_simple_adjustment/";

    console.log("increaseOrDecrease", increaseOrDecrease);
    console.log("typeOfAdjustment", typeOfAdjustment);

    const form = new FormData();
    form.append("cover_letter", coverLetter);
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
        setCoverLetter(response.data.adjusted_cover_letter);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCoverLetter(false);
    }
  };

  const generateCoverLetter = async (jobPosting: string, resume: any) => {
    setLoadingCoverLetter(true);
    const data = createGeneratePayload(jobPosting, resume);
    const url = API_BASE_URL + "generate/";

    console.log("data", data);

    try {
      const response = await axios.post(url, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });

      if (response.statusText === "OK") {
        setCoverLetter(response.data.cover_letter);
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
        coverLetter,
        loadingSummary,
        loadingMatchScore,
        loadingCoverLetter,
        getJobTitle,
        getCompanyName,
        generateCoverLetter,
        getJobMatchScore,
        makeSimpleAdjustment,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export const useCoverLetterResultsContext = () => useContext(ResultsContext);
