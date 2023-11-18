import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import { DataGrid } from '@mui/x-data-grid';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

const Container = styled(Grid2)`
  padding: 0;
`;

const capitalizeFirstLetter = (string) => {
  return string
    .replace(/_/g, ' ') // Replace all underscores with spaces
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const JobInformationAccordion = ({ jobPosting }) => {
  const sections = {
    General: ['job_title', 'company_name', 'full_details'],
    JobDetails: [
      'urgency',
      'salary',
      'qualifications',
      'experience_required',
      'location',
      'job_type',
      'seniority_level',
      'specializations',
      'job_duration',
      'work_hours',
      'shifts',
      'payment_frequency',
    ],
    CompanyDetails: [
      'currency',
      'city_location',
      'address',
      'remote',
      'relocation',
      'technical_skills',
      'soft_skills',
      'certifications',
      'fields_of_study',
      'education_institution_requirements',
      'gpa',
      'previous_titles',
    ],
    AdditionalDetails: [
      'daily_tasks',
      'team_interaction',
      'reporting_structure',
      'travel',
      'company_size',
      'growth_oppurtunities',
      'company_type',
      'company_values',
      'work_life_balance',
      'perks',
      'health_benefits',
      'retirement_benefits',
      'stock_options',
      'vacation_time',
    ],
  };

  const [expanded, setExpanded] = useState<any>(['panel0']);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      const currentIndex = newExpanded.indexOf(panel);

      if (currentIndex === -1) {
        newExpanded.push(panel);
      } else {
        newExpanded.splice(currentIndex, 1);
      }

      return newExpanded;
    });
  };

  const renderDetails = (fields) => {
    const rows = fields.map((field, index) => ({
      id: index,
      key: capitalizeFirstLetter(field.split('_').join(' ')),
      value: jobPosting[field] || 'N/A',
    }));

    const columns: any = [
      {
        field: 'key',
        headerName: '',
        width: 120,
        align: 'center',
      },
      {
        field: 'value',
        headerName: '',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          <Grid2>
            <Typography textAlign={'center'}>{params.value}</Typography>
          </Grid2>
        ),
      },
    ];

    return (
      <Grid2 width={'100%'}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
          getRowHeight={() => 'auto'}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              display: 'none !important',
            },
            backgroundColor: 'white',
          }}
        />
      </Grid2>
    );
  };

  return (
    <Container>
      {Object.entries(sections).map(([sectionTitle, fields], index) => {
        const panelId = `panel${index}`;
        return (
          <Accordion
            key={index}
            expanded={expanded.includes(panelId)}
            onChange={handleChange(panelId)}
            disableGutters
            style={{
              border: '1px solid #13d0b7',
            }}
            sx={{
              '.css-15v22id-MuiAccordionDetails-root': {
                padding: 0,
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
              style={{
                borderBottom: '1px solid #006D4B',
                // backgroundColor: '#f5f5ff',
              }}
            >
              <Typography>{sectionTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{
                backgroundColor: '#f5f5ff',
                maxHeight: '35vh',
                overflow: 'scroll',
              }}
            >
              {renderDetails(fields)}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
};

export default JobInformationAccordion;
