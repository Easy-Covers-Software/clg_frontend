import { FC } from 'react';

import Divider from '@mui/material/Divider';
import { SaveNameInput, DownloadDropdown } from './components';
import { Container } from './DownloadMenu.styles';

import {
  CoverLetterData,
  SaveProps,
  DownloadProps,
} from '@/Types/GenerationContext.types';

import { Snackbar } from '@/Types/AuthContext.types';

interface Props {
  coverLetterData: CoverLetterData;
  saveProps: SaveProps;
  downloadProps: DownloadProps;
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
        isFull={true}
        dispatch={dispatch}
      />
      <Divider orientation="vertical" flexItem />
      <DownloadDropdown
        contentData={contentData}
        downloadProps={downloadProps}
        snackbar={snackbar}
        isFull={true}
        dispatch={dispatch}
      />
    </Container>
  );
};

export default DownloadMenuFull;
