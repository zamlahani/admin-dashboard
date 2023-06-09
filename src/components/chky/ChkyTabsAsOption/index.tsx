/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab } from "@material-ui/core";
import * as Colors from "../../../assets/theme/colors";

const useStyles = makeStyles({
  // Tabs Style
  rootTabs: {
    minHeight: 40,
    backgroundColor: Colors.GrayUltrasoft,
    borderRadius: 10,
    color: Colors.GrayMedium,
    position: "relative",
  },
  tabsIndicator: {
    display: "none",
  },
  rootItemTabs: {
    minHeight: 40,
    padding: "7px 10px",
    minWidth: (props: { minWidth: string | number }) => props.minWidth,
  },
  selectedTabItem: {
    backgroundColor: Colors.PrimaryHard,
    color: Colors.White,
  },
  wrapperTabItem: {
    textTransform: "none",
  },
});

function ChkyTabsAsOption(props: {
  currentTab: any;
  dataTab: string[];
  handleChangeTab(n: any): void;
  minWidth: string | number;
}) {
  const classes = useStyles(props);

  const { currentTab, dataTab, handleChangeTab } = props;

  const tabsStyles = {
    root: classes.rootTabs,
    indicator: classes.tabsIndicator,
  };
  const tabItemStyles = {
    root: classes.rootItemTabs,
    selected: classes.selectedTabItem,
    wrapper: classes.wrapperTabItem,
  };
  // TABS
  const [selectedTab, setSelectedTab] = useState(currentTab);
  const handleSelectedTab = (event: React.ChangeEvent<unknown>, newValue: any) => {
    event.preventDefault();
    setSelectedTab(newValue);
    handleChangeTab(newValue);
  };

  useEffect(() => {
    setSelectedTab(currentTab);
  }, [currentTab]);
  return (
    <Tabs classes={tabsStyles} value={selectedTab} onChange={handleSelectedTab} variant="fullWidth">
      {dataTab.map((item, index) => {
        return <Tab key={index} classes={tabItemStyles} label={item} />;
      })}
    </Tabs>
  );
}

ChkyTabsAsOption.defaultProps = {
  currentTab: 0,
  dataTab: ["Ya", "Tidak"],
  handleChangeTab: () => {
    console.log("Tab Value Changed");
  },
  minWidth: 50,
  resetCounter: 0,
};

export default ChkyTabsAsOption;
