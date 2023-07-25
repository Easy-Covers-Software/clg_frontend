import * as React from "react";
import { styled as muiStyled, alpha } from "@mui/material/styles";
import styled from "@emotion/styled";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import FilterDropdown from "./FilterDropdown";

const Search = muiStyled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: theme.palette.primary.main,
  backgroundColor: "white",
  color: "#006D4B",
  border: "1px solid #13D0B7",
  "&:hover": {
    // backgroundColor: alpha(theme.palette.grey[00], 0.18),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(3),
  },
}));

const SearchIconWrapper = muiStyled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#006D4B",
}));

const Container = styled(Grid)`
  width: 100%;

  display: flex;
  padding: 0;
  margin: 0;
`;

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
  color: "#006D4B",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "#006D4B",
  },
}));

export default function SearchAndFilter() {
  return (
    // <Container>
    <Search>
      <SearchIconWrapper>
        {" "}
        <SearchIcon />{" "}
      </SearchIconWrapper>
      <StyledInputBase
        sx={{ color: "white" }}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>

    //   <FilterDropdown />
    // </Container>
  );
}
