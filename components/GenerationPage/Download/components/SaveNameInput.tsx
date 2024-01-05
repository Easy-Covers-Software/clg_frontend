import { useState, useEffect, MouseEvent, FC } from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import {
  IconButton,
  Menu,
  Tooltip,
  TextField,
  useMediaQuery,
} from '@mui/material';

import { useAuth } from '@/context/AuthContext';

import { saveCoverLetter } from '@/api/GenerationMethods';

import {
  APIResponse,
  SaveCoverLetterApiResponse,
} from '@/Types/ApiResponse.types';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { UnSelectedButton } from '@/components/Global/Global';

import { Snackbar } from '@/Types/Auth.types';

interface Props {
  coverLetterData: any;
  saveProps: any;
  snackbar: Snackbar;
}

const SaveNameInput: FC<any> = ({
  contentData,
  snackbar,
  dispatch,
  saveProps,
  isFull,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (isFull) {
      saveProps?.toggleIsSavedDropdownOpen();
    } else {
      dispatch({
        type: 'UPDATE_GENERATION_RESULTS_STATE',
        payload: { isSavedDropdownOpen: true },
      });
    }
    // }
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (isFull) {
      saveProps?.toggleIsSavedDropdownOpen();
    } else {
      dispatch({
        type: 'UPDATE_GENERATION_RESULTS_STATE',
        payload: { isSavedDropdownOpen: false },
      });
    }
  };

  const handleSave = async () => {
    console.log('PRE SAVE PARTS', contentData?.editedContent);

    const response: APIResponse<SaveCoverLetterApiResponse> =
      await saveCoverLetter(
        contentData?.id,
        contentData?.editedCoverLetterParts,
        contentData?.saveName
      );

    if (response.data) {
      snackbar.updateSnackbar(
        true,
        'success',
        `Success! Cover letter saved as: ${contentData?.saveName}`
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
    contentData?.updateSaveName(event.target.value);
  };

  const shouldDisable = (content: any) => {
    if (content?.contentHtml !== '') {
      return false;
    } else {
      return true;
    }
  };

  const disabled = shouldDisable(contentData);

  return (
    <>
      <Tooltip title="Save">
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
            <SaveOutlinedIcon fontSize="medium" />
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={
          isFull
            ? saveProps?.isSavedDropdownOpen
            : contentData?.isSavedDropdownOpen
        }
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
            variant="outlined"
            margin="dense"
            defaultValue={contentData?.saveName}
            onChange={handleInputChange}
          />
          <UnSelectedButton onClick={handleSave}>Save</UnSelectedButton>
        </Grid>
      </Menu>
    </>
  );
};

export default SaveNameInput;
