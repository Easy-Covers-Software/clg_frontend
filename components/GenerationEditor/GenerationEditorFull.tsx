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

import { useAuth } from '@/context/AuthContext';

import {
  Container,
  SubContainer,
  ContentWrapper,
} from './GenerationEditorFull.styles';

import SimpleAdjustments from '../Adjustments/Simple/SimpleAdjustments';
import AdvancedAdjustments from '../Adjustments/Advanced/AdvancedAdjustments';

import DownloadMenu from '../Download/DownloadMenu';

import { Helpers } from '@/Utils/utils';
const { parseSectionsFromHTML, addDivTag } = Helpers;

import {
  CoverLetterData,
  AdjustmentSectionProps,
  SimpleAdjustmentProps,
  IntermediateAdjustmentProps,
  CustomAdjustmentProps,
  SaveProps,
  DownloadProps,
} from '@/Types/GenerationContext.types';

interface Props {
  coverLetterData: CoverLetterData;
  adjustmentSection: AdjustmentSectionProps;
  simpleAdjustmentProps: SimpleAdjustmentProps;
  intermediateAdjustmentProps: IntermediateAdjustmentProps;
  customAdjustmentProps: CustomAdjustmentProps;
  saveProps: SaveProps;
  downloadProps: DownloadProps;
}

const GenerationEditorFull: FC<Props> = ({
  coverLetterData,
  adjustmentSection,
  simpleAdjustmentProps,
  intermediateAdjustmentProps,
  customAdjustmentProps,
  saveProps,
  downloadProps,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { state } = useAuth();
  const { trackers, snackbar } = state;

  console.log(
    'isAdjustmentsSectionOPn',
    adjustmentSection?.isAdjustmentsSectionExpanded
  );

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
      content: coverLetterData?.coverLetterHtml,
    },
    [coverLetterData?.coverLetterHtml]
  );

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(coverLetterData?.coverLetterHtml);
    }
  }, [coverLetterData?.coverLetterHtml, editor]);

  useEffect(() => {
    if (editor) {
      const updateHandler = () => {
        const html = editor.getHTML();
        const parsedSections = parseSectionsFromHTML(html);
        console.log('parsedSections', parsedSections);
        coverLetterData.updateEditedCoverLetterHtml(addDivTag(html));
        coverLetterData.updateEditedCoverLetterParts(parsedSections);
      };

      editor.on('update', updateHandler);
      return () => {
        editor.off('update', updateHandler);
      };
    }
  }, [editor]);

  return (
    <Container>
      <SubContainer>
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

        {isMobile && adjustmentSection?.isAdjustmentsSectionExpanded ? (
          <AdvancedAdjustments
            coverLetterData={coverLetterData}
            intermediateAdjustmentProps={intermediateAdjustmentProps}
            customAdjustmentProps={customAdjustmentProps}
          />
        ) : (
          <RichTextEditor editor={editor} className='rich-text-editor'>
            <RichTextEditor.Toolbar
              sticky
              stickyOffset={60}
              className='rich-text-editor-toolbar'
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
                    contentData={coverLetterData}
                    saveProps={saveProps}
                    downloadProps={downloadProps}
                    snackbar={snackbar}
                  />
                </RichTextEditor.ControlsGroup>
              )}
            </RichTextEditor.Toolbar>

            <ContentWrapper>
              {coverLetterData?.loadingCoverLetter ? (
                <Grid
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={'100%'}
                >
                  <CircularProgress color='success' />
                </Grid>
              ) : (
                <Grid m={'0 5%'}>
                  <RichTextEditor.Content />
                </Grid>
              )}
            </ContentWrapper>
          </RichTextEditor>
        )}

        {!isMobile && adjustmentSection?.isAdjustmentsSectionExpanded && (
          <AdvancedAdjustments
            coverLetterData={coverLetterData}
            intermediateAdjustmentProps={intermediateAdjustmentProps}
            customAdjustmentProps={customAdjustmentProps}
          />
        )}
      </SubContainer>

      <SimpleAdjustments
        coverLetterData={coverLetterData}
        simpleAdjustmentProps={simpleAdjustmentProps}
        adjustmentSection={adjustmentSection}
        reset={coverLetterData.reset}
      />
    </Container>
  );
};

export default GenerationEditorFull;
