import Divider from "@mui/material/Divider";
import SaveNameInput from "./SaveNameInput";
import DownloadDropdown from "./DownloadDropdown";
import { DownloadOptionsMenuStyledComponents } from "../CoverLetterResults.styles";
const { Container } = DownloadOptionsMenuStyledComponents;

export default function DownloadOptionsMenu() {
  return (
    <Container>
      <SaveNameInput />
      <Divider orientation="vertical" flexItem />
      <DownloadDropdown />
    </Container>
  );
}
