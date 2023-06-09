import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PrimaryHard } from "../../../assets/theme/colors";

const useStyles = makeStyles({
  root: {
    fontFamily: "NunitoRegular",
  },
  openButton: {
    backgroundColor: PrimaryHard,
    color: "white",
    padding: "9px",
    border: "none",
    cursor: "pointer",
    opacity: "1",
    position: "fixed",
    bottom: "0px",
    right: "50px",
    width: "260px",
    hight: "40px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    fontSize: "18px",
    "&:hover": {
      opacity: "0.8",
    },
    zIndex: 9,
  },
  chatPopup: {
    display: "none",
    position: "fixed",
    bottom: "0",
    right: "50px",
    border: "3px solid #f1f1f1",
    zIndex: 9,
    borderRadius: "10px",
  },
  formContainer: {
    maxWidth: "300px",
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "5px",
  },
  formTextarea: {
    width: "100%",
    padding: "15px",
    margin: "5px 0 22px 0",
    border: "none",
    background: "#f1f1f1",
    resize: "none",
    minHeight: "200px",
    "&:focus": {
      backgroundColor: "#ddd",
      outline: "none",
    },
  },
  formSubmit: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "none",
    cursor: "pointer",
    width: "100%",
    marginBottom: "10px",
    opacity: "1",
    borderRadius: "5px",
    "&:hover": {
      opacity: "0.8",
    },
  },
  formCancel: {
    backgroundColor: "red",
    color: "white",
    padding: "10px",
    border: "none",
    cursor: "pointer",
    width: "100%",
    marginBottom: "10px",
    opacity: "1",
    borderRadius: "5px",
    "&:hover": {
      opacity: "0.8",
    },
  },
});
const index = () => {
  const classes = useStyles();
  const openForm = () => {
    const obj = document.getElementById("myForm");
    if (obj) {
      obj.style.display = "block";
    }
    console.log("openForm");
  };

  const closeForm = () => {
    const obj = document.getElementById("myForm");
    if (obj) {
      obj.style.display = "none";
    }
    console.log("closeForm");
  };

  return (
    <div className={classes.root}>
      <div className={classes.openButton} onClick={openForm}>
        <div> Chat </div>
        <div> (12) </div>
      </div>
      {/* <div className={classes.openButton} onclick={e => console.log("Clicked")}>
            <div> Chat </div>
            <div> (12) </div>
        </div> */}

      <div className={classes.chatPopup} id="myForm">
        <form className={classes.formContainer}>
          <h1>Chat</h1>

          <label htmlFor="msg">
            <b>Message</b>
          </label>
          <textarea
            className={classes.formTextarea}
            placeholder="Type message.."
            name="msg"
            required
          />

          <button type="submit" className={classes.formSubmit}>
            Send
          </button>
          <button type="button" className={classes.formCancel} onClick={closeForm}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

index.defaultProps = {};

export default index;
