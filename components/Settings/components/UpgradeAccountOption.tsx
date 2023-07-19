"use client";

import React from "react";

import styled from "@emotion/styled";
import { Paper } from "@mui/material";

import { Typography } from "@mui/material";

import Link from "next/link";

import ModelChoiceSwitch from "./ModelChoiceSwitch";

import { UnSelectedButton } from "@/components/Global";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const Container = styled(Grid)`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  border: 3px solid #13d0b7;
  border-radius: 8px;
`;

const SubContainer = styled(Grid)`
  // width: 100%;
  height: 16vh;
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 1%;
  border: 3px solid #13d0b7;
  border-radius: 4px;
  flex-grow: 1;
`;

const PackageNameContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  gap: 16px;

  padding: 0 1%;
  // align-items: center;
  margin-left: 5%;
  margin-top: 3%;
  width: 40%;
`;
const PackageDetailsContainer = styled(Grid)`
  width: 60%;
  // height: 100%;
  display: flex;
  justify-content: center;
  // justify-content: flex-end;
  align-items: space-between;
  padding-bottom: 6%;
  padding-right: 5%;
  flex-grow: 1;
`;

const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%; // this makes sure the list takes up the full height of the parent container
  text-align: left;
  // align-items: center;
`;

const PackageNameButtonSingle = styled(UnSelectedButton)`
  height: 40%;
  width: 100%;
  font-size: 0.7rem;
  white-space: nowrap;
`;

const PackageNameButtonDouble = styled(UnSelectedButton)`
  height: 60%;
  width: 100%;
  font-size: 0.8rem;
  white-space: nowrap;
`;

const ButtonWithLabel = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -2%;
`;

const ListItem = styled.li`
  font-size: 0.65rem;
`;

const PricingButtonContainer = styled(Grid)`
  display: flex;
  // align-items: center;
  gap: 5%;
`;

export default function UpgradeAccountOption({ packages }) {
  return (
    <Container>
      {/* <SubContainer> */}
      <PackageNameContainer>
        <Typography>{packages.name}</Typography>

        {packages.name === "Dynamic Drafter" ||
        packages.name === "Intro Drafter" ? (
          <PricingButtonContainer>
            <ButtonWithLabel>
              <Typography fontSize={"0.72rem"}>GPT-3.5 Turbo</Typography>
              <PackageNameButtonDouble>
                {packages.price}
              </PackageNameButtonDouble>
            </ButtonWithLabel>

            <ButtonWithLabel>
              <Typography fontSize={"0.72rem"}>GPT-4</Typography>
              <PackageNameButtonDouble>
                {packages.price_gpt4}
              </PackageNameButtonDouble>
            </ButtonWithLabel>
          </PricingButtonContainer>
        ) : (
          <PackageNameButtonSingle>{packages.price}</PackageNameButtonSingle>
        )}
      </PackageNameContainer>

      <PackageDetailsContainer>
        <FeatureList>
          <ListItem>
            <Typography fontSize={"0.85rem"}>{packages.features[0]}</Typography>
          </ListItem>
          <ListItem>
            <Typography fontSize={"0.85rem"}>{packages.features[1]}</Typography>
          </ListItem>
          <ListItem>
            <Typography fontSize={"0.85rem"}>{packages.features[2]}</Typography>
          </ListItem>
        </FeatureList>
      </PackageDetailsContainer>
    </Container>
  );
}
