import { FC } from 'react';

import { Typography } from '@mui/material';

import { CircularProgress } from '@mui/material';
import Switch from '@mui/material/Switch';

import { useAuth } from '@/context/AuthContext';

import { Container } from './SelectionSummary.styles';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import { SummaryHeaderProps } from '@/Types/Common.types';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';

import { GreenSwitch } from '@/components/Global/components/GreenSwitch';
import MainContent from './components/MainContent';
import SupplementalInfo from './components/SupplementalInfo';

interface Props {
  summaryDetails: any;
  checked: boolean | null | any;
  handleChange: null | ((event: React.ChangeEvent<HTMLInputElement>) => void);
}

const SelectionSummary: FC<Props> = ({
  summaryDetails,
  checked,
  handleChange,
}) => {
  const { state } = useAuth();
  const { trackers } = state;

  // const getSupplementalInfoHeader = (): string => {
  //   switch (trackers?.page) {
  //     case 'jobPostings':
  //       return 'Date Added';
  //     case 'candidates':
  //       return 'Last Updated';
  //     case 'generate':
  //       return 'Mode';
  //     case 'calls':
  //       return 'Mode';
  //     default:
  //       return '';
  //   }
  // };

  // const formatIsoDateToReadable = (isoDate) => {
  //   if (!isoDate) return false;
  //   const date = new Date(isoDate);
  //   const month = date.getMonth() + 1; // getMonth() returns 0-11
  //   const day = date.getDate();
  //   const year = date.getFullYear();

  //   // Pad single digits with leading zero
  //   const formattedMonth = month < 10 ? `0${month}` : month;
  //   const formattedDay = day < 10 ? `0${day}` : day;

  //   return `${formattedMonth}/${formattedDay}/${year}`;
  // };

  return (
    <Container>
      <MainContent summaryDetails={summaryDetails} />

      <SupplementalInfo
        summaryDetails={summaryDetails}
        checked={checked}
        handleChange={handleChange}
        page={trackers.page}
      />
    </Container>
  );
};

export default SelectionSummary;
