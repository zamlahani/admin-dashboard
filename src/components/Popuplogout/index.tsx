import React from "react";
import { Modal, Box, Grid, IconButton, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";

import constants from "../../helpers/constants";
import { PrimaryHard } from "../../assets/theme/colors";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: 660,
    height: 420,
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonContainer: {
    marginTop: 36,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: 180,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "14px 36px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 180,
  },
});

const ModalIcon = () => (
  <svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      opacity=".4"
      d="M40 0C17.903 0 0 17.916 0 40s17.903 40 40 40 40-17.903 40-40S62.097 0 40 0zm0 60.645a5.161 5.161 0 110-10.322 5.161 5.161 0 010 10.322zm6.168-38.453l-2.065 20.645a2.581 2.581 0 01-2.568 2.324h-3.064a2.58 2.58 0 01-2.568-2.324L33.84 22.192a2.58 2.58 0 012.561-2.837h7.2a2.582 2.582 0 012.568 2.837z"
      fill={PrimaryHard}
    />
  </svg>
);

const ModalDialog = ({
  isOpen,
  onClose,
  onLeave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLeave: () => void;
}) => {
  const { modal, paper, closeIcon, buttonContainer, primaryButton, secondaryButton } = useStyles();

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <IconButton onClick={onClose}>
              <Close className={closeIcon} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" alignItems="center" direction="column" spacing={5}>
          <Grid item>
            <Typography variant="h4" component="h4">
              Logout
            </Typography>
          </Grid>

          <Grid item>
            <ModalIcon />
          </Grid>

          <Grid item>
            <Typography variant="body1" component="p">
              Are you sure want to logout?
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" className={buttonContainer}>
          <Grid item>
            <Button
              variant="outlined"
              disableElevation
              className={secondaryButton}
              onClick={onClose}
            >
              No
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={primaryButton}
              onClick={onLeave}
            >
              Yes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalDialog;
