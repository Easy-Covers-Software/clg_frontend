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

import { useMediaQuery } from "@mui/material";

export default function UpgradeAccountOption({
  key,
  packages,
  setSelectedPackagePrice,
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const handlePackageSelection = (price) => {
    setSelectedPackagePrice(price);
  };

  const getLeftShift = (name) => {
    switch (name) {
      case "Intro Drafter":
        return "-13.6rem";
      case "Dynamic Drafter":
        return "-12.9rem";
      case "Pro Drafter":
        return "-14rem";
      case "Letter Luminary":
        return "-13rem";
      case "Cover Connoisseur":
        return "-12.5rem";

      default:
        return "-13rem";
    }
  };

  return (
    <>
      <Typography
        className="package-name"
        style={{
          left: isMobile ? 0 : getLeftShift(packages.name),
        }}
      >
        {packages.name}
      </Typography>
      <Container>
        <PackageNameContainer>
          {/* <PricingButtonContainer> */}
          <ButtonWithLabel>
            <Typography className="package-model">GPT-3.5</Typography>

            <PackageNameButtonDouble
              onClick={() => {
                handlePackageSelection(packages.price);
              }}
            >
              {packages.price}
            </PackageNameButtonDouble>
          </ButtonWithLabel>

          <ButtonWithLabel>
            <Typography className="package-model">GPT-4</Typography>
            <PackageNameButtonDouble
              onClick={() => {
                handlePackageSelection(packages.price_gpt4);
              }}
            >
              {packages.price_gpt4}
            </PackageNameButtonDouble>
          </ButtonWithLabel>
          {/* </PricingButtonContainer> */}
        </PackageNameContainer>

        <PackageDetailsContainer>
          <FeatureList>
            {packages.features.map((feature, i: number) => (
              <>
                <Typography key={i} className="package-features">
                  {feature}
                </Typography>
                {i === 0 && (
                  <Typography className="package-features">
                    &nbsp;&&&nbsp;
                  </Typography>
                )}
              </>
            ))}
          </FeatureList>
        </PackageDetailsContainer>
      </Container>
    </>
  );
}
