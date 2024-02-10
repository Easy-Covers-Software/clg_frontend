import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

const Container = styled(Grid2)`
  width: 100%;
  // text-overflow: ellipsis;
`;

const DropdownPreference = ({ type, details }) => {
  return (
    <Container>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls={`${type}-content`}
          id={type}
          style={{ border: '1px solid #13d0b7' }}
        >
          <Typography>{type}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{details}</Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default DropdownPreference;
