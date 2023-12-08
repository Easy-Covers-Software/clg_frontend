import React, { useRef } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Importing Grid2
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import CandidateProfessionalDetails from './components/CandidateProfessionalDetails';
import { Typography } from '@mui/material';
import CandidateJobsList from './components/CandidateJobsList';
import CandidatePersonalDetails from './components/CandidatePersonalDetails';
import { useCandidatesContext } from '@/context/CandidatesContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the upload icon


const Container = styled(Grid)`
  height: 100%;
  padding: 1%;

  height: 100%;
  width: 100%;
  // padding: 2%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: auto;
`;

const ProfessionDetailsGrid = styled(Grid)`
  height: 28vh;
  min-height: 200px;
`;

const JobPostingsListGrid = styled(Grid)`
  // height: 41.7vh;
  // height: fit-content;
  flex-grow: 1;
  height: 40%;
  min-height: 220px;
  // overflow: scroll;
  white-space: nowrap;
  flex-wrap: nowrap;
`;

const ResumePanelGrid = styled(Grid)`
  height: 16vh;
  min-height: 100px;
`;

const PersonalDetailsGrid = styled(Grid)`
  // height: 56vh;
  // height: fit-content;
  flex: 1;
  min-height: 320px;
`;

const StyledPaper = styled(Paper)`
  height: 100%;
  width: 100%;
  border: 3px solid #13d0b7;
  overflow: scroll;
`;

const ResumePanelPaper = styled(StyledPaper)`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

const FullCandidateProfileOverview = ({
  selectedCandidate,
  jobPostings,
  jobLoadingId,
  updateSelectedJobPosting,
  updateSelectedCandidateMode,
  handleCalculate,
  resumeUrl,
  handleFileChange
}) => {
  // const { state, dispatch } = useCandidatesContext();
  // const { selectedCandidateProfile } = state;
  const fileInputRef = useRef(null);

  console.log('resume URL')
  console.log(resumeUrl)

  console.log('Selected Candidate ===*');
  console.log(selectedCandidate);

  const onSelectJobPosting = (jobPosting) => {
    console.log('Selected Job Posting:', jobPosting);
  };


  const handleResumeClick = () => {
    if (resumeUrl === '') {
      fileInputRef.current.click();
    } else {
      // existing logic for non-empty resumeUrl
      console.log('Resume Panel Clicked');
      updateSelectedCandidateMode('resume');
    }
  };

  return (
    <Container container spacing={2}>
      {/* 1. Professional Details Panel - Top Left */}
      <Grid
        xs={12}
        md={7}
        container
        direction='column'
        spacing={2}
        height={'100%'}
        flexWrap={'nowrap'}
      >
        <ProfessionDetailsGrid xs={12}>
          <StyledPaper
            elevation={3}
            style={{
              paddingBottom: 0,
              marginBottom: 0,
              display: 'flex',
            }}
          >
            <CandidateProfessionalDetails
              yearsOfExperience={selectedCandidate?.years_of_experience}
              skills={selectedCandidate?.skills}
              linkedinUrl={selectedCandidate?.linkedin_profile}
              portfolioUrl={selectedCandidate?.portfolio_website}
              currentTitle={selectedCandidate?.current_title}
              currentEmployer={selectedCandidate?.current_employer}
              educationLevel={selectedCandidate?.education_level}
              educationField={selectedCandidate?.education_field}
              educationInstitution={selectedCandidate?.education_institution}
            />
          </StyledPaper>
        </ProfessionDetailsGrid>

        {/* 2. Job Postings List - Bottom Left */}
        <JobPostingsListGrid xs={12}>
          <StyledPaper elevation={3}>
            {/* <Grid>Job Postings</Grid> */}
            <CandidateJobsList
              jobPostings={jobPostings && jobPostings}
              loadingId={jobLoadingId}
              updateSelectedJobPosting={updateSelectedJobPosting}
              handleCalculate={handleCalculate}
            />
          </StyledPaper>
        </JobPostingsListGrid>
      </Grid>

      {/* Right Column */}
      <Grid
        xs={12}
        md={5}
        container
        direction='column'
        spacing={2}
        height={'100%'}
        mr={'0.1%'}
        flexWrap={'nowrap'}
      >
      
        {/* 3. Resume Panel - Top Right */}
        <ResumePanelGrid xs={12}>
          <ResumePanelPaper
            elevation={3}
            onClick={handleResumeClick}
          >
            {resumeUrl === '' ? (
              <div style={{ textAlign: 'center' }}>
                <Typography variant='h6'>Upload Resume</Typography>
                <CloudUploadIcon style={{ fontSize: '48px', color: "#13d0b7" }} />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept=".pdf" // you can change this to accept other file types
                />
              </div>
            ) : (
              <Typography variant='h4'>Resume</Typography>
            )}
          </ResumePanelPaper>
        </ResumePanelGrid>

        {/* 4. Personal Details Panel - Bottom Right (fills remaining space) */}
        <PersonalDetailsGrid xs={12}>
          <StyledPaper elevation={3}>
            <CandidatePersonalDetails
              name={selectedCandidate?.name}
              phoneNumber={selectedCandidate?.phone_number}
              email={selectedCandidate?.email}
              city={selectedCandidate?.city}
              state={selectedCandidate?.state}
              country={selectedCandidate?.country}
              zipCode={selectedCandidate?.zip_code}
              age={selectedCandidate?.age}
            />
            {/* <Grid>Personal</Grid> */}
          </StyledPaper>
        </PersonalDetailsGrid>
      </Grid>
    </Container>
  );
};

export default FullCandidateProfileOverview;
