import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { PrimaryButton, UnSelectedButton } from '../../Global/Global';

// import BasicInfoForm from './NewForms/BasicInfoForm';
// import CurrentEmploymentForm from './NewForms/CurrentEmploymentForm';
// import AdditionalInfoForm from './NewForms/AdditionalInfoForm';
import CallComplete from '@/components/CallsPage/PhoneCallComponents/CallComplete/CallComplete';
import CallCompleteStepper from '@/components/CallsPage/PhoneCallComponents/CallCompleteStepper';
import BasicInfoForm from '@/components/CallsPage/PhoneCallComponents/NewForms/BasicInfoForm';
import CurrentEmploymentForm from '@/components/CallsPage/PhoneCallComponents/NewForms/CurrentEmploymentForm';
import AdditionalInfoForm from '@/components/CallsPage/PhoneCallComponents/NewForms/AdditionalInfoForm';

import { Typography } from '@mui/material';

import { CallsContainer } from '@/sections/TranscriptionSection/TranscriptionSection.styles';

const Container = styled(Grid2)`
  // height: 100%;
  background-color: #f8f8ff;

  // border: 1px solid #006d4b;
  border-radius: 4px;
  margin-top: 3%;
  // overflow: hidden;
`;

const steps = [
  'Basic Information',
  'Current Employment',
  'Additional Information',
];

const FrameComp = ({
  children,
  handleBack,
  handleNext,
  activeStep,
  candidateId,
  formData,
  handleDontSave,
  handleSaveCandidate,
}) => {
  const handleLeftButtonClick = () => {
    if (activeStep === 0) {
      handleDontSave(candidateId);
    } else {
      handleBack();
    }
  };

  const handleRightButtonClick = () => {
    if (activeStep === 2) {
      handleSaveCandidate(candidateId, formData);
    } else {
      handleNext();
    }
  };
  return (
    <Grid2
      height={'96%'}
      width={'94%'}
      container
      justifyContent={'space-between'}
      alignItems={'flex-end'}
      p={'3%'}
      border={'1px solid #006D4B'}
      m={'auto'}
      mt={'4%'}
      borderRadius={'4px'}
      bgcolor={'white'}
    >
      <Typography variant="h6" m={'auto'}>
        Call Complete
      </Typography>
      {children}

      <PrimaryButton
        style={{
          height: '6vh',
          width: '12vw',
        }}
        onClick={() => handleLeftButtonClick()}
      >
        {activeStep === 0 ? "Don't Save" : 'Previous'}
      </PrimaryButton>

      <PrimaryButton
        style={{
          height: '6vh',
          width: '12vw',
        }}
        onClick={() => handleRightButtonClick()}
      >
        {activeStep === 2 ? 'Save' : 'Next'}
      </PrimaryButton>
    </Grid2>
  );
};

export default function SaveCandidateInfoForm({
  candidateId,
  candidateName,
  candidateNumber,
  jobPosting,
  updateSaveForm,
  handleSaveCandidate,
  reset,
}) {
  console.log('jobPosting');
  console.log(jobPosting);

  const initialFormData = {
    // Basic Information Fields
    name: candidateName,
    phone_number: candidateNumber,
    job_posting: jobPosting,
    email: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    age: '',

    // Current Employment Fields
    current_title: '',
    current_employer: '',
    education_level: '',
    education_field: '',
    education_institution: '',
    employment_field: '',
    skills: '',
    years_of_experience: '',

    // Additional Information Fields
    feedback: '',
    linkedin_profile: '',
    portfolio_website: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  useEffect(() => {
    updateSaveForm(formData);
  }, [formData]);

  return (
    <Container>
      <Grid2
        container
        direction={'column'}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <Stepper activeStep={1} alternativeLabel>
          <CallCompleteStepper
            activeStep={activeStep}
            completed={completed}
            handleStep={handleStep}
          />
        </Stepper>
      </Grid2>
      <FrameComp
        handleBack={handleBack}
        handleNext={handleNext}
        activeStep={activeStep}
        candidateId={candidateId}
        formData={formData}
        handleDontSave={reset}
        handleSaveCandidate={handleSaveCandidate}
      >
        {activeStep === 0 ? (
          <BasicInfoForm formData={formData} setFormData={setFormData} />
        ) : activeStep === 1 ? (
          <CurrentEmploymentForm
            formData={formData}
            setFormData={setFormData}
          />
        ) : (
          activeStep && (
            <AdditionalInfoForm formData={formData} setFormData={setFormData} />
          )
        )}
      </FrameComp>
    </Container>
  );
}
