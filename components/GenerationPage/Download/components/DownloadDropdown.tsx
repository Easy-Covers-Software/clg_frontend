import { useState, MouseEvent, FC } from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';

import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';

// import { DownloadProperties } from '../DownloadMenu.types';
import { Snackbar } from '@/Types/Auth.types';

import {
  determineGenerationParts,
  determineGenerationHtml,
} from '@/Utils/utils';

import { generatePDF, generateDOCX } from '@/api/GenerationMethods';

interface Props {
  coverLetterData: any;
  downloadProps: any;
  snackbar: Snackbar;
}

const DownloadDropdown: FC<any> = ({
  contentData,
  snackbar,
  dispatch,
  downloadProps,
  isFull,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [downloadMenuAnchor, setDownloadMenuAnchor] =
    useState<null | HTMLElement>(null);

  const handleDownload = (event: MouseEvent<HTMLButtonElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
    if (isFull) {
      downloadProps?.toggleIsDownloadDropdownOpen();
    } else {
      dispatch({
        type: 'UPDATE_GENERATION_RESULTS_STATE',
        payload: { isDownloadDropdownOpen: true },
      });
    }
  };

  const handleCloseDownload = () => {
    setDownloadMenuAnchor(null);
    if (isFull) {
      downloadProps?.toggleIsDownloadDropdownOpen();
    } else {
      dispatch({
        type: 'UPDATE_GENERATION_RESULTS_STATE',
        payload: { isDownloadDropdownOpen: false },
      });
    }
  };

  const handlePDFDownload = () => {
    const pdf = generatePDF(
      determineGenerationParts(contentData),
      contentData.saveName
    );

    if (pdf) {
      snackbar.updateSnackbar(
        true,
        'success',
        'Successfully Exported Cover Letter as PDF'
      );
    } else {
      snackbar.updateSnackbar(
        true,
        'error',
        'Error Exporting Cover Letter as PDF'
      );
    }
    handleCloseDownload();
  };

  const handleDOCXDownload = async () => {
    const response = await generateDOCX(
      determineGenerationHtml(contentData),
      contentData.saveName
    );

    if (response) {
      snackbar.updateSnackbar(
        true,
        'success',
        `Success! Exported ${contentData.saveName} as Docx.`
      );
    } else {
      snackbar.updateSnackbar(
        true,
        'error',
        `Error exporting ${contentData.saveName} as Docx.`
      );
    }
    handleCloseDownload();
  };

  const shouldDisable = (content: any) => {
    if (contentData?.contentHtml) {
      return false;
    } else {
      return true;
    }
  };

  // const disabled = shouldDisable(contentData);
  const disabled = false;

  return (
    <>
      <Tooltip title="Download">
        <IconButton
          onClick={handleDownload}
          disableRipple
          disableFocusRipple
          style={{
            margin: isMobile ? 'auto' : 'none',
          }}
          disabled={disabled}
        >
          <DownloadForOfflineOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={downloadMenuAnchor}
        open={
          isFull
            ? downloadProps?.isDownloadDropdownOpen
            : contentData?.isDownloadDropdownOpen
        }
        onClose={handleCloseDownload}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
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
        <MenuItem onClick={handlePDFDownload} disableRipple>
          <ListItemIcon>
            <PictureAsPdfOutlinedIcon />
          </ListItemIcon>
          <ListItemText> Download as PDF</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleDOCXDownload} disableRipple>
          <ListItemIcon>
            <PostAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Download as DOCX</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default DownloadDropdown;
