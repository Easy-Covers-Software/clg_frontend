import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const PrimaryButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.5vh 3vw;

  background-color: #13d0b7;
  color: white;

  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  border-radius: 4px;

  border: 2px solid #006d4b;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: 0.4s;
  font-family: Montserrat, sans-serif;
  font-size: 0.9rem;

  white-space: nowrap;

  &:hover {
    transition: 0.4s;
    background-color: white;
    color: #006d4b;
  }

  &:active {
    background-color: #87dbd0;
  }

  @media (max-width: 900px) {
    font-size: 0.8rem;
  }
`;

const UnSelectedButton = styled(PrimaryButton)`
  background-color: white;
  color: #13d0b7;

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    background-color: #87dbd0;
  }

  @media (max-width: 900px) {
    font-size: 0.8rem;
  }
`;

export { PrimaryButton, UnSelectedButton };
