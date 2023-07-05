import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/ai_generator/generation_setup/';

// Create custom Error classes for better error handling
class JobPostingDataEmptyError extends Error {
  constructor() {
    super('Job posting data cannot be empty');
    this.name = 'JobPostingDataEmptyError';
  }
}

class JobPostingUploadError extends Error {
  constructor(message) {
    super(message);
    this.name = 'JobPostingUploadError';
  }
}

export const uploadJobPosting = async (jobPostingData: string) => {
  if (jobPostingData === '') {
    console.error('Error Uploading Job Posting: Job posting data is empty');
    throw new JobPostingDataEmptyError();
  }

  const endpoint = API_BASE_URL + 'upload_job_posting/';

  try {
    const response = await axios.post(endpoint, jobPostingData);

    console.log('job post upload response: ', response);

    // Check if the response status code is 200 (OK) or 201 (Created), which usually indicate a successful API request
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      // If the status code is not 200 or 201, throw an error
      console.error(
        `Error Uploading Job Posting: Received status code ${response.status}`,
      );
      throw new JobPostingUploadError(
        `Received status code ${response.status}`,
      );
    }

    // if response is a 200 or 201 return true else return false and throw Error based on response
  } catch (error) {
    // Wrap the original error in a JobPostingUploadError to provide more context
    console.error('Error Uploading Job Posting:', error);
    throw new JobPostingUploadError(error.message);
  }
};
