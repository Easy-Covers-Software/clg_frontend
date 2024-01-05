import { CandidateContextBodyState } from "./CandidatesSection.types";


type ListState<T> = {
  listItems: T[];
  filteredListItems: T[];
  selected: T;
  search: string;
  loading: boolean;
  refresh: boolean;
  updateListItems: (list: T[]) => void;
  updateFilteredListItems: (list: T[]) => void;
  updateSelected: (selected: T) => void;
  updateSearch: (search: string) => void;
  toggleLoading: (tof: boolean) => void;
  toggleRefresh: () => void;
};

export type SelectedListItem<T> = {
  selectedListItem: T;
}

type SelectionSummaryState = {
  id: string;
  mainTitle: string;
  secondaryTitle: string;
  supplementaryInfo: number | string;
  loading: boolean; 
}

export type UpdateSelectionSummaryPayload = {
  [K in keyof SelectionSummaryState]?: SelectionSummaryState[K];
}

export type BodyState = {
  selectionSummaryState: SelectionSummaryState;
  updateSelectionSummaryState: (field: any, state: any) => void;
  [key: string]: any; // Consider specifying this more if possible
}

export type StdContext<T> = {
  listState: ListState<T>; // Use the generic type
  selectedListItem: SelectedListItem<T>;
  bodyState: CandidateContextBodyState | null | null;
  updateMode: (mode: string) => void;
  updateSelectionSummaryState: (field: any, state: any) => void;
};