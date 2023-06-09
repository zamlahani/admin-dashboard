/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col, Divider } from 'antd';
import {
  Tabs,
  Tab,
} from '@material-ui/core';
import constants from '../../helpers/constants';

import MailRed from '../../assets/icons/siab/mail.png';
import MailGray from '../../assets/icons/siab/mail-gray.png';

const useStyles = makeStyles({
  body: {
    width: 420,
    // backgroundColor: 'red',
    maxHeight: '80vh',
    overflowY: 'scroll',
    scrollbarTrackColor: 'rgb(255,255,255,1)',
  },
  notifTitle: {
    fontFamily: 'Barlow',
    fontStyle: 'bold',
    fontWeight: 600,
    fontSize: '16px',
    color: 'dark',
  },
  messageTitle: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    color: 'dark',
  },
  messageTitleGray: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    color: 'dark',
  },
  messageInfo: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: 200,
    fontSize: '9px',
    color: 'dark',
  },
  messageDesc: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '11px',
    color: 'dark',
  },
  dividerNoText: { margin: '10px 0px' },
  dividerWithText: {
    margin: '10px 0px',
    color: 'gray',
    fontFamily: 'Barlow',
    fontWeight: 200,
    fontSize: '14px',
  },
});

const useTabsStyles = makeStyles({
  root: {
    marginLeft: 60,
    marginTop: 10,
    height: 36,
    width: 296,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
  },
  indicator: {
    display: 'none',
  },
});

const useTabItemStyles = makeStyles({
  root: {
    height: 36,
    minWidth: 74,
    // padding: '7px 10px',
  },
  selected: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapper: {
    textTransform: 'none',
  },
});

const PopupNotif = () => {
  const classes = useStyles();
  const tabsClasses = useTabsStyles();
  const tabItemClasses = useTabItemStyles();
  const tabsStyles = {
    root: tabsClasses.root,
    indicator: tabsClasses.indicator,
  };
  const tabItemStyles = {
    root: tabItemClasses.root,
    selected: tabItemClasses.selected,
    wrapper: tabItemClasses.wrapper,
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectedTab = (event: React.ChangeEvent<unknown>, newValue: number) => {
    event.preventDefault();
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.body}>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <Col flex="auto" className={classes.notifTitle}>
          Notification
        </Col>
        <Col flex="10px" className={classes.notifTitle}>
          (2)
        </Col>
      </Row>
      <Tabs
        classes={tabsStyles}
        value={selectedTab}
        onChange={handleSelectedTab}
        centered
      >
        <Tab classes={tabItemStyles} label="All" />
        <Tab classes={tabItemStyles} label="Updates" />
        <Tab classes={tabItemStyles} label="News" />
        <Tab classes={tabItemStyles} label="Critical" />
      </Tabs>
      <div style={{ marginTop: 20 }}>
        {message('notOpened')}
        <Divider dashed className={classes.dividerNoText} />
        {message('opened')}
        <Divider dashed className={classes.dividerNoText} />
        {message('notOpened')}
        <Divider dashed className={classes.dividerWithText}>
          Yesterday
        </Divider>
        {message('opened')}
        <Divider dashed className={classes.dividerNoText} />
        {message('opened')}
        <Divider dashed className={classes.dividerNoText} />
        {message('opened')}
        <Divider dashed className={classes.dividerNoText} />
        {message('opened')}
        <Divider dashed className={classes.dividerNoText} />
        {message('opened')}
        <Divider dashed className={classes.dividerNoText} />
      </div>
    </div>
  );
};

const message = (status: string) => {
  const classes = useStyles();
  let imgMessage = MailRed;
  let styleTitle = classes.messageTitle;
  if (status === 'opened') {
    imgMessage = MailGray;
    styleTitle = classes.messageTitleGray;
  }
  return (
    <Row justify="start">
      <Col flex="20px" order={2}>
        <img src={imgMessage} style={{ height: 20, width: 20 }} />
      </Col>
      <Col flex="auto" order={1}>
        <div
          style={{ maxWidth: 350, display: 'flex', flexDirection: 'column' }}
        >
          <span className={styleTitle}>Iaculis etiam quisque venenatis</span>
          <span className={classes.messageInfo}>2 hours ago</span>
          <span className={classes.messageDesc}>
            Venenatis mus dictumst vivamus elementum. Nec adipiscing sit duis
            mauris massa.
          </span>
        </div>
      </Col>
    </Row>
  );
};

export default PopupNotif;
