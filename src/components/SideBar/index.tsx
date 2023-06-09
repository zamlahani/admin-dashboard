import { Layout } from 'antd';

import Constanst from '../../helpers/constants';
import { ReactComponent as IconLeft } from '../../assets/icons/linear-red/chevron-left.svg';
import { ReactComponent as IconRight } from '../../assets/icons/linear-red/chevron-right.svg';

import SideBarMenu from './SideBarMenu';
import { MouseEventHandler } from "react";

const { Sider } = Layout;

const SideBar = (props: { collapsed: boolean, onCollapse: () => void }) => {
  return (
    <Sider
      id="side-menu"
      data-test-id="sidebar-menu"
      width={250}
      style={{
        position: 'fixed',
        height: '100vh',
        left: 0,
        backgroundColor: Constanst.color.white,
        overflowY: 'auto',
        zIndex: 1100,
      }}
      // collapsible
      collapsed={props.collapsed}
      onCollapse={props.onCollapse}
    >
      <div
        style={{
          marginTop: 20,
          marginLeft: props.collapsed ? 30 : 20,
          backgroundColor: 'white',
        }}
        onClick={props.onCollapse}
      >
        {props.collapsed ? <IconRight /> : <IconLeft />}
      </div>

      <SideBarMenu collapsed={props.collapsed} />
    </Sider>
  );
};

export default SideBar;
