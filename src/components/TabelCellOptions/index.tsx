import { ReactNode } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import MenuTwo from "./MenuTwo";
import { PrimaryHard } from "../../assets/theme/colors";

const useStyles = makeStyles({
  value: {
    fontSize: 13,
  },
  menuMoreItem: {
    fontSize: 13,
    justifyContent: "space-between",
    display: "flex",
    "&:hover": {
      color: PrimaryHard,
    },
  },
});

function Status(props: {
  value: ReactNode;
  borderColor?: string;
  fillColor?: string;
  textColor?: string;
}) {
  const classes = useStyles();
  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          border: "1px solid",
          borderColor: props.borderColor,
          background: props.fillColor,
          color: props.textColor,
          borderRadius: 20,
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          margin: "auto",
        }}
      >
        <Typography className={classes.value}>{props.value}</Typography>
      </Box>
    </Box>
  );
}

function String(props: { align?: CanvasTextAlign; value?: ReactNode }) {
  const classes = useStyles();
  return (
    <Typography
      style={{
        textAlign: props.align || "center",
        width: "max-content",
        margin: props.align && props.align !== "center" ? 0 : "auto",
      }}
      className={classes.value}
    >
      {props.value === "" || props.value === null ? "-" : props.value}
    </Typography>
  );
}

// approver cellType
// reasonAuthor cellType

// file details budget tracking financial

// =====> BATAS AWAL INDEX COMPONENT

const index = (props: {
  value: any;
  cellType: string;
  align?: CanvasTextAlign;
  className?: string;
}) => {
  const { value, cellType, align } = props;

  function renderStatusUser(val: ReactNode) {
    if (val === "1") {
      return (
        <Status value="Active" borderColor="#65D170" textColor="#65D170" fillColor="#D9FFDD" />
      );
    } else if (val === "2") {
      return (
        <Status value="Inactive" borderColor="#FF7A76" textColor="#FF7A76" fillColor="#FFE9E9" />
      );
    }
  }

  function renderSwitchOption(param: string) {
    switch (param) {
      case "string":
        return <String value={value} align={align} />;
      case "child":
        return value;
      case "menu_two":
      case "menu_twouser":
      case "menu_tworole":
        return <MenuTwo value={value} />;
      case "status_user":
        return renderStatusUser(value);
      default:
        return <String value={value} />;
    }
  }

  return <div>{renderSwitchOption(cellType)}</div>;
};

index.defaultProps = {
  value: "Value",
  cellType: "string",
};

export default index;
export { Status };
