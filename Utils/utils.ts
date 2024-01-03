import { CoverLetterData } from '@/Types/GenerationContext.types';

//=== Api Payloads Helper ===//
export const createPayload = (values: Object) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};

//=== Ensure Download is functional by: ===//
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

//=== Prepare data for mantime text editor display ===//
const removeDivTags = (html: string) => {
  if (html.startsWith('<div>') && html.endsWith('</div>')) {
    return html.substring(5, html.length - 6);
  }
  return html;
};

export const formatGenerationForAdjustment = (input: string): string => {
  const prepInput = removeDivTags(input);
  return prepInput.replace(/<p>/g, '').replace(/<\/p>/g, '\n');
};

export const addPTags = (parts: any) => {
  const coverLetterParts = parts.map((part) => `<p>${part}</p>`).join('');
  const coverLetter = `<div>${coverLetterParts}</div>`;
  return coverLetter;
};

export const addDivTag = (html: string) => {
  return `<div>${html}</div>`;
};

export const parseSectionsFromHTML = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const paragraphs = doc.querySelectorAll('p');
  const sections = Array.from(paragraphs).map((p) => p.innerHTML);
  console.log('sections', sections);

  return sections;
};

//** currently not used anywhere but probably should be **//
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
export const determineGenerationHtml = (contentData: any) => {
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
export const determineGenerationParts = (
  generationResultsState: any,
) => {
  if (
    generationResultsState?.editedContentHtml !== '' &&
    generationResultsState?.editedContentHtml !== generationResultsState?.contentHtml
  ) {
    return generationResultsState?.editedContent;
  } else {
    return generationResultsState?.content;
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

