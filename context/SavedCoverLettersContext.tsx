import { createContext, useContext, useReducer, useEffect, use } from "react";

import axios from "axios";
import Cookie from "js-cookie";

const API_BASE = "https://localhost:8000/saved/";

const SavedContext = createContext(null);

const initialState = {
  savedCoverLetters: [],
  selectedCoverLetter: null,
  selectedCoverLetterParts: null,
  selectedCoverLetterJobPosting: null,
  loadingCoverLetter: false,
  addSkillInput: "",
  insertKeywordInput: "",
  removeRedundancyInput: "",
  intermediateType: null,
  disableIntermediateAdjustment: false,
  customAdjustment: "",
  isReQuerySectionExpanded: false,
  saveLoading: false,
  isFilterDropdownOpen: false,
  filterValue: "",
  setLoadingSavedCoverLetters: false,
  updateCoverLetter: null,
  updateSavedCoverLettersList: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SAVED_COVER_LETTERS":
      return { ...state, savedCoverLetters: action.payload };
    case "SET_SELECTED_COVER_LETTER":
      return {
        ...state,
        selectedCoverLetter: {
          ...state.selectedCoverLetter,
          ...action.payload,
        },
      };
    case "SET_LOADING_COVER_LETTER":
      return { ...state, loadingCoverLetter: action.payload };
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
    case "SET_CUSTOM_ADJUSTMENT":
      return { ...state, customAdjustment: action.payload };
    case "SET_IS_RE_QUERY_SECTION_EXPANDED":
      return { ...state, isReQuerySectionExpanded: action.payload };
    case "SET_SAVE_LOADING":
      return { ...state, saveLoading: action.payload };
    case "SET_IS_FILTER_DROPDOWN_OPEN":
      return { ...state, isFilterDropdownOpen: action.payload };
    case "SET_LOADING_SAVED_COVER_LETTERS":
      return { ...state, setLoadingSavedCoverLetters: action.payload };
    case "SET_UPDATE_COVER_LETTER":
      return { ...state, updateCoverLetter: action.payload };
    case "SET_SELECTED_COVER_LETTER_JOB_POSTING":
      return {
        ...state,
        selectedCoverLetterJobPosting: {
          ...state.selectedCoverLetterJobPosting,
          ...action.payload,
        },
      };
    case "SET_SELECTED_COVER_LETTER_PARTS":
      return { ...state, selectedCoverLetterParts: action.payload };
    case "SET_UPDATE_SAVED_COVER_LETTERS_LIST":
      return { ...state, updateSavedCoverLettersList: action.payload };
    default:
      return state;
  }
}

export default function SavedCoverLettersContext(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state saved 4321", state);

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

  const toggleIsReQuerySectionExpanded = () => {
    dispatch({
      type: "SET_IS_RE_QUERY_SECTION_EXPANDED",
      payload: !state.isReQuerySectionExpanded,
    });
  };

  const toggleFilterDropdownIsOpen = () => {
    dispatch({
      type: "SET_IS_FILTER_DROPDOWN_OPEN",
      payload: !state.isFilterDropdownOpen,
    });
  };

  const getUsersSavedCoverLetters = async () => {
    const url =
      "https://localhost:8000/ai_generator/generate/get_users_saved_cover_letters/";

    try {
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      console.log("Saved cover letters", response);
      if (response.statusText === "OK") {
        dispatch({
          type: "SET_SAVED_COVER_LETTERS",
          payload: response.data,
        });

        return "success";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersSavedCoverLetters();
  }, [state.updateSavedCoverLettersList]);

  useEffect(() => {
    const getJobPosting = async () => {
      const url = `https://localhost:8000/ai_generator/generation_setup/upload_job_posting/${state.selectedCoverLetter?.job_posting}/`;

      try {
        const response = await axios.get(url, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": Cookie.get("csrftoken"),
          },
        });
        console.log("Job Posting", response);
        if (response.statusText === "OK") {
          dispatch({
            type: "SET_SELECTED_COVER_LETTER_JOB_POSTING",
            payload: response.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getCoverLetterParts = async () => {
      const url = `https://localhost:8000/ai_generator/generate/${state.selectedCoverLetter?.id}/get_cover_letter_parts/`;

      console.log("parts url", url);

      try {
        const response = await axios.get(url, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": Cookie.get("csrftoken"),
          },
        });
        console.log("Cover Letter Parts", response);
        if (response.statusText === "OK") {
          dispatch({
            type: "SET_SELECTED_COVER_LETTER_PARTS",
            payload: response.data.cover_letter_parts,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getJobPosting();
    getCoverLetterParts();
  }, [state.selectedCoverLetter]);

  const deleteSavedCoverLetter = async () => {
    const url = `https://localhost:8000/ai_generator/generate/${state.selectedCoverLetter.id}/`;

    try {
      const response = await axios.delete(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      return "success";
    } catch (error) {
      console.log(error);
      return "error";
    }
  };

  return (
    <SavedContext.Provider
      value={{
        state,
        dispatch,
        saveCoverLetterResults,
        generatePDF,
        generateDOCX,
        makeSimpleAdjustment,
        makeIntermediateAdjustment,
        makeCustomAdjustment,
        toggleIsReQuerySectionExpanded,
        toggleFilterDropdownIsOpen,
        getUsersSavedCoverLetters,
        deleteSavedCoverLetter,
      }}
    >
      {props.children}
    </SavedContext.Provider>
  );
}

export const useSavedCoverLettersContext = () => useContext(SavedContext);
