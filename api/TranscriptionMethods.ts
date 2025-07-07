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


// import {
//   PhoneCall,
//   PhoneCallListState,
//   InitateCallResponse,
// } from '@/Types/TranscriptionPage.types';

import { createPayload } from '@/Utils/utils';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  //-- Get Phone Calls Associated with Users Phone Number --//
  // TODO: need to add a type for the response
  export const fetchPhoneCalls = async (): Promise<
    APIResponse<any[]>
  > => {
    const url = `${API_BASE}/phone_calls/get_phone_calls/`;

    try {
      const response = await axios.get<any[]>(url, {
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

    const payload = createPayload({ phone_call_id: phoneCallId });

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
  ): Promise<APIResponse<any>> => {
    console.log('fetching phone call', phoneCallId)
    const url = `${API_BASE}/phone_calls/${phoneCallId}/`;

    try {
      const response = await axios.get<any>(url, {
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
  ): Promise<APIResponse<any>> => {
    const url = `${API_BASE}/phone_calls/initiate_call/`;

    const data = {
      candidate_name,
      candidate_number,
      job_posting,
    };

    const payload = createPayload(data);

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
      console.log('Error initiating phone call', error);
      return { data: null, error: error };
    }
  };

  export const updateCandidate = async (candidateId: string, formData: any) => {
    const url = `${API_BASE}/candidate_profiles/${candidateId}/`;

    // const data = {}

    const payload = createPayload(formData);

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

