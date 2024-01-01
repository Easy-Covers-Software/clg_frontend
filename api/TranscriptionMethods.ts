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