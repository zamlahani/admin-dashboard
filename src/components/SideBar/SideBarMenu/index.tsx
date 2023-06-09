/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect } from "react";
import { Menu } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import Constant from "../../../helpers/constants";

import { ReactComponent as OverviewIcon } from "../../../assets/icons/duotone-red/dashboard.svg";
import { ReactComponent as FinanceIcon } from "../../../assets/icons/duotone-red/money.svg";
import { ReactComponent as UserIcon } from "../../../assets/icons/duotone-red/user-friends.svg";
import { ReactComponent as OverviewIconGray } from "../../../assets/icons/duotone-gray/dashboard.svg";
import { ReactComponent as FinanceIconGray } from "../../../assets/icons/duotone-gray/money.svg";
import { ReactComponent as UserIconGray } from "../../../assets/icons/duotone-gray/user-friends.svg";

import { RootContext } from "../../../router";
import { PrimaryUltrasoft } from "../../../assets/theme/colors";

const { SubMenu } = Menu;

const useStyles = makeStyles(() => ({
  title: {
    marginLeft: "15px",
    fontFamily: "Barlow",
    color: Constant.color.primaryHard,
    fontWeight: 500,
  },
  titleGray: {
    marginLeft: "15px",
    fontFamily: "Barlow",
    color: Constant.color.grayMedium,
    fontWeight: 500,
  },
  groupItem: {
    "& .ant-menu-sub.ant-menu-inline .ant-menu-item-group-title": {
      paddingLeft: 60,
    },
  },
  subTitle: {
    marginLeft: 15,
    fontSize: 14,
    fontFamily: "Barlow",
    color: Constant.color.primaryHard,
    cursor: "pointer",
    fontWeight: 500,
  },
  subtitleGray: {
    marginLeft: 15,
    fontSize: 14,
    fontFamily: "Barlow",
    color: Constant.color.grayMedium,
    cursor: "pointer",
    fontWeight: 500,
  },
  subMenuWrapper: {
    display: "flex",
    alignItems: "center",
    "& .ant-menu-submenu-arrow::before": {
      background: `${Constant.color.grayMedium} !important`,
    },
  },
  subMenuActive: {
    backgroundColor: PrimaryUltrasoft,
    "& .ant-menu-submenu-arrow::before": {
      background: `${Constant.color.primaryHard} !important`,
    },
    "& .ant-menu-submenu-arrow::after": {
      background: `${Constant.color.primaryHard} !important`,
    },
    "& .ant-menu-item-only-child": { marginTop: 0 },
  },
}));

// jika ada tambahan menu yang ada sub menu, tambahkan key nya pada bagian bawah
const rootSubmenuKeys = [
  "subDashboard",
  "subPlan",
  "subSite",
  "subFinance",
  "subUser",
  "subMaster",
];

// eslint-disable-next-line no-unused-vars
const SideBarMenu = (props: { collapsed: boolean }) => {
  const classes = useStyles();
  const [activeButton, setActiveButton] = React.useState("0");
  const [activeSubButton, setActiveSubButton] = React.useState<string[]>([]);
  const location = useLocation();
  const { pathname } = location;
  const { userMenus,  } = useContext(RootContext);
  // console.log('~ userRoleName', userRoleName)

  // buat atur yang akan ditampil di side menu
  const dataSideMenu = [
    {
      title: "Dashboard",
      rootKeys: "subDashboard",
      iconRed: <OverviewIcon />,
      iconGray: <OverviewIconGray />,
      sub: [
        {
          key: "011",
          title: "Overview",
          url: "/dashboard-overview",
        },
      ],
    },
    {
      title: "Financial",
      rootKeys: "subFinance",
      iconRed: <FinanceIcon />,
      iconGray: <FinanceIconGray />,
      sub: [
        {
          key: "041",
          title: "Overview",
          url: "/financial",
        },
      ],
    },
    {
      title: "User Management",
      rootKeys: "subUser",
      iconRed: <UserIcon />,
      iconGray: <UserIconGray />,
      sub: [
        {
          key: "051",
          title: "User Management",
          url: "/user-management",
        },
      ],
    },
  ];

  // eslint-disable-next-line consistent-return
  async function activeButtonHighlight() {
    // eslint-disable-next-line default-case
    // sub menu dashboard
    if (pathname.includes("/dashboard-overview")) {
      return "011";
    }
    // financial
    if (pathname.includes("/financial")) {
      return "041";
    }
    // user management
    if (pathname.includes("/user-management")) {
      return "051";
    }
    return "";
  }

  // eslint-disable-next-line consistent-return
  async function activeSubButtonHighlight() {
    // sub menu dashboard
    if (pathname.includes("/dashboard-overview")) {
      const result = ["subDashboard"];
      return result;
    }
    // financial
    if (pathname.includes("/financial")) {
      const result = ["subFinance"];
      return result;
    }
    // user management
    if (pathname.includes("/user-management")) {
      const result = ["subUser"];
      return result;
    }
    const result = [""];
    return result;
  }

  useEffect(() => {
    activeButtonHighlight().then((value) => {
      // console.log(`set active keys ${value}`);
      setActiveButton(value);
    });

    // set default open Sub Menu
    activeSubButtonHighlight().then((value) => {
      setActiveSubButton(value);
    });
  }, [location]);

  const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find((key) => activeSubButton.indexOf(key) === -1) || "";
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setActiveSubButton(openKeys);
    } else {
      setActiveSubButton(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const userMenuNames = userMenus.map(({ menuName }: { menuName: string }) => menuName);

  const filteredMenus = dataSideMenu.filter(({ title }) => userMenuNames.includes(title));

  // console.log(userMenuNames);
  // useEffect(() => {
  //   console.log("+++ userMenus", userMenus);
  // }, [userMenus]);

  return (
    <div style={{ marginTop: 5 }}>
      <Menu
        defaultSelectedKeys={[activeButton]}
        selectedKeys={[activeButton]}
        openKeys={activeSubButton}
        onOpenChange={onOpenChange}
        style={{
          backgroundColor: Constant.color.white,
          width: "100%",
        }}
        mode="inline"
      >
        {(userMenus.length > 0 ? filteredMenus : dataSideMenu).map((item) => {
          return (
            <SubMenu
              key={item.rootKeys as React.Key}
              className={activeSubButton[0] === item.rootKeys ? classes.subMenuActive : undefined}
              title={
                props.collapsed ? (
                  activeSubButton[0] === item.rootKeys ? (
                    item.iconRed
                  ) : (
                    item.iconGray
                  )
                ) : (
                  <span className={classes.subMenuWrapper}>
                    {activeSubButton[0] === item.rootKeys ? item.iconRed : item.iconGray}
                    <span
                      className={
                        activeSubButton[0] === item.rootKeys
                          ? classes.subTitle
                          : classes.subtitleGray
                      }
                    >
                      {item.title}
                    </span>
                  </span>
                )
              }
            >
              {item.sub.map((subItem) => {
                return (
                  <Menu.Item key={subItem.key}>
                    {subMenuGeneral(classes, activeButton, subItem.key, subItem.title, subItem.url)}
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    </div>
  );
};

// sub menu general
function subMenuGeneral(
  classes: {
    titleGray: string;
    title: string;
  },
  activeKey: string,
  buttonKey: string,
  title: string,
  pathname: string
) {
  let titleStyle = classes.titleGray;
  if (activeKey === buttonKey) {
    titleStyle = classes.title;
  }
  return (
    <Link style={{ cursor: "pointer", fontSize: 14 }} to={pathname}>
      <span className={titleStyle}>{title}</span>
    </Link>
  );
}

export default SideBarMenu;
