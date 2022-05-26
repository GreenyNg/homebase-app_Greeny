import {
  Box,
  capitalize,
  Grid,
  styled,
  Typography,
  Theme,
} from "@material-ui/core";
import React from "react";
import { Network } from "services/beacon";
import { useTezos } from "services/beacon/hooks/useTezos";
import { ActionSheet, useActionSheet } from "../context/ActionSheets";

const StyledConnectedButton = styled(Box)(({ theme }: { theme: Theme }) => ({
  "& > *": {
    height: "100%",
  },
  background: "#24282B",
  borderRadius: 4,
  padding: "5px 10px",
  cursor: "pointer",
  "&:hover": {
    background: theme.palette.secondary.dark,
  }
}));

export const networkDotColorMap: Record<Network, string> = {
  mainnet: "#9EEE5D",
  hangzhounet: "#E54FAE",
  ithacanet: "#291F79",
}

export const ColorDot = styled(Box)({
  height: 6,
  width: 6,
  backgroundColor: ({ color }: { color: string }) => color,
  borderRadius: "50%",
});

const NetworkText = styled(Typography)({
  fontSize: "14px",
});

export const ChangeNetworkButton = () => {
  const { network } = useTezos()
  const { open } = useActionSheet(ActionSheet.Network);

  return (
    <StyledConnectedButton onClick={() => open()}>
      <Grid container style={{ gap: 5 }} alignItems="center" wrap="nowrap">
        <Grid item>
          <ColorDot color={networkDotColorMap[network]} />
        </Grid>
        <Grid item>
          <NetworkText color="textPrimary">{capitalize(network)}</NetworkText>
        </Grid>
      </Grid>
    </StyledConnectedButton>
  );
};
