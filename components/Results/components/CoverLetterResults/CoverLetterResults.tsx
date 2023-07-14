"use client";

import React, { useContext } from "react";
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
  background-color: #f8f8ff;
  border-top: none;
  border-bottom: none;
  // width: 58%;
  border-radius: 4px;
`;

const ContentWrapper = styled(Grid)`
  overflow: scroll; // Set overflow as needed
  flex: 1;
`;

const content = `
    <div>
      <p>Dear Hiring Manager,</p>

      <p>
          I am writing to apply for the Software Engineer, Machine Learning position at Google. 
          I came across this opportunity on your company's careers page and was immediately drawn to it, given its match with my skills and interests.
      </p>
      <p>
          As a Software Engineer specializing in Machine Learning at my current organization, I have been deeply involved in designing and implementing machine learning models for various business solutions. My background in computer science, coupled with my hands-on experience in machine learning, enables me to create efficient models that drive decision-making and contribute to the strategic goals of the company.
      </p>
      <p>
          One of my significant accomplishments includes developing a predictive model for improving customer engagement, which resulted in a 15% increase in user activity. I have also worked on optimizing algorithms for faster data processing, leading to a 20% improvement in system efficiency. 
      </p>
      <p>
          I am thrilled at the prospect of bringing my expertise in machine learning to Google, known for its innovation and technological advancements. I am confident that I can contribute to the team and support the development of cutting-edge machine learning applications.
      </p>
      <p>
          Thank you for considering my application. I am eager to further discuss how my background and skills align with the needs of your team.
      </p>
      <p>
          Sincerely,<br/>
          [Your Name]
      </p>
    </div>

`;

export default function CoverLetterResults() {
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
    content,
  });

  const { isReQuerySectionExpanded } = useContext<any>(ReQueryContext);

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
          flexDirection: "column", // This is important!
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
          <RichTextEditor.Content m={"0 5%"} />
        </ContentWrapper>
      </RichTextEditor>

      {/* Can you help me on display */}
      {isReQuerySectionExpanded && <MoreOptionsReQueries />}
    </Container>
  );
}
