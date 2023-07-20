import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import { makeUrl, createGeneratePayload } from "./utils";

const API_BASE_URL = "https://localhost:8000/ai_generator/";

const ResultsContext = createContext(null);

const initialState = {
  jobTitle: "",
  companyName: "",
  matchScore: 0,
  currentCoverLetter: "",
  coverLetterOpener: "",
  coverLetterP1: "",
  coverLetterP2: "",
  coverLetterP3: "",
  coverLetterThankYou: "",
  coverLetterSignature: "",
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
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function CoverLetterResultsContext({ children }) {
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

  const toggleIsReQuerySectionExpanded = () => {
    dispatch({
      type: "SET_IS_RE_QUERY_SECTION_EXPANDED",
      payload: !state.isReQuerySectionExpanded,
    });
  };

  const getJobTitle = async (jobPosting: string) => {
    dispatch({ type: "SET_LOADING_SUMMARY", payload: true });
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

      // console.log("Job title response", response);
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
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING_SUMMARY", payload: false });
    }
  };

  const getJobMatchScore = async (jobPosting: string) => {
    dispatch({ type: "SET_LOADING_MATCH_SCORE", payload: true });
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
    additionalDetails
  ) => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });
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
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING_COVER_LETTER", payload: false });
    }
  };

  return (
    <ResultsContext.Provider
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
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
}

export const useCoverLetterResultsContext = () => useContext(ResultsContext);
