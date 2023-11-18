//== Job Details ==//
type SummaryHeaderProps = {
  id: string;
  mainTitle: string;
  secondaryTitle: string;
  supplementaryInfo: number | string;
  loading: boolean;
  updateMainTitle: (title: string) => void;
  updateSecondaryTitle: (title: string) => void;
  updateSupplementalInfo: (info: number) => void;
  toggleLoading: () => void;
};

export type { SummaryHeaderProps };
