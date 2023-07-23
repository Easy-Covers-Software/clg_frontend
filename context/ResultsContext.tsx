import React, { createContext, useContext, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Cookie from "js-cookie";
import jsPDF from "jspdf";

import { makeUrl, createGeneratePayload } from "./utils";

import CoverLetterPdf from "@/components/Download/Download";

const API_BASE_URL = "https://localhost:8000/ai_generator/";

const ResultsContext = createContext(null);

const initialState = {
  jobTitle: "",
  companyName: "",
  matchScore: 0,
  currentCoverLetter: "",
  currentCoverLetterJson: "",
  coverLetterOpener: "Dear Hiring Manager,",
  coverLetterP1:
    "I am writing to express my interest in the Full Stack Django Engineer position at WisdomTree. With my strong knowledge and experience in Python, Django, Django Rest Framework, SQL, JavaScript, HTML, and CSS, I believe I would be a valuable addition to your Technology and Digital Assets team.",
  coverLetterP2:
    "Throughout my career as a software engineer, I have developed backend services and administrative UIs, working closely with end-user mobile app developers. I have also been involved in the user-driven evolution of mobile products with complex backends. I am proficient with Agile methodologies, using Confluence and JIRA, and I have experience with Git for version control. Additionally, I am comfortable working in a dynamic and agile team environment.",
  coverLetterP3:
    "I am highly motivated to contribute to WisdomTree's mission of building next-generation digital products and structures in the financial and digital assets space. I stay well-informed of current technology and product trends in this industry and have a strong attention to detail when it comes to architecture, UX, and code. My excellent troubleshooting and communication skills make me an effective problem solver and collaborator.",
  coverLetterThankYou:
    "Thank you for considering my application. I am excited about the opportunity to join WisdomTree and contribute to its success. I look forward to discussing how my skills and experience align with your needs in more detail.",
  coverLetterSignature: "Sincerely,",
  coverLetterWriter: "David Silveira",
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
          dispatch({
            type: "SET_COVER_LETTER_WRITER",
            payload: data.cover_letter_writer,
          });

          dispatch({
            type: "SET_JOB_POSTING_ID",
            payload: response.data.job_posting_id,
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

  const saveCoverLetterResults = async () => {
    dispatch({ type: "SET_SAVE_LOADING", payload: true });
    const url = "https://localhost:8000/ai_generator/generate/";

    const form = new FormData();
    form.append("cover_letter_opener", state.coverLetterOpener);
    form.append("cover_letter_p1", state.coverLetterP1);
    form.append("cover_letter_p2", state.coverLetterP2);
    form.append("cover_letter_p3", state.coverLetterP3);
    form.append("cover_letter_thank_you", state.coverLetterThankYou);
    form.append("cover_letter_signature", state.coverLetterSignature);
    form.append("job_posting", state.jobPostingId);

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

        return response.data;
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

  // const generatePDF = () => {
  //   const doc = new jsPDF("p", "px", "a4", true);

  //   // Header Information
  //   doc.setFont("Times New Roman");
  //   doc.setFontSize(12);

  //   // param1=words, param2=x, param3=y,
  //   doc.text("Dear Hiring Manager,", 50, 60);
  //   doc.text(state.coverLetterP1, 50, 85, { maxWidth: 350 });
  //   doc.text(state.coverLetterP2, 50, 145, { maxWidth: 350 });
  //   doc.text(state.coverLetterP3, 50, 225, { maxWidth: 350 });
  //   doc.text(state.coverLetterThankYou, 50, 295, { maxWidth: 350 });
  //   doc.text("Sincerely,", 50, 340);
  //   doc.text(state.coverLetterWriter, 50, 352);

  //   doc.save("cover-letter.pdf");
  // };

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

  console.log("state.jobPostingId", state.jobPostingId);

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
        saveCoverLetterResults,
        generatePDF,
        generateDOCX,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
}

export const useCoverLetterResultsContext = () => useContext(ResultsContext);
