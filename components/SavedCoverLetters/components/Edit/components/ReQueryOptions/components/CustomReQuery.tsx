import React, { useState } from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { UnSelectedButton } from "@/components/Global/Global";
import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";
import { useAuth } from "@/context/AuthContext";

import { CustomReQueryStyledComponents } from "../ReQueryOptions.styles";
const { CustomReQueryField, SubmitButton } = CustomReQueryStyledComponents;

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  // width: 14vw;
  margin-top: 10%;
  // padding: 0 20%;

  @media screen and (min-width: 0px) and (max-width: 700px) {
    padding: 0 1%;
  }

  @media screen and (min-width: 600px) and (max-width: 700px) {
  }

  @media screen and (min-width: 700px) and (max-width: 800px) {
    padding: 0 10%;
  }

  @media screen and (min-width: 800px) and (max-width: 900px) {
    padding: 0 12%;
  }

  @media screen and (min-width: 900px) and (max-width: 950px) {
    padding: 0 14%;
  }

  @media screen and (min-width: 950px) and (max-width: 1000px) {
    padding: 0 15%;
  }

  @media screen and (min-width: 1000px) and (max-width: 1100px) {
    padding: 0 16%;
  }

  @media screen and (min-width: 1100px) and (max-width: 1200px) {
  }

  @media screen and (min-width: 1200px) and (max-width: 1300px) {
  }
`;

const SubContainer = styled(Grid)`
  height: 100%;
  margin-bottom: 36px;
  width: 14vw;
  // padding: 0 20%;

  @media screen and (min-width: 0px) and (max-width: 700px) {
    padding: 0 1%;
  }

  @media screen and (min-width: 600px) and (max-width: 700px) {
  }

  @media screen and (min-width: 700px) and (max-width: 800px) {
    padding: 0 10%;
  }

  @media screen and (min-width: 800px) and (max-width: 900px) {
    padding: 0 12%;
  }

  @media screen and (min-width: 900px) and (max-width: 950px) {
    padding: 0 14%;
  }

  @media screen and (min-width: 950px) and (max-width: 1000px) {
    padding: 0 15%;
  }

  @media screen and (min-width: 1000px) and (max-width: 1100px) {
    padding: 0 16%;
  }

  @media screen and (min-width: 1100px) and (max-width: 1200px) {
  }

  @media screen and (min-width: 1200px) and (max-width: 1300px) {
  }
`;

export default function CustomReQuery() {
  const {
    state: authState,
    dispatch: authDispatch,
    updateSnackbar,
    toggleSettingsIsOpen,
  } = useAuth();
  const { state, dispatch, makeCustomAdjustment } =
    useSavedCoverLettersContext();

  const { customAdjustment, disableRequery } = state;

  const [placeholder, setPlaceholder] = useState(
    "Anything you want to change about the cover letter..."
  );

  const handleChange = (e) => {
    // setValue(e.target.value);
    dispatch({ type: "SET_CUSTOM_ADJUSTMENT", payload: e.target.value });
  };

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = () => {
    if (customAdjustment === "") {
      setPlaceholder("Anything you want to change about the cover letter...");
    }
  };

  const handleCustomAdjustment = async () => {
    if (authState.accessLevel.num_adjustments_available === 0) {
      toggleSettingsIsOpen();
      updateSnackbar(
        true,
        "error",
        "You have no adjustments available. Please upgrade your account to make more adjustments."
      );
      return;
    }

    try {
      const response = await makeCustomAdjustment();

      if (response) {
        authDispatch({
          type: "SET_UPDATE_USER",
          payload: authState.updateUser,
        });
        updateSnackbar(true, "success", "Adjustment made successfully.");
      } else {
        updateSnackbar(
          true,
          "error",
          "An error occured while making adjustment. Please try again."
        );
      }
    } catch (err) {
      console.log("Error in handleCustomAdjustment");
      console.log(err);
      updateSnackbar(
        true,
        "error",
        "An error occured while making adjustment. Please try again."
      );
    }
  };

  return (
    <Container>
      <SubContainer>
        <Typography className="custom-adjustment-heading">
          Custom Adjustment
        </Typography>
        <CustomReQueryField
          placeholder={placeholder}
          value={customAdjustment}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </SubContainer>

      <SubmitButton onClick={handleCustomAdjustment} disabled={disableRequery}>
        REGENERATE
      </SubmitButton>
    </Container>
  );
}
