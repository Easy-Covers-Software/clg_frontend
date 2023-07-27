"use client";

import { Typography } from "@mui/material";

import { UpgradeAccountOptionStyledComponents } from "../SettingsDialog.styles";
const {
  Container,
  PackageNameContainer,
  PackageDetailsContainer,
  FeatureList,
  PackageNameButtonSingle,
  PackageNameButtonDouble,
  ButtonWithLabel,
  ListItem,
  PricingButtonContainer,
} = UpgradeAccountOptionStyledComponents;

export default function UpgradeAccountOption({
  packages,
  setSelectedPackagePrice,
}) {
  const handlePackageSelection = (price) => {
    setSelectedPackagePrice(price);
  };

  return (
    <Container>
      <PackageNameContainer>
        <Typography>{packages.name}</Typography>

        <PricingButtonContainer>
          <ButtonWithLabel>
            <Typography fontSize={"0.72rem"}>GPT-3.5 Turbo</Typography>
            <PackageNameButtonDouble
              onClick={() => {
                handlePackageSelection(packages.price);
              }}
            >
              {packages.price}
            </PackageNameButtonDouble>
          </ButtonWithLabel>

          <ButtonWithLabel>
            <Typography fontSize={"0.72rem"}>GPT-4</Typography>
            <PackageNameButtonDouble
              onClick={() => {
                handlePackageSelection(packages.price_gpt4);
              }}
            >
              {packages.price_gpt4}
            </PackageNameButtonDouble>
          </ButtonWithLabel>
        </PricingButtonContainer>
      </PackageNameContainer>

      <PackageDetailsContainer>
        <FeatureList>
          {packages.features.map((feature) => (
            <ListItem>
              <Typography fontSize={"0.85rem"}>{feature}</Typography>
            </ListItem>
          ))}
        </FeatureList>
      </PackageDetailsContainer>
    </Container>
  );
}
