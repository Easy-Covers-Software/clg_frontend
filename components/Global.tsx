import styled from '@emotion/styled';
import Button from '@mui/material/Button';

// const PrimaryButton = styled(Button)`
//   padding: 12px 80px;
//   border-radius: 4px;
//   background-color: #35e8b0;
//   color: #fff;
//   &:hover {
//     color: white;
//   }
// `;

const PrimaryButton = styled(Button)`
  background-color: #13d0b7;
  padding: 14px 40px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid #00bfa6;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: 0.4s;
  width: 100%;
  font-family: Montserrat, sans-serif;
  font-size: 1.1rem;

  &:hover {
    transition: 0.4s;
    border: 2px solid #00bfa6;
    background-color: #fff;
    color: #00bfa6;
  }
  &:active {
    background-color: #87dbd0;
  }
`;

const UnSelectedButton = styled(Button)`
  background-color: #ffffff;
  padding: 14px 40px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid #00bfa6;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: 0.4s;
  width: 100%;
  font-family: Montserrat, sans-serif;

  &:hover {
    transition: 0.4s;
    border: 2px solid #00bfa6;
    background-color: #fff;
    color: #00bfa6;
  }
  &:active {
    background-color: #87dbd0;
  }
`;

export { PrimaryButton, UnSelectedButton };
