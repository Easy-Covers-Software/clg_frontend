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

import Grid from "@mui/material/Unstable_Grid2/Grid2";

import MoreOptionsReQueries from "../ReQueryOptions/components/MoreOptionsReQuerys";
import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";
import CircularProgress from "@mui/material/CircularProgress";

import ReQueryOptions from "../ReQueryOptions/ReQueryOptions";

import { Container, SubContainer, ContentWrapper } from "./CoverLetter.styles";

export default function CoverLetter() {
  const { state, dispatch } = useSavedCoverLettersContext();

  const { selectedCoverLetter, isReQuerySectionExpanded, loadingCoverLetter } =
    state;

  const [coverLetter, setCoverLetter] = useState(
    `Select a saved cover letter to edit`
  );
  const [coverLetterJSON, setCoverLetterJSON] = useState({});

  useEffect(() => {
    setCoverLetter(
      `<div>
          <p>${selectedCoverLetter?.cover_letter_opener || ""}</p>

          <p>${selectedCoverLetter?.cover_letter_p1 || ""}</p>

          <p>${
            selectedCoverLetter?.cover_letter_p2 ||
            "Select a saved cover letter to start editing"
          }</p>

          <p>${selectedCoverLetter?.cover_letter_p3 || ""}</p>

          <p>${selectedCoverLetter?.cover_letter_thank_you || ""}</p>
          
          <p>${selectedCoverLetter?.cover_letter_signature || ""}</p>

          <p>${selectedCoverLetter?.cover_letter_writer || ""}</p>
        </div>`
    );
    setCoverLetterJSON({
      coverLetterOpener: selectedCoverLetter?.cover_letter_opener,
      coverLetterP1: selectedCoverLetter?.cover_letter_p1,
      coverLetterP2: selectedCoverLetter?.cover_letter_p2,
      coverLetterP3: selectedCoverLetter?.cover_letter_p3,
      coverLetterThankYou: selectedCoverLetter?.cover_letter_thank_you,
      coverLetterSignature: selectedCoverLetter?.cover_letter_signature,
      coverLetterWriter: selectedCoverLetter?.cover_letter_writer,
    });
  }, [selectedCoverLetter]);

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
        type: "SET_CURRENT_COVER_LETTER",
        payload: coverLetter,
      });
      dispatch({
        type: "SET_CURRENT_COVER_LETTER_JSON",
        payload: JSON.stringify(coverLetterJSON),
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
          type: "UPDATE_COVER_LETTER",
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
