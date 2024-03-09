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

import { CandidateListItem } from '@/Types/CandidatesSection.types';
import { JobPostingListObject } from '@/Types/JobPostingsSection.types';
import { PhoneCall } from '@/Types/TranscriptionSection.types';

const EmptyListGrid = styled(Grid)`
  text-align: center;
  padding: 1%;
  margin-top: 5%;
`;

interface SavedListProps {
  listType: string;
  items: CandidateListItem[] | JobPostingListObject[] | PhoneCall[];
  search: string;
  loading: boolean;
  selected: CandidateListItem | JobPostingListObject | PhoneCall;
  handleNewSelection: (
    item: CandidateListItem | JobPostingListObject | PhoneCall
  ) => () => void;
  handleSearchChange: (searchValue: string) => void;
  handleDelete: (id: string) => void;
}

const SavedList: FC<any> = ({
  listType,
  isSubPage,
  items,
  search,
  loading,
  selected,
  handleNewSelection,
  handleSearchChange,
  handleDelete,
}) => {
  //== Auth State ==//
  const { state: authState } = useAuth();
  const { loggedInProps, confirmDialog } = authState;

  console.log('selected')
  console.log(isSubPage)
  


  useEffect(() => {
    // Trigger only if isSubPage is true, there are items, and the first item isn't already selected
    if (items && isSubPage && items.length > 0) {
      console.log('corrrrrrrrrrrrrrrrrrrect')
      // Ensure handleNewSelection is called in a way that doesn't immediately invoke a re-render
      // This might require adjusting handleNewSelection to return a function that can be called here without causing immediate state updates
      const selectFirstItem = handleNewSelection(items[0]);
      selectFirstItem(); // This is the correct way to call the function returned by handleNewSelection
    }
  }, [isSubPage, items, selected]);

  //== Helper Functions ==//
  const openDeleteDialog = () => {
    confirmDialog.openAlertDialogConfirm(
      true,
      'Delete Cover Letter',
      'Are you sure you want to delete this cover letter?',
      'Delete'
    );
  };

  const determineListHeader = () => {
    if (listType === 'jobPostings') {
      return 'All Available Job Postings';
    } else if (listType === 'profiles') {
      return 'Saved Profiles';
    } else if (listType === 'phoneCalls') {
      return 'Saved Phone Calls';
    } else if (listType === 'candidates') {
      return 'All Candidates';
    }
  };

  //== Hooks ==//
  useEffect(() => {
    if (confirmDialog.didConfirmAlert) {
      handleDelete(selected?.id);
      confirmDialog.updateDidConfirmAlert(false);
    }
  }, [confirmDialog.didConfirmAlert]);

  //== Render Functions ==//
  const renderListItems = (
    item: CandidateListItem | JobPostingListObject | PhoneCall,
    i: number
  ) => {
    const labelId = `radio-list-label-${item.save_name}-${i}`;

    return (
      <ListItem
        key={labelId}
        style={{
          borderBottom: '0.4px solid #006D4B',
          paddingLeft: '1.5%',
          backgroundColor: 'white',
        }}
        secondaryAction={
          selected?.id === item.id && (
            <IconButton
              edge="end"
              aria-label="comments"
              onClick={(e) => {
                e.stopPropagation();
                openDeleteDialog();
              }}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          )
        }
        disablePadding
        onClick={handleNewSelection(item)}
      >
        <IconButton disableRipple>
          <Radio
            edge="start"
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
          // secondary={item.company_name}
        />
      </ListItem>
    );
  };

  const renderEmptyListDisplay = () => {
    // Loading
    if (loading) return <CircularProgress />;

    // Not signed in
    if (loggedInProps.user === null || loggedInProps.user.is_active === false) {
      return (
        <List className="empty-letters-list">
          <EmptyListGrid>
            <Typography width={'90%'} m={'auto'}>
              Not signed in. Sign in to save cover letters and view them here.
            </Typography>
          </EmptyListGrid>
        </List>
      );
    }

    // Empty list
    if (
      // filteredItems?.length === 0 &&
      items?.length === 0 &&
      search === ''
    ) {
      return (
        <List className="empty-letters-list">
          <EmptyListGrid>
            <Typography width={'90%'} m={'auto'}>
              None Saved! Generate a cover letter and save to view on this page.
            </Typography>
          </EmptyListGrid>
        </List>
      );
    }

    // Empty search
    if (items?.length === 0 && search !== '') {
      return (
        <List className="empty-letters-list">
          <EmptyListGrid>
            <Typography width={'90%'} m={'auto'}>
              No cover letters found with that name. Try another search.
            </Typography>
          </EmptyListGrid>
        </List>
      );
    }

    return false;
  };

  useEffect(() => {
    // Ensure there are items and no item is currently selected
    if (items?.length > 0) {
      if (selected === null || !('name' in selected)) {
        // Call the handleNewSelection with the first item
        console.log('hitting this cooooooode');
        console.log(items[0]);
        handleNewSelection(items[0]);
      }
    } //else if selected is not null, make sure the item in the list is still checked and selected
  }, [items, selected, handleNewSelection]);

  const emptyDisplay = renderEmptyListDisplay();

  if (emptyDisplay) return emptyDisplay;

  return (
    <SubContainer>
      <Typography className="saved-header">{determineListHeader()}</Typography>
      <SearchAndFilter
        type={'full'}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <List className="saved-letters-list">{items?.map(renderListItems)}</List>
    </SubContainer>
  );
};

export default SavedList;
