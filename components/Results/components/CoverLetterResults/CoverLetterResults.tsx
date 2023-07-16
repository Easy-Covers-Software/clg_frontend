"use client";

import React, { useContext, useEffect } from "react";
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
import { ReQueryContext } from "../../Results";
import { useCoverLetterResultsContext } from "@/context/ResultsContext";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled(Grid)`
  display: flex;
  justify-content: space-between;
  gap: 1%;
  height: calc(100vh - 268px);
  min-height: calc(100vh - 268px);
  max-height: calc(100vh - 268px);
  margin: 0% 0.5%;
  background-color: white;
  padding: 0 1% 0 1%;
  // background-color: #f8f8ff;
  background-color: white;
  border-top: none;
  border-bottom: none;
  // width: 58%;
  border-radius: 4px;
`;

const ContentWrapper = styled(Grid)`
  overflow: scroll; // Set overflow as needed
  flex: 1;
`;

// const content = `
//     <div>
//       <p>Dear Hiring Manager,</p>

//       <p>
//           paragraph 1
//       </p>
//       <p>
//           paragraph 2
//       </p>
//       <p>
//           paragraph 3
//       </p>
//       <p>
//           paragraph 4
//       </p>
//       <p>
//           Thank you message
//       </p>
//       <p>
//           Sincerely,<br/>
//           [Your Name]
//       </p>
//     </div>
// `;

export default function CoverLetterResults() {
  const { generatedCoverLetter, loading } = useCoverLetterResultsContext();

  const content = generatedCoverLetter;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<p>Awaiting Generation Results</p>",
  });

  const { isReQuerySectionExpanded } = useContext<any>(ReQueryContext);

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(generatedCoverLetter);
    }
  }, [generatedCoverLetter, editor]);

  return (
    <Container>
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
          {loading ? (
            <Grid
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"100%"}
            >
              <CircularProgress />
            </Grid>
          ) : (
            <RichTextEditor.Content m={"0 5%"} />
          )}
        </ContentWrapper>
      </RichTextEditor>

      {/* Can you help me on display */}
      {isReQuerySectionExpanded && <MoreOptionsReQueries />}
    </Container>
  );
}
