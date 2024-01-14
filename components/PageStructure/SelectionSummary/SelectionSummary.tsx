import { FC } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Container } from './SelectionSummary.styles';
import MainContent from './components/MainContent';
import SupplementalInfo from './components/SupplementalInfo';

interface Props {
  summaryDetails: any;
  checked: boolean | null | any;
  handleChange: null | ((event: React.ChangeEvent<HTMLInputElement>) => void);
}

const SelectionSummary: FC<Props> = ({
  summaryDetails,
  checked,
  handleChange,
}) => {
  const { state } = useAuth();
  const { trackers } = state;

  return (
    <Container>
      <MainContent summaryDetails={summaryDetails} />

      <SupplementalInfo
        page={trackers.page}
        summaryDetails={summaryDetails}
        checked={checked}
        handleChange={handleChange}
      />
    </Container>
  );
};

export default SelectionSummary;
