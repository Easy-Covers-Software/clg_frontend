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


import { createPayload, replaceSpecialCharactersInArray } from '@/Utils/utils';
import { MatchScore } from '@/Types/CandidatesSection.types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


//=== Generate Email/Cover Letters Endpoint ===//
export const generate = async (
    generation_type: string,
    job_posting: string,
    candidate: string
  ): Promise<APIResponse<any>> => {
    const url = `${API_BASE}/generation/generate/`;

    const data = {
      generation_type,
      job_posting,
      candidate,
    };

    const payload: FormData = createPayload(data);

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

//=== Generation Adjustment Endpoint ===//
export const makeAdjustment = async (
  adjustmentLevel: string,
  typeOfAdjustment: string,
  userInput: string,
  coverLetter: string
  ): Promise<APIResponse<AdjustmentApiResponse>> => {
  const url = `${API_BASE_URL}/generation/make_adjustment/`;
  
  const data = {
      adjustment_level: adjustmentLevel,
      type_of_adjustment: typeOfAdjustment,
      user_input: userInput,
      cover_letter: coverLetter,
  };
  
  const payload: FormData = createPayload(data);
  
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

//=== Calculate Match Score ===//
export const calculateMatchScore = async (
  job_posting: string,
  candidate: string
): Promise<APIResponse<MatchScore>> => {
  const url = `${API_BASE}/generation/calculate_match_score/`;

  const data = {
      job_posting,
      candidate,
  };

  const payload: FormData = createPayload(data);

  try {
      const response = await axios.post<MatchScore>(url, payload, {
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

//=== Download Generation as PDF ===//
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

//=== Download Generation as DOCX ===//
export const generateDOCX = async (html: string, saveName: string) => {
const url = `${API_BASE_URL}/generation/download_as_docx/`;

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