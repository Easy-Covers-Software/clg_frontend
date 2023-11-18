import React, { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { Box, Typography, Radio } from '@mui/material';
import SearchAndFilter from '../SavedList/components/SearchAndFilter';

interface CandidateProfile {
  id: number;
  title: string;
  company: string;
}

interface CandidateSelectionProps {
  candidates: any[];
}

const CandidateProfileSelection: any = ({
  candidates,
  selected,
  search,
  handleSelectionChange,
  updateSearch,
}) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
    selected?.id || null
  );

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '',
      renderCell: (params: GridRenderCellParams) => (
        <Radio
          checked={selectedCandidateId === params.row.id}
          onChange={() => {
            handleSelectionChange(params.row);
          }}
          sx={{
            color: selected?.id === params.row.id ? '#006D4B' : '#13d0b7',
            '&.Mui-checked': {
              color: '#006D4B', // or any other color
            },
          }}
        />
      ),
      flex: 1,
      sortable: false,
    },
    { field: 'name', headerName: 'Name', flex: 5 },
    { field: 'current_title', headerName: 'Current Title', flex: 5 },
    { field: 'current_employer', headerName: 'Current Company', flex: 5 },
  ];

  return (
    <Box pt={1} sx={{ width: '94%', margin: 'auto', overflowY: 'hidden' }}>
      {/* <SearchAndFilter
        search={search}
        handleSearchChange={updateSearch}
        type={'small'}
      /> */}

      <DataGrid
        rows={candidates ? candidates : []}
        columns={columns}
        hideFooter
        onRowClick={(params) => handleSelectionChange(params.row)}
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectedCandidateId(newSelectionModel[0] as number);
        }}
        rowSelectionModel={selectedCandidateId ? [selectedCandidateId] : []}
        sx={{
          color: '#006D4B',
          border: '1px solid #006D4B',
          '& .MuiSvgIcon-root': {
            color: '#006D4B',
          },
        }}
      />
    </Box>
  );
};

export default CandidateProfileSelection;
