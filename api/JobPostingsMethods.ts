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

import { createPayload } from '@/Utils/utils';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


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