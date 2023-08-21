"use client";

import React, { useEffect } from "react";
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
import { useAuth } from "@/context/AuthContext";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

import MoreOptionsReQueries from "../ReQueryOptions/components/MoreOptionsReQuerys";
import { useGenerationContext } from "@/context/GenerationContext";
import CircularProgress from "@mui/material/CircularProgress";

import ReQueryOptions from "../ReQueryOptions/ReQueryOptions";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Helpers } from "@/Utils/utils";
const { parseSectionsFromHTML } = Helpers;

import {
  Container,
  SubContainer,
  ContentWrapper,
  LoadingGrid,
} from "./CoverLetterResults.styles";

export default function CoverLetterResults() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { dispatch: authDispatch } = useAuth();

  const { state, dispatch } = useGenerationContext();
  const { isReQuerySectionExpanded, loadingCoverLetter, coverLetter } = state;

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
      editor.commands.setContent(coverLetter);
    }
  }, [coverLetter, editor]);

  useEffect(() => {
    if (
      !loadingCoverLetter &&
      coverLetter.includes("<div><p>Awaiting Generation...</p></div>")
    ) {
      authDispatch({
        type: "SET_MOBILE_MODE",
        payload: "setup",
      });
    } else {
      authDispatch({
        type: "SET_MOBILE_MODE",
        payload: "results",
      });
    }
  }, [loadingCoverLetter, coverLetter]);

  useEffect(() => {
    if (editor) {
      const updateHandler = () => {
        const html = editor.getHTML();
        console.log("HTML", html);

        const parsedSections = parseSectionsFromHTML(html); // You need to implement this function.

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

        {isMobile && isReQuerySectionExpanded ? (
          <MoreOptionsReQueries />
        ) : (
          <RichTextEditor editor={editor} className="rich-text-editor">
            <RichTextEditor.Toolbar
              sticky
              stickyOffset={60}
              className="rich-text-editor-toolbar"
            >
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignRight />
                <RichTextEditor.Blockquote />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              {!isMobile && (
                <RichTextEditor.ControlsGroup ml={"1%"}>
                  <DownloadOptionsMenu />
                </RichTextEditor.ControlsGroup>
              )}
            </RichTextEditor.Toolbar>

            <ContentWrapper>
              {loadingCoverLetter ? (
                <LoadingGrid>
                  <CircularProgress color="success" />
                </LoadingGrid>
              ) : (
                <Grid m={"0 5%"}>
                  <RichTextEditor.Content />
                </Grid>
              )}
            </ContentWrapper>
          </RichTextEditor>
        )}

        {!isMobile && isReQuerySectionExpanded && <MoreOptionsReQueries />}
      </SubContainer>

      <ReQueryOptions />
    </Container>
  );
}
