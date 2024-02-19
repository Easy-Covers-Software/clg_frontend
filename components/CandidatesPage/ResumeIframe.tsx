import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const ResumeIframe = ({ resumeUrl }) => {
  if (!resumeUrl) {
    return (
      <Grid2 mt={'3%'} textAlign={'center'}>
        Select resume...
      </Grid2>
    );
  }

  // Ensure the URL points to a direct file, and that your server is configured to serve this file correctly
  return (
    <Grid2 p={'3%'} pb={0}>
      <iframe
        src={resumeUrl}
        title="Candidate's Resume"
        width="98%"
        height={'620px'}
        style={{
          borderRadius: '8px',
          backgroundColor: '#f8f8ff',
          color: '#006d4b',
          margin: 'auto 0',
        }}
      >
        This browser does not support PDFs. Please download the PDF to view it:{' '}
        <a href={resumeUrl}>Download PDF</a>.
      </iframe>
    </Grid2>
  );
};

export default ResumeIframe;
