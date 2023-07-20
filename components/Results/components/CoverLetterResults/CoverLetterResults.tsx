"use client";

import React, { useContext, useEffect, useState } from "react";
import { Global, css } from "@emotion/react";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import DownloadOptionsMenu from "./components/DownloadOptionsMenu";

import { Grid } from "@mui/material";
import styled from "@emotion/styled";

import MoreOptionsReQueries from "../ReQueryOptions/components/MoreOptionsReQuerys";
import { useCoverLetterResultsContext } from "@/context/ResultsContext";
import CircularProgress from "@mui/material/CircularProgress";

import ReQueryOptions from "../ReQueryOptions/ReQueryOptions";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 196px);
  min-height: calc(100vh - 196px);
  max-height: calc(100vh - 196px);
  margin: 0% 0.8%;
  background-color: white;
  padding: 0.5% 0.8%;
  background-color: #f8f8ff;
  // background-color: white;
  border-top: none;
  // width: 58%;
  border-radius: 4px;
  border: 1px solid #006d4b;
  margin-bottom: 0.5%;
  margin-top: -1%;

  // overflow: auto;
`;

const SubContainer = styled(Grid)`
  height: calc(100vh - 264px);
  min-height: calc(100vh - 264px);
  max-height: calc(100vh - 264px);
  display: flex;
`;

const ContentWrapper = styled(Grid)`
  overflow: scroll; // Set overflow as needed
  flex: 1;
`;

export default function CoverLetterResults() {
  const {
    isReQuerySectionExpanded,
    setCurrentCoverLetter,
    coverLetterOpener,
    coverLetterP1,
    coverLetterP2,
    coverLetterP3,
    coverLetterThankYou,
    coverLetterSignature,
    loadingCoverLetter,
  } = useCoverLetterResultsContext();

  const [coverLetter, setCoverLetter] = useState(``);

  useEffect(() => {
    setCoverLetter(
      `<div>
          <p>${coverLetterOpener}</p>

          <p>${coverLetterP1}</p>

          <p>${coverLetterP2}</p>

          <p>${coverLetterP3}</p>

          <p>${coverLetterThankYou}</p>
          
          <p>${coverLetterSignature}</p>
        </div>`
    );
  }, [
    coverLetterOpener,
    coverLetterP1,
    coverLetterP2,
    coverLetterP3,
    coverLetterThankYou,
    coverLetterSignature,
  ]);

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Link,
        Superscript,
        SubScript,
        Highlight,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: coverLetter,
    },
    [coverLetter]
  );

  useEffect(() => {
    if (editor) {
      setCurrentCoverLetter(coverLetter);
      editor.commands.setContent(coverLetter);
    }
  }, [coverLetter, editor]);

  return (
    <Container>
      <SubContainer>
        <Global
          styles={css`
            .ProseMirror p {
              font-size: 14px; // Set the desired font size
              font-family: "Times New Roman", Times, serif; // Set the desired font family
              line-height: 1.5;
              overflow-wrap: break-word;
            }
          `}
        />

        <RichTextEditor
          editor={editor}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            borderRadius: "4px",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <RichTextEditor.Toolbar
            sticky
            stickyOffset={60}
            sx={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "4px 4px 0 0",
            }}
          >
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              {/* <RichTextEditor.Strikethrough /> */}
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            {/* <RichTextEditor.ControlsGroup> */}
            {/* <RichTextEditor.H1 /> */}
            {/* <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 /> */}
            {/* </RichTextEditor.ControlsGroup> */}

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              {/* <RichTextEditor.Hr /> */}
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              {/* <RichTextEditor.Subscript />
            <RichTextEditor.Superscript /> */}
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup ml={"1%"}>
              <DownloadOptionsMenu />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <ContentWrapper>
            {loadingCoverLetter ? (
              <Grid
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}
              >
                <CircularProgress />
              </Grid>
            ) : (
              <Grid m={"0 5%"}>
                <RichTextEditor.Content />
              </Grid>
            )}
          </ContentWrapper>
        </RichTextEditor>

        {isReQuerySectionExpanded && <MoreOptionsReQueries />}
      </SubContainer>

      <ReQueryOptions />
    </Container>
  );
}
