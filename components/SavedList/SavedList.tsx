import { FC, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useAuth } from '@/context/AuthContext';
import { CircularProgress } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import SearchAndFilter from './components/SearchAndFilter';

import { SubContainer } from './SavedList.styles';

import styled from '@emotion/styled';

import { CoverLetterApiMethods } from '@/Utils/utils';
const { deleteSavedCoverLetter, fetchSavedCoverLetters } =
  CoverLetterApiMethods;

const EmptyListGrid = styled(Grid)`
  text-align: center;
  padding: 1%;
  margin-top: 5%;
`;

interface SavedListProps {
  savedItems: any[];
  search: string;
  loading: boolean;
  selected: any;
  listType: string;
  handleToggle: (selectedItem: any) => () => void;
  handleSearchChange: (e: any) => void;
}

const SavedList: FC<SavedListProps> = ({
  savedItems,
  search,
  loading,
  selected,
  listType,
  handleToggle,
  handleSearchChange,
}) => {
  const { state: authState } = useAuth();
  const { loggedInProps, trackers, snackbar, confirmDialog } = authState;

  const handleDelete = () => {
    confirmDialog.openAlertDialogConfirm(
      true,
      'Delete Cover Letter',
      'Are you sure you want to delete this cover letter?',
      'Delete'
    );
  };

  useEffect(() => {
    if (confirmDialog.didConfirmAlert) {
      confirmDialog.confirmDelete();
    }
  }, [confirmDialog.didConfirmAlert]);

  const renderCoverLetterItem = (item, i) => {
    const labelId = `radio-list-label-${item.save_name}-${i}`;

    return (
      <ListItem
        key={labelId}
        style={{ borderBottom: '0.4px solid #006D4B' }}
        secondaryAction={
          selected?.id === item.id && (
            <IconButton
              edge='end'
              aria-label='comments'
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          )
        }
        disablePadding
        onClick={handleToggle(item)}
      >
        <IconButton disableRipple>
          <Radio
            edge='start'
            checked={selected?.id === item.id}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            style={{ color: '#006D4B' }}
          />
        </IconButton>
        <ListItemText
          id={item.id}
          primary={item.save_name}
          secondary={item.company_name}
          // primary={item.save_name?.substring(0, 84) + '...'}
          // secondary={item.company_name && item.company_name?.substring(0, 24)}
        />
      </ListItem>
    );
  };

  const renderEmptyListDisplay = () => {
    // Loading
    if (loading) return <CircularProgress />;

    // Not signed in
    if (!loggedInProps.isAuthenticated) {
      return (
        <List className='saved-letters-list'>
          <EmptyListGrid>
            <Typography>
              Not signed in. Sign in to save cover letters and view them here.
            </Typography>
          </EmptyListGrid>
        </List>
      );
    }

    // Empty list
    if (
      // filteredItems?.length === 0 &&
      savedItems?.length === 0 &&
      search === ''
    ) {
      return (
        <List className='saved-letters-list'>
          <EmptyListGrid>
            <Typography>
              None Saved! Generate a cover letter and save to view on this page.
            </Typography>
          </EmptyListGrid>
        </List>
      );
    }

    // Empty search
    if (savedItems?.length === 0 && search !== '') {
      return (
        <List className='saved-letters-list'>
          <EmptyListGrid>
            <Typography>
              No cover letters found with that name. Try another search.
            </Typography>
          </EmptyListGrid>
        </List>
      );
    }

    return false;
  };

  const determineListHeader = () => {
    if (listType === 'coverLetters') {
      return 'Saved Cover Letters';
    } else if (listType === 'profiles') {
      return 'Saved Profiles';
    } else if (listType === 'phoneCalls') {
      return 'Saved Phone Calls';
    } else if (listType === 'candidates') {
      return 'Saved Candidates';
    }
  };

  const emptyDisplay = renderEmptyListDisplay();
  if (emptyDisplay) return emptyDisplay;

  return (
    <SubContainer>
      <Typography className='saved-header'>{determineListHeader()}</Typography>
      <SearchAndFilter
        search={search}
        handleSearchChange={handleSearchChange}
        type={'full'}
      />
      <List className='saved-letters-list'>
        {savedItems?.map(renderCoverLetterItem)}
      </List>
    </SubContainer>
  );
};

export default SavedList;
