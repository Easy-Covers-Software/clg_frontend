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

import {
  PhoneCall,
  PhoneCallListState,
  InitateCallResponse,
} from '@/Types/TranscriptionPage.types';

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

  export const addPTags = (parts: string) => {
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

  export const determineCoverLetterHtml = (contentData: any) => {
    if (
      contentData?.editedContent !== '' &&
      contentData?.editedContent !== contentData?.contentHtml
    ) {
      return contentData?.editedContent;
    } else {
      return contentData?.contentHtml;
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

  export const replaceSpecialCharactersInArray = (strings) => {
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

    console.log('additional details', additionalDetails);

    const data = {
      model: model,
      additional_details: JSON.stringify(additionalDetails),
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

  export const generatePDF = async (
    parts: string[] | null,
    saveName: string | null
  ) => {
    try {
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
    } catch (error) {
      console.log(error);
      return false;
    }
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
    const url = `${API_BASE}/users/auth/logout/`;

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
    phone_number: string,
    username: string
  ): Promise<APIResponse<any>> => {
    const url = `${API_BASE}/users/auth/register/`;

    phone_number = `+1${phone_number}`;

    const data = {
      email,
      password1: password,
      password2: newPasswordRepeat,
      phone_number,
      username,
    };

    const payload: FormData = Helpers.createPayload(data);

    try {
      const response = await axios.post<any>(url, payload, {
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

namespace GenerationMethods {
  export const createNewGeneration = async (
    generation_type: string,
    job_posting: string,
    candidate: string
  ): Promise<APIResponse<any>> => {
    const url = `${API_BASE}/generate/new/`;

    const data = {
      generation_type,
      job_posting,
      candidate,
    };

    const payload: FormData = Helpers.createPayload(data);

    try {
      const response = await axios.post<any>(url, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error creating new generation', error);
      return { data: null, error: error };
    }
  };

  export const calculateMatchScore = async (
    job_posting: string,
    candidate: string
  ): Promise<APIResponse<any>> => {
    const url = `${API_BASE}/generate/calculate_match_score/`;

    const data = {
      job_posting,
      candidate,
    };

    const payload: FormData = Helpers.createPayload(data);

    try {
      const response = await axios.post<any>(url, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      console.log('match score response', response);

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error calculating match score', error);
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

  export const generatePDF = async (parts: string[], saveName: string) => {
    const cleanedParts = Helpers.replaceSpecialCharactersInArray(parts);

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

namespace TranscriptionMethods {
  //-- Get Phone Calls Associated with Users Phone Number --//
  // TODO: need to add a type for the response
  export const fetchPhoneCalls = async (): Promise<
    APIResponse<PhoneCall[]>
  > => {
    const url = `${API_BASE}/phone_calls/get_phone_calls/`;

    try {
      const response = await axios.get<PhoneCall[]>(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error fetching phone calls', error);
      return { data: null, error: error };
    }
  };

  //-- Perform Transcription --//
  export const performTranscription = async (
    phoneCallId: string
  ): Promise<APIResponse<any>> => {
    const url = `${API_BASE}/transcription/perform_transcription/`;

    const payload = Helpers.createPayload({ phone_call_id: phoneCallId });

    try {
      const response = await axios.post<any>(url, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error performing transcription', error);
      return { data: null, error: error };
    }
  };

  //-- Fetch transcription from ID --//
  export const fetchTranscription = async (
    transcriptionId: string
  ): Promise<APIResponse<any>> => {
    const url = `${API_BASE}/transcription/${transcriptionId}/`;

    try {
      const response = await axios.get<any>(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error fetching transcription', error);
      return { data: null, error: error };
    }
  };

  export const fetchPhoneCall = async (
    phoneCallId: string
  ): Promise<APIResponse<PhoneCall>> => {
    const url = `${API_BASE}/phone_calls/${phoneCallId}/`;

    try {
      const response = await axios.get<PhoneCall>(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error fetching phone call', error);
      return { data: null, error: error };
    }
  };

  export const initiatePhoneCall = async (
    candidate_name: string,
    candidate_number: string,
    job_posting: string
  ): Promise<APIResponse<InitateCallResponse>> => {
    const url = `${API_BASE}/phone_calls/initiate_call/`;

    const data = {
      candidate_name,
      candidate_number,
      job_posting,
    };

    const payload = Helpers.createPayload(data);

    try {
      const response = await axios.post<InitateCallResponse>(url, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error initiating phone call', error);
      return { data: null, error: error };
    }
  };

  export const updateCandidate = async (candidateId: string, formData: any) => {
    const url = `${API_BASE}/candidate_profiles/${candidateId}/`;

    // const data = {}

    const payload = Helpers.createPayload(formData);

    try {
      const response = await axios.patch(url, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error updating candidate', error);
      return { data: null, error: error };
    }
  };

  export const deleteCandidate = async (candidateId: string) => {
    const url = `${API_BASE}/candidate_profiles/${candidateId}/`;

    try {
      const response = await axios.delete(url, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error deleting candidate', error);
      return { data: null, error: error };
    }
  };
}

namespace CandidateProfileMethods {
  export const fetchCandidateProfiles = async () => {
    const url = `${API_BASE}/candidate_profiles/`;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error fetching candidate profiles', error);
      return { data: null, error: error };
    }
  };

  export const fetchFullCandidateProfile = async (candidateId) => {
    const url = `${API_BASE}/candidate_profiles/${candidateId}/`;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error fetching full candidate profile', error);
      return { data: null, error: error };
    }
  };

  export const fetchJobPostingsAssociatedWithCandidate = async (
    candidateId
  ) => {
    const url = `${API_BASE}/candidate_profiles/${candidateId}/get_candidate_job_postings/`;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log(
        'Error fetching job postings associated with candidate',
        error
      );
      return { data: null, error: error };
    }
  };

  export const fetchGenerationsAssociatedWithCandidate = async (
    candidateId
  ) => {
    const url = `${API_BASE}/candidate_profiles/${candidateId}/get_candidate_generations/`;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log(
        'Error fetching generations associated with candidate',
        error
      );
      return { data: null, error: error };
    }
  };

  export const deleteCandidateProfile = async (candidateId) => {
    const url = `${API_BASE}/candidate_profiles/${candidateId}/`;

    try {
      const response = await axios.delete(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error deleting candidate profile', error);
      return { data: null, error: error };
    }
  };

  export const fetchCandidatesResume = async (resumeId) => {
    const url = `${API_BASE}/candidate_profiles/${resumeId}/get_candidate_resumes/`;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error fetching candidate resume', error);
      return { data: null, error: error };
    }
  };

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
}

namespace JobPostingMethods {
  export const fetchJobPostings = async () => {
    const url = `${API_BASE}/job_postings/get_job_postings/`;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error fetching job postings', error);
      return { data: null, error: error };
    }
  };

  export const fetchFullJobPosting = async (
    jobPostingId: string
  ): Promise<APIResponse<any>> => {
    const url = `${API_BASE}/job_postings/${jobPostingId}/`;

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

  export const fetchCandidatesAssociatedWithJobPosting = async (
    jobPostingId
  ) => {
    const url = `${API_BASE}/job_postings/${jobPostingId}/get_candidate_profiles/`;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log(
        'Error fetching candidates associated with job posting',
        error
      );
      return { data: null, error: error };
    }
  };

  export const deleteJobPosting = async (jobPostingId: string) => {
    const url = `${API_BASE_URL}/job-posting/${jobPostingId}/`;

    try {
      const response = await axios.delete(url, {
        withCredentials: true,
      });

      return { data: response.data, error: null };
    } catch (error) {
      console.log('Error deleting job posting', error);
      return { data: null, error: error };
    }
  };
}

export {
  Helpers,
  CoverLetterApiMethods,
  DownloadMethods,
  LoginApiMethods,
  GenerationMethods,
  TranscriptionMethods,
  CandidateProfileMethods,
  JobPostingMethods,
};
