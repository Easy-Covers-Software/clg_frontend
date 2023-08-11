"use client";

import UploadOption from "./UploadOption";

import { useAuth } from "@/context/AuthContext";
import { useGenerationContext } from "@/context/GenerationContext";

import { ResumeUploadStyledComponents } from "../PersonalDetails.styles";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Grid, Tooltip, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
const { Container, DragDropContainer, SelectLastUsedResume } =
  ResumeUploadStyledComponents;

export default function ResumeUploader() {
  const { state: authState } = useAuth();
  const { userResume } = authState;

  const { state, dispatch } = useGenerationContext();
  const { isUsingLastUploadedResume } = state;

  console.log("isUsingLastUploadedResume", isUsingLastUploadedResume);

  const handleUseLastResume = () => {
    dispatch({
      type: "SET_IS_USING_LAST_UPLOADED_RESUME",
      payload: true,
    });
  };

  const handleUnselectLastResume = (event) => {
    event.stopPropagation();
    dispatch({
      type: "SET_IS_USING_LAST_UPLOADED_RESUME",
      payload: false,
    });
  };

  return (
    <Container>
      <DragDropContainer
        style={{
          opacity: isUsingLastUploadedResume ? 0.3 : 1,
        }}
      >
        <UploadOption
          label="Upload From Computer"
          accept=".pdf,.doc,.docx,.txt"
        />
      </DragDropContainer>
      {userResume && userResume !== "" && (
        // {/* //{" "} */}
        <Tooltip title={`Date Uploaded: `}>
          <SelectLastUsedResume
            // component={Paper}
            onClick={handleUseLastResume}
            // isUsingLastUploadedResume={state.isUsingLastUploadedResume}
            sx={{
              opacity: 1,
              elevation: isUsingLastUploadedResume ? 0 : 5,
              boxShadow: isUsingLastUploadedResume
                ? "none"
                : "7px 7px 0px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Grid display={"flex"} alignItems={"center"} gap={"3%"}>
              <PostAddIcon
                fontSize="large"
                // color="#006D4B"
                sx={{
                  paddingBottom: "2%",
                  color: "#006D4B",
                }}
              />
              <Typography
                className="use-last-resume"
                style={{
                  textDecoration: isUsingLastUploadedResume
                    ? "underline"
                    : "none",
                }}
              >
                Use Previous: {userResume}
              </Typography>
            </Grid>

            {isUsingLastUploadedResume && (
              // <Grid flexGrow={1}>
              <IconButton
                onClick={handleUnselectLastResume}
                style={{
                  marginRight: "2%",
                  color: "#006D4B",
                }}
              >
                <HighlightOffOutlinedIcon />
              </IconButton>
              // </Grid>
            )}
          </SelectLastUsedResume>
          {/* //{" "} */}
        </Tooltip>
      )}
    </Container>
  );
}
