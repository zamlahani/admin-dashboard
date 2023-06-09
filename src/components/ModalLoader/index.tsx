import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Typography } from "@material-ui/core";
import Constants from "../../helpers/constants";
import MyLoading from "../Loading/MyLoading";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    color: Constants.color.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const ModalLoader = (props: { isOpen: boolean; content?: ReactElement }) => {
  const classes = useStyles();
  const { isOpen } = props;

  return (
    <div>
      <Modal
        className={classes.modal}
        open={isOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        onClose={(e, reason) => {
          if (reason === "backdropClick") return false;
        }}
      >
        <Fade in={isOpen}>
          {props.content ? (
            <Typography style={{ color: "white", fontSize: 20 }}>{props.content}</Typography>
          ) : (
            <div className={classes.paper}>
              <MyLoading height="100px" width="100px" />
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
};

ModalLoader.defaultProps = {
  isOpen: false,
};

export default ModalLoader;
