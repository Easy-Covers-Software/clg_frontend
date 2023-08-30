import jsPDF from 'jspdf';
import axios from 'axios';
import Cookie from 'js-cookie';

import {
  APIResponse,
  AuthResponse,
  ForgotPasswordSuccessApiResponse,
  FetchUserApiResponse,
  GetJobDetailsApiResponse,
  GetJobPostingApiResponse,
  ResumeUploadApiResponse,
  CoverLetterGenerateApiResponse,
  AdjustmentApiResponse,
  SaveCoverLetterApiResponse,
  DeleteCoverLetterApiResponse,
} from '../Types/ApiResponse.types';

import {
  AdditionalDetails,
  CoverLetterData,
} from '@/Types/GenerationContext.types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

namespace Helpers {
  export const removeDivTags = (html: string) => {
    if (html.startsWith('<div>') && html.endsWith('</div>')) {
      return html.substring(5, html.length - 6);
    }
    return html;
  };

  export const removePTags = (html: string) => {
    return html.replace(/<p>/g, '').replace(/<\/p>/g, '');
  };

  export const addPTags = (parts: string[]) => {
    const coverLetterParts = parts.map((part) => `<p>${part}</p>`).join('');
    const coverLetter = `<div>${coverLetterParts}</div>`;
    return coverLetter;
  };

  export const addDivTag = (html: string) => {
    return `<div>${html}</div>`;
  };

  export const formatCoverLetterForAdjustment = (input: string): string => {
    return input.replace(/<p>/g, '').replace(/<\/p>/g, '\n');
  };

  export const parseSectionsFromHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const paragraphs = doc.querySelectorAll('p');
    const sections = Array.from(paragraphs).map((p) => p.innerHTML);
    console.log('sections', sections);

    return sections;
  };

  export const isOriginalGenerationEdited = (
    originalCoverLetterHtml: string,
    updatedCoverLetterHtml: string
  ) => {
    if (updatedCoverLetterHtml === '') {
      return originalCoverLetterHtml;
    } else {
      if (originalCoverLetterHtml === updatedCoverLetterHtml) {
        return originalCoverLetterHtml;
      }
      return updatedCoverLetterHtml;
    }
  };

  export const extractPrice = (frontendValue) => {
    const pattern = /(\d+\.\d+)/g;
    const match = frontendValue.match(pattern);

    if (match && match.length > 0) {
      return match[0];
    }

    return null;
  };

  export const createPayload = (values: Object) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  };

  export const checkAdditionalDetails = (additionalDetails) => {
    console.log('checking additional details, ', additionalDetails);

    if (additionalDetails) {
      for (const [key, inputValue] of Object.entries(additionalDetails)) {
        if (!key.includes('update') && inputValue !== '') {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  export const determineCoverLetterHtml = (
    coverLetterState: CoverLetterData
  ) => {
    if (
      coverLetterState?.editedCoverLetter !== '' &&
      coverLetterState?.editedCoverLetter !== coverLetterState?.coverLetterHtml
    ) {
      return coverLetterState?.editedCoverLetter;
    } else {
      return coverLetterState?.coverLetterHtml;
    }
  };

  export const determineCoverLetterParts = (
    coverLetterState: CoverLetterData
  ) => {
    if (
      coverLetterState?.editedCoverLetter !== '' &&
      coverLetterState?.editedCoverLetter !== coverLetterState?.coverLetterHtml
    ) {
      return coverLetterState?.editedCoverLetterParts;
    } else {
      return coverLetterState?.coverLetterParts;
    }
  };
}

namespace LoginApiMethods {
  export const signInGoogle = async (): Promise<void> => {
    const parameters = {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      redirect_uri: `${API_BASE}/users/auth/google-callback`,
      response_type: 'code',
      scope: 'email profile openid',
      access_type: 'online',
      prompt: 'consent',
    };

    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    Object.keys(parameters).forEach((key) =>
      url.searchParams.append(key, parameters[key])
    );
    window.location.href = url.toString();
  };

  export const fetchUser = async (): Promise<
    APIResponse<FetchUserApiResponse>
  > => {
    const url = API_BASE + '/users/me/';

    try {
      const response = await axios.get<FetchUserApiResponse>(url, {
        withCredentials: true,
      });

      console.log('inner fetch response', response);

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error fetching user', error);
      return { data: null, error: error };
    }
  };

  export const login = async (
    username: string,
    email: string,
    password: string
  ): Promise<APIResponse<AuthResponse>> => {
    const url = `${API_BASE}/users/auth/login/`;

    const data = {
      username,
      email,
      password,
    };

    const payload: FormData = Helpers.createPayload(data);

    try {
      const response = await axios.post<AuthResponse>(url, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error logging in', error);
      return { data: null, error: error };
    }
  };

  export const logout = async (): Promise<APIResponse<AuthResponse>> => {
    const url = `${API_BASE}/users/logout/`;

    try {
      const response = await axios.post<AuthResponse>(
        url,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookie.get('csrftoken'),
          },
        }
      );

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error logging out user', error);
      return { data: null, error: error };
    }
  };

  export const createAccount = async (
    email: string,
    password: string,
    newPasswordRepeat: string,
    username: string
  ): Promise<APIResponse<AuthResponse>> => {
    const url = `${API_BASE}/users/auth/register/`;

    const data = {
      email,
      password1: password,
      password2: newPasswordRepeat,
      username,
    };

    const payload: FormData = Helpers.createPayload(data);

    try {
      const response = await axios.post<AuthResponse>(url, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error creating account', error);
      return { data: null, error: error };
    }
  };

  export const resetPassword = async (
    email: string
  ): Promise<APIResponse<AuthResponse>> => {
    const url = `${API_BASE}/users/auth/reset_password/`;

    const data = {
      email: email,
    };

    const payload: FormData = Helpers.createPayload(data);

    try {
      const response = await axios.post<AuthResponse>(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error resetting password', error);
      return { data: null, error: error };
    }
  };

  export const submitNewPasswords = async (
    new_password1: string,
    new_password2: string,
    uid: string,
    token: string
  ): Promise<APIResponse<ForgotPasswordSuccessApiResponse>> => {
    const url = `${API_BASE}/dj-rest-auth/password/reset/confirm/${uid}/${token}/`;

    const data = {
      new_password1,
      new_password2,
      uid: uid,
      token: token,
    };

    const payload: FormData = Helpers.createPayload(data);

    try {
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error submitting new passwords', error);
      return { data: null, error: error };
    }
  };
}

namespace CoverLetterApiMethods {
  //== Job Posting ==//
  export const getJobPosting = async (
    jobPostingId: string
  ): Promise<APIResponse<GetJobPostingApiResponse>> => {
    const url = `${API_BASE_URL}/job-posting/new/${jobPostingId}/`;

    try {
      const response = await axios.get<GetJobPostingApiResponse>(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error fetching job posting', error);
      return { data: null, error: error };
    }
  };

  export const getJobDetails = async (
    jobPosting: string
  ): Promise<APIResponse<GetJobDetailsApiResponse>> => {
    const url = `${API_BASE_URL}/job-posting/new/`;

    const data = { job_posting: jobPosting };

    const payload: FormData = Helpers.createPayload(data);

    try {
      const response = await axios.post<GetJobDetailsApiResponse>(
        url,
        payload,
        {
          withCredentials: true,
        }
      );

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error fetching job posting', error);
      return { data: null, error: error };
    }
  };

  //== Resume ==//
  export const uploadResume = async (
    resume: File,
    freeText: string,
    yearsOfExperience: string,
    awardsAndCerts: string,
    projectsAndPublications: string,
    misc: string
  ): Promise<APIResponse<ResumeUploadApiResponse>> => {
    const url = `${API_BASE_URL}/resume-upload/`;

    const data = {
      resume_file: resume,
      free_text: freeText,
      years_relevant_experience: yearsOfExperience,
      awards_and_certifications: awardsAndCerts,
      projects_and_publications: projectsAndPublications,
      misc,
    };

    const payload: FormData = Helpers.createPayload(data);

    try {
      const response = await axios.post<ResumeUploadApiResponse>(url, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error uploading resume', error);
      return { data: null, error: error };
    }
  };

  //== Cover Letter (generation) ==//
  export const generateCoverLetter = async (
    model: string,
    additionalDetails: AdditionalDetails
  ): Promise<APIResponse<CoverLetterGenerateApiResponse>> => {
    const url = `${API_BASE_URL}/generate/`;

    const data = {
      model: model,
      additional_details: additionalDetails,
    };

    const payload: FormData = Helpers.createPayload(data);

    try {
      const response = await axios.post<CoverLetterGenerateApiResponse>(
        url,
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookie.get('csrftoken'),
          },
        }
      );

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error generating cover letter', error);
      return { data: null, error: error };
    }
  };

  export const makeAdjustment = async (
    adjustmentLevel: string,
    typeOfAdjustment: string,
    userInput: string,
    coverLetter: string
  ): Promise<APIResponse<AdjustmentApiResponse>> => {
    const url = `${API_BASE_URL}/generate/make_adjustment/`;

    const data = {
      adjustment_level: adjustmentLevel,
      type_of_adjustment: typeOfAdjustment,
      user_input: userInput,
      cover_letter: coverLetter,
    };

    const payload: FormData = Helpers.createPayload(data);

    try {
      const response = await axios.post<AdjustmentApiResponse>(url, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error making adjustment', error);
      return { data: null, error: error };
    }
  };

  export const saveCoverLetter = async (
    coverLetterId: string,
    coverLetterSections: string[],
    saveName: string
  ): Promise<APIResponse<SaveCoverLetterApiResponse>> => {
    const url = `${API_BASE_URL}/generate/${coverLetterId}/`;

    const data = {
      cover_letter: JSON.stringify(coverLetterSections),
      save_name: saveName,
    };

    const payload: FormData = Helpers.createPayload(data);

    try {
      const response = await axios.patch<SaveCoverLetterApiResponse>(
        url,
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookie.get('csrftoken'),
          },
        }
      );

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error saving cover letter', error);
      return { data: null, error: error };
    }
  };

  //== Cover Letters (saved) ==//
  export const fetchSavedCoverLetters = async (): Promise<
    APIResponse<SaveCoverLetterApiResponse[]>
  > => {
    const url = `${API_BASE_URL}/generate/get_saved_cover_letters/`;

    try {
      const response = await axios.get<SaveCoverLetterApiResponse[]>(url, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      console.log('Saved cover letters resposne', response);

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error fetching saved cover letters', error);
      return { data: null, error: error };
    }
  };

  export const deleteSavedCoverLetter = async (
    coverLetterId: string
  ): Promise<APIResponse<DeleteCoverLetterApiResponse>> => {
    const url = `${API_BASE_URL}/generate/${coverLetterId}/`;

    try {
      const response = await axios.delete(url, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error deleting saved cover letter', error);
      return { data: null, error: error };
    }
  };
}

namespace DownloadMethods {
  const replaceSpecialCharactersInArray = (strings) => {
    const replacements = {
      á: 'a',
      ä: 'a',
      â: 'a',
      à: 'a',
      ã: 'a',
      é: 'e',
      ë: 'e',
      ê: 'e',
      è: 'e',
      í: 'i',
      ï: 'i',
      î: 'i',
      ì: 'i',
      ó: 'o',
      ö: 'o',
      ô: 'o',
      ò: 'o',
      õ: 'o',
      ú: 'u',
      ü: 'u',
      û: 'u',
      ù: 'u',
      ñ: 'n',
      ç: 'c',
      ý: 'y',
      ÿ: 'y',
      š: 's',
      ž: 'z',
      ł: 'l',
      đ: 'd',
      ß: 'ss',
      þ: 'th',
      ĥ: 'h',
      ĵ: 'j',
      œ: 'oe',
      æ: 'ae',
      ƒ: 'f',
      ĝ: 'g',
      ě: 'e',
      ř: 'r',
      ů: 'u',
      č: 'c',
      Vū: 'Vu', // The specific example you gave
    };

    const replaceInString = (str) => {
      for (let [key, value] of Object.entries(replacements)) {
        str = str.replace(new RegExp(key, 'g'), value);
      }
      return str;
    };

    return strings.map(replaceInString);
  };

  export const generatePDF = async (parts: string[], saveName: string) => {
    const cleanedParts = replaceSpecialCharactersInArray(parts);

    const doc = new jsPDF('p', 'px', 'a4', true);

    doc.setFont('Times New Roman');
    doc.setFontSize(12);

    const textWidth = 350;
    const lineHeight = 7;
    const paragraphSpacing = 15;
    let yAxis = 60;

    cleanedParts.forEach((part, index) => {
      const numLinesInPart = Math.ceil(part.length / 80);
      const lines = doc.splitTextToSize(part, textWidth);
      doc.text(lines, 50, yAxis);

      let spacing =
        numLinesInPart === 1
          ? paragraphSpacing
          : paragraphSpacing + numLinesInPart * 2.5;

      // Check if the part is the second to last in the array
      if (index === cleanedParts.length - 2) {
        spacing = 7;
      }

      if (index === cleanedParts.length - 3) {
        numLinesInPart === 1
          ? paragraphSpacing
          : paragraphSpacing + numLinesInPart * 2;
      }

      yAxis += lines.length * lineHeight + spacing;
    });

    doc.save(`${saveName}.pdf`);

    return true;
  };

  export const generateDOCX = async (html: string, saveName: string) => {
    const url = `${API_BASE_URL}/generate/download_as_docx/`;

    const form = new FormData();
    form.append('html', html);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
        responseType: 'blob',
      });

      if (response.statusText === 'OK') {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${saveName}.docx`); //or any other extension
        document.body.appendChild(link);
        link.click();
        return true;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

export { Helpers, LoginApiMethods, CoverLetterApiMethods, DownloadMethods };
