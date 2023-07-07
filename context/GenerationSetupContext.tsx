import React, { createContext, useState, useContext } from "react";

const GenerationSetupContext = createContext(null);

type FileUploadObject = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export type AdditionalDetailsInputs = {
  simpleInput1: string;
  simpleInput2: string;
  simpleInput3: string;
  simpleInput4: string;
  openEndedInput: string;
};

export const GenerationContext = ({ children }) => {
  const [jobPostingInput, setJobPostingInput] = useState<string>("");

  const [uploadedResumeFile, setUploadedResumeFile] =
    useState<FileUploadObject | null>(null); // will be object
  const [freeTextPersonalDetails, setFreeTextPersonalDetails] =
    useState<string>("");

  const [additionalDetails, setAdditionalDetails] =
    useState<AdditionalDetailsInputs>({
      simpleInput1: "",
      simpleInput2: "",
      simpleInput3: "",
      simpleInput4: "",
      openEndedInput: "",
    });
  const handleFileChange = (e) => {
    setUploadedResumeFile(e.target.files[0]);
  };

  return (
    <GenerationSetupContext.Provider
      value={{
        jobPostingInput,
        setJobPostingInput,
        uploadedResumeFile,
        handleFileChange,
        additionalDetails,
        setAdditionalDetails,
        freeTextPersonalDetails,
        setFreeTextPersonalDetails,
      }}
    >
      {children}
    </GenerationSetupContext.Provider>
  );
};

export const useGenerationSetupContext = () =>
  useContext(GenerationSetupContext);
