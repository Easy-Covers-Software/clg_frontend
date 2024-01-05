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

import DownloadMenuFull from '../Download/DownloadMenuFull';

import { parseSectionsFromHTML, addDivTag } from '@/Utils/utils';

interface Props {
  generationData: any;
  adjustmentSection: any;
  simpleAdjustmentProps: any;
  intermediateAdjustmentProps: any;
  customAdjustmentProps: any;
  saveProps: any;
  downloadProps: any;
}

const GenerationEditorFull: FC<any> = ({
  generationData,
  updateGenerationResultsState,
  adjustmentSection,
  simpleAdjustmentProps,
  intermediateAdjustmentProps,
  customAdjustmentProps,
  saveProps,
  downloadProps,
  dispatch,
  toggleAdjustmentsSection,
  updateSimpleAdjustmentState,
  updateIntermediateAdjustmentState,
  updateCustomAdjustmentState,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { state } = useAuth();
  const { trackers, snackbar } = state;

  console.log('toggleAdjustmentsSection', toggleAdjustmentsSection);
  console.log('adjustmentSection =======22', adjustmentSection);

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
      content: generationData?.contentHtml,
    },
    [generationData?.contentHtml]
  );

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(generationData?.contentHtml);
    }
  }, [generationData?.contentHtml, editor]);

  useEffect(() => {
    if (editor) {
      const updateHandler = () => {
        const html = editor.getHTML();
        const parsedSections = parseSectionsFromHTML(html);
        console.log('parsedSections', parsedSections);
        updateGenerationResultsState('editedContentHtml', html);
        updateGenerationResultsState('editedContent', parsedSections);

        // coverLetterData.updateEditedCoverLetterHtml(addDivTag(html));
        // coverLetterData.updateEditedCoverLetterParts(parsedSections);
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

        {isMobile && adjustmentSection ? (
          <AdvancedAdjustments
            coverLetterData={generationData}
            intermediateAdjustmentProps={intermediateAdjustmentProps}
            customAdjustmentProps={customAdjustmentProps}
          />
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
                <RichTextEditor.ControlsGroup ml={'1%'}>
                  <DownloadMenuFull
                    contentData={generationData}
                    // saveProps={saveProps}
                    // downloadProps={downloadProps}
                    snackbar={snackbar}
                    dispatch={dispatch}
                  />
                </RichTextEditor.ControlsGroup>
              )}
            </RichTextEditor.Toolbar>

            <ContentWrapper>
              {generationData?.loading ? (
                <Grid
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={'100%'}
                >
                  <CircularProgress color="success" />
                </Grid>
              ) : (
                <Grid m={'0 5%'}>
                  <RichTextEditor.Content />
                </Grid>
              )}
            </ContentWrapper>
          </RichTextEditor>
        )}

        {!isMobile && adjustmentSection && (
          <>
            {console.log('adjustmentSection =======22', adjustmentSection)}
            <AdvancedAdjustments
              coverLetterData={generationData}
              intermediateAdjustmentProps={intermediateAdjustmentProps}
              customAdjustmentProps={customAdjustmentProps}
              updateIntermediateAdjustmentState={
                updateIntermediateAdjustmentState
              }
              updateCustomAdjustmentState={updateCustomAdjustmentState}
            />
          </>
        )}
      </SubContainer>

      <SimpleAdjustments
        generationData={generationData}
        simpleAdjustmentProps={simpleAdjustmentProps}
        adjustmentSection={adjustmentSection}
        toggleAdjustmentsSection={toggleAdjustmentsSection}
        reset={() => {}}
      />
    </Container>
  );
};

export default GenerationEditorFull;
