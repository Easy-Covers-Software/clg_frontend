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

const DownloadMenu: FC<Props> = ({
  coverLetterData,
  saveProps,
  downloadProps,
  snackbar,
}) => {
  return (
    <Container>
      <SaveNameInput
        coverLetterData={coverLetterData}
        saveProps={saveProps}
        snackbar={snackbar}
      />
      <Divider orientation='vertical' flexItem />
      <DownloadDropdown
        coverLetterData={coverLetterData}
        downloadProps={downloadProps}
        snackbar={snackbar}
      />
    </Container>
  );
};

export default DownloadMenu;
