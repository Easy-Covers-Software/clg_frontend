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
import { DownloadProps } from '@/Types/GenerationContext.types';
import { Snackbar } from '@/Types/AuthContext.types';

import { Helpers, DownloadMethods } from '@/Utils/utils';
const { generatePDF, generateDOCX } = DownloadMethods;
const { determineCoverLetterParts, determineCoverLetterHtml } = Helpers;

import { CoverLetterData } from '@/Types/GenerationContext.types';

interface Props {
  coverLetterData: CoverLetterData;
  downloadProps: DownloadProps;
  snackbar: Snackbar;
}

const DownloadDropdown: FC<any> = ({
  contentData,
  downloadProps,
  snackbar,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [downloadMenuAnchor, setDownloadMenuAnchor] =
    useState<null | HTMLElement>(null);

  const handleDownload = (event: MouseEvent<HTMLButtonElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
    downloadProps.toggleIsDownloadDropdownOpen();
  };

  const handleCloseDownload = () => {
    setDownloadMenuAnchor(null);
    downloadProps.toggleIsDownloadDropdownOpen();
  };

  const handlePDFDownload = () => {
    const pdf = generatePDF(
      determineCoverLetterParts(contentData),
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
      determineCoverLetterHtml(contentData),
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

  const shouldDisable = (content: CoverLetterData) => {
    if (contentData?.contentHtml) {
      return false;
    } else {
      return true;
    }
  };

  const disabled = shouldDisable(contentData);

  return (
    <>
      <Tooltip title='Download'>
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
        id='basic-menu'
        anchorEl={downloadMenuAnchor}
        open={downloadProps?.isDownloadDropdownOpen}
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
