import { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useGenerationContext } from "@/context/GenerationContext";
import {
  GenerateButton,
  GenerateButtonDouble,
} from "../GenerationSetup.styles";

const Container = styled(Grid)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2%;
`;

interface ButtonSetProps {
  user: any;
  num_gpt3_generations_available: number;
  num_gpt4_generations_available: number;
  disabled: boolean;
  handleGenerateCoverLetter?: (model: string) => void;
  dispatch: any;
}

const getModelAvailable = (
  user,
  num_gpt3_generations_available,
  num_gpt4_generations_available
) => {
  if (user === undefined || user === null) {
    return "-1";
  } else if (num_gpt3_generations_available > 0) {
    return "3";
  } else if (num_gpt4_generations_available > 0) {
    return "4";
  } else {
    return "0";
  }
};

const ButtonSet = (props: ButtonSetProps) => {
  const {
    user,
    num_gpt3_generations_available,
    num_gpt4_generations_available,
    disabled,
    handleGenerateCoverLetter,
    dispatch,
  } = props;

  if (
    num_gpt3_generations_available > 0 &&
    num_gpt4_generations_available > 0
  ) {
    return (
      <>
        <Tooltip
          sx={{
            fontSize: "1.2rem",
          }}
          title={
            disabled
              ? "The Job Posting and Personal Details Sections are Required for Generation"
              : ""
          }
        >
          <Grid
            p={0}
            m={0}
            display={"flex"}
            width={"100%"}
            bgcolor={"clear"}
            mt={1}
          >
            <GenerateButtonDouble
              onClick={() => {
                dispatch({
                  type: "SET_UPDATE_USER",
                });

                console.log("Refresh user right before??");

                handleGenerateCoverLetter("3");
              }}
              disabled={disabled}
            >
              Generate GPT-3
            </GenerateButtonDouble>
          </Grid>
        </Tooltip>

        <Tooltip
          style={{
            fontSize: "2rem",
          }}
          title={
            disabled
              ? "The Job Posting and Personal Details Sections are Required for Generation"
              : ""
          }
        >
          <Grid p={0} m={0} display={"flex"} width={"100%"} mt={1}>
            <GenerateButtonDouble
              onClick={() => handleGenerateCoverLetter("4")}
              disabled={disabled}
            >
              Generate GPT-4
            </GenerateButtonDouble>
          </Grid>
        </Tooltip>
      </>
    );
  } else {
    return (
      <>
        <Tooltip
          style={{
            fontSize: "1.2rem",
          }}
          title={
            disabled
              ? "The Job Posting and Personal Details Sections are Required for Generation"
              : ""
          }
        >
          <Grid p={0} m={0} display={"flex"} width={"100%"}>
            <GenerateButton
              disabled={disabled}
              onClick={() => {
                dispatch({
                  type: "SET_MOBILE_MODE",
                  payload: "results",
                });
                handleGenerateCoverLetter(
                  getModelAvailable(
                    user,
                    num_gpt3_generations_available,
                    num_gpt4_generations_available
                  )
                );
              }}
            >
              Generate
            </GenerateButton>
          </Grid>
        </Tooltip>
      </>
    );
  }
};

export default function GenerateButtons() {
  const { state, generateCoverLetter, getJobDetails } = useGenerationContext();
  const {
    jobPosting,
    resume,
    freeText,
    additionalDetails,
    disableGenerateButton,
    loadingCoverLetter,
  } = state;

  const {
    state: authState,
    dispatch,
    updateSnackbar,
    handleSnackbarClose,
    toggleSettingsIsOpen,
    toggleLoginIsOpen,
  } = useAuth();
  const { user, accessLevel, isSettingsOpen } = authState;

  // Cover Letter handler
  const handleGenerateCoverLetter = async (model: string) => {
    dispatch({
      type: "SET_UPDATE_USER",
    });
    console.log("Refresh user right before??", accessLevel);

    if (model === "-1") {
      toggleLoginIsOpen();
      updateSnackbar(
        true,
        "error",
        "You must be logged in to generate a cover letter."
      );
      return;
    }

    if (model === "0") {
      toggleSettingsIsOpen();
      updateSnackbar(
        true,
        "error",
        "You have no generations available. Upgrade to generate."
      );
      return;
    }

    try {
      const detailsResponse = await getJobDetails();
      const status = await generateCoverLetter(
        jobPosting,
        resume,
        freeText,
        additionalDetails,
        model
      );

      if (status) {
        dispatch({
          type: "SET_UPDATE_USER",
          payload: authState.updateUser,
        });
      }
    } catch (err) {
      console.error(err);
      // Handle error, for example by showing an error message in the UI
      // update a error variable in context
      updateSnackbar(
        true,
        "error",
        "Error generating cover letter. Please try again. If the problem persists, please contact us."
      );
      return;
    }
  };

  useEffect(() => {
    if (
      accessLevel?.num_gpt3_generations_available > 0 ||
      accessLevel?.num_gpt4_generations_available > 0
    ) {
      if (isSettingsOpen) {
        handleSnackbarClose();
        toggleSettingsIsOpen();
        updateSnackbar(
          true,
          "success",
          "Detected new credits to your account. You will now be able to generate your cover letter."
        );
      }
    }
  }, [accessLevel]);

  return (
    <Container>
      <ButtonSet
        user={user}
        num_gpt3_generations_available={
          accessLevel?.num_gpt3_generations_available
        }
        num_gpt4_generations_available={
          accessLevel?.num_gpt4_generations_available
        }
        disabled={disableGenerateButton}
        handleGenerateCoverLetter={handleGenerateCoverLetter}
        dispatch={dispatch}
      />
    </Container>
  );
}
