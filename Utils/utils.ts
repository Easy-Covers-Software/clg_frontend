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
import { rem } from '@mantine/core';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createPayload = (values: Object) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
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


namespace Helpers {

  // only used in 1 file -- can move function to that file
  export const removeDivTags = (html: string) => {
    if (html.startsWith('<div>') && html.endsWith('</div>')) {
      return html.substring(5, html.length - 6);
    }
    return html;
  };

  // only used in 1 file -- can move function to that file (^)
  export const formatCoverLetterForAdjustment = (input: string): string => {
    const prepInput = removeDivTags(input);
    return prepInput.replace(/<p>/g, '').replace(/<\/p>/g, '\n');
  };

  // remove
  export const removePTags = (html: string) => {
    return html.replace(/<p>/g, '').replace(/<\/p>/g, '');
  };

  // keep
  export const addPTags = (parts: any) => {
    const coverLetterParts = parts.map((part) => `<p>${part}</p>`).join('');
    const coverLetter = `<div>${coverLetterParts}</div>`;
    return coverLetter;
  };

  // keep
  export const addDivTag = (html: string) => {
    return `<div>${html}</div>`;
  };

  // keep
  export const parseSectionsFromHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const paragraphs = doc.querySelectorAll('p');
    const sections = Array.from(paragraphs).map((p) => p.innerHTML);
    console.log('sections', sections);

    return sections;
  };

  // only used in 1 file -- can move function to that file
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

  // remove -- paypal 
  export const extractPrice = (frontendValue) => {
    const pattern = /(\d+\.\d+)/g;
    const match = frontendValue.match(pattern);

    if (match && match.length > 0) {
      return match[0];
    }

    return null;
  };

  // keep
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

  // keep
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

  // only used in 1 file -- can move function to that file
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

    const payload: FormData = createPayload(data);

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

    const payload: FormData = createPayload(data);

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
    const url = `${API_BASE_URL}/generation/`;

    console.log('additional details', additionalDetails);

    const data = {
      model: model,
      additional_details: JSON.stringify(additionalDetails),
    };

    const payload: FormData = createPayload(data);

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
    const url = `${API_BASE_URL}/generation/${coverLetterId}/`;

    const data = {
      cover_letter: JSON.stringify(coverLetterSections),
      save_name: saveName,
    };

    const payload: FormData = createPayload(data);

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
    const url = `${API_BASE_URL}/generation/get_saved_generations/`;

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
    const url = `${API_BASE_URL}/generation/${coverLetterId}/`;

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


export {
  Helpers,
  CoverLetterApiMethods,
};
