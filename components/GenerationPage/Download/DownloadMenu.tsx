import { FC } from 'react';

import Divider from '@mui/material/Divider';
import { SaveNameInput, DownloadDropdown } from './components';
import { Container } from './DownloadMenu.styles';

import { Snackbar } from '@/Types/Auth.types';

interface Props {
  coverLetterData: any;
  saveProps: any;
  downloadProps: any;
  snackbar: Snackbar;
}

const DownloadMenu: FC<any> = ({ contentData, snackbar, dispatch }) => {
  return (
    <Container>
      <SaveNameInput
        contentData={contentData && contentData}
        snackbar={snackbar}
        dispatch={dispatch}
        isFull={false}
      />
      <Divider orientation="vertical" flexItem />
      <DownloadDropdown
        contentData={contentData}
        snackbar={snackbar}
        dispatch={dispatch}
        isFull={false}
      />
    </Container>
  );
};

export default DownloadMenu;
