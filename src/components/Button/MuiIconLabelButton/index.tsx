import { ReactNode } from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { Theme, withStyles } from "@material-ui/core/styles";
import { ReactComponent as AngleRightIcon } from "../../../assets/images/angle-right-white.svg";
import * as Colors from "../../../assets/theme/colors";
import { Styles } from "@material-ui/styles";

const styles: Styles<Theme, object> = {
  root: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 14,
    backgroundColor: Colors.PrimaryHard,
    textTransform: "capitalize",
    color: Colors.White,
    borderRadius: 10,
    fontFamily: "Barlow",
    boxShadow: "0px, 6px rgba(220, 36, 31, 0.1)",
  },
};

const MuiButton = (
  props: {
    label: string;
    iconPosition: string;
    classes: any;
    buttonIcon: ReactNode;
  } & ButtonProps
) => {
  const { label, classes, iconPosition, buttonIcon, onClick, ...other } = props;
  const newProps: ButtonProps = {
    className: classes.root,
    variant: "contained",
    ...(iconPosition === "endIcon"
      ? { endIcon: buttonIcon }
      : {
          startIcon: buttonIcon,
        }),
    onClick: onClick,
    disableElevation: true,
  };
  return (
    <Button {...newProps} {...other}>
      {label}
    </Button>
  );
};

MuiButton.defaultProps = {
  label: "Submit",
  buttonIcon: <AngleRightIcon />,
  iconPosition: "endIcon",
};

export default withStyles(styles)(MuiButton);

// How to use...?
// A==> import MuiIconLabelButton
// import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';

// B==> import icon
// import { ReactComponent as AngleLeftIcon } from '../../assets/images/angle-left.svg';

// C==> set component
// <MuiIconLabelButton label="Tombol" iconPosition="startIcon" buttonIcon={<AngleLeftIcon/>}/>
