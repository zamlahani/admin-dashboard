import React from "react";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { ReactComponent as TrashIcon } from "../../assets/images/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/images/edit.svg";
import { ReactComponent as ArrowRight } from "../../assets/icons/siab/arrow-right.svg";
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

function MenuTwo({
  value,
}: {
  value: { type: string[]; handler: (() => void)[]; name: string[] }[];
}) {
  const classes = useStyles();
  // console.log(value);

  const { type, handler, name } = value[0];

  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setAnchorEl(event.currentTarget as Element);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function renderIconMenu(itemType: string) {
    if (itemType === "edit") {
      return <EditIcon height={16} width={16} />;
    } else if (itemType === "delete") {
      return <TrashIcon height={16} width={16} />;
    } else {
      return <ArrowRight height={16} width={16} />;
    }
  }

  return (
    <div>
      <Typography style={{ fontSize: 13, color: PrimaryHard }} onClick={handleClick}>
        Edit
      </Typography>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {type.map((item: string, i: number) => {
          return (
            <MenuItem key={i} onClick={() => handler[i]()} className={classes.menuMoreItem}>
              <Typography style={{ fontSize: 13 }}>{name[i]}</Typography>
              <div>{renderIconMenu(item)}</div>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default MenuTwo;
