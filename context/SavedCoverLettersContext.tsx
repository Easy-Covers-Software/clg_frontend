import { createContext, useContext, useReducer, useEffect, use } from "react";
import jsPDF from "jspdf";

import axios from "axios";
import Cookie from "js-cookie";

const API_BASE = "https://localhost:8000/saved/";

const SavedContext = createContext(null);

const initialState = {
  savedCoverLetters: [],
  selectedCoverLetter: null,
  selectedCoverLetterParts: null,
  selectedCoverLetterHtml: "",
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
  isSavedDropdownOpen: false,
  isDownloadDropdownOpen: false,
  saveName: "",
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
    case "SET_IS_SAVED_DROPDOWN_OPEN":
      return { ...state, isSavedDropdownOpen: action.payload };
    case "SET_IS_DOWNLOAD_DROPDOWN_OPEN":
      return { ...state, isDownloadDropdownOpen: action.payload };
    case "SET_SAVE_NAME":
      return { ...state, saveName: action.payload };
    case "SET_SELECTED_COVER_LETTER_HTML":
      return { ...state, selectedCoverLetterHtml: action.payload };
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

  const enumerateArray = (array) => {
    return array.map((content, section_number) => ({
      content,
      section_number,
    }));
  };

  const saveCoverLetterResults = async () => {
    dispatch({ type: "SET_SAVE_LOADING", payload: true });
    console.log(
      "selected cover letter parts state",
      state.selectedCoverLetterParts
    );

    const url = `https://localhost:8000/ai_generator/generate/${state.selectedCoverLetter?.id}/`;

    const form = new FormData();
    form.append("save_name", state.saveName);

    const values = state.selectedCoverLetterParts.map((part) => {
      return part.content;
    });

    if (state.updateCoverLetter !== null) {
      form.append(
        "cover_letter_parts",
        JSON.stringify(state.updateCoverLetter)
      );
    } else {
      form.append(
        "cover_letter_parts",
        JSON.stringify(state.selectedCoverLetterParts)
      );
    }

    try {
      const response = await axios.put(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      if (response.statusText === "OK") {
        console.log("Cover letter results saved successfully");
        dispatch({
          type: "SET_UPDATE_SAVED_COVER_LETTERS_LIST",
          payload: !state.updateSavedCoverLettersList,
        });

        return "success";
      }
    } catch (error) {
      console.log(error);
      return "error";
    } finally {
      dispatch({ type: "SET_SAVE_LOADING", payload: false });
    }
  };

  const makeSimpleAdjustment = async (
    increaseOrDecrease: string,
    typeOfAdjustment: string
  ) => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });
    // setLoadingCoverLetter(true);
    const url =
      "https://localhost:8000/ai_generator/generate/make_simple_adjustment/";

    console.log("current cover letter", state.currentCoverLetter);
    console.log("increase or decrease", increaseOrDecrease);
    console.log("type of adjustment", typeOfAdjustment);

    const form = new FormData();
    form.append("cover_letter", state.selectedCoverLetterHtml);
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
            type: "SET_SELECTED_COVER_LETTER_PARTS",
            payload: Object.values(data),
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

    const url =
      "https://localhost:8000/ai_generator/generate/make_intermediate_adjustment/";

    const form = new FormData();
    form.append("cover_letter", state.selectedCoverLetterHtml);
    form.append("type_of_adjustment", state.intermediateType);

    if (state.intermediateType === "add skill") {
      form.append("input_value", state.addSkillInput);
    } else if (state.intermediateType === "insert keyword") {
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
      console.log("intermediate response", response);
      if (response.statusText === "OK") {
        console.log("Intermediate Adjustment", response);
        try {
          const data = JSON.parse(response.data.cover_letter);
          console.log("intermediate response data", data);
          dispatch({
            type: "SET_SELECTED_COVER_LETTER_PARTS",
            payload: Object.values(data),
          });

          return "success";
        } catch (error) {
          console.log("Error: Could not parse response (not valid json)");
          console.log(error);
          return "error";
        }
      }
    } catch (error) {
      console.log("error occured during intermediate adjustment");
      console.log(error);
      return "error";
    } finally {
      dispatch({ type: "SET_LOADING_COVER_LETTER", payload: false });
    }
  };

  const makeCustomAdjustment = async () => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });
    const url =
      "https://localhost:8000/ai_generator/generate/make_custom_adjustment/";

    const form = new FormData();
    console.log("selected cover letter html", state.selectedCoverLetterHtml);
    form.append("cover_letter", state.selectedCoverLetterHtml);
    form.append("input_value", state.customAdjustment);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      console.log("Custom Adjustment", response);
      if (response.statusText === "OK") {
        try {
          const data = JSON.parse(response.data.cover_letter);
          console.log("Custom adjustment");
          console.log(data);
          dispatch({
            type: "SET_SELECTED_COVER_LETTER_PARTS",
            payload: Object.values(data),
          });

          return "success";
        } catch (error) {
          console.log("Error: Could not parse response (not valid json)");
          console.log(error);
          return "error";
        }
      }
    } catch (error) {
      console.log("error occured during custom adjustment");
      console.log(error);
      return "error";
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
          const values = response.data.cover_letter_parts.map((part) => {
            return part.content;
          });
          dispatch({
            type: "SET_SELECTED_COVER_LETTER_PARTS",
            payload: values,
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
    const url = `https://localhost:8000/ai_generator/generate/${state.selectedCoverLetter?.id}/`;

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

  const resetSelected = () => {
    dispatch({
      type: "SET_SELECTED_COVER_LETTER",
      payload: null,
    });
    dispatch({
      type: "SET_SELECTED_COVER_LETTER_PARTS",
      payload: null,
    });
    dispatch({
      type: "SET_SELECTED_COVER_LETTER_JOB_POSTING",
      payload: null,
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "px", "a4", true);

    // Header Information
    doc.setFont("Times New Roman");
    doc.setFontSize(12);

    const parts = state.selectedCoverLetterParts;

    const textWidth = 350;
    let y = 60;

    parts.forEach((part, index) => {
      const lines = doc.splitTextToSize(part, textWidth);
      doc.text(lines, 50, y); // 20 is the x-coordinate (left offset)
      y += lines.length * 7; // Increment y coordinate based on line height
      if (index === 0) {
        y += 15;
      } else if (parts.length - 3 === index) {
        y += 30; // Add space between paragraphs
      } else if (parts.length - 2 === index) {
        y += 10;
      } else {
        y += 25;
      }
    });

    doc.save("cover-letter.pdf");
  };

  const generateDOCX = async () => {
    const url =
      "https://localhost:8000/ai_generator/generate/download_as_docx/";

    const form = new FormData();
    form.append("html", state.selectedCoverLetterHtml);

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
        resetSelected,
        toggleIsSavedDropdownOpen,
        toggleIsDownloadDropdownOpen,
      }}
    >
      {props.children}
    </SavedContext.Provider>
  );
}

export const useSavedCoverLettersContext = () => useContext(SavedContext);
