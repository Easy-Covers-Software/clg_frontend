import { useState, useEffect, MouseEvent, FC } from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import {
  IconButton,
  Menu,
  Tooltip,
  TextField,
  useMediaQuery,
} from '@mui/material';

import { useSavedCoverLettersContext } from '@/context/SavedCoverLettersContext';
import { useAuth } from '@/context/AuthContext';

import { CoverLetterApiMethods } from '@/Utils/utils';
const { saveCoverLetter } = CoverLetterApiMethods;

import {
  APIResponse,
  SaveCoverLetterApiResponse,
} from '@/Types/ApiResponse.types';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { UnSelectedButton } from '@/components/Global/Global';

import { Snackbar } from '@/Types/AuthContext.types';
import { CoverLetterData, SaveProps } from '@/Types/GenerationContext.types';

interface Props {
  coverLetterData: CoverLetterData;
  saveProps: SaveProps;
  snackbar: Snackbar;
}

const SaveNameInput: FC<Props> = ({ coverLetterData, saveProps, snackbar }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    saveProps?.toggleIsSavedDropdownOpen();
  };

  const handleClose = () => {
    setAnchorEl(null);
    saveProps?.toggleIsSavedDropdownOpen();
  };

  const handleSave = async () => {
    console.log('PRE SAVE PARTS', coverLetterData?.editedCoverLetterParts);

    const response: APIResponse<SaveCoverLetterApiResponse> =
      await saveCoverLetter(
        coverLetterData?.coverLetterId,
        coverLetterData?.editedCoverLetterParts,
        coverLetterData?.saveName
      );

    if (response.data) {
      snackbar.updateSnackbar(
        true,
        'success',
        `Success! Cover letter saved as: ${coverLetterData?.saveName}`
      );
    } else {
      snackbar.updateSnackbar(
        true,
        'error',
        `Error saving cover letter: ${response.error}`
      );
    }
  };

  const handleInputChange = (event) => {
    coverLetterData?.updateSaveName(event.target.value);
  };

  const shouldDisable = (coverLetterData: CoverLetterData) => {
    if (coverLetterData?.coverLetterHtml !== '') {
      return false;
    } else {
      return true;
    }
  };

  const disabled = shouldDisable(coverLetterData);

  return (
    <>
      <Tooltip title='Save'>
        <span>
          <IconButton
            onClick={handleClick}
            disableRipple
            disableFocusRipple
            style={{
              margin: isMobile ? 'auto' : 'none',
            }}
            disabled={disabled}
          >
            <SaveOutlinedIcon fontSize='medium' />
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={saveProps?.isSavedDropdownOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          marginTop: '1%',
        }}
      >
        <Grid m={'3%'}>
          <TextField
            variant='outlined'
            margin='dense'
            defaultValue={coverLetterData.saveName}
            onChange={handleInputChange}
          />
          <UnSelectedButton onClick={handleSave}>Save</UnSelectedButton>
        </Grid>
      </Menu>
    </>
  );
};

export default SaveNameInput;
