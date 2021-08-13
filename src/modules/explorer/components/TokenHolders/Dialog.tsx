import React, { useMemo } from "react";
import {
  Grid,
  styled,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";

import { ViewButton } from "../ViewButton";
import { theme } from "theme";
import { BigNumber } from "bignumber.js";
import { useDAO } from "services/indexer/dao/hooks/useDAO";

interface TokenHolderDialogData {
  address: string;
}

const CloseButton = styled(Typography)({
  fontWeight: 900,
  cursor: "pointer",
});

const Title = styled(DialogTitle)(({ theme }) => ({
  height: 30,
  paddingBottom: 0,
  minWidth: 500,
  [theme.breakpoints.down("xs")]: {
    minWidth: 250,
  },
}));

const CustomDialog = styled(Dialog)({
  "& .MuiDialog-paperWidthSm": {
    minHeight: "400px !important",
  },
});

const StyledViewButton = styled(ViewButton)({
  marginTop: -30,
});

const TextHeader = styled(Typography)({
  fontWeight: "bold",
});

const Row = styled(Grid)(({ theme }) => ({
  padding: "33px 64px",
  borderTop: `2px solid ${theme.palette.primary.light}`,
  paddingBottom: 0,
  display: "flex",
  alignItems: "end",
  "&:last-child": {
    marginBottom: 30,
    borderBottom: `2px solid ${theme.palette.primary.light}`,
  },
}));

const TableHeader = styled(Grid)({
  padding: "33px 64px",
});

const LinearBar = styled(LinearProgress)({
  marginBottom: "-3px",
  marginTop: 30,
  backgroundColor: "#3d3d3d !important",
});

export const TokenHoldersDialog: React.FC<TokenHolderDialogData> = ({
  address,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data } = useDAO(address);

  const tokenHolders = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.data.ledger.map((holder) => ({
      address: holder.holder.address,
      tokens:  new BigNumber(holder.current_unstaked) || new BigNumber(0),
    }));
  }, [data]);

  const totalLocked = useMemo(() => {
    if (!data) {
      return new BigNumber(0);
    }

    return data.data.ledger.reduce((acc, holder) => {
      return acc.plus(new BigNumber(holder.current_unstaked) || new BigNumber(0));
    }, new BigNumber(0));
  }, [data]);

  return (
    <div>
      <StyledViewButton
        customColor={theme.palette.secondary.main}
        onClick={handleClickOpen}
        variant="outlined"
      >
        VIEW
      </StyledViewButton>
      <CustomDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Title id="alert-dialog-title" color="textSecondary">
          <Grid container direction="row">
            <Grid item xs={12}>
              <CloseButton
                color="textSecondary"
                align="right"
                onClick={handleClose}
              >
                X
              </CloseButton>
            </Grid>
          </Grid>
        </Title>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TableHeader container direction="row" alignItems="center">
              <Grid item xs={6}>
                <TextHeader variant="subtitle1" color="textSecondary">
                  TOKEN HOLDER
                </TextHeader>
              </Grid>
              <Grid item xs={6}>
                <TextHeader
                  variant="subtitle1"
                  color="textSecondary"
                  align="right"
                >
                  TOKENS
                </TextHeader>
              </Grid>
            </TableHeader>

            {tokenHolders.map((holder, index) => {
              return (
                <Row container direction="row" alignItems="center" key={index}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" color="textSecondary">
                      {holder.address.slice(0, 6)}...
                      {holder.address.slice(
                        holder.address.length - 4,
                        holder.address.length
                      )}
                    </Typography>
                    <LinearBar
                      color="secondary"
                      variant="determinate"
                      value={
                        totalLocked ? holder.tokens.div(totalLocked).multipliedBy(100).toNumber() : 0
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      align="right"
                    >
                      {holder.tokens.toString()}
                    </Typography>
                  </Grid>
                </Row>
              );
            })}
          </DialogContentText>
        </DialogContent>
      </CustomDialog>
    </div>
  );
};