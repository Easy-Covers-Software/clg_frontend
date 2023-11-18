'use client';

import { useEffect, FC } from 'react';
import { Global, css } from '@emotion/react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useMediaQuery, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

import { useAuth } from '@/context/AuthContext';

import DownloadMenu from '../Download/DownloadMenu';

import { Helpers } from '@/Utils/utils';
const { parseSectionsFromHTML, addDivTag } = Helpers;

import {
  CoverLetterData,
  SaveProps,
  DownloadProps,
} from '@/Types/GenerationContext.types';

interface Props {
  coverLetterData: CoverLetterData;
  saveProps: SaveProps;
  downloadProps: DownloadProps;
}

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 196px);
  min-height: calc(100vh - 196px);
  background-color: #f8f8ff;

  width: 100%;

  // margin: 0 0.5%;
  // padding-bottom: 2%;
  border-radius: 4px;
  // border: 1px solid #006d4b;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    height: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
  }
`;

const GenerationEditor: FC<any> = ({
  contentData,
  saveProps,
  downloadProps,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { state } = useAuth();
  const { trackers, snackbar } = state;

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Link,
        Superscript,
        SubScript,
        Highlight,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ],
      content: contentData?.contentHtml,
    },
    [contentData?.contentHtml]
  );

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(contentData?.contentHtml);
    }
  }, [contentData?.contentHtml, editor]);

  useEffect(() => {
    if (editor) {
      const updateHandler = () => {
        const html = editor.getHTML();
        const parsedSections = parseSectionsFromHTML(html);
        console.log('parsedSections', parsedSections);
        contentData.updateEditedContentHtml(addDivTag(html));
        contentData.updateEditedContent(parsedSections);
      };

      editor.on('update', updateHandler);
      return () => {
        editor.off('update', updateHandler);
      };
    }
  }, [editor]);

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

          //-- Editor Height Fix --//
          .mantine-1drwy5n {
            height: 100% !important;
            // overflow: scroll;
          }
          .mantine-1coq4co {
            height: 100% !important;
            // overflow: scroll;
          }
          //-- ToolBar --//
          .mantine-1thayu0 {
            justify-content: center;
          }
        `}
      />

      <RichTextEditor
        editor={editor}
        style={{
          height: '100%',
          width: 'fit-content',
          // border: '1px solid #006D4B',
          borderRadius: '4px',
          overflow: 'scroll',
        }}
      >
        <RichTextEditor.Toolbar
          style={{
            textAlign: 'center',
          }}
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
            <RichTextEditor.ControlsGroup ml={'1%'}>
              <DownloadMenu
                contentData={contentData}
                saveProps={saveProps}
                downloadProps={downloadProps}
                snackbar={snackbar}
              />
            </RichTextEditor.ControlsGroup>
          )}
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Container>
  );
};

export default GenerationEditor;
