import React, { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { Box, Typography, Radio } from '@mui/material';
import SearchAndFilter from '../../SavedList/components/SearchAndFilter';

interface JobPosting {
  id: number;
  title: string;
  company: string;
}

interface JobPostingSelectionProps {
  jobPostings: JobPosting[];
}

const JobPostingSelectionDataGrid: any = ({
  jobPostings,
  selected,
  search,
  handleSelectionChange,
  updateSearch,
}) => {
  const [selectedJobPostingId, setSelectedJobPostingId] = useState<
    number | null
  >(selected?.id || null);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '',
      renderCell: (params: GridRenderCellParams) => (
        <Radio
          checked={selectedJobPostingId === params.row.id}
          onChange={() => handleSelectionChange(params.row)}
          sx={{
            color:
              selectedJobPostingId === params.row.id ? '#006D4B' : '#13d0b7',
            '&.Mui-checked': {
              color: '#006D4B', // or any other color
            },
          }}
        />
      ),
      flex: 1,
      sortable: false,
    },
    { field: 'job_title', headerName: 'Job Title', flex: 5 },
    { field: 'company_name', headerName: 'Company', flex: 5 },
  ];

  return (
    <Box
      pt={1}
      sx={{
        width: '94%',
        margin: 'auto',
        overflowY: 'hidden',
        overflowX: 'scroll',
      }}
    >
      {/* <SearchAndFilter
        search={search}
        handleSearchChange={updateSearch}
        type={'small'}
      /> */}
      <DataGrid
        rows={jobPostings ? jobPostings : []}
        columns={columns}
        autoHeight
        hideFooter
        onRowClick={(params) => handleSelectionChange(params.row)}
        getRowId={(row) => row.id}
        onRowSelectionModelChange={(
          newSelectionModel: GridRowSelectionModel
        ) => {
          setSelectedJobPostingId(newSelectionModel[0] as number);
        }}
        rowSelectionModel={selectedJobPostingId ? [selectedJobPostingId] : []}
        sx={{
          color: '#006D4B',
          border: '1px solid #006D4B',
        }}
      />
    </Box>
  );
};

export default JobPostingSelectionDataGrid;
