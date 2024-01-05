import jsPDF from 'jspdf';
import axios from 'axios';
import Cookie from 'js-cookie';

import {
  APIResponse,
  AuthResponse,
  ForgotPasswordSuccessApiResponse,
  FetchUserApiResponse,

} from '../Types/ApiResponse.types';



import { createPayload } from '@/Utils/utils';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


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

  const payload: FormData = createPayload(data);

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

  phone_number = `${phone_number}`;

  const data = {
    email,
    password1: password,
    password2: newPasswordRepeat,
    phone_number,
    username,
  };

  const payload: FormData = createPayload(data);

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

  const payload: FormData = createPayload(data);

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

  const payload: FormData = createPayload(data);

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