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

const DownloadMenuFull: FC<any> = ({
  contentData,
  saveProps,
  downloadProps,
  snackbar,
  dispatch,
}) => {
  return (
    <Container>
      <SaveNameInput
        contentData={contentData && contentData}
        saveProps={saveProps}
        snackbar={snackbar}
        isFull={false}
        dispatch={dispatch}
      />
      <Divider orientation="vertical" flexItem />
      <DownloadDropdown
        contentData={contentData}
        downloadProps={downloadProps}
        snackbar={snackbar}
        isFull={false}
        dispatch={dispatch}
      />
    </Container>
  );
};

export default DownloadMenuFull;
