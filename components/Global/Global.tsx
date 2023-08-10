import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const PrimaryButton = styled(Button)`
  background-color: #13d0b7;
  padding: 10px 40px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid #00bfa6;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: 0.4s;
  width: 100%;
  font-family: Montserrat, sans-serif;
  font-size: 0.9rem;
  white-space: nowrap;

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
  display: flex;
  background-color: #ffffff;
  padding: 10px 40px;
  color: #13d0b7;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid #00bfa6;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: 0.4s;
  width: 100%;
  font-family: Montserrat, sans-serif;

  &:hover {
    transition: 0.4s;
    border: 2px solid #00bfa6;
    background-color: #f5f5f5;
    color: #00bfa6;
  }
  &:active {
    background-color: #87dbd0;
  }

  @media (max-width: 900px) {
    font-size: 0.8rem;
  }
`;

export { PrimaryButton, UnSelectedButton };
