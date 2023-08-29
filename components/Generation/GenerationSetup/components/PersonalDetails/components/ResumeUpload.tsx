'use client';

import { useEffect, useState } from 'react';
import UploadOption from './UploadOption';
import { useAuth } from '@/context/AuthContext';
import { useGenerationContext } from '@/context/GenerationContext';
import { ResumeUploadStyledComponents } from '../PersonalDetails.styles';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Grid, Tooltip, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
const { Container, DragDropContainer, SelectLastUsedResume } =
  ResumeUploadStyledComponents;

export default function ResumeUploader() {
  const { state: authState } = useAuth();
  const { loggedInProps } = authState;

  const { state, dispatch } = useGenerationContext();
  const { generationSetupProps } = state;

  const [isUsingLastUploadedResume, setIsUsingLastUploadedResume] =
    useState<boolean>(false);

  const toggleUsePreviousResume = () => {
    setIsUsingLastUploadedResume((prevState) => !prevState);
  };

  useEffect(() => {
    if (isUsingLastUploadedResume) {
      generationSetupProps?.updateIsUsingPreviousResume(true);
    } else {
      // generationSetupProps?.updateIsUsingLastUploadedResume(false);
    }
  }, [isUsingLastUploadedResume]);

  console.log('loggedInProps', loggedInProps);
  return (
    <Container>
      <DragDropContainer
        style={{
          opacity: isUsingLastUploadedResume ? 0.3 : 1,
        }}
      >
        <UploadOption
          label='Upload From Computer'
          accept='.pdf,.doc,.docx,.txt'
        />
      </DragDropContainer>
      {loggedInProps.resume && loggedInProps.resume !== '' && (
        <Tooltip title={`Date Uploaded: `}>
          <SelectLastUsedResume
            onClick={toggleUsePreviousResume}
            sx={{
              opacity: 1,
              elevation: isUsingLastUploadedResume ? 0 : 5,
              boxShadow: isUsingLastUploadedResume
                ? 'none'
                : '7px 7px 0px 0px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Grid display={'flex'} alignItems={'center'} gap={'3%'}>
              {!isUsingLastUploadedResume && (
                <PostAddIcon
                  fontSize='large'
                  sx={{
                    paddingBottom: '2%',
                    color: '#006D4B',
                  }}
                />
              )}

              {!isUsingLastUploadedResume ? (
                <Typography
                  className='use-last-resume'
                  style={{
                    textDecoration: isUsingLastUploadedResume
                      ? 'underline'
                      : 'none',
                  }}
                >
                  Use Previous: {loggedInProps?.resume}
                </Typography>
              ) : (
                <>
                  <Typography className='use-last-resume'>Selected:</Typography>
                  <Typography
                    className='use-last-resume'
                    style={{
                      textDecoration: isUsingLastUploadedResume
                        ? 'underline'
                        : 'none',
                    }}
                  >
                    {' '}
                    {loggedInProps?.resume}
                  </Typography>
                </>
              )}
            </Grid>

            {isUsingLastUploadedResume && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleUsePreviousResume();
                }}
                style={{
                  marginRight: '2%',
                  color: '#006D4B',
                }}
              >
                <HighlightOffOutlinedIcon />
              </IconButton>
            )}
          </SelectLastUsedResume>
        </Tooltip>
      )}
    </Container>
  );
}
