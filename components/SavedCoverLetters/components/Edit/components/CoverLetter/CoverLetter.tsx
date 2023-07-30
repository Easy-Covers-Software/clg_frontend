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
// import DownloadOptionsMenu from "@/components/Generation/Results/components/CoverLetterResults/components/DownloadOptionsMenu";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

import MoreOptionsReQueries from "../ReQueryOptions/components/MoreOptionsReQuerys";
import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";
import CircularProgress from "@mui/material/CircularProgress";

import ReQueryOptions from "../ReQueryOptions/ReQueryOptions";

import { Container, SubContainer, ContentWrapper } from "./CoverLetter.styles";

export default function CoverLetter() {
  const { state, dispatch } = useSavedCoverLettersContext();

  const {
    selectedCoverLetter,
    selectedCoverLetterHtml,
    selectedCoverLetterParts,
    isReQuerySectionExpanded,
    loadingCoverLetter,
  } = state;

  console.log("edit mode parts", selectedCoverLetterParts);

  const [coverLetter, setCoverLetter] = useState(
    `Select a saved cover letter to edit`
  );
  console.log("coverLetter =========****", selectedCoverLetterHtml);

  const [coverLetterJSON, setCoverLetterJSON] = useState({});

  useEffect(() => {
    if (selectedCoverLetterParts !== null) {
      if (typeof selectedCoverLetterParts[0] !== "string") {
        const sections = selectedCoverLetterParts
          .map((part) => {
            return `<p>${part.content}</p>`;
          })
          .join("");
        const addDiv = `<div>${sections}</div>`;
        dispatch({
          type: "SET_SELECTED_COVER_LETTER_HTML",
          payload: addDiv,
        });
        setCoverLetter(addDiv);
      } else {
        const sections = selectedCoverLetterParts
          .map((part) => {
            return `<p>${part}</p>`;
          })
          .join("");
        const addDiv = `<div>${sections}</div>`;
        setCoverLetter(addDiv);
      }
    }
  }, [selectedCoverLetterParts]);

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
      dispatch({
        type: "SET_SELECTED_COVER_LETTER_HTML",
        payload: coverLetter,
      });
      editor.commands.setContent(coverLetter);
    }
  }, [coverLetter, editor]);

  function parseSectionsFromHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const paragraphs = doc.querySelectorAll("p");
    const sections = Array.from(paragraphs).map((p) => p.innerHTML);
    console.log("sections", sections);

    return sections;
  }

  useEffect(() => {
    if (editor) {
      const updateHandler = () => {
        // Parse the editor's HTML content into sections.
        const html = editor.getHTML();
        console.log("HTML", html);

        const parsedSections = parseSectionsFromHTML(html); // You need to implement this function.

        // Dispatch the update action.
        dispatch({
          type: "SET_UPDATE_COVER_LETTER",
          payload: html,
        });
        dispatch({
          type: "SET_UPDATE_COVER_LETTER_PARTS",
          payload: parsedSections,
        });
      };

      editor.on("update", updateHandler);

      return () => {
        // Clean up the event listener when the component is unmounted or the editor instance changes.
        editor.off("update", updateHandler);
      };
    }
  }, [editor, dispatch]);

  console.log("state.updateCoverLetter", state.updateCoverLetter);

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
            width: "99.8%",
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
                <CircularProgress color="success" />
              </Grid>
            ) : (
              <Grid m={"0 10%"}>
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
