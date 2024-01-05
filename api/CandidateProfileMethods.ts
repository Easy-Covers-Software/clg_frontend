import axios from 'axios';
import Cookie from 'js-cookie';

import {
  APIResponse,
  ResumeUploadApiResponse,
} from '../Types/ApiResponse.types';

import { createPayload } from '@/Utils/utils';
import { Resume } from '@/Types/CandidatesSection.types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;


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
  candidateProfileId: string 
): Promise<APIResponse<Resume>> => {
  const url = `${API_BASE}/candidate_profiles/resume/upload/`;

  const data = {
    resume_file: resume,
    candidate_profile: candidateProfileId
  };

  const payload: FormData = createPayload(data);

  try {
    const response = await axios.post<Resume>(url, payload, {
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