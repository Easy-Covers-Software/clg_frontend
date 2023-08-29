// AdjustmentButtons.tsx

import { FC } from "react";
import { IconButton, Divider } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

import { useGenerationContext } from "@/context/GenerationContext";

import { AdjustmentsUtils } from "@/Utils/utils";
const { makeSimpleAdjustment } = AdjustmentsUtils;

interface AdjustmentButtonsProps {
  adjustmentType: string;
  disabled: boolean;
  handleIncreaseSimpleAdjustment: () => void;
  handleDecreaseSimpleAdjustment: () => void;
}

const ButtonGroup: FC<AdjustmentButtonsProps> = ({
  adjustmentType,
  disabled,
  handleIncreaseSimpleAdjustment,
  handleDecreaseSimpleAdjustment,
}) => {
  const { state } = useGenerationContext();

  return (
    <>
      <IconButton
        disabled={disabled}
        onClick={() => handleDecreaseSimpleAdjustment(adjustmentType, 1)}
      >
        <RemoveCircleOutlineOutlinedIcon />
      </IconButton>

      <Divider orientation="vertical" />

      <IconButton
        disabled={disabled}
        onClick={() => handleIncreaseSimpleAdjustment(adjustmentType, 1)}
      >
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
    </>
  );
};

export default ButtonGroup;
