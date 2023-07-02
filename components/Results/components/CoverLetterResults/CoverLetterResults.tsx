'use client';

import React from 'react';
import { Global, css } from '@emotion/react';

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import DownloadOptionsMenu from './components/DownloadOptionsMenu';

import { Grid } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 268px);
  min-height: calc(100vh - 268px);
  max-height: calc(100vh - 268px);
  margin: 0% 0.5%;
  background-color: white;
  border-radius: 0 0 4px 4px;
`;
const ContentWrapper = styled(Grid)`
  overflow: scroll; // Set overflow as needed
  flex: 1;
`;

const content = `
<div style=" overflow: scroll; ">
  <h2 style="text-align: center;">Cover Letter</h2>
  <h5 style="text-align: left;">Dear [Employer’s Name],</h5>
  <p>
      I am writing to apply for the [Job Title] position at [Company Name], as advertised on [where you found the job posting]. 
  </p>
  <p>
      As a [Your Job Title] at [Your Current or Most Recent Company] with a proven background in [Relevant Job Skills], 
      it is with great excitement that I submit my resume for consideration to become a member of your team.
  </p>
  <p>
      In my current position, I have [give an accomplishment or responsibility that shows how you can make a difference]. 
      I believe I could bring this same level of detail and dedication to your team at [Company Name].
  </p>
  <p>
      Thank you for considering my application. I look forward to the possibility of discussing this exciting opportunity with you further.
  </p>
  <p>
      Sincerely,<br/>
      [Your Name]
  </p>
  <div>
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
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  return (
    <Container>
      <Global
        styles={css`
          .ProseMirror p {
            font-size: 14px; // Set the desired font size
            font-family: 'Times New Roman', Times, serif; // Set the desired font family
            line-height: 1.5;
            overflow-wrap: break-word;
          }
        `}
      />

      <RichTextEditor
        editor={editor}
        style={{
          display: 'flex',
          flexDirection: 'column', // This is important!
          height: '100%',
          borderRadius: '0 0 4px 4px',
        }}
      >
        <RichTextEditor.Toolbar
          sticky
          stickyOffset={60}
          sx={{ display: 'flex', justifyContent: 'center' }}
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

          <RichTextEditor.ControlsGroup ml={'1%'}>
            <DownloadOptionsMenu />
          </RichTextEditor.ControlsGroup>

          {/* I want to add a download icon that allows the user to download the current content as either a pdf or docx */}
          {/* Step 1: Add the download icon that will present the user with the op */}
        </RichTextEditor.Toolbar>

        <ContentWrapper>
          <RichTextEditor.Content
            // sx={{
            //   display: 'flex',
            //   overflow: 'scroll',
            //   flexGrow: -1,
            //   minHeight: 0,
            // }}
            m={'0 5%'}
            // h={'max-height: calc(100vh - 500px)'}
            // h={'100%'}
          />
        </ContentWrapper>
      </RichTextEditor>
    </Container>
  );
}
