import jsPDF from "jspdf";
import axios from "axios";
import Cookie from "js-cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

namespace LoginUtils {
  export const signInGoogle = async () => {
    const parameters = {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      redirect_uri: `${API_BASE}/users/auth/google-callback`,
      response_type: "code",
      scope: "email profile openid",
      access_type: "online",
      prompt: "consent",
    };

    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    Object.keys(parameters).forEach((key) =>
      url.searchParams.append(key, parameters[key])
    );
    window.location.href = url.toString();
  };

  export const fetchUser = async () => {
    const url = API_BASE + "/users/me/";

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      console.log("Error fetching user", error);
      return error.response.data;
    }
  };

  export const postLogin = async (username, email, password) => {
    const url = `${API_BASE}/users/auth/login/`;

    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("password", password);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });

      if (response.statusText === "OK") {
        return response.data;
      }
      console.log("passing catch");
    } catch (error) {
      console.log("Error logging in", error);
      return error.response.data;
    }
  };

  export const postLogout = async () => {
    const url = `${API_BASE}/users/logout/`;

    try {
      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookie.get("csrftoken"),
          },
        }
      );
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      console.log("Error logging out user", error);
      return error.response.data;
    }
  };

  export const postCreateAccount = async (
    username,
    email,
    password,
    newPasswordRepeat
  ) => {
    const url = `${API_BASE}/users/auth/register/`;

    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("password1", password);
    form.append("password2", newPasswordRepeat);

    try {
      const response = await axios.post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      console.log("Error creating account", error);
      return error.response.data;
    }
  };

  export const passwordReset = async (email) => {
    const url = `${API_BASE}/users/auth/reset_password/`;

    const data = {
      email: email,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });

      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      console.log("Error resetting password", error);
      return error.response.data;
    }
  };

  export const submitNewPasswords = async (pass1, pass2, uid, token) => {
    const url = `${API_BASE}/dj-rest-auth/password/reset/confirm/${uid}/${token}/`;

    const data = {
      new_password1: pass1,
      new_password2: pass2,
      uid: uid,
      token: token,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });

      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      console.log("Error submitting new passwords", error);
      return error.response.data;
    }
  };
}

namespace SettingsUtils {
  export const extractPrice = (frontendValue) => {
    const pattern = /(\d+\.\d+)/g;
    const match = frontendValue.match(pattern);

    if (match && match.length > 0) {
      return match[0];
    }

    return null;
  };
}

namespace GenerationUtils {
  // Non api functions
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

  // api functions
  export const fetchJobDetails = async (
    jobPosting,
    resume,
    freeText,
    isUsingLastUploadedResume
  ) => {
    const url = `${API_BASE_URL}/generate/get_job_details/`;

    const form = new FormData();
    form.append("job_posting", jobPosting);
    form.append("resume", isUsingLastUploadedResume ? "previous" : resume);
    form.append("free_text", freeText);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });

      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };

  export const fetchCoverLetter = async (
    jobPosting,
    resume,
    freeText,
    additionalDetails,
    isUsingLastUploadedResume,
    model
  ) => {
    const data = createGeneratePayload(
      jobPosting,
      resume,
      freeText,
      additionalDetails,
      isUsingLastUploadedResume
    );

    const url = `${API_BASE_URL}/generate/cover_letter_gpt${model}/`;

    try {
      const response = await axios.post(url, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });

      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };

  export const saveCoverLetter = async (
    saveName,
    coverLetterParts,
    updateCoverLetterParts,
    jobPostingId,
    matchScore
  ) => {
    const url = `${API_BASE_URL}/generate/`;

    const form = new FormData();
    form.append("save_name", saveName);

    if (updateCoverLetterParts !== null) {
      form.append("cover_letter_parts", JSON.stringify(updateCoverLetterParts));
    } else {
      form.append("cover_letter_parts", JSON.stringify(coverLetterParts));
    }

    form.append("match_score", matchScore);
    form.append("job_posting", jobPostingId);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };

  export const makeUrl = (endpoint: string): string => {
    //   return process.env.API_BASE + endpoint;
    return API_BASE + endpoint;
  };
}

namespace SavedCoverLettersUtils {
  export const fetchSavedCoverLetters = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/generate/get_users_saved_cover_letters/`;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      console.log("Saved cover letters", response);

      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };

  export const postDeleteSavedCoverLetter = async (selectedCoverLetterId) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/generate/${selectedCoverLetterId}/`;

    try {
      const response = await axios.delete(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };

  export const postSaveCoverLetterResults = async (
    selectedCoverLetterId,
    saveName,
    currCoverLetterParts,
    updateCoverLetterParts
  ) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/generate/${selectedCoverLetterId}/`;

    const form = new FormData();
    form.append("save_name", saveName);

    if (updateCoverLetterParts !== null) {
      form.append("cover_letter_parts", JSON.stringify(updateCoverLetterParts));
    } else {
      form.append("cover_letter_parts", JSON.stringify(currCoverLetterParts));
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
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };
}

namespace ReQueryUtils {
  export const fetchSimpleAdjustment = async (
    html,
    increaseOrDecrease,
    typeOfAdjustment
  ) => {
    const url = `${API_BASE_URL}/generate/make_simple_adjustment/`;

    const form = new FormData();
    form.append("cover_letter", html);
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
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };

  export const fetchIntermediateAdjustment = async (
    html,
    intermediateType,
    inputValue
  ) => {
    const url = API_BASE_URL + "/generate/make_intermediate_adjustment/";

    const form = new FormData();
    form.append("cover_letter", html);
    form.append("type_of_adjustment", intermediateType);
    form.append("input_value", inputValue);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      });
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      console.log("error occured during intermediate adjustment", error);
      return error.response.data;
    }
  };

  export const fetchCustomAdjustment = async (html, customAdjustment) => {
    const url = `${API_BASE_URL}/generate/make_custom_adjustment/`;

    const form = new FormData();
    form.append("cover_letter", html);
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
        return response.data;
      }
    } catch (error) {
      console.log("error occured during intermediate adjustment", error);
      return error.response.data;
    }
  };

  export const generateCoverLetterParts = (parts) => {
    const coverLetterParts = parts.map((part) => `<p>${part}</p>`).join("");
    const coverLetter = `<div>${coverLetterParts}</div>`;
    return coverLetter;
  };
}

namespace DownloadUtils {
  export const generatePDF = async (parts: string[], saveName: string) => {
    const doc = new jsPDF("p", "px", "a4", true);

    doc.setFont("Times New Roman");
    doc.setFontSize(12);

    const textWidth = 350;
    const lineHeight = 7;
    const paragraphSpacing = 15;
    let yAxis = 60;

    parts.forEach((part, index) => {
      const numLinesInPart = Math.ceil(part.length / 80);
      const lines = doc.splitTextToSize(part, textWidth);
      doc.text(lines, 50, yAxis);

      let spacing =
        numLinesInPart === 1
          ? paragraphSpacing
          : paragraphSpacing + numLinesInPart * 2.5;

      // Check if the part is the second to last in the array
      if (index === parts.length - 2) {
        spacing = 7;
      }

      if (index === parts.length - 3) {
        numLinesInPart === 1
          ? paragraphSpacing
          : paragraphSpacing + numLinesInPart * 2;
      }

      yAxis += lines.length * lineHeight + spacing;
    });

    doc.save(`${saveName}.pdf`);

    return true;
  };

  export const generateDOCX = async (saveName: string, html: string) => {
    const url = `${API_BASE_URL}/generate/download_as_docx/`;

    const form = new FormData();
    form.append("html", html);

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
        link.setAttribute("download", `${saveName}.docx`); //or any other extension
        document.body.appendChild(link);
        link.click();
        return true;
      }
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };
}

export {
  LoginUtils,
  SettingsUtils,
  GenerationUtils,
  SavedCoverLettersUtils,
  ReQueryUtils,
  DownloadUtils,
};
