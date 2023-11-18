import { FC } from 'react';

import Divider from '@mui/material/Divider';
import { SaveNameInput, DownloadDropdown } from '../Download/components';
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

const DownloadMenu: FC<any> = ({
  coverLetterData,
  contentData,
  saveProps,
  downloadProps,
  snackbar,
}) => {
  return (
    <Container>
      <SaveNameInput
        contentData={contentData && contentData}
        saveProps={saveProps}
        snackbar={snackbar}
      />
      <Divider orientation='vertical' flexItem />
      <DownloadDropdown
        contentData={contentData}
        downloadProps={downloadProps}
        snackbar={snackbar}
      />
    </Container>
  );
};

export default DownloadMenu;
