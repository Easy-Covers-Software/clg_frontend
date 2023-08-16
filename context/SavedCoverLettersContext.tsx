import { createContext, useContext, useReducer, useEffect } from "react";
import jsPDF from "jspdf";

import axios from "axios";
import Cookie from "js-cookie";

import { SavedCoverLettersUtils, ReQueryUtils } from "@/Utils/utils";

const {
  fetchSimpleAdjustment,
  fetchIntermediateAdjustment,
  fetchCustomAdjustment,
  generateCoverLetterParts,
} = ReQueryUtils;

const {
  fetchSavedCoverLetters,
  postDeleteSavedCoverLetter,
  postSaveCoverLetterResults,
} = SavedCoverLettersUtils;

const SavedContext = createContext(null);

const initialState = {
  // list of saved cover letters
  savedCoverLetters: [],
  getSavedLoading: false,
  search: "",
  filterValue: "",
  setLoadingSavedCoverLetters: false,

  // cover letter display
  selectedCoverLetter: null,
  selectedCoverLetterParts: null,
  selectedCoverLetterHtml: "",
  selectedCoverLetterJobPosting: "",
  loadingCoverLetter: false,
  updateCoverLetter: null,
  updateCoverLetterParts: null,
  disableRequery: false,
  saveName: "",

  // intermediate adjustments
  addSkillInput: "",
  insertKeywordInput: "",
  removeRedundancyInput: "",
  intermediateType: null,
  disableIntermediateAdjustment: true,
  disableCustomAdjustment: true,

  // custom adjustments
  customAdjustment: "",

  // re-query section
  isReQuerySectionExpanded: false,

  // toggles
  isSavedDropdownOpen: false,
  isDownloadDropdownOpen: false,
  isFilterDropdownOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SAVED_COVER_LETTERS":
      return { ...state, savedCoverLetters: action.payload };
    case "SET_GET_SAVED_LOADING":
      return { ...state, getSavedLoading: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_SAVE_NAME":
      return { ...state, saveName: action.payload };
    case "SET_SELECTED_COVER_LETTER":
      return { ...state, selectedCoverLetter: action.payload };
    case "SET_SELECTED_COVER_LETTER_PARTS":
      return { ...state, selectedCoverLetterParts: action.payload };
    case "SET_SELECTED_COVER_LETTER_HTML":
      return { ...state, selectedCoverLetterHtml: action.payload };
    case "SET_SELECTED_COVER_LETTER_JOB_POSTING":
      return { ...state, selectedCoverLetterJobPosting: action.payload };
    case "SET_LOADING_COVER_LETTER":
      return { ...state, loadingCoverLetter: action.payload };
    case "SET_UPDATE_COVER_LETTER":
      return { ...state, updateCoverLetter: action.payload };
    case "SET_UPDATE_COVER_LETTER_PARTS":
      return { ...state, updateCoverLetterParts: action.payload };
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
    case "SET_DISABLE_CUSTOM_ADJUSTMENT":
      return { ...state, disableCustomAdjustment: action.payload };
    case "SET_CUSTOM_ADJUSTMENT":
      return { ...state, customAdjustment: action.payload };
    case "SET_IS_RE_QUERY_SECTION_EXPANDED":
      return { ...state, isReQuerySectionExpanded: action.payload };
    case "SET_FILTER_VALUE":
      return { ...state, filterValue: action.payload };
    case "SET_LOADING_SAVED_COVER_LETTERS":
      return { ...state, setLoadingSavedCoverLetters: action.payload };
    case "SET_IS_SAVED_DROPDOWN_OPEN":
      return { ...state, isSavedDropdownOpen: action.payload };
    case "SET_IS_DOWNLOAD_DROPDOWN_OPEN":
      return { ...state, isDownloadDropdownOpen: action.payload };
    case "SET_IS_FILTER_DROPDOWN_OPEN":
      return { ...state, isFilterDropdownOpen: action.payload };
    case "SET_DISABLE_REQUERY":
      return { ...state, disableRequery: action.payload };
    case "RESET_SELECTED_COVER_LETTER_DATA":
      return {
        ...state,
        selectedCoverLetter: initialState.selectedCoverLetter,
        selectedCoverLetterParts: initialState.selectedCoverLetterParts,
        selectedCoverLetterHtml: initialState.selectedCoverLetterHtml,
        selectedCoverLetterJobPosting:
          initialState.selectedCoverLetterJobPosting,
        updateCoverLetter: initialState.updateCoverLetter,
        updateCoverLetterParts: initialState.updateCoverLetterParts,
        saveName: initialState.saveName,
      };
    default:
      return state;
  }
}

export default function SavedCoverLettersContext(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //-- Non Api Functions --//
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

  const determineIntermediateInputValueType = (intermediateTypeState) => {
    if (intermediateTypeState === "add skill") {
      return state.addSkillInput;
    } else if (intermediateTypeState === "insert keyword") {
      return state.insertKeywordInput;
    } else {
      return state.removeRedundancyInput;
    }
  };

  //-- Api Functions --//
  const getUsersSavedCoverLetters = async () => {
    dispatch({ type: "SET_GET_SAVED_LOADING", payload: true });

    const response = await fetchSavedCoverLetters();
    console.log("saved cs response", response);

    if (response.length === 0) {
      dispatch({ type: "SET_GET_SAVED_LOADING", payload: false });
      return "no saved cover letters";
    } else {
      dispatch({
        type: "SET_SAVED_COVER_LETTERS",
        payload: response,
      });
      dispatch({ type: "SET_GET_SAVED_LOADING", payload: false });
    }
  };

  const makeSimpleAdjustment = async (
    increaseOrDecrease: string,
    typeOfAdjustment: string
  ) => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });

    let currCoverLetter = state.selectedCoverLetterHtml;
    if (state.updateCoverLetter !== null) {
      currCoverLetter = state.updateCoverLetter;
    }

    const response = await fetchSimpleAdjustment(
      currCoverLetter,
      increaseOrDecrease,
      typeOfAdjustment
    );

    try {
      const data = JSON.parse(response.cover_letter);
      const newCoverLetter = Object.values(data);

      const newCoverLetterHtml = generateCoverLetterParts(newCoverLetter);

      dispatch({
        type: "SET_SELECTED_COVER_LETTER_HTML",
        payload: newCoverLetterHtml,
      });
      dispatch({
        type: "SET_SELECTED_COVER_LETTER_PARTS",
        payload: newCoverLetter,
      });

      return true;
    } catch (error) {
      console.log("Error: Could not parse response (not valid json)", error);
      return error;
    } finally {
      dispatch({ type: "SET_LOADING_COVER_LETTER", payload: false });
    }
  };

  const makeIntermediateAdjustment = async () => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });

    let currCoverLetter = state.selectedCoverLetterHtml;
    if (state.updateCoverLetter !== null) {
      currCoverLetter = state.updateCoverLetter;
    }

    const response = await fetchIntermediateAdjustment(
      currCoverLetter,
      state.intermediateType,
      determineIntermediateInputValueType(state.intermediateType)
    );

    try {
      const data = JSON.parse(response.cover_letter);
      const newCoverLetter = Object.values(data);
      const newCoverLetterHtml = generateCoverLetterParts(newCoverLetter);

      dispatch({
        type: "SET_SELECTED_COVER_LETTER_HTML",
        payload: newCoverLetterHtml,
      });
      dispatch({
        type: "SET_SELECTED_COVER_LETTER_PARTS",
        payload: newCoverLetter,
      });
      return true;
    } catch (error) {
      console.log("Error: Could not parse response (not valid json)", error);
      return error;
    } finally {
      dispatch({ type: "SET_LOADING_COVER_LETTER", payload: false });
    }
  };

  const makeCustomAdjustment = async () => {
    dispatch({ type: "SET_LOADING_COVER_LETTER", payload: true });

    let currCoverLetter = state.selectedCoverLetterHtml;
    if (state.updateCoverLetter !== null) {
      currCoverLetter = state.updateCoverLetter;
    }

    const response = await fetchCustomAdjustment(
      currCoverLetter,
      state.customAdjustment
    );

    try {
      const data = JSON.parse(response.cover_letter);
      const newCoverLetter = Object.values(data);
      const newCoverLetterHtml = generateCoverLetterParts(newCoverLetter);
      console.log("newCoverLetterHtml", newCoverLetterHtml);

      dispatch({
        type: "SET_SELECTED_COVER_LETTER_HTML",
        payload: newCoverLetterHtml,
      });
      dispatch({
        type: "SET_SELECTED_COVER_LETTER_PARTS",
        payload: newCoverLetter,
      });

      return true;
    } catch (error) {
      console.log("Error: Could not parse response (not valid json)", error);
      return error;
    } finally {
      dispatch({ type: "SET_LOADING_COVER_LETTER", payload: false });
    }
  };

  const saveCoverLetterResults = async () => {
    const response = await postSaveCoverLetterResults(
      state.selectedCoverLetter?.id,
      state.saveName,
      state.selectedCoverLetterParts,
      state.updateCoverLetterParts
    );

    if (response.data) {
      toggleIsSavedDropdownOpen();
      return true;
    }
    return response;
  };

  const deleteSavedCoverLetter = async () => {
    console.log("selectedCoverLetter ========fff", state.selectedCoverLetter);

    try {
      await postDeleteSavedCoverLetter(state.selectedCoverLetter?.id);
      return true;
    } catch (error) {
      console.log("Error: Could not delete saved cover letter", error);
      return error;
    }
  };

  //-- Hooks --//
  // fetch users saved cover letters
  useEffect(() => {
    getUsersSavedCoverLetters();
  }, []);

  // determine intermediate type
  useEffect(() => {
    if (state.addSkillInput !== "") {
      dispatch({ type: "SET_INTERMEDIATE_TYPE", payload: "add skill" });
      if (
        !state.loadingCoverLetter &&
        state.selectedCoverLetterParts !== null
      ) {
        dispatch({
          type: "SET_DISABLE_INTERMEDIATE_ADJUSTMENT",
          payload: false,
        });
      }
    } else if (state.insertKeywordInput !== "") {
      dispatch({ type: "SET_INTERMEDIATE_TYPE", payload: "insert keyword" });
      if (
        !state.loadingCoverLetter &&
        state.selectedCoverLetterParts !== null
      ) {
        dispatch({
          type: "SET_DISABLE_INTERMEDIATE_ADJUSTMENT",
          payload: false,
        });
      }
    } else if (state.removeRedundancyInput !== "") {
      dispatch({ type: "SET_INTERMEDIATE_TYPE", payload: "remove" });
      if (
        !state.loadingCoverLetter &&
        state.selectedCoverLetterParts !== null
      ) {
        dispatch({
          type: "SET_DISABLE_INTERMEDIATE_ADJUSTMENT",
          payload: false,
        });
      }
    } else {
      dispatch({ type: "SET_INTERMEDIATE_TYPE", payload: null });
      dispatch({ type: "SET_DISABLE_INTERMEDIATE_ADJUSTMENT", payload: true });
    }
  }, [
    state.addSkillInput,
    state.insertKeywordInput,
    state.removeRedundancyInput,
    state.loadingCoverLetter,
    state.selectedCoverLetterParts,
  ]);

  useEffect(() => {
    if (!state.loadingCoverLetter && state.selectedCoverLetterParts !== null) {
      if (state.customAdjustment !== "") {
        dispatch({ type: "SET_DISABLE_CUSTOM_ADJUSTMENT", payload: false });
      } else {
        dispatch({ type: "SET_DISABLE_CUSTOM_ADJUSTMENT", payload: true });
      }
    } else {
      dispatch({ type: "SET_DISABLE_CUSTOM_ADJUSTMENT", payload: true });
    }
  }, [
    state.customAdjustment,
    state.loadingCoverLetter,
    state.selectedCoverLetterParts,
  ]);

  // get selected cover letter stored details
  useEffect(() => {
    const getJobPosting = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/generation_setup/upload_job_posting/${state.selectedCoverLetter?.job_posting}/`;

      try {
        const response = await axios.get(url, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": Cookie.get("csrftoken"),
          },
        });
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
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/generate/${state.selectedCoverLetter?.id}/get_cover_letter_parts/`;

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

    dispatch({
      type: "SET_SAVE_NAME",
      payload: state.selectedCoverLetter?.save_name,
    });

    getJobPosting();
    getCoverLetterParts();
  }, [state.selectedCoverLetter]);

  useEffect(() => {
    if (state.loadingCoverLetter) {
      dispatch({
        type: "SET_DISABLE_REQUERY",
        payload: true,
      });
    } else {
      dispatch({
        type: "SET_DISABLE_REQUERY",
        payload: false,
      });
    }
  }, [state.loadingCoverLetter]);

  return (
    <SavedContext.Provider
      value={{
        state,
        dispatch,
        saveCoverLetterResults,
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
