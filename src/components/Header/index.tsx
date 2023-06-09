/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { ReactComponent as HeadNotifAnalisaIcon } from '../../assets/icons/general/notif_analisa_red.svg';
import { ReactComponent as HeadNotifIcon } from '../../assets/icons/general/notif_red.svg';
import { ReactComponent as HeadUserIcon } from '../../assets/icons/general/user_red.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/duotone-red/user.svg';
import { ReactComponent as SignoutIcon } from '../../assets/icons/duotone-red/log-out.svg';
import IconButton from '@material-ui/core/IconButton';
import theme from '../../assets/theme/theme';
import { Popover, Dropdown, MenuProps } from 'antd';
import PopupNotif from '../PopupNotif';
import PopupLogout from '../Popuplogout';
import { RootContext } from '../../router';
import { GrayUltrasoft, PrimaryHard } from "../../assets/theme/colors";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: 'calc(100vw - 0px)',
    // marginLeft: '200px',
    height: '60px',
    // position: 'relative',
    justifyContent: 'space-between',
  },
  icon: {
    // position: 'relative',
    float: 'left',
    // left: '89%',
    // right: '184px',
    cursor: 'pointer',
  },
  iconHead: {
    marginRight: 10,
    height: 32,
    width: 32,
    padding: 5,
    // borderRadius: '50%',
    // backgroundColor: Colors.PrimaryUltrasoft,
  },
  userIcon: {
    marginLeft: 10,
    // borderRadius: '50%',
    // backgroundColor: Colors.PrimaryUltrasoft,
  },
  downIcon: {
    position: 'absolute',
    marginLeft: 10,
    bottom: 8,
    float: 'left',
    left: '90%',
  },
  action: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontStyle: 'normal',
    color: '#004D6E',
    lineHeight: '19px',
  },
  actionButton: {
    position: 'absolute',
    float: 'left',
    left: '100%',
    cursor: 'pointer',
  },
  profile: {
    fontFamily: 'Barlow',
    fontSize: '13px',
    fontWeight: 500,
    margin: '0 0 0 20px',
    color: PrimaryHard
  },
  menuItem: {
    color: PrimaryHard,
    padding: 10,
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    fontSize: 15
  }
});

const Header = (props: { collapsed: boolean }) => {
  const classes = useStyles();
  const [modalLogout, setModalLogout] = React.useState(false);
  const { logout, userFullName } = useContext(RootContext);
  const history = useHistory();

  const menu: MenuProps = {
    items: [{
      label: (
        <div className={classes.menuItem} onClick={() => history.push(`/user-profile`)}>
          <UserIcon style={{ marginRight: 5 }} /> Profile
        </div>), type: 'group'
    }, {
      label: (
        <div className={classes.menuItem} onClick={() => setModalLogout(true)}>
          <SignoutIcon style={{ marginRight: 5 }} /> Sign Out
        </div>), type: 'group'
    }]
  };

  return (
    <AppBar
      className={classes.root}
      style={{ boxShadow: '0 8px 4px -4px #e5edf8' }}
    >
      <div
        style={{
          textAlign: 'center',
          marginTop: '8px',
          marginLeft: props.collapsed ? 110 : 280,
        }}
      >
        <Typography variant="h5" component="h1">Admin Dashboard</Typography>
      </div>
      <Toolbar>
        <div className={classes.icon}>
          <IconButton>
            <HeadNotifAnalisaIcon />
          </IconButton>
          <Popover
            placement="bottomRight"
            title=""
            content={PopupNotif}
            trigger="click"
          >
            <IconButton>
              <HeadNotifIcon />
            </IconButton>
          </Popover>
          <Dropdown menu={menu} trigger={['click']} placement="bottomLeft">
            <IconButton
              style={{ backgroundColor: GrayUltrasoft }}
            // onClick={() => setModalLogout(true)}
            >
              <HeadUserIcon />
            </IconButton>
          </Dropdown>
        </div>
        <div className={classes.actionButton}></div>
        <p className={classes.profile}>{userFullName}</p>
      </Toolbar>
      <PopupLogout
        isOpen={modalLogout}
        onClose={() => setModalLogout(false)}
        onLeave={() => logout()}
      />
    </AppBar>
  );
};

export default Header;
